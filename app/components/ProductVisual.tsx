import type { Product } from "@/lib/products";

// Vignette produit : vraie photo si `image` est renseigné,
// sinon un dégradé élégant avec le nom de la pièce.
export default function ProductVisual({
  product,
  label,
}: {
  product: Product;
  label?: string;
}) {
  if (product.image) {
    return (
      <div className={`pvisual sw-${product.swatch}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} />
      </div>
    );
  }
  return (
    <div className={`pvisual sw-${product.swatch}`}>
      <span className="pvisual__name">{label ?? product.name}</span>
    </div>
  );
}
