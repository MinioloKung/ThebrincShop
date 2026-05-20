import { useState } from 'react';
import { Check, Heart, MessageCircle, Search, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { categories } from '../data';
import ProductImage from './ProductImage';
import SocialLinks from './SocialLinks';
import { formatPrice } from '../utils/formatPrice';

export default function Storefront({ products, settings }) {
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');
  const [query, setQuery] = useState('');

  const visibleProducts = products.filter((p) => p.isVisible);
  const featuredProducts = visibleProducts.filter((p) => p.isFeatured).slice(0, 4);

  const filteredProducts = visibleProducts.filter((p) => {
    const matchCat = activeCategory === 'ทั้งหมด' || p.category === activeCategory || p.badge === activeCategory;
    const text = `${p.name} ${p.category} ${p.description} ${p.badge}`;
    return matchCat && text.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <main>
      {/* HEADER */}
      <header className="site-header">
        <a className="brand" href="/">
          <img className="brand-logo" src="/logothebrinc1.png" alt="Thebrinc.c" />
          <span>Thebrinc.c</span>
        </a>
        <nav>
          <a href="#products">สินค้า</a>
          <a href="#custom">Custom</a>
          <a href="#contact">ติดต่อ</a>
          <a className="admin-link" href="/admin">Admin</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">✿ Handmade bead accessories</p>
          <h1>Thebrinc.c</h1>
          <p>
            สร้อยลูกปัด พวงกุญแจ และของจิ๋วน่ารักๆ ที่ทำด้วยมือทุกชิ้น
            ในโทน pastel สดใส เหมาะกับ everyday look และของขวัญชิ้นพิเศษ ♡
          </p>
          <SocialLinks settings={settings} />
          <div className="hero-notes">
            <span><Heart size={16} /> Made with love</span>
            <span><Star size={16} /> Gift-ready</span>
            <span><Sparkles size={16} /> Custom order</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Thebrinc.c handmade bead accessories">
          <div className="display-card large">
            <ProductImage product={featuredProducts[0] || visibleProducts[0] || { name: 'Pink charm' }} />
          </div>
          <div className="display-card small top">
            <ProductImage product={featuredProducts[1] || visibleProducts[1] || { name: 'Bead necklace' }} />
          </div>
          <div className="display-card small bottom">
            <ProductImage product={featuredProducts[2] || visibleProducts[2] || { name: 'Gift set' }} />
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="category-strip" aria-label="หมวดสินค้า">
        {categories.slice(1).map((cat) => (
          <article key={cat}>
            <span>{cat}</span>
            <small>{visibleProducts.filter((p) => p.category === cat || p.badge === cat).length} items</small>
          </article>
        ))}
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cute picks</p>
            <h2>สินค้าแนะนำ</h2>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input aria-label="ค้นหาสินค้า" onChange={(e) => setQuery(e.target.value)} placeholder="ค้นหาสินค้า" value={query} />
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="เลือกหมวดสินค้า">
          {categories.map((cat) => (
            <button className={activeCategory === cat ? 'active' : ''} key={cat} onClick={() => setActiveCategory(cat)} type="button">
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                {product.badge && <span className="badge">{product.badge}</span>}
                <ProductImage product={product} />
              </div>
              <div className="product-info">
                <div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <strong>{formatPrice(product.price)}</strong>
                <span>{product.description}</span>
                <a href={settings.shopeeUrl} rel="noreferrer" target="_blank">
                  <ShoppingBag size={17} /> สั่งซื้อ
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CUSTOM BAND */}
      <section className="custom-band" id="custom">
        <div>
          <p className="eyebrow">Custom order</p>
          <h2>เลือกสี เลือกชื่อ เลือก mood ได้เอง</h2>
          <p>
            งาน handmade เหมาะกับของขวัญ ของคู่ หรือชิ้นที่อยากให้เป็นตัวเองมากขึ้น
            สามารถทักไปคุยโทนสีและรายละเอียดก่อนสั่งได้เลย
          </p>
        </div>
        <div className="custom-cta">
          <a
            className="primary-button"
            href={settings.lineUrl && settings.lineUrl !== '#' ? settings.lineUrl : undefined}
            target="_blank"
            rel="noreferrer"
            style={{ minHeight: '46px', padding: '0 24px', opacity: settings.lineUrl && settings.lineUrl !== '#' ? 1 : 0.6 }}
          >
            <MessageCircle size={18} />
            <span>ทักแชทสั่งทำ (LINE OA)</span>
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" aria-label="จุดเด่นของร้าน">
        {[
          ['Handmade', 'ประกอบและคัดโทนลูกปัดทีละชิ้น'],
          ['Pastel Mood', 'โทนสีหวาน สะอาด และถ่ายรูปง่าย'],
          ['Gift Ready', 'เหมาะกับของขวัญเล็กๆ ที่ตั้งใจเลือก'],
          ['Custom Friendly', settings.announcement],
        ].map(([title, desc]) => (
          <article key={title}>
            <Check size={18} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div>
          <img className="brand-logo" src="/logothebrinc1.png" alt="Thebrinc.c" style={{width:58,height:32}} />
          <strong>Thebrinc.c</strong>
          <p>Handmade bead accessories for your soft little moments ♡</p>
        </div>
        <SocialLinks settings={settings} variant="footer" />
      </footer>
    </main>
  );
}
