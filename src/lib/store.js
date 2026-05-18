import { initialProducts, initialSettings } from '../data';

const PRODUCTS_KEY = 'thebrinc.products';
const SETTINGS_KEY = 'thebrinc.settings';

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const hasSupabaseConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const store = {
  getProducts() {
    const products = readJson(PRODUCTS_KEY, initialProducts);
    return [...products].sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
  },

  saveProducts(products) {
    writeJson(PRODUCTS_KEY, products);
    window.dispatchEvent(new Event('thebrinc:data-change'));
  },

  getSettings() {
    return readJson(SETTINGS_KEY, initialSettings);
  },

  saveSettings(settings) {
    writeJson(SETTINGS_KEY, settings);
    window.dispatchEvent(new Event('thebrinc:data-change'));
  },

  resetDemoData() {
    writeJson(PRODUCTS_KEY, initialProducts);
    writeJson(SETTINGS_KEY, initialSettings);
    window.dispatchEvent(new Event('thebrinc:data-change'));
  },
};

export const demoAdmin = {
  email: 'admin@thebrinc.c',
  password: 'thebrinc',
};
