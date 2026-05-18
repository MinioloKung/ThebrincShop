import { useEffect, useMemo, useState } from 'react';
import {
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  PackagePlus,
  Save,
  Trash2,
} from 'lucide-react';
import { hasSupabaseConfig, store } from '../lib/store';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';
import ProductEditor from './ProductEditor';

const createEmptyProduct = () => ({
  id: crypto.randomUUID(),
  name: '',
  price: 0,
  category: 'พวงกุญแจ',
  description: '',
  badge: '',
  imageUrl: '',
  isFeatured: false,
  isVisible: true,
  sortOrder: 99,
});

export default function Dashboard({ products, settings, saveProducts, saveSettings, onLogout }) {
  const [draft, setDraft] = useState(null);
  const [settingsDraft, setSettingsDraft] = useState(settings);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);

  const stats = useMemo(
    () => [
      ['สินค้าทั้งหมด', products.length],
      ['แสดงอยู่', products.filter((p) => p.isVisible).length],
      ['Featured', products.filter((p) => p.isFeatured).length],
      ['Best Seller', products.filter((p) => p.badge === 'Best Seller').length],
    ],
    [products],
  );

  const saveProduct = (event) => {
    event.preventDefault();
    const exists = products.some((p) => p.id === draft.id);
    const next = exists
      ? products.map((p) => (p.id === draft.id ? draft : p))
      : [...products, draft];
    saveProducts(next);
    setDraft(null);
    setStatus('บันทึกสินค้าเรียบร้อย');
  };

  const deleteProduct = (id) => {
    saveProducts(products.filter((p) => p.id !== id));
    if (draft?.id === id) setDraft(null);
    setStatus('ลบสินค้าเรียบร้อย');
  };

  const toggleVisibility = (id) => {
    saveProducts(
      products.map((p) =>
        p.id === id ? { ...p, isVisible: !p.isVisible } : p,
      ),
    );
  };

  const saveContactSettings = (event) => {
    event.preventDefault();
    saveSettings(settingsDraft);
    setStatus('บันทึกช่องทางติดต่อเรียบร้อย');
  };

  const logout = () => {
    localStorage.removeItem('thebrinc.admin');
    onLogout();
  };

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <a className="brand" href="/">
          <img className="brand-logo" src="/logo.png" alt="Thebrinc.c" />
          <span>Thebrinc.c</span>
        </a>
        <div className="admin-nav">
          <a href="#products-admin">Products</a>
          <a href="#settings-admin">Settings</a>
          <a href="/" target="_blank" rel="noreferrer">View shop</a>
        </div>
        <button className="ghost-button" onClick={logout} type="button">
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <section className="dashboard">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>จัดการร้าน Thebrinc.c</h1>
            <p className="muted">
              {hasSupabaseConfig
                ? 'Supabase config detected'
                : 'ใช้ local demo data อยู่ พร้อมสลับไป Supabase เมื่อใส่ key'}
            </p>
          </div>
          <button className="primary-button" onClick={() => setDraft(createEmptyProduct())} type="button">
            <PackagePlus size={17} />
            Add product
          </button>
        </div>

        <div className="stats-grid">
          {stats.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        {status && <p className="status">{status}</p>}

        {draft && (
          <ProductEditor
            onCancel={() => setDraft(null)}
            onChange={setDraft}
            onSave={saveProduct}
            product={draft}
          />
        )}

        <section className="admin-section" id="products-admin">
          <div className="admin-section-head">
            <h2>Products</h2>
            <button className="ghost-button" onClick={() => store.resetDemoData()} type="button">
              Reset demo
            </button>
          </div>
          <div className="product-table">
            {products.map((product) => (
              <article key={product.id}>
                <div className="table-image">
                  <ProductImage product={product} />
                </div>
                <div>
                  <h3>{product.name || 'Untitled product'}</h3>
                  <p>{product.category} · {formatPrice(product.price)}</p>
                </div>
                <span className="table-badge">{product.badge || 'No badge'}</span>
                <div className="table-actions">
                  <button
                    aria-label={product.isVisible ? 'ซ่อนสินค้า' : 'แสดงสินค้า'}
                    onClick={() => toggleVisibility(product.id)}
                    title={product.isVisible ? 'ซ่อนสินค้า' : 'แสดงสินค้า'}
                    type="button"
                  >
                    {product.isVisible ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                  <button
                    aria-label="แก้ไขสินค้า"
                    onClick={() => setDraft(product)}
                    title="แก้ไขสินค้า"
                    type="button"
                  >
                    <Edit3 size={17} />
                  </button>
                  <button
                    aria-label="ลบสินค้า"
                    onClick={() => deleteProduct(product.id)}
                    title="ลบสินค้า"
                    type="button"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-section" id="settings-admin">
          <h2>Shop settings</h2>
          <form className="settings-form" onSubmit={saveContactSettings}>
            {[
              ['instagramUrl', 'Instagram'],
              ['tiktokUrl', 'TikTok'],
              ['shopeeUrl', 'Shopee'],
              ['lineUrl', 'LINE OA'],
              ['announcement', 'Announcement'],
            ].map(([field, label]) => (
              <label key={field}>
                {label}
                <input
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, [field]: e.target.value })
                  }
                  value={settingsDraft[field] || ''}
                />
              </label>
            ))}
            <button className="primary-button" type="submit">
              <Save size={17} />
              Save settings
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
