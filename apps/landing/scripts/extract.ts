import fs from 'fs';
import path from 'path';
import {
    DEMO_METRICS,
    DEMO_EMPLOYEES,
    DEMO_BRANCHES,
    VALUE_PROPOSITIONS,
    SECURITY_CARDS,
    PRICING_PLANS,
    FAQ_ITEMS,
    UI_TEXT
} from '../lib/data';

const ar = {
    UI_TEXT: UI_TEXT.ar,
    DEMO_METRICS: DEMO_METRICS.ar,
    DEMO_EMPLOYEES: DEMO_EMPLOYEES.ar,
    DEMO_BRANCHES: DEMO_BRANCHES.ar,
    VALUE_PROPOSITIONS: VALUE_PROPOSITIONS.ar,
    SECURITY_CARDS: SECURITY_CARDS.ar,
    PRICING_PLANS: PRICING_PLANS.ar,
    FAQ_ITEMS: FAQ_ITEMS.ar
};

const en = {
    UI_TEXT: UI_TEXT.en,
    DEMO_METRICS: DEMO_METRICS.en,
    DEMO_EMPLOYEES: DEMO_EMPLOYEES.en,
    DEMO_BRANCHES: DEMO_BRANCHES.en,
    VALUE_PROPOSITIONS: VALUE_PROPOSITIONS.en,
    SECURITY_CARDS: SECURITY_CARDS.en,
    PRICING_PLANS: PRICING_PLANS.en,
    FAQ_ITEMS: FAQ_ITEMS.en
};

fs.mkdirSync(path.join(process.cwd(), 'messages'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'messages/ar.json'), JSON.stringify(ar, null, 2));
fs.writeFileSync(path.join(process.cwd(), 'messages/en.json'), JSON.stringify(en, null, 2));

console.log('Successfully generated JSON files.');