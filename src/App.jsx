import React, { useState, useEffect } from 'react';

// Hardcoded fallback to your live Render backend API
const API_URL = import.meta.env.VITE_API_URL || 'https://campuseats-api-5xai.onrender.com';

const SAMPLE_DISHES = [
  { id: 1, name: 'Kottu Roti', price: 750, category: 'Mains', available: true },
  { id: 2, name: 'Fried Rice', price: 850, category: 'Mains', available: true },
  { id: 3, name: 'Veg Sub', price: 600, category: 'Snacks', available: false },
  { id: 4, name: 'Watalappan', price: 350, category: 'Dessert', available: true },
  { id: 5, name: 'Iced Milo', price: 300, category: 'Drinks', available: true },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [apiStatus, setApiStatus] = useState('Checking Render API connection...');
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'order'
  
  // Order form state
  const [form, setForm] = useState({ name: '', email: '', qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  // Check connection with your live Render backend API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.text())
      .then((data) => setApiStatus(`Connected to Backend: ${data}`))
      .catch(() => setApiStatus('Backend connecting or waking up...'));
  }, []);

  // Filter menu dishes
  const filteredDishes = SAMPLE_DISHES.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  // Order form validation (Lab 02 Task 05)
  function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = 'Name too short';
    if (!/^[^@\s]+@[^\s]+\.[^@\s]+$/.test(v.email)) e.email = 'Enter a valid email';
    if (Number(v.qty) < 1) e.qty = 'Qty must be >= 1';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom: '2px solid #ea580c', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#ea580c', margin: 0 }}>CampusEats Menu & Orders Dashboard</h1>
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>{apiStatus}</p>
        
        {/* Navigation Tabs */}
        <nav style={{ marginTop: '15px' }}>
          <button 
            onClick={() => setActiveTab('menu')} 
            style={{ 
              marginRight: '10px', 
              padding: '8px 16px', 
              backgroundColor: activeTab === 'menu' ? '#ea580c' : '#e5e7eb',
              color: activeTab === 'menu' ? '#fff' : '#000',
              border: 'none', borderRadius: '4px', cursor: 'pointer' 
            }}>
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('order')} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: activeTab === 'order' ? '#ea580c' : '#e5e7eb',
              color: activeTab === 'order' ? '#fff' : '#000',
              border: 'none', borderRadius: '4px', cursor: 'pointer' 
            }}>
            Place Order
          </button>
        </nav>
      </header>

      {/* MENU TAB */}
      {activeTab === 'menu' && (
        <main>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes (e.g. Kottu, Rice)..."
              style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {filteredDishes.length === 0 ? (
              <p>No dishes match your search.</p>
            ) : (
              filteredDishes.map((dish) => (
                <div key={dish.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', backgroundColor: '#f9fafb' }}>
                  <h3 style={{ margin: '0 0 8px 0' }}>{dish.name}</h3>
                  <p style={{ fontWeight: 'bold', color: '#15803d', margin: '0 0 5px 0' }}>Rs. {dish.price.toFixed(2)}</p>
                  <span style={{ fontSize: '0.8rem', backgroundColor: '#e0e7ff', padding: '2px 6px', borderRadius: '4px' }}>{dish.category}</span>
                  {!dish.available && (
                    <span style={{ fontSize: '0.8rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}>
                      Sold out
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {/* ORDER TAB */}
      {activeTab === 'order' && (
        <main style={{ maxWidth: '400px' }}>
          <h2>Place Your Order</h2>
          {done ? (
            <div style={{ padding: '15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px' }}>
              Thanks, {form.name}! Your order has been placed.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Quantity:</label>
                <input
                  type="number"
                  name="qty"
                  value={form.qty}
                  onChange={(e) => setForm({ ...form, qty: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errors.qty && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.qty}</span>}
              </div>

              <button type="submit" style={{ padding: '10px', backgroundColor: '#ea580c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Submit Order
              </button>
            </form>
          )}
        </main>
      )}
    </div>
  );
}