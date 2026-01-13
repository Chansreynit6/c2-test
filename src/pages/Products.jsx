import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Products() {
  const [items, setItems] = useState([]);
  const location = useLocation();

  // Fetch 12 products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.escuelajs.co/api/v1/products?limit=12&offset=0"
        );
        const data = await res.json();
        
        // If there's a new product from navigation, add it to the top
        if (location.state?.newProduct) {
          setItems([location.state.newProduct, ...data.slice(0, 11)]); // Keep only 12 items total
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [location.state]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage your product catalog</p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add product
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="rounded-2xl border bg-white transition hover:shadow-sm" 
          >
            <div className="flex items-start p-4 gap-3">
              {/* SMALL IMAGE */}
              <img
                src={p.images?.[0] ?? "https://placehold.co/600x400"}
                alt={p.title}
                loading="lazy"
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
              />

              {/* CONTENT */}
              <div className="flex-1">
                {/* TITLE + PRICE SAME LINE */}
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold text-sm">{p.title}</h3>
                  <span className="text-sm font-bold">${p.price}</span>
                </div>

                {/* DESCRIPTION */}
                <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {p.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}