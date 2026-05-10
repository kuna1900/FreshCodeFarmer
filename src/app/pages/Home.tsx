import { Link } from 'react-router';
import { Search, Leaf, Milk, Wheat, Apple, TrendingUp, Users, Shield } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'Vegetables', icon: Leaf, color: 'bg-green-100 text-green-600' },
  { name: 'Fruits', icon: Apple, color: 'bg-red-100 text-red-600' },
  { name: 'Dairy', icon: Milk, color: 'bg-blue-100 text-blue-600' },
  { name: 'Grains', icon: Wheat, color: 'bg-yellow-100 text-yellow-600' },
];
const featuredProducts = JSON.parse(
  localStorage.getItem("farmerProducts") || "[]"
);
export function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Fresh from <span className="text-green-600">Farms</span> to Your Home
              </h1>
              <p className="text-xl text-gray-600">
                Connect directly with local farmers and get fresh, organic produce delivered to your doorstep. No middlemen, just pure freshness.
              </p>
              <div className="flex gap-4">
                <Link to="/products" className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all transform hover:scale-105 font-semibold">
                  Shop Now
                </Link>
                <Link to="/signup" className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transition-all font-semibold">
                  Join as Farmer
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
                   alt="Farm"
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                  />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Search for fresh products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className={`${category.color} rounded-full size-16 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <category.icon className="size-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden transform hover:-translate-y-1">
                 <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                   <div className="mt-2 space-y-1 text-sm text-gray-600">

                          <p>
                            👨‍🌾 <span className="font-medium">
                              {product.farmerName}
                            </span>
                          </p>

                          <p>
                            📞 {product.mobile}
                          </p>

                          <p>
                            📍 {product.location}
                          </p>

                        </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-xl">₹{product.price}/{product.unit}</span>
                      <span className="text-yellow-500">★ {product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="inline-block px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FreshCode Farmers?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <div className="bg-green-100 rounded-full size-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Pricing</h3>
              <p className="text-gray-600">Direct from farmers means better prices for you and fair income for them.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <div className="bg-green-100 rounded-full size-16 flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Support Local</h3>
              <p className="text-gray-600">Empower local farmers and strengthen your community's economy.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <div className="bg-green-100 rounded-full size-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">Fresh, organic produce with transparent sourcing and ratings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
