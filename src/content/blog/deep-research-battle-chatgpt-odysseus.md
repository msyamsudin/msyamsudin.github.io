---
title: 'Battle of Deep Research: ChatGPT vs Odysseus'
description: 'ChatGPT vs Odysseus (Gemma 4) vs Odysseus (Gemma 4) + Enhanced Prompt'
pubDate: 'Jun 06 2026'
heroImage: '../../assets/blog-placeholder-5.jpg'
---

<style>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

/* Hide Astro's BlogPost layout defaults */
.hero-image {
  display: none !important;
}
.prose > .title {
  display: none !important;
}
.prose {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
}

/* Ensure global reset doesn't break external links or text sizes */
.adro-dsi-wrapper p {
  color: var(--ink);
  font-family: 'DM Sans', sans-serif;
}
.adro-dsi-wrapper h1,
.adro-dsi-wrapper h2,
.adro-dsi-wrapper h3,
.adro-dsi-wrapper h4,
.adro-dsi-wrapper h5,
.adro-dsi-wrapper h6 {
  color: inherit;
}
.adro-dsi-wrapper a {
  color: inherit;
}
.adro-dsi-wrapper a:hover {
  color: inherit;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.adro-dsi-wrapper {
  --chatgpt: #6AAEFF;
  --chatgpt-light: rgba(106, 174, 255, 0.1);
  --chatgpt-mid: #4D8FF5;
  --odyssey: #B09FD6;
  --odyssey-light: rgba(176, 159, 214, 0.1);
  --enhanced: #5DCCA0;
  --enhanced-light: rgba(93, 204, 160, 0.1);
  --ink: #f5f5f5;
  --ink2: #e0e0e0;
  --muted: #a0a0a0;
  --faint: #4a4a4d;
  --border: rgba(255, 255, 255, 0.08);
  --bg: #09090b; /* Blog dark background */
  --white: rgba(255, 255, 255, 0.03); /* Dark glassmorphic card bg */
  --warn: #FAC775;
  --danger: #E25C5C;
  --accent: #E8E200;
}

.adro-dsi-wrapper { font-size: 16px; scroll-behavior: smooth; }
.adro-dsi-wrapper {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.7;
  overflow-x: hidden;
}

/* ─── MASTHEAD ─── */
.masthead {
  background: #09090b;
  color: var(--white);
  padding: 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}
.masthead-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 72px 40px 60px;
  position: relative;
  z-index: 2;
}
.category-tag {
  display: inline-block;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(232,226,0,0.08);
  border: 1px solid rgba(232,226,0,0.2);
  padding: 5px 14px;
  border-radius: 2px;
  margin-bottom: 28px;
}
.masthead h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  color: #f5f5f5;
}
.masthead h1 em {
  font-style: italic;
  color: var(--accent);
}
.masthead-sub {
  font-size: 18px;
  color: rgba(255,255,255,0.7);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 300;
}
.masthead-meta {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.meta-item {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.08em;
}
.meta-item strong {
  display: block;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
  margin-bottom: 2px;
  letter-spacing: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
}
.masthead-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(26,107,240,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(123,94,167,0.08) 0%, transparent 50%);
  pointer-events: none;
}
.masthead-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

/* ─── LAYOUT ─── */
.article-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ─── VERDICT BANNER ─── */
.verdict-banner {
  background: #0d0d11;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--border);
}
.verdict-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}
.verdict-cell {
  padding: 16px 24px;
  text-align: center;
  position: relative;
}
.verdict-cell + .verdict-cell::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background: rgba(255,255,255,0.08);
}
.verdict-platform {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.verdict-score {
  font-family: 'Playfair Display', serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 6px;
}
.verdict-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
}
.vc-chatgpt .verdict-platform { color: #6AAEFF; }
.vc-chatgpt .verdict-score { color: #6AAEFF; }
.vc-default .verdict-platform { color: #B09FD6; }
.vc-default .verdict-score { color: #B09FD6; }
.vc-enhanced .verdict-platform { color: #5DCCA0; }
.vc-enhanced .verdict-score { color: #5DCCA0; }

/* ─── SECTIONS ─── */
section { margin: 64px 0; }
.section-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 12px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #f5f5f5;
  letter-spacing: -0.01em;
}
.section-lead {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.75;
  max-width: 680px;
  margin-bottom: 36px;
}

/* ─── CONTESTANT CARDS ─── */
.contestant-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
.contestant-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--white);
  display: flex;
  flex-direction: column;
}
.cc-header {
  padding: 20px 20px 14px;
  border-bottom: 1px solid var(--border);
}
.cc-badge {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 2px;
  display: inline-block;
  margin-bottom: 10px;
}
.cc-chatgpt .cc-badge { background: var(--chatgpt-light); color: var(--chatgpt); }
.cc-odyssey .cc-badge { background: var(--odyssey-light); color: var(--odyssey); }
.cc-enhanced .cc-badge { background: var(--enhanced-light); color: var(--enhanced); }
.cc-name {
  font-size: 14px;
  font-weight: 600;
  color: #f5f5f5;
  margin-bottom: 4px;
}
.cc-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
.cc-stats {
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}
.cc-link {
  display: block;
  text-align: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--border);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none !important;
  transition: all 0.2s ease;
}
.cc-link:hover {
  background: rgba(255, 255, 255, 0.06);
}
.cc-chatgpt .cc-link { color: var(--chatgpt) !important; }
.cc-odyssey .cc-link { color: var(--odyssey) !important; }
.cc-enhanced .cc-link { color: var(--enhanced) !important; }
.cc-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.cc-stat-label { color: var(--muted); }
.cc-stat-val { font-family: 'DM Mono', monospace; font-weight: 500; color: #f5f5f5; }

/* ─── SCORE MATRIX ─── */
.score-matrix {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.sm-header {
  display: grid;
  grid-template-columns: 1fr 120px 120px 120px;
  background: #0f0f13;
  color: #f5f5f5;
}
.sm-h-cell {
  padding: 14px 20px;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sm-h-cell:not(:first-child) {
  text-align: center;
  border-left: 1px solid rgba(255,255,255,0.08);
}
.sm-row {
  display: grid;
  grid-template-columns: 1fr 120px 120px 120px;
  border-top: 1px solid var(--border);
}
.sm-row:hover { background: rgba(255,255,255,0.015); }
.sm-label {
  padding: 14px 20px;
  font-size: 13px;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sm-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sm-cell {
  padding: 12px 20px;
  border-left: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
}
.sm-score {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}
.sm-bar {
  width: 60px;
  height: 3px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.sm-fill { height: 3px; border-radius: 2px; }
.col-chatgpt .sm-score { color: var(--chatgpt); }
.col-chatgpt .sm-fill { background: var(--chatgpt); }
.col-default .sm-score { color: var(--odyssey); }
.col-default .sm-fill { background: var(--odyssey); }
.col-enhanced .sm-score { color: var(--enhanced); }
.col-enhanced .sm-fill { background: var(--enhanced); }
.sm-winner {
  background: rgba(16, 185, 129, 0.05);
}

/* ─── PROMPT IMPACT ─── */
.impact-box {
  background: linear-gradient(135deg, #0d0d11 0%, #171725 100%);
  border-radius: 20px;
  padding: 48px 40px;
  color: #f5f5f5;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}
.impact-box::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(93,204,160,0.12) 0%, transparent 65%);
  pointer-events: none;
}
.impact-title {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #f5f5f5;
}
.impact-sub {
  font-size: 14px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 36px;
  line-height: 1.6;
}
.impact-deltas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.delta-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 20px;
}
.delta-dim { font-size: 11px; color: rgba(255,255,255,0.45); margin-bottom: 8px; font-family: 'DM Mono', monospace; }
.delta-val { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; line-height: 1; }
.delta-pos { color: #5DCCA0; }
.delta-zero { color: rgba(255,255,255,0.4); }
.delta-note { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 6px; line-height: 1.4; }
.impact-footer {
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  padding: 16px 20px;
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  border-left: 3px solid #5DCCA0;
}
.impact-footer strong { color: #5DCCA0; font-weight: 500; }

/* ─── DEEP DIVE CARDS ─── */
.deep-dive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.dd-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--white);
}
.dd-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}
.dd-link {
  margin-left: auto;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none !important;
  transition: all 0.2s ease;
}
.dd-link:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}
.ddc-chatgpt ~ .dd-link { color: var(--chatgpt) !important; border-color: rgba(106, 174, 255, 0.2); }
.ddc-odyssey ~ .dd-link { color: var(--odyssey) !important; border-color: rgba(176, 159, 214, 0.2); }
.ddc-enhanced ~ .dd-link { color: var(--enhanced) !important; border-color: rgba(93, 204, 160, 0.2); }
.dd-score-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
  border: 2px solid;
}
.ddc-chatgpt { border-color: var(--chatgpt); color: var(--chatgpt); background: var(--chatgpt-light); }
.ddc-odyssey { border-color: var(--odyssey); color: var(--odyssey); background: var(--odyssey-light); }
.ddc-enhanced { border-color: var(--enhanced); color: var(--enhanced); background: var(--enhanced-light); }
.dd-platform { font-size: 11px; font-family: 'DM Mono', monospace; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
.dd-name { font-size: 16px; font-weight: 600; color: #f5f5f5; }
.dd-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.dd-col {
  padding: 20px 24px;
}
.dd-col + .dd-col {
  border-left: 1px solid var(--border);
}
.dd-col-title {
  font-size: 11px;
  font-family: 'DM Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.pro-title { color: #5DCCA0; }
.con-title { color: #E25C5C; }
.dd-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dd-list li {
  font-size: 13px;
  line-height: 1.5;
  color: #e0e0e0;
  display: flex;
  gap: 8px;
}
.dd-list li::before {
  flex-shrink: 0;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
}
.pro-list li::before { content: '✓'; background: var(--enhanced-light); color: var(--enhanced); }
.con-list li::before { content: '✗'; background: rgba(226, 92, 92, 0.15); color: #E25C5C; }
.dd-killer-fact {
  margin: 0 24px 20px;
  background: rgba(255, 255, 255, 0.015);
  border-radius: 8px;
  border-left: 3px solid;
  padding: 12px 16px;
  font-size: 13px;
  color: #e0e0e0;
  line-height: 1.6;
}
.kf-chatgpt { border-color: var(--chatgpt); }
.kf-odyssey { border-color: var(--odyssey); }
.kf-enhanced { border-color: var(--enhanced); }

/* ─── KEY FINDINGS ─── */
.findings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.finding-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px 22px;
}
.finding-num {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}
.finding-text {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}
.finding-text strong { color: #f5f5f5; font-weight: 500; }

/* ─── SENSITIVITY TABLE ─── */
.sens-wrap {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.sens-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.sens-table th {
  background: #17171d;
  color: rgba(255,255,255,0.85);
  padding: 12px 16px;
  font-size: 11px;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.08em;
  font-weight: 400;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.sens-table th:first-child { text-align: left; }
.sens-table td {
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
}
.sens-table td:first-child {
  text-align: left;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
}
.cell-neg-heavy { background: rgba(226, 92, 92, 0.15); color: #FF8F8F; font-weight: 500; }
.cell-neg-mid { background: rgba(212, 130, 10, 0.15); color: #FAC775; }
.cell-neg-light { background: rgba(212, 130, 10, 0.08); color: #FAC775; }
.cell-neutral { color: var(--muted); }
.cell-pos { background: rgba(16, 185, 129, 0.15); color: #5DCCA0; font-weight: 500; }

/* ─── TIMELINE ─── */
.timeline {
  position: relative;
  padding-left: 28px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--border);
}
.tl-item {
  position: relative;
  padding-bottom: 28px;
}
.tl-item:last-child { padding-bottom: 0; }
.tl-dot {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
  background: var(--bg);
}
.tl-date {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--faint);
  margin-bottom: 4px;
}
.tl-event { font-size: 14px; font-weight: 500; color: #f5f5f5; margin-bottom: 4px; }
.tl-reaction {
  display: inline-block;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 2px;
}
.react-neg { background: rgba(226, 92, 92, 0.12); color: #FF8F8F; }
.react-pos { background: rgba(16, 185, 129, 0.12); color: #5DCCA0; }
.react-neu { background: rgba(255, 255, 255, 0.08); color: var(--muted); }

/* ─── CONCLUSION ─── */
.conclusion-box {
  background: #0d0d11;
  border-radius: 20px;
  padding: 48px 40px;
  color: #f5f5f5;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}
.conclusion-box::after {
  content: '"';
  position: absolute;
  right: 32px;
  top: -20px;
  font-family: 'Playfair Display', serif;
  font-size: 180px;
  color: rgba(255,255,255,0.03);
  line-height: 1;
  pointer-events: none;
}
.conclusion-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
.conclusion-text {
  font-size: 15px;
  color: rgba(255,255,255,0.65);
  line-height: 1.8;
  margin-bottom: 14px;
  max-width: 700px;
}
.conclusion-text strong { color: #ffffff; font-weight: 500; }
.conclusion-pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 28px;
}
.cpill {
  font-size: 12px;
  padding: 6px 16px;
  border-radius: 100px;
  border: 1px solid;
  font-family: 'DM Sans', sans-serif;
}
.cpill-chatgpt { border-color: rgba(106,174,255,0.3); color: #6AAEFF; background: rgba(106,174,255,0.06); }
.cpill-enhanced { border-color: rgba(93,204,160,0.3); color: #5DCCA0; background: rgba(93,204,160,0.06); }
.cpill-warn { border-color: rgba(250,199,117,0.3); color: #FAC775; background: rgba(250,199,117,0.06); }

/* ─── DIVIDER ─── */
.divider {
  height: 1px;
  background: var(--border);
  margin: 0;
}

/* ─── FOOTER ─── */
.article-footer {
  background: #09090b;
  color: rgba(255,255,255,0.35);
  text-align: center;
  padding: 32px 40px;
  font-size: 12px;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  border-top: 1px solid var(--border);
}

/* ─── CALLOUT ─── */
.callout {
  border-left: 3px solid;
  padding: 16px 20px;
  border-radius: 0 8px 8px 0;
  margin: 24px 0;
  font-size: 14px;
  line-height: 1.65;
}
.callout-warn { border-color: var(--warn); background: rgba(212, 130, 10, 0.08); color: #FAC775; }
.callout-info { border-color: var(--chatgpt); background: rgba(106, 174, 255, 0.08); color: #6AAEFF; }

/* ─── CHART CANVAS ─── */
.chart-wrap {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px;
  position: relative;
}
.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: #f5f5f5;
  margin-bottom: 4px;
}
.chart-sub { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
.chart-legend {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}
.legend-sq {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

@media (max-width: 700px) {
  .masthead-inner, .article-body, .verdict-inner { padding-left: 20px; padding-right: 20px; }
  .contestant-grid, .impact-deltas, .dd-body, .findings-grid, .two-col { grid-template-columns: 1fr; }
  .verdict-inner { grid-template-columns: 1fr; }
  
  /* Make score matrix grid horizontal scrolling on mobile */
  .sm-header, .sm-row { 
    grid-template-columns: minmax(200px, 1fr) 90px 90px 90px; 
    width: 100%;
    min-width: 470px;
  }
  
  /* Make sensitivity table scrollable with minimum width */
  .sens-table {
    min-width: 580px;
  }
  
  /* Clean up stacked grid dividers */
  .dd-col + .dd-col {
    border-left: none;
    border-top: 1px solid var(--border);
  }
  .verdict-cell + .verdict-cell::before {
    content: none;
  }
  .verdict-cell + .verdict-cell {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  /* Optimize paddings for smaller screens */
  .conclusion-box, .impact-box {
    padding: 32px 20px;
  }
}


/* Scoped specificity overrides to prevent .adro-dsi-wrapper p from forcing var(--ink) */
.adro-dsi-wrapper .masthead-sub { color: rgba(255, 255, 255, 0.7); }
.adro-dsi-wrapper .section-lead { color: var(--muted); }
.adro-dsi-wrapper .finding-text { color: var(--muted); }
.adro-dsi-wrapper .conclusion-text { color: rgba(255, 255, 255, 0.65); }
.adro-dsi-wrapper .cc-desc { color: var(--muted); }
.adro-dsi-wrapper .dd-platform { color: var(--muted); }
.adro-dsi-wrapper .chart-sub { color: var(--muted); }
.adro-dsi-wrapper .legend-item { color: var(--muted); }
.adro-dsi-wrapper .cc-stat-label { color: var(--muted); }
.adro-dsi-wrapper .sm-label { color: var(--ink2); }
.adro-dsi-wrapper .dd-list li { color: var(--ink2); }
.adro-dsi-wrapper .dd-killer-fact { color: var(--ink2); }

</style>

<div class="adro-dsi-wrapper">
<!-- MASTHEAD -->
<header class="masthead">
<div class="masthead-bg"></div>
<div class="masthead-grid"></div>
<div class="masthead-inner">
<div class="category-tag">Analisis · Deep Research · Ekuitas Indonesia</div>
<h1>Battle of<br><em>Deep Research</em></h1>
<p class="masthead-sub">ChatGPT vs Odysseus (Gemma 4) vs Odysseus + Enhanced Prompt</p>
<div class="masthead-meta">
<div class="meta-item"><strong>Topik Penelitian</strong>Dampak PP No. 24/2026 (DSI) terhadap ADRO</div>
<div class="meta-item"><strong>Tanggal Uji</strong>6 Juni 2026</div>
<div class="meta-item"><strong>Jumlah Sistem</strong>3 (1 OpenAI, 2 Odysseus)</div>
<div class="meta-item"><strong>Model Odysseus</strong>Gemma 4 31B Cloud + SearxNG</div>
</div>
</div>
</header>
<!-- VERDICT BANNER -->
<div class="verdict-banner">
<div class="verdict-inner">
<div class="verdict-cell vc-chatgpt">
<div class="verdict-platform">ChatGPT Deep Research</div>
<div class="verdict-score">9.2</div>
<div class="verdict-label">dari 10 — Kelas Institusi</div>
</div>
<div class="verdict-cell vc-enhanced">
<div class="verdict-platform">Odysseus Enhanced</div>
<div class="verdict-score">8.1</div>
<div class="verdict-label">dari 10 — Prompt Engineering Bekerja</div>
</div>
<div class="verdict-cell vc-default">
<div class="verdict-platform">Odysseus Default</div>
<div class="verdict-score">6.3</div>
<div class="verdict-label">dari 10 — Kerangka Bagus, Data Lemah</div>
</div>
</div>
</div>
<div class="divider"></div>
<!-- BODY -->
<div class="article-body">
<!-- SECTION 1: KONTEKS -->
<section>
<div class="section-eyebrow">01 · Konteks Uji</div>
<h2 class="section-title">Tiga sistem, satu pertanyaan yang sama</h2>
<p class="section-lead">Pada 6 Juni 2026 — sehari setelah Danantara menerbitkan siaran pers resmi tentang implementasi DSI — ketiga sistem diuji dengan pertanyaan identik tentang dampak regulasi ekspor satu pintu terhadap saham ADRO/Alamtri Resources.</p>
<div class="contestant-grid">
<div class="contestant-card cc-chatgpt">
<div class="cc-header">
<div class="cc-badge">ChatGPT</div>
<div class="cc-name">Deep Research — OpenAI</div>
<div class="cc-desc">Laporan bahasa Indonesia, berbasis annual report primer ADRO FY2025 dan sumber resmi Setneg/Danantara.</div>
</div>
<div class="cc-stats">
<div class="cc-stat"><span class="cc-stat-label">Output</span><span class="cc-stat-val">~30K karakter</span></div>
<div class="cc-stat"><span class="cc-stat-label">Bahasa</span><span class="cc-stat-val">Indonesia</span></div>
<div class="cc-stat"><span class="cc-stat-label">Data primer</span><span class="cc-stat-val">Annual Report FY2025</span></div>
<div class="cc-stat"><span class="cc-stat-label">Skenario</span><span class="cc-stat-val">Base / Down / Up + sensitivitas</span></div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/chatgpt-DSI.md" target="_blank" class="cc-link">Lihat Sample Report</a>
</div>
<div class="contestant-card cc-odyssey">
<div class="cc-header">
<div class="cc-badge">Odysseus Default</div>
<div class="cc-name">Gemma 4 31B + SearxNG</div>
<div class="cc-desc">Laporan bahasa Inggris. 6 ronde, 16 query, 56 URL. Prompt standar tanpa instruksi khusus.</div>
</div>
<div class="cc-stats">
<div class="cc-stat"><span class="cc-stat-label">Durasi</span><span class="cc-stat-val">457.2 detik</span></div>
<div class="cc-stat"><span class="cc-stat-label">URL dianalisis</span><span class="cc-stat-val">56</span></div>
<div class="cc-stat"><span class="cc-stat-label">Sumber dikutip</span><span class="cc-stat-val">28</span></div>
<div class="cc-stat"><span class="cc-stat-label">Skenario</span><span class="cc-stat-val">A (Pass-Through) / B (State Cut) / C (Hilirisasi)</span></div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/Default-Gemma4-Research-Report.html" target="_blank" class="cc-link">Lihat Sample Report</a>
</div>
<div class="contestant-card cc-enhanced">
<div class="cc-header">
<div class="cc-badge">Odysseus Enhanced</div>
<div class="cc-name">Gemma 4 31B + Prompt Ditingkatkan</div>
<div class="cc-desc">Model & alat identik dengan Default. Prompt diperkaya dengan instruksi analitik formal. Bahasa Indonesia.</div>
</div>
<div class="cc-stats">
<div class="cc-stat"><span class="cc-stat-label">Durasi</span><span class="cc-stat-val">381.8 detik</span></div>
<div class="cc-stat"><span class="cc-stat-label">URL dianalisis</span><span class="cc-stat-val">51</span></div>
<div class="cc-stat"><span class="cc-stat-label">Sumber dikutip</span><span class="cc-stat-val">35</span></div>
<div class="cc-stat"><span class="cc-stat-label">Skenario</span><span class="cc-stat-val">3 kanal eksposur + tabel sensitivitas EBITDA</span></div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/Enhance-Laporan-Analisis-Ekuitas.html" target="_blank" class="cc-link">Lihat Sample Report</a>
</div>
</div>
</section>
<!-- SECTION 2: SCORECARD -->
<section>
<div class="section-eyebrow">02 · Scorecard</div>
<h2 class="section-title">Penilaian 8 dimensi</h2>
<p class="section-lead">Setiap dimensi dinilai 1–10. Bobot sama. Penghijau menandakan pemenang dimensi.</p>
<div class="chart-legend" style="margin-bottom:16px">
<div class="legend-item"><div class="legend-sq" style="background:var(--chatgpt)"></div>ChatGPT</div>
<div class="legend-item"><div class="legend-sq" style="background:var(--odyssey)"></div>Odysseus Default</div>
<div class="legend-item"><div class="legend-sq" style="background:var(--enhanced)"></div>Odysseus Enhanced</div>
</div>
<div class="score-matrix">
<div class="sm-header">
<div class="sm-h-cell">Dimensi Penilaian</div>
<div class="sm-h-cell">ChatGPT</div>
<div class="sm-h-cell">Default</div>
<div class="sm-h-cell">Enhanced</div>
</div>
<!-- Row 1 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#FFD166"></div>Akurasi & verifikasi data</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.5</div><div class="sm-bar"><div class="sm-fill" style="width:95%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">6.0</div><div class="sm-bar"><div class="sm-fill" style="width:60%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">7.5</div><div class="sm-bar"><div class="sm-fill" style="width:75%"></div></div></div>
</div>
<!-- Row 2 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#06D6A0"></div>Kedalaman analisis keuangan</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">10.0</div><div class="sm-bar"><div class="sm-fill" style="width:100%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">5.5</div><div class="sm-bar"><div class="sm-fill" style="width:55%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">8.0</div><div class="sm-bar"><div class="sm-fill" style="width:80%"></div></div></div>
</div>
<!-- Row 3 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#118AB2"></div>Struktur & organisasi laporan</div>
<div class="sm-cell col-chatgpt"><div class="sm-score">8.5</div><div class="sm-bar"><div class="sm-fill" style="width:85%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">6.5</div><div class="sm-bar"><div class="sm-fill" style="width:65%"></div></div></div>
<div class="sm-cell col-enhanced sm-winner"><div class="sm-score">9.0</div><div class="sm-bar"><div class="sm-fill" style="width:90%"></div></div></div>
</div>
<!-- Row 4 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#EF476F"></div>Kelengkapan cakupan isu</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.0</div><div class="sm-bar"><div class="sm-fill" style="width:90%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">7.5</div><div class="sm-bar"><div class="sm-fill" style="width:75%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">8.5</div><div class="sm-bar"><div class="sm-fill" style="width:85%"></div></div></div>
</div>
<!-- Row 5 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#8338EC"></div>Kualitas & transparansi sitasi</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.0</div><div class="sm-bar"><div class="sm-fill" style="width:90%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">6.0</div><div class="sm-bar"><div class="sm-fill" style="width:60%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">7.0</div><div class="sm-bar"><div class="sm-fill" style="width:70%"></div></div></div>
</div>
<!-- Row 6 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#FB5607"></div>Reasoning & orisinalitas insight</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.0</div><div class="sm-bar"><div class="sm-fill" style="width:90%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">6.5</div><div class="sm-bar"><div class="sm-fill" style="width:65%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">8.0</div><div class="sm-bar"><div class="sm-fill" style="width:80%"></div></div></div>
</div>
<!-- Row 7 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#FFBA08"></div>Epistemic humility</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.5</div><div class="sm-bar"><div class="sm-fill" style="width:95%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">5.5</div><div class="sm-bar"><div class="sm-fill" style="width:55%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">8.5</div><div class="sm-bar"><div class="sm-fill" style="width:85%"></div></div></div>
</div>
<!-- Row 8 -->
<div class="sm-row">
<div class="sm-label"><div class="sm-dot" style="background:#3A86FF"></div>Nilai praktis bagi investor</div>
<div class="sm-cell col-chatgpt sm-winner"><div class="sm-score">9.5</div><div class="sm-bar"><div class="sm-fill" style="width:95%"></div></div></div>
<div class="sm-cell col-default"><div class="sm-score">6.5</div><div class="sm-bar"><div class="sm-fill" style="width:65%"></div></div></div>
<div class="sm-cell col-enhanced"><div class="sm-score">8.0</div><div class="sm-bar"><div class="sm-fill" style="width:80%"></div></div></div>
</div>
</div>
<!-- Radar chart -->
<div class="chart-wrap" style="margin-top:20px">
<div class="chart-title">Distribusi skor per dimensi</div>
<div class="chart-sub">Visualisasi radar: semakin luar titik, semakin tinggi skor (skala 5–10)</div>
<div class="chart-legend">
<div class="legend-item"><div class="legend-sq" style="background:var(--chatgpt)"></div>ChatGPT (avg 9.25)</div>
<div class="legend-item"><div class="legend-sq" style="background:var(--odyssey)"></div>Odysseus Default (avg 6.25)</div>
<div class="legend-item"><div class="legend-sq" style="background:var(--enhanced)"></div>Odysseus Enhanced (avg 8.06)</div>
</div>
<div style="position:relative;height:360px;">
<canvas id="radarChart" role="img" aria-label="Radar chart perbandingan skor 8 dimensi untuk tiga sistem deep research. ChatGPT unggul di hampir semua dimensi dengan rata-rata 9.25, diikuti Odysseus Enhanced 8.06, dan Default 6.25.">Radar chart menunjukkan ChatGPT memimpin di 7 dari 8 dimensi, Odysseus Enhanced unggul di Struktur laporan, Default tertinggal di semua dimensi.</canvas>
</div>
</div>
</section>
<!-- SECTION 3: PROMPT ENGINEERING IMPACT -->
<section>
<div class="section-eyebrow">03 · Temuan Utama</div>
<h2 class="section-title">Prompt engineering berdampak nyata</h2>
<p class="section-lead">Odysseus Default dan Enhanced menggunakan model, infrastruktur, dan alat pencarian yang <em>benar-benar identik</em>. Satu-satunya variabel: kualitas instruksi prompt.</p>
<div class="impact-box">
<div class="impact-title">Perubahan Default → Enhanced</div>
<div class="impact-sub">Model, alat, dan budget pencarian sama persis. Hanya instruksi prompt yang berbeda. Hasilnya:</div>
<div class="impact-deltas">
<div class="delta-card">
<div class="delta-dim">Epistemic Humility</div>
<div class="delta-val delta-pos">+3.0</div>
<div class="delta-note">Dari 5.5 ke 8.5. Laporan Enhanced secara eksplisit mengakui keterbatasan formula harga DSI yang belum dipublikasi.</div>
</div>
<div class="delta-card">
<div class="delta-dim">Struktur Laporan</div>
<div class="delta-val delta-pos">+2.5</div>
<div class="delta-note">Dari 6.5 ke 9.0. Enhanced menghasilkan 7 bagian formal dengan numbering, pemetaan kanal 3-lapis, dan tabel LaTeX.</div>
</div>
<div class="delta-card">
<div class="delta-dim">Analisis Keuangan</div>
<div class="delta-val delta-pos">+2.5</div>
<div class="delta-note">Dari 5.5 ke 8.0. Enhanced membangun tabel sensitivitas EBITDA, meski masih berbasis estimasi bukan angka diaudit.</div>
</div>
<div class="delta-card">
<div class="delta-dim">Reasoning & Insight</div>
<div class="delta-val delta-pos">+1.5</div>
<div class="delta-note">Enhanced mengidentifikasi 3 kanal eksposur yang berbeda (metalurgi, portofolio AADI, rantai pasok mineral strategis).</div>
</div>
<div class="delta-card">
<div class="delta-dim">Nilai Praktis Investor</div>
<div class="delta-val delta-pos">+1.5</div>
<div class="delta-note">Tabel trigger pemantauan Enhanced jauh lebih spesifik dan actionable dibanding rekomendasi umum Default.</div>
</div>
<div class="delta-card">
<div class="delta-dim">Akurasi Data</div>
<div class="delta-val delta-pos">+1.5</div>
<div class="delta-note">Enhanced mengidentifikasi dengan benar nama emiten (Alamtri, bukan Adaro Energy) dan struktur pasca spin-off AADI.</div>
</div>
</div>
<div class="impact-footer">
<strong>Rata-rata peningkatan: +1.8 poin</strong> di semua 8 dimensi. Peningkatan terbesar terjadi di dimensi yang paling bisa dikontrol lewat instruksi: cara berpikir, struktur laporan, dan transparansi ketidakpastian. Namun ada <strong>ceiling yang tidak bisa ditembus prompt</strong>: tanpa akses ke dokumen PDF primer (annual report, teks PP), gap data terhadap ChatGPT tetap ada.
</div>
</div>
</section>
<!-- SECTION 4: DEEP DIVE PER SISTEM -->
<section>
<div class="section-eyebrow">04 · Analisis Per Sistem</div>
<h2 class="section-title">Kekuatan dan kelemahan masing-masing</h2>
<div class="deep-dive-grid">
<!-- ChatGPT -->
<div class="dd-card">
<div class="dd-header">
<div class="dd-score-circle ddc-chatgpt">9.2</div>
<div>
<div class="dd-platform">OpenAI · ChatGPT</div>
<div class="dd-name">Deep Research — Pemenang Keseluruhan</div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/chatgpt-DSI.md" target="_blank" class="dd-link">Buka Sample Report</a>
</div>
<div class="dd-killer-fact kf-chatgpt">
Satu-satunya sistem yang masuk ke Annual Report ADRO FY2025 dan mengekstrak angka yang diaudit: revenue US$1,873.5 juta, EBITDA US$799 juta, blok ekspor US$664.4 juta, saldo FVOCI US$497.5 juta. Model skenarionya dibangun dari data ini.
</div>
<div class="dd-body">
<div class="dd-col">
<div class="dd-col-title pro-title">Keunggulan</div>
<ul class="dd-list pro-list">
<li>Mengakses dan mensintesis PDF annual report ADRO FY2025 secara langsung — bukan kutipan media</li>
<li>Model skenario (Base/Down/Up) berbasis angka diaudit, bukan estimasi</li>
<li>Menjelaskan dengan tepat implikasi spin-off AADI Des 2024 terhadap profil risiko ADRO</li>
<li>Tabel sensitivitas EBITDA dua dimensi (harga × volume) yang kuantitatif</li>
<li>Secara eksplisit membedakan "inferensi saya" dari "pernyataan resmi manajemen"</li>
<li>Timeline market reaction harian dengan harga penutupan dan volume aktual</li>
</ul>
</div>
<div class="dd-col">
<div class="dd-col-title con-title">Kelemahan</div>
<ul class="dd-list con-list">
<li>Format sitasi inline (citeturn33search4) sulit diverifikasi pembaca biasa</li>
<li>Tidak ada skenario "hilirisasi" sebagai strategi long-term ADRO, yang diulas Odysseus Default</li>
<li>Panjang laporan (30K+ karakter) bisa melelahkan untuk eksekutif yang butuh summary cepat</li>
</ul>
</div>
</div>
</div>
<!-- Odysseus Default -->
<div class="dd-card">
<div class="dd-header">
<div class="dd-score-circle ddc-odyssey">6.3</div>
<div>
<div class="dd-platform">Odysseus · Gemma 4 31B · Default Prompt</div>
<div class="dd-name">Kerangka Bagus, Fondasi Data Rapuh</div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/Default-Gemma4-Research-Report.html" target="_blank" class="dd-link">Buka Sample Report</a>
</div>
<div class="dd-killer-fact kf-odyssey">
Laporan menyebut ADRO sebagai "one of the nation's largest coal producers" — mengabaikan fakta material bahwa bisnis batu bara termal sudah di-spin-off ke AADI pada Desember 2024. Ini kesalahan yang tidak bisa dimaafkan dalam analisis ekuitas.
</div>
<div class="dd-body">
<div class="dd-col">
<div class="dd-col-title pro-title">Keunggulan</div>
<ul class="dd-list pro-list">
<li>Framing 3 skenario A/B/C (Pass-Through / State Cut / Hilirisasi) adalah kontribusi konseptual terbaik — tidak ada di laporan lain</li>
<li>Tabel perbandingan dampak antar skenario ringkas dan informatif</li>
<li>Membahas aspek "Strategic Paralysis" dan dampak terhadap keputusan korporasi AADI</li>
<li>Menyebut perbandingan ADRO vs BYAN/HRUM dalam konteks koreksi harga saham</li>
</ul>
</div>
<div class="dd-col">
<div class="dd-col-title con-title">Kelemahan</div>
<ul class="dd-list con-list">
<li>Tidak ada satu pun angka dari laporan keuangan resmi ADRO — semua dari media</li>
<li>Mengidentifikasi entitas dengan keliru: masih menyebut "PT Adaro Energy Indonesia Tbk"</li>
<li>Dua sitasi mengarah ke Kamus KBBI dan Wiktionary — tidak relevan untuk analisis ekuitas</li>
<li>Laporan dalam bahasa Inggris untuk konteks pasar Indonesia — tidak optimal</li>
<li>Tidak mengakui gap informasi pada formula teknis harga DSI</li>
</ul>
</div>
</div>
</div>
<!-- Odysseus Enhanced -->
<div class="dd-card">
<div class="dd-header">
<div class="dd-score-circle ddc-enhanced">8.1</div>
<div>
<div class="dd-platform">Odysseus · Gemma 4 31B · Enhanced Prompt</div>
<div class="dd-name">Bukti Prompt Engineering Bekerja</div>
</div>
<a href="/samples/deep-research-battle-chatgpt-odysseus/Enhance-Laporan-Analisis-Ekuitas.html" target="_blank" class="dd-link">Buka Sample Report</a>
</div>
<div class="dd-killer-fact kf-enhanced">
Menyebut implementasi penuh DSI pada "1 September 2026" — berbeda dari sumber Reuters dan ChatGPT yang menyebut "1 Januari 2027". Inkonsistensi tanggal ini kecil tapi penting bagi investor yang memodelkan timeline risiko.
</div>
<div class="dd-body">
<div class="dd-col">
<div class="dd-col-title pro-title">Keunggulan</div>
<ul class="dd-list pro-list">
<li>Mengidentifikasi dengan benar entitas sebagai PT Alamtri Resources Indonesia Tbk</li>
<li>Pemetaan 3 kanal eksposur (metalurgi langsung, portofolio AADI, rantai pasok mineral) — kerangka analitik terbaik dari semua laporan</li>
<li>Struktur 7 bagian formal yang kohesif dan mudah dinavigasi</li>
<li>Tabel trigger pemantauan dengan sinyal positif/negatif spesifik per katalis</li>
<li>Secara eksplisit mencantumkan 3 "pertanyaan kunci untuk valuasi" yang belum terjawab</li>
</ul>
</div>
<div class="dd-col">
<div class="dd-col-title con-title">Kelemahan</div>
<ul class="dd-list con-list">
<li>Tabel sensitivitas EBITDA berbasis estimasi persentase, bukan angka dolar dari data diaudit</li>
<li>Inkonsistensi tanggal implementasi penuh (Sept 2026 vs Jan 2027)</li>
<li>Masih bergantung pada media sekunder, bukan PDF laporan keuangan resmi</li>
<li>Horizon rating "12–24 bulan" terlalu panjang untuk memodelkan risiko regulasi yang gerakannya mingguan</li>
</ul>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 5: FINANCIAL DATA COMPARISON -->
<section>
<div class="section-eyebrow">05 · Data Keuangan ADRO</div>
<h2 class="section-title">Siapa yang memegang angka yang benar?</h2>
<p class="section-lead">Perbandingan data keuangan yang muncul di masing-masing laporan. ChatGPT adalah satu-satunya yang bersumber langsung dari Annual Report FY2025.</p>
<div class="two-col">
<div class="chart-wrap">
<div class="chart-title">Data keuangan ADRO yang dikutip</div>
<div class="chart-sub">Berdasarkan Annual Report FY2025 (ChatGPT) vs estimasi (lainnya)</div>
<div style="position:relative;height:280px;">
<canvas id="barChart" role="img" aria-label="Bar chart perbandingan data keuangan ADRO yang dikutip. ChatGPT mengutip revenue 1873, EBITDA 799, blok ekspor 664. Odysseus Default dan Enhanced tidak menyebut angka spesifik.">ChatGPT: Revenue US$1,873M, EBITDA US$799M, Ekspor US$664M. Odysseus Default: tidak ada angka primer. Odysseus Enhanced: estimasi persentase saja.</canvas>
</div>
</div>
<div class="chart-wrap">
<div class="chart-title">Reaksi pasar ADRO (data aktual)</div>
<div class="chart-sub">Harga penutupan harian Mei–Juni 2026 (dari laporan ChatGPT)</div>
<div style="position:relative;height:280px;">
<canvas id="priceChart" role="img" aria-label="Line chart harga saham ADRO dari 20 Mei sampai 5 Juni 2026. Puncak drop di 20 Mei turun ke 2230, memantul ke 2350, lalu volatile di kisaran 2180-2280.">Harga ADRO turun dari ~2320 ke 2230 pada 20 Mei saat pengumuman PP, memantul ke 2350, lalu turun ke 2180 pada 3 Juni, dan ditutup 2240 pada 5 Juni.</canvas>
</div>
</div>
</div>
<div style="margin-top:20px">
<div class="section-eyebrow" style="margin-bottom:12px">Model skenario ChatGPT (data Annual Report FY2025)</div>
<div class="sens-wrap">
<table class="sens-table">
<thead>
<tr>
<th>Skenario</th>
<th>Δ Revenue</th>
<th>Δ Gross Profit</th>
<th>Δ EBITDA</th>
<th>Δ OCF</th>
<th>EBITDA Pasca</th>
</tr>
</thead>
<tbody>
<tr>
<td>Base Case (–1% harga, vol stabil)</td>
<td class="cell-neg-light">–US$6.6M</td>
<td class="cell-neg-light">–US$6.6M</td>
<td class="cell-neg-light">–US$6.6M</td>
<td class="cell-neg-light">–US$4.9M</td>
<td class="cell-neutral">US$792.4M</td>
</tr>
<tr>
<td>Downside Case (–5% harga, –3% vol)</td>
<td class="cell-neg-heavy">–US$52.2M</td>
<td class="cell-neg-mid">–US$40.3M</td>
<td class="cell-neg-mid">–US$40.6M</td>
<td class="cell-neg-mid">–US$30.2M</td>
<td class="cell-neg-light">US$758.4M</td>
</tr>
<tr>
<td>Upside Case (+2% harga, +1% vol)</td>
<td class="cell-pos">+US$20.1M</td>
<td class="cell-pos">+US$16.1M</td>
<td class="cell-pos">+US$16.2M</td>
<td class="cell-pos">+US$12.0M</td>
<td class="cell-pos">US$815.2M</td>
</tr>
</tbody>
</table>
</div>
<p style="font-size:12px;color:var(--muted);margin-top:8px;">Basis: Revenue FY2025 US$1,873.5M, EBITDA US$799M. Blok ekspor US$664.4M. Sumber: Annual Report ADRO FY2025 via ChatGPT Deep Research.</p>
</div>
<div class="callout callout-warn" style="margin-top:24px">
<strong>Catatan kritis:</strong> Odysseus Default tidak menyebut satu pun angka dari laporan keuangan resmi. Odysseus Enhanced memiliki tabel sensitivitas EBITDA, tapi dalam format persentase tanpa basis US$ yang bisa diverifikasi. Untuk keputusan investasi nyata, hanya data ChatGPT yang bisa langsung dipakai.
</div>
</section>
<!-- SECTION 6: TIMELINE -->
<section>
<div class="section-eyebrow">06 · Kronologi Regulasi & Pasar</div>
<h2 class="section-title">Timeline yang hanya ChatGPT catat lengkap</h2>
<p class="section-lead">Reaksi harga harian ADRO terhadap setiap tahapan pengumuman regulasi DSI — data ini ada di laporan ChatGPT dengan volume dan OHLC, tidak ada di Odysseus Default maupun Enhanced.</p>
<div class="two-col">
<div class="timeline">
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--danger);background:var(--danger)"></div>
<div class="tl-date">20 Mei 2026</div>
<div class="tl-event">Presiden Prabowo umumkan PP tata kelola ekspor SDA strategis. Reuters laporkan rencana sentralisasi melalui entitas Danantara.</div>
<span class="tl-reaction react-neg">ADRO –4.29% → Rp2.230 · Vol 170.5 juta</span>
</div>
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--danger)"></div>
<div class="tl-date">21 Mei 2026</div>
<div class="tl-event">Setneg tegaskan ekspor komoditas strategis hanya via DSI. Danantara: kontrak lama tetap berlaku selama tidak terjadi under-invoicing.</div>
<span class="tl-reaction react-neg">ADRO –0.90% → Rp2.210</span>
</div>
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--enhanced)"></div>
<div class="tl-date">22 Mei 2026</div>
<div class="tl-event">Pasar mencerna berita. Investor mulai bargain hunting setelah penurunan kumulatif 5%+.</div>
<span class="tl-reaction react-pos">ADRO +6.33% → Rp2.350</span>
</div>
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--muted)"></div>
<div class="tl-date">1 Juni 2026</div>
<div class="tl-event">Masa transisi resmi dimulai. Fokus awal hanya pada pelaporan dan monitoring, belum eksekusi penuh.</div>
<span class="tl-reaction react-neu">ADRO –0.87% → Rp2.280 (2 Juni)</span>
</div>
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--danger)"></div>
<div class="tl-date">2 Juni 2026</div>
<div class="tl-event">Kelompok pengusaha minta kejelasan teknis kontrak, pembayaran, pengapalan, asuransi, dan platform digital.</div>
<span class="tl-reaction react-neg">ADRO –4.39% → Rp2.180 (3 Juni) · Vol 111 juta</span>
</div>
<div class="tl-item">
<div class="tl-dot" style="border-color:var(--enhanced)"></div>
<div class="tl-date">5 Juni 2026</div>
<div class="tl-event">Danantara rilis siaran pers resmi: metodologi harga fair, kontrak lama dihormati, platform digital dalam pembangunan.</div>
<span class="tl-reaction react-neg">ADRO –1.32% → Rp2.240 (setelah rebound +4.13%)</span>
</div>
</div>
<div>
<div class="findings-grid">
<div class="finding-card">
<div class="finding-num" style="color:var(--danger)">–10.4%</div>
<div class="finding-text">Penurunan ADRO dalam <strong>1 bulan</strong> (4 Mei – 5 Juni 2026). Tidak seluruhnya karena DSI, tapi kebijakan ini jadi katalis negatif dominan.</div>
</div>
<div class="finding-card">
<div class="finding-num" style="color:var(--chatgpt)">74%</div>
<div class="finding-text">Porsi <strong>revenue pihak berelasi</strong> ADRO FY2025 (US$1.388M dari total US$1.874M). AI + AIS menyumbang 63.9% sendiri.</div>
</div>
<div class="finding-card">
<div class="finding-num" style="color:var(--enhanced)">15.37%</div>
<div class="finding-text">Sisa kepemilikan ADRO di AADI pasca spin-off, dicatat sebagai <strong>aset FVOCI US$497.5 juta</strong>. Tidak mempengaruhi EBITDA, tapi masuk OCI/ekuitas.</div>
</div>
<div class="finding-card">
<div class="finding-num" style="color:var(--warn)">Jan '27</div>
<div class="finding-text">Target <strong>implementasi penuh</strong> DSI sebagai single exporter. Fase saat ini (Juni–Des 2026) masih transisi berbasis pelaporan.</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 7: CONCLUSION -->
<section>
<div class="section-eyebrow">07 · Kesimpulan</div>
<h2 class="section-title">Apa yang bisa kita ambil dari hasil pengujian ini?</h2>
<div class="conclusion-box">
<div class="conclusion-title">Tiga kesimpulan akhir</div>
<p class="conclusion-text"><strong>Satu — ChatGPT unggul karena akses data lebih dalam.</strong> Laporan yang dibangun dari angka yang diaudit memiliki kegunaan investasi yang berbeda secara fundamental dibanding laporan yang dibangun dari sintesis berita media mainstream.</p>
<p class="conclusion-text"><strong>Dua — Prompt engineering mengangkat Odysseus sebesar +1.8 poin rata-rata.</strong> Ini bukan angka kecil. Peningkatan terjadi bukan karena model lebih pintar, tapi karena instruksi yang lebih baik mengaktifkan kemampuan yang sudah ada. Struktur, cara berpikir, dan transparansi ketidakpastian — semuanya bisa diarahkan lewat prompt yang baik.</p>
<p class="conclusion-text"><strong>Tiga — Ada batas yang tidak bisa dilampaui oleh prompt.</strong> Selama Odysseus tidak memiliki kemampuan mengakses dan mengurai PDF sumber primer, gap data terhadap ChatGPT akan tetap ada. Prompt bisa menyempurnakan cara berpikir, tetapi dia tidak bisa menggantikan akses ke data yang lebih baik. Gap 1.1 poin yang tersisa antara Enhanced dan ChatGPT adalah <em>infrastructure gap</em>, bukan <em>reasoning gap</em>.</p>
<div class="conclusion-pills">
<span class="cpill cpill-chatgpt">ChatGPT: Pilihan untuk investor institusi</span>
<span class="cpill cpill-enhanced">Enhanced: Terbaik dalam kelas Odysseus</span>
<span class="cpill cpill-warn">Default: Butuh enhanced prompt minimal</span>
</div>
</div>
<div class="callout callout-info" style="margin-top:24px">
<strong>Untuk ADRO spesifik:</strong> Ketiga laporan sepakat pada pandangan <em>netral-cautious</em> untuk horizon pendek. Risiko utama bukan keruntuhan laba mendadak, tapi kenaikan discount rate akibat opacity regulasi pada pricing, counterparty structure, dan cash conversion. Trigger terpenting yang perlu dipantau: publikasi formula harga teknis DSI per komoditas dari Kementerian Perdagangan.
</div>
</section>
</div>
<!-- FOOTER -->
<footer class="article-footer">
Analisis oleh Claude Sonnet 4.6 Max · Untuk tujuan edukasi dan perbandingan metodologi, bukan rekomendasi investasi.
</footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
const cChatgpt = '#1A6BF0';
const cDefault = '#7B5EA7';
const cEnhanced = '#1A8C5B';
const labels = [
'Akurasi Data','Analisis Keuangan','Struktur','Cakupan Isu',
'Kualitas Sitasi','Reasoning','Epistemic','Nilai Investor'
];
new Chart(document.getElementById('radarChart'), {
type: 'radar',
data: {
labels,
datasets: [
{
label: 'ChatGPT',
data: [9.5, 10, 8.5, 9, 9, 9, 9.5, 9.5],
borderColor: cChatgpt,
backgroundColor: 'rgba(26,107,240,0.08)',
borderWidth: 2,
pointBackgroundColor: cChatgpt,
pointRadius: 4,
borderDash: [],
},
{
label: 'Odysseus Default',
data: [6, 5.5, 6.5, 7.5, 6, 6.5, 5.5, 6.5],
borderColor: cDefault,
backgroundColor: 'rgba(123,94,167,0.06)',
borderWidth: 2,
pointBackgroundColor: cDefault,
pointRadius: 4,
borderDash: [5,3],
},
{
label: 'Odysseus Enhanced',
data: [7.5, 8, 9, 8.5, 7, 8, 8.5, 8],
borderColor: cEnhanced,
backgroundColor: 'rgba(26,140,91,0.07)',
borderWidth: 2,
pointBackgroundColor: cEnhanced,
pointRadius: 4,
borderDash: [2,2],
}
]
},
options: {
responsive: true,
maintainAspectRatio: false,
plugins: { legend: { display: false } },
scales: {
r: {
min: 5,
max: 10,
ticks: {
stepSize: 1,
font: { family: 'DM Mono', size: 10 },
color: '#a0a0a0',
backdropColor: 'transparent',
},
grid: { color: 'rgba(255, 255, 255, 0.08)' },
pointLabels: {
font: { family: 'DM Sans', size: 11 },
color: '#a0a0a0',
}
}
}
}
});
new Chart(document.getElementById('barChart'), {
type: 'bar',
data: {
labels: ['Revenue FY25', 'EBITDA FY25', 'Blok Ekspor', 'Saldo FVOCI'],
datasets: [
{
label: 'ChatGPT (data primer)',
data: [1873.5, 799, 664.4, 497.5],
backgroundColor: 'rgba(26,107,240,0.75)',
borderColor: cChatgpt,
borderWidth: 1.5,
borderRadius: 4,
},
{
label: 'Odysseus Default',
data: [null, null, null, null],
backgroundColor: 'rgba(123,94,167,0.3)',
borderColor: cDefault,
borderWidth: 1.5,
borderRadius: 4,
},
{
label: 'Odysseus Enhanced',
data: [null, null, null, null],
backgroundColor: 'rgba(26,140,91,0.3)',
borderColor: cEnhanced,
borderWidth: 1.5,
borderRadius: 4,
}
]
},
options: {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: { display: false },
tooltip: {
callbacks: {
label: ctx => ctx.parsed.y !== null ? 'US$' + ctx.parsed.y.toFixed(1) + 'M' : 'Tidak tersedia'
}
}
},
scales: {
x: {
grid: { display: false },
ticks: { font: { family: 'DM Sans', size: 11 }, color: '#a0a0a0' }
},
y: {
grid: { color: 'rgba(255, 255, 255, 0.08)' },
ticks: {
font: { family: 'DM Mono', size: 10 },
color: '#a0a0a0',
callback: v => 'US$' + v + 'M'
}
}
}
}
});
const priceLabels = ['20/5','21/5','22/5','27/5','28/5','29/5','2/6','3/6','4/6','5/6'];
const priceData   = [2230, 2210, 2350, 2290, 2310, 2300, 2280, 2180, 2270, 2240];
new Chart(document.getElementById('priceChart'), {
type: 'line',
data: {
labels: priceLabels,
datasets: [{
label: 'ADRO (Rp)',
data: priceData,
borderColor: cChatgpt,
backgroundColor: 'rgba(26,107,240,0.07)',
borderWidth: 2,
pointBackgroundColor: priceData.map(v => v <= 2200 ? '#E25C5C' : v >= 2320 ? '#5DCCA0' : cChatgpt),
pointRadius: 5,
fill: true,
tension: 0.35,
}]
},
options: {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: { display: false },
tooltip: {
callbacks: { label: ctx => 'Rp' + ctx.parsed.y.toLocaleString() }
}
},
scales: {
x: {
grid: { display: false },
ticks: { font: { family: 'DM Mono', size: 10 }, color: '#a0a0a0' }
},
y: {
min: 2100,
max: 2400,
grid: { color: 'rgba(255, 255, 255, 0.08)' },
ticks: {
font: { family: 'DM Mono', size: 10 },
color: '#a0a0a0',
callback: v => 'Rp' + v.toLocaleString()
}
}
}
}
});
</script>
</div>
