import { Save, Upload } from 'lucide-react';
import ProductImage from './ProductImage';

export default function ProductEditor({ product, onChange, onSave, onCancel }) {
  const handleField = (field, value) => {
    onChange({ ...product, [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => handleField('imageUrl', String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <form className="editor-panel" onSubmit={onSave}>
      <div className="editor-preview">
        <ProductImage product={product} />
        <label className="upload-button">
          <Upload size={16} />
          Upload image
          <input accept="image/*" onChange={handleImageUpload} type="file" />
        </label>
      </div>

      <div className="editor-fields">
        <label>
          ชื่อสินค้า
          <input
            onChange={(e) => handleField('name', e.target.value)}
            required
            value={product.name}
          />
        </label>
        <div className="field-grid">
          <label>
            ราคา
            <input
              min="0"
              onChange={(e) => handleField('price', Number(e.target.value))}
              type="number"
              value={product.price}
            />
          </label>
          <label>
            หมวด
            <select
              onChange={(e) => handleField('category', e.target.value)}
              value={product.category}
            >
              <option>พวงกุญแจ</option>
              <option>สร้อยลูกปัด</option>
              <option>Bag Charm</option>
              <option>Phone Strap</option>
              <option>Gift Set</option>
              <option>Custom Order</option>
            </select>
          </label>
          <label>
            Badge
            <input
              onChange={(e) => handleField('badge', e.target.value)}
              placeholder="Best Seller"
              value={product.badge}
            />
          </label>
          <label>
            ลำดับ
            <input
              min="0"
              onChange={(e) => handleField('sortOrder', Number(e.target.value))}
              type="number"
              value={product.sortOrder}
            />
          </label>
        </div>
        <label>
          รายละเอียด
          <textarea
            onChange={(e) => handleField('description', e.target.value)}
            rows="4"
            value={product.description}
          />
        </label>
        <div className="toggle-row">
          <label>
            <input
              checked={product.isFeatured}
              onChange={(e) => handleField('isFeatured', e.target.checked)}
              type="checkbox"
            />
            Featured
          </label>
          <label>
            <input
              checked={product.isVisible}
              onChange={(e) => handleField('isVisible', e.target.checked)}
              type="checkbox"
            />
            แสดงบนหน้าร้าน
          </label>
        </div>
        <div className="editor-actions">
          <button className="primary-button" type="submit">
            <Save size={17} />
            Save product
          </button>
          <button className="ghost-button" onClick={onCancel} type="button">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
