const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'spoon-and-soul-super-secret-2026';
const DB_PATH = path.join(__dirname, 'db');

// ── Ensure DB folder exists ──
if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH);

// ── Helpers: read/write JSON files ──
const readDB = (file) => {
  const filePath = path.join(DB_PATH, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeDB = (file, data) => {
  fs.writeFileSync(path.join(DB_PATH, file), JSON.stringify(data, null, 2));
};

// ── Seed admin user if not exists ──
const seedAdmin = () => {
  const users = readDB('users.json');
  if (users.length === 0) {
    const hashed = bcrypt.hashSync('admin123', 10);
    writeDB('users.json', [{
      id: uuidv4(),
      username: 'admin',
      email: 'admin@dailytrend.me',
      password: hashed,
      role: 'admin'
    }]);
    console.log('✅ Admin user created: username=admin password=admin123');
  }
};

// ── Seed sample recipes if empty ──
const seedRecipes = () => {
  const recipes = readDB('recipes.json');
  if (recipes.length === 0) {
    const sample = [
      {
        id: uuidv4(),
        slug: 'creamy-tuscan-butter-pasta',
        title: 'Creamy Tuscan Butter Pasta',
        excerpt: 'Sun-dried tomatoes, spinach, and a silky one-pan butter sauce.',
        category: 'Dinner',
        emoji: '🍜',
        prepTime: '10 min',
        cookTime: '20 min',
        servings: '4 servings',
        difficulty: 'Easy',
        ingredients: ['400g spaghetti', '4 tbsp butter', '6 garlic cloves', '100g sun-dried tomatoes', '150g spinach', '200ml cream', '80g Parmesan'],
        steps: [
          { title: 'Cook pasta', desc: 'Boil pasta in salted water until al dente. Reserve 1 cup pasta water before draining.' },
          { title: 'Make sauce', desc: 'Melt butter, fry garlic, add tomatoes, cream and Parmesan. Simmer 5 minutes.' },
          { title: 'Combine', desc: 'Add spinach and pasta to sauce. Toss with pasta water until silky.' }
        ],
        tips: ['Reserve pasta water — it makes the sauce silky.', 'Use fresh Parmesan, not pre-grated.'],
        intro: 'A delicious, quick weeknight pasta that tastes like restaurant quality.',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    writeDB('recipes.json', sample);
    console.log('✅ Sample recipe seeded');
  }
};

seedAdmin();
seedRecipes();

// ── Middleware ──
app.use(cors({ origin: ['http://localhost:3000', 'https://dailytrend.me', 'https://www.dailytrend.me'], credentials: true }));
app.use(express.json());

// ── Auth Middleware ──
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ════════════════════════════════════════
// AUTH ROUTES
// ════════════════════════════════════════

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  const users = readDB('users.json');
  const user = users.find(u => u.username === username || u.email === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// GET /api/auth/me
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const users = readDB('users.json');
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const users = readDB('users.json');
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });

  if (!bcrypt.compareSync(currentPassword, users[idx].password))
    return res.status(400).json({ error: 'Current password is incorrect' });

  users[idx].password = bcrypt.hashSync(newPassword, 10);
  writeDB('users.json', users);
  res.json({ message: 'Password changed successfully' });
});

// ════════════════════════════════════════
// RECIPE ROUTES (PUBLIC)
// ════════════════════════════════════════

// GET /api/recipes — all published recipes
app.get('/api/recipes', (req, res) => {
  const recipes = readDB('recipes.json');
  const { cat, search, limit } = req.query;
  let result = recipes.filter(r => r.published);
  if (cat && cat !== 'All') result = result.filter(r => r.category === cat);
  if (search) result = result.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
  if (limit) result = result.slice(0, parseInt(limit));
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(result);
});

// GET /api/recipes/:slug — single recipe
app.get('/api/recipes/:slug', (req, res) => {
  const recipes = readDB('recipes.json');
  const recipe = recipes.find(r => r.slug === req.params.slug);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

// ════════════════════════════════════════
// RECIPE ROUTES (ADMIN)
// ════════════════════════════════════════

// GET /api/admin/recipes — all recipes including drafts
app.get('/api/admin/recipes', authMiddleware, (req, res) => {
  const recipes = readDB('recipes.json');
  recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(recipes);
});

// POST /api/admin/recipes — create new recipe
app.post('/api/admin/recipes', authMiddleware, (req, res) => {
  const { title, excerpt, category, emoji, prepTime, cookTime, servings, difficulty, ingredients, steps, tips, intro, published } = req.body;

  if (!title || !category) return res.status(400).json({ error: 'Title and category are required' });

  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const recipes = readDB('recipes.json');
  const exists = recipes.find(r => r.slug === slug);
  const finalSlug = exists ? `${slug}-${Date.now()}` : slug;

  const newRecipe = {
    id: uuidv4(),
    slug: finalSlug,
    title, excerpt, category,
    emoji: emoji || '🍽️',
    prepTime: prepTime || '',
    cookTime: cookTime || '',
    servings: servings || '',
    difficulty: difficulty || 'Easy',
    ingredients: ingredients || [],
    steps: steps || [],
    tips: tips || [],
    intro: intro || '',
    published: published !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  recipes.push(newRecipe);
  writeDB('recipes.json', recipes);
  res.status(201).json(newRecipe);
});

// PUT /api/admin/recipes/:id — update recipe
app.put('/api/admin/recipes/:id', authMiddleware, (req, res) => {
  const recipes = readDB('recipes.json');
  const idx = recipes.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });

  recipes[idx] = {
    ...recipes[idx],
    ...req.body,
    id: recipes[idx].id,
    slug: recipes[idx].slug,
    updatedAt: new Date().toISOString()
  };

  writeDB('recipes.json', recipes);
  res.json(recipes[idx]);
});

// DELETE /api/admin/recipes/:id — delete recipe
app.delete('/api/admin/recipes/:id', authMiddleware, (req, res) => {
  let recipes = readDB('recipes.json');
  const exists = recipes.find(r => r.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'Recipe not found' });

  recipes = recipes.filter(r => r.id !== req.params.id);
  writeDB('recipes.json', recipes);
  res.json({ message: 'Recipe deleted successfully' });
});

// PATCH /api/admin/recipes/:id/publish — toggle publish
app.patch('/api/admin/recipes/:id/publish', authMiddleware, (req, res) => {
  const recipes = readDB('recipes.json');
  const idx = recipes.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Recipe not found' });

  recipes[idx].published = !recipes[idx].published;
  recipes[idx].updatedAt = new Date().toISOString();
  writeDB('recipes.json', recipes);
  res.json(recipes[idx]);
});

// ════════════════════════════════════════
// STATS ROUTE
// ════════════════════════════════════════
app.get('/api/admin/stats', authMiddleware, (req, res) => {
  const recipes = readDB('recipes.json');
  const published = recipes.filter(r => r.published).length;
  const drafts = recipes.filter(r => !r.published).length;
  const categories = [...new Set(recipes.map(r => r.category))];
  res.json({ total: recipes.length, published, drafts, categories: categories.length });
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Spoon & Soul API running' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Admin login: username=admin password=admin123`);
});
