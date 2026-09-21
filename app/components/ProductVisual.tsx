import type { Product } from "@/lib/products";
import { primaryImage } from "@/lib/products";

// Vignette produit : première image du premier coloris.
export default function ProductVisual({
  product,
  image,
}: {
  product: Product;
  image?: string;
}) {
  return (
    <div className="pvisual">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image ?? primaryImage(product)} alt={product.name} loading="lazy" />
    </div>
  );
}
