import { Sparkles } from 'lucide-react';

function PlaceholderImage({ product }) {
  return (
    <div className="mock-image" aria-label={product.name}>
      <div className="bead-row bead-row-one">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="mock-charm">
        <Sparkles size={30} />
      </div>
      <div className="bead-row bead-row-two">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function ProductImage({ product }) {
  if (product.imageUrl) {
    return (
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.name}
      />
    );
  }

  return <PlaceholderImage product={product} />;
}
