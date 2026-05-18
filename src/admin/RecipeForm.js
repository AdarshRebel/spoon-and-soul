import React, { useState, useEffect } from 'react';
import './RecipeForm.css';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Salads', 'Baking', 'Vegetarian', 'Soups', 'Snacks', 'Drinks'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const EMOJIS = ['🍜','🍛','🥗','🍞','🥞','🎂','🍲','🫕','🥙','🍵','🍳','🥘','🍝','🥧','🍕','🥗','🥩','🥕','🍲','🧆'];

const token = () => localStorage.getItem('admin_token');
const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` });

export default function RecipeForm({ editId, onSaved, onCancel }) {
  const isEdit = !!editId;

  const [form, setForm] = useState({
    title: '', excerpt: '', category: 'Dinner', emoji: '🍜',
    prepTime: '', cookTime: '', servings: '', difficulty: 'Easy',
    intro: '', published: false,
  });
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState([{ title: '', desc: '' }]);
  const [tips, setTips] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Load existing recipe if editing
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/admin/recipes`, { headers: headers() })
      .then(r => r.json())
      .then(data => {
        const recipe = Array.isArray(data) ? data.find(r => r.id === editId) : null;
        if (recipe) {
          setForm({
            title: recipe.title || '', excerpt: recipe.excerpt || '',
            category: recipe.category || 'Dinner', emoji: recipe.emoji || '🍜',
            prepTime: recipe.prepTime || '', cookTime: recipe.cookTime || '',
            servings: recipe.servings || '', difficulty: recipe.difficulty || 'Easy',
            intro: recipe.intro || '', published: recipe.published || false,
          });
          setIngredients(recipe.ingredients?.length ? recipe.ingredients : ['']);
          setSteps(recipe.steps?.length ? recipe.steps : [{ title: '', desc: '' }]);
          setTips(recipe.tips?.length ? recipe.tips : ['']);
        }
        setLoading(false);
      });
  }, [editId, isEdit]);

  // Live word count of intro
  useEffect(() => {
    const words = form.intro.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [form.intro]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Ingredients
  const updateIng = (i, val) => setIngredients(prev => prev.map((x, idx) => idx === i ? val : x));
  const addIng = () => setIngredients(prev => [...prev, '']);
  const removeIng = (i) => setIngredients(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  // Steps
  const updateStep = (i, key, val) => setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  const addStep = () => setSteps(prev => [...prev, { title: '', desc: '' }]);
  const removeStep = (i) => setSteps(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);
  const moveStep = (i, dir) => {
    const arr = [...steps];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setSteps(arr);
  };

  // Tips
  const updateTip = (i, val) => setTips(prev => prev.map((x, idx) => idx === i ? val : x));
  const addTip = () => setTips(prev => [...prev, '']);
  const removeTip = (i) => setTips(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  const handleSave = async (publishNow) => {
    setError(''); setSuccess('');
    if (!form.title.trim()) { setError('Recipe title is required.'); return; }
    if (!form.intro.trim()) { setError('Intro text is required.'); return; }
    if (ingredients.filter(x => x.trim()).length === 0) { setError('Add at least one ingredient.'); return; }
    if (steps.filter(s => s.desc.trim()).length === 0) { setError('Add at least one step.'); return; }

    setSaving(true);
    const payload = {
      ...form,
      published: publishNow !== undefined ? publishNow : form.published,
      ingredients: ingredients.filter(x => x.trim()),
      steps: steps.filter(s => s.desc.trim()),
      tips: tips.filter(x => x.trim()),
    };

    try {
      let res;
      if (isEdit) {
        res = await fetch(`http://localhost:5000/api/admin/recipes/${editId}`, {
          method: 'PUT', headers: headers(), body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:5000/api/admin/recipes', {
          method: 'POST', headers: headers(), body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setSuccess(`Recipe ${isEdit ? 'updated' : 'created'} successfully!`);
      setTimeout(() => onSaved(), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="rf-loading">Loading recipe...</div>;

  return (
    <div className="recipe-form">
      {/* HEADER */}
      <div className="rf-header">
        <div>
          <h1>{isEdit ? '✏️ Edit Recipe' : '➕ New Recipe'}</h1>
          <p>{isEdit ? 'Update your recipe details below.' : 'Fill in the details to publish a new recipe.'}</p>
        </div>
        <button className="rf-cancel" onClick={onCancel}>← Back</button>
      </div>

      {error && <div className="rf-error">⚠️ {error}</div>}
      {success && <div className="rf-success">✅ {success}</div>}

      {/* BASIC INFO */}
      <div className="rf-card">
        <h2 className="rf-card__title">Basic Information</h2>

        <div className="rf-field">
          <label>Recipe Title *</label>
          <input type="text" placeholder="e.g. Creamy Tuscan Butter Pasta" value={form.title} onChange={e => set('title', e.target.value)} />
        </div>

        <div className="rf-field">
          <label>Short Description * <span className="rf-hint">(1–2 sentences shown in recipe cards)</span></label>
          <textarea rows={2} placeholder="A quick, flavourful pasta with sun-dried tomatoes and cream..." value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
        </div>

        <div className="rf-row">
          <div className="rf-field">
            <label>Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="rf-field">
            <label>Difficulty</label>
            <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
              {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="rf-field rf-field--emoji">
            <label>Emoji</label>
            <div className="emoji-picker">
              <span className="emoji-preview">{form.emoji}</span>
              <select value={form.emoji} onChange={e => set('emoji', e.target.value)}>
                {EMOJIS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="rf-row">
          <div className="rf-field">
            <label>Prep Time</label>
            <input type="text" placeholder="10 min" value={form.prepTime} onChange={e => set('prepTime', e.target.value)} />
          </div>
          <div className="rf-field">
            <label>Cook Time</label>
            <input type="text" placeholder="30 min" value={form.cookTime} onChange={e => set('cookTime', e.target.value)} />
          </div>
          <div className="rf-field">
            <label>Servings</label>
            <input type="text" placeholder="4 servings" value={form.servings} onChange={e => set('servings', e.target.value)} />
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div className="rf-card">
        <div className="rf-card__title-row">
          <h2 className="rf-card__title">Introduction / Story *</h2>
          <span className={`word-count ${wordCount >= 400 ? 'good' : wordCount >= 200 ? 'ok' : 'low'}`}>
            {wordCount} words {wordCount >= 400 ? '✅' : `(aim for 400–600)`}
          </span>
        </div>
        <p className="rf-hint" style={{ marginBottom: '0.8rem' }}>
          Write your personal story about this recipe — why you love it, where you first made it, tips woven into prose. This is what Google indexes and what readers connect with. Aim for 400–600 words.
        </p>
        <textarea
          className="rf-intro-area"
          rows={14}
          placeholder="I first made this dish on a rainy Tuesday evening when I had half a bag of sun-dried tomatoes and no plan for dinner. Thirty minutes later, I was sitting down to something that tasted far better than anything I had expected to cook that night..."
          value={form.intro}
          onChange={e => set('intro', e.target.value)}
        />
      </div>

      {/* INGREDIENTS */}
      <div className="rf-card">
        <h2 className="rf-card__title">Ingredients</h2>
        <p className="rf-hint" style={{ marginBottom: '0.8rem' }}>Include exact quantities (e.g. "400g spaghetti", "2 tablespoons olive oil")</p>
        <div className="rf-list">
          {ingredients.map((ing, i) => (
            <div key={i} className="rf-list-item">
              <span className="rf-list-num">{i + 1}</span>
              <input
                type="text"
                placeholder={`e.g. 400g spaghetti`}
                value={ing}
                onChange={e => updateIng(i, e.target.value)}
              />
              <button className="rf-remove" onClick={() => removeIng(i)} title="Remove">✕</button>
            </div>
          ))}
        </div>
        <button className="rf-add-btn" onClick={addIng}>+ Add Ingredient</button>
      </div>

      {/* STEPS */}
      <div className="rf-card">
        <h2 className="rf-card__title">Step-by-Step Instructions</h2>
        <p className="rf-hint" style={{ marginBottom: '0.8rem' }}>Each step needs a short title and detailed description (at least 2–3 sentences).</p>
        <div className="rf-steps-list">
          {steps.map((step, i) => (
            <div key={i} className="rf-step-item">
              <div className="rf-step-header">
                <div className="rf-step-num">{i + 1}</div>
                <input
                  type="text"
                  placeholder="Step title (e.g. Cook the pasta)"
                  value={step.title}
                  onChange={e => updateStep(i, 'title', e.target.value)}
                  className="rf-step-title-input"
                />
                <div className="rf-step-actions">
                  <button onClick={() => moveStep(i, -1)} disabled={i === 0} title="Move up">↑</button>
                  <button onClick={() => moveStep(i, 1)} disabled={i === steps.length - 1} title="Move down">↓</button>
                  <button onClick={() => removeStep(i)} className="rf-remove" title="Remove">✕</button>
                </div>
              </div>
              <textarea
                rows={3}
                placeholder="Describe this step in detail. Explain the why, not just the what. What should it look like? What should the cook watch out for?"
                value={step.desc}
                onChange={e => updateStep(i, 'desc', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="rf-add-btn" onClick={addStep}>+ Add Step</button>
      </div>

      {/* TIPS */}
      <div className="rf-card">
        <h2 className="rf-card__title">Tips & Notes</h2>
        <p className="rf-hint" style={{ marginBottom: '0.8rem' }}>Practical tips that help the reader succeed with this recipe.</p>
        <div className="rf-list">
          {tips.map((tip, i) => (
            <div key={i} className="rf-list-item">
              <span className="rf-list-num">💡</span>
              <input
                type="text"
                placeholder="e.g. Reserve pasta water before draining — it makes the sauce silky."
                value={tip}
                onChange={e => updateTip(i, e.target.value)}
              />
              <button className="rf-remove" onClick={() => removeTip(i)} title="Remove">✕</button>
            </div>
          ))}
        </div>
        <button className="rf-add-btn" onClick={addTip}>+ Add Tip</button>
      </div>

      {/* SAVE BUTTONS */}
      <div className="rf-actions">
        <button className="rf-btn-draft" onClick={() => handleSave(false)} disabled={saving}>
          {saving ? 'Saving...' : '💾 Save as Draft'}
        </button>
        <button className="rf-btn-publish" onClick={() => handleSave(true)} disabled={saving}>
          {saving ? 'Publishing...' : '🚀 Publish Now'}
        </button>
      </div>
    </div>
  );
}
