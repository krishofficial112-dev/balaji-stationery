// Balaji Stationery - Full eCommerce Template with 100+ Products
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const sampleProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: 50 + (i % 20) * 5,
  category: ["Notebooks", "Pens", "Boxes", "Office Supplies", "Pencils", "Boards"][i % 6],
  image: "https://i.imgur.com/tZL4Gq0.png",
  description: `Description for product ${i + 1}`
}));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Balaji Stationery</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/admin" className="hover:underline">Admin</Link>
          </nav>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function ProductList() {
  const [products] = useState(sampleProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(sampleProducts.map(p => p.category))];
  const filteredProducts = selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded border ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-white'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-3 rounded-lg bg-white shadow hover:shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
            <p className="text-xs text-gray-500 mb-2">{product.description}</p>
            <button className="mt-auto w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Panel (Static Preview)</h2>
      <ul className="space-y-2">
        {sampleProducts.map(product => (
          <li key={product.id} className="border-b pb-1">{product.title} - ₹{product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
