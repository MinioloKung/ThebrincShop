import { useState } from 'react';
import { useShopData } from './hooks/useShopData';
import Storefront from './components/Storefront';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const { products, settings, saveProducts, saveSettings } = useShopData();
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('thebrinc.admin') === 'true');
  const isAdminPath = window.location.pathname.startsWith('/admin');

  if (isAdminPath && !isAdmin) {
    return <Login onLogin={() => setIsAdmin(true)} />;
  }

  if (isAdminPath) {
    return (
      <Dashboard
        onLogout={() => setIsAdmin(false)}
        products={products}
        saveProducts={saveProducts}
        saveSettings={saveSettings}
        settings={settings}
      />
    );
  }

  return <Storefront products={products} settings={settings} />;
}
