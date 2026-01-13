import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductNew() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
    // Generate a unique suffix to avoid slug conflicts
    const uniqueSuffix = Math.random().toString(36).substring(2, 9);

    const newProduct = {
      title: `${formData.get("title")} ${uniqueSuffix}`,
      price: Number(formData.get("price")),
      categoryId: Number(formData.get("categoryId")),
      description: formData.get("description"),
      images: [formData.get("image")],
    };

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const createdProduct = await res.json();
        console.log("Created product:", createdProduct);
        alert("✅ Successfully saved new product!");
        navigate("/products", { 
          state: { 
            newProduct: createdProduct  // Pass the new product to display
          } 
        });
      } else {
        const error = await res.json();
        alert(`❌ Failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save new product!");
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add new product</h1>
        <p className="text-sm text-slate-600">
          Fill in the product information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Product title"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            required
            min={0}
            step="0.01"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="0.00"
          />
        </div>

        {/* Category - Dropdown */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="categoryId"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            name="image"
            type="url"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Product description"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save product
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-slate-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}