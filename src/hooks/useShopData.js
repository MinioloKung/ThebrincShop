import { useEffect, useState } from 'react';
import { store } from '../lib/store';

export function useShopData() {
  const [products, setProducts] = useState(() => store.getProducts());
  const [settings, setSettings] = useState(() => store.getSettings());

  useEffect(() => {
    const syncData = () => {
      setProducts(store.getProducts());
      setSettings(store.getSettings());
    };

    window.addEventListener('thebrinc:data-change', syncData);
    return () => window.removeEventListener('thebrinc:data-change', syncData);
  }, []);

  const saveProducts = (nextProducts) => {
    setProducts(nextProducts);
    store.saveProducts(nextProducts);
  };

  const saveSettings = (nextSettings) => {
    setSettings(nextSettings);
    store.saveSettings(nextSettings);
  };

  return { products, settings, saveProducts, saveSettings };
}
