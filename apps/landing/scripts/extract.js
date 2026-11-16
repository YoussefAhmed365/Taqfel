import fs from 'fs';

let content = fs.readFileSync('lib/data.ts', 'utf-8');
// Remove imports
content = content.replace(/import\s+\{[\s\S]*?\}\s+from\s+'[^']+';/, '');
// Remove type casting like `as MetricData[]`
content = content.replace(/as\s+[A-Za-z]+\[\]/g, '');
// Remove type annotations like `: Record<'ar' | 'en', FaqItem[]>`
content = content.replace(/:\s*Record<[^>]+>/g, '');
// Replace `export const` with `globalThis.`
content = content.replace(/export const ([A-Z_]+)/g, 'globalThis.$1');

eval(content);

const ar = {
  UI_TEXT: globalThis.UI_TEXT.ar,
  DEMO_METRICS: globalThis.DEMO_METRICS.ar,
  DEMO_EMPLOYEES: globalThis.DEMO_EMPLOYEES.ar,
  DEMO_BRANCHES: globalThis.DEMO_BRANCHES.ar,
  VALUE_PROPOSITIONS: globalThis.VALUE_PROPOSITIONS.ar,
  SECURITY_CARDS: globalThis.SECURITY_CARDS.ar,
  PRICING_PLANS: globalThis.PRICING_PLANS.ar,
  FAQ_ITEMS: globalThis.FAQ_ITEMS.ar
};

const en = {
  UI_TEXT: globalThis.UI_TEXT.en,
  DEMO_METRICS: globalThis.DEMO_METRICS.en,
  DEMO_EMPLOYEES: globalThis.DEMO_EMPLOYEES.en,
  DEMO_BRANCHES: globalThis.DEMO_BRANCHES.en,
  VALUE_PROPOSITIONS: globalThis.VALUE_PROPOSITIONS.en,
  SECURITY_CARDS: globalThis.SECURITY_CARDS.en,
  PRICING_PLANS: globalThis.PRICING_PLANS.en,
  FAQ_ITEMS: globalThis.FAQ_ITEMS.en
};

fs.mkdirSync('messages', { recursive: true });
fs.writeFileSync('messages/ar.json', JSON.stringify(ar, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log("Done generating messages!");
