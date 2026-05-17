import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Adarsh — Spoon & Soul</title>
        <meta name="description" content="Meet Adarsh yadav, the home cook behind Spoon & Soul. Learn about her kitchen philosophy and why she started this recipe blog." />
      </Helmet>

      <div className="page-header">
        <h1>About Spoon & Soul</h1>
        <p>The kitchen, the story, and the cook behind the recipes</p>
      </div>

      <div className="about-body container">
        {/* Author intro card */}
        <div className="author-card">
          <div className="author-avatar">👩‍🍳</div>
          <div className="author-details">
            <h2>Adarsh yadav</h2>
            <p className="author-location">📍 Kathmandu, Nepal</p>
            <p>Home Cook · Recipe Developer · Food Blogger</p>
          </div>
        </div>

        <div className="prose">
          <h2>Hi, I'm Adarsh — welcome to my kitchen</h2>
          <p>
            Spoon & Soul was born in my small apartment kitchen in Kathmandu, where I started writing down recipes I was scared I'd forget. What started as notes to myself became a blog, and that blog became a community of thousands of home cooks who love food as much as I do.
          </p>
          <p>
            I'm not a trained chef. I never went to culinary school. I'm someone who grew up watching my mother and grandmother cook — learning to make dal bhat by watching, not measuring, and developing a love of food that has never left me. When I moved into my own place, I took those memories into my kitchen and started recreating and experimenting.
          </p>

          <h2>What You'll Find Here</h2>
          <p>Every recipe on this site is practical, tested, and designed for real kitchens with real budgets. Most ingredients come from your local grocery store. You'll find:</p>
          <ul>
            <li>Quick weeknight dinners on the table in 30–40 minutes</li>
            <li>Weekend baking projects when you finally have time to slow down</li>
            <li>Salads and bowls that are actually filling and exciting</li>
            <li>Desserts that look impressive but aren't difficult to make</li>
            <li>Kitchen tips that will genuinely change how you cook</li>
          </ul>

          <h2>My Promise to You</h2>
          <p>
            I test every recipe multiple times before it goes on this site. If it doesn't work in my kitchen, it doesn't get published. I always list substitutions where I can, because I know you don't always have every ingredient on hand.
          </p>
          <p>
            I also believe in being honest. If something took me three tries to get right, I'll tell you. If a substitution doesn't quite work, I'll say so. You deserve recipes you can actually trust.
          </p>

          <h2>Why I Started This Blog</h2>
          <p>
            I started this blog during a period when I was cooking alone a lot and realising how much joy it brought me — even if no one else was there to eat it. I started photographing my meals, writing down what I did, and sharing them online. The response surprised me. People from all over the world were making my recipes and sending me photos.
          </p>
          <p>
            That connection — between a recipe made in my little kitchen and a meal eaten in someone else's home across the world — is why I keep doing this.
          </p>

          <h2>Get in Touch</h2>
          <p>
            I love hearing from readers — whether it's a question about a recipe, a photo of something you made, or just a hello. Head to the{' '}
            <Link to="/contact">contact page</Link> and I'll get back to you personally. I read every message.
          </p>
        </div>
      </div>
    </>
  );
}
