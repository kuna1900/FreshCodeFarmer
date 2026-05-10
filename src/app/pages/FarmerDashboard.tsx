import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Edit, Trash2, Package, TrendingUp, IndianRupee, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';


interface Product {

  id: string;

  name: string;

  price: number;

  unit: string;

  category: string;

  stock: number;

  farmerId: string;

  image?: string;

  farmerName?: string;

  mobile?: string;

  location?: string;

}

export function FarmerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] =
  useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  price: '',
  unit: 'kg',
  category: 'vegetables',
  stock: '',
  image: '',
  farmerName: '',
  mobile: '',
  location: '',
});
  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      navigate('/');
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    setProducts(allProducts.filter((p: Product) => p.farmerId === user.id));
  }, [user, navigate]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
const newProduct: Product = {

  id: Date.now().toString(),

  name: formData.name,

  category: formData.category,

  unit: formData.unit,

  image: formData.image || "",

  farmerName: formData.farmerName || "",

  mobile: formData.mobile || "",

  location: formData.location || "",

  price: parseFloat(formData.price),

  stock: parseInt(formData.stock),

  farmerId: user!.id,

};
if (editingProduct) {

  const updatedProducts = products.map((p) =>

    p.id === editingProduct.id

      ? newProduct

      : p

  );

  setProducts(updatedProducts);

  localStorage.setItem(
    'farmerProducts',
    JSON.stringify(updatedProducts)
  );

  setEditingProduct(null);

  setShowAddForm(false);

  toast.success('Product updated successfully!');

  return;

}
    const allProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    allProducts.push(newProduct);
    localStorage.setItem('farmerProducts', JSON.stringify(allProducts));

    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setFormData({ name: '', price: '', unit: 'kg', category: 'vegetables', stock: '' , image: '', farmerName: '',mobile: '',location: '',});
    toast.success('Product added successfully!');
  };

 const handleDeleteProduct = (id: string) => {

  const updatedProducts = products.filter(
    (product) => product.id !== id
  );

  setProducts(updatedProducts);

  localStorage.setItem(
    "farmerProducts",
    JSON.stringify(updatedProducts)
  );

};
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const myOrders = orders.filter((order: any) =>
    order.items.some((item: any) => item.farmer === user?.name)
  );

  const totalEarnings = myOrders.reduce((sum: number, order: any) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Package className="size-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <TrendingUp className="size-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{myOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <IndianRupee className="size-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold">₹{totalEarnings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Products</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus className="size-5" />
              Add Product
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="mb-6 p-6 bg-gray-50 rounded-xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dairy">Dairy</option>
                    <option value="grains">Grains</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="kg">Kg</option>
                    <option value="liter">Liter</option>
                    <option value="dozen">Dozen</option>
                    <option value="piece">Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Farmer Name
                  </label>

                  <input
                    type="text"
                    value={formData.farmerName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        farmerName: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Product Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"

                    onChange={(e: any) => {

                      const file = e.target.files[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.readAsDataURL(file);

                      reader.onload = () => {

                        setFormData((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }));

                      };

                    }}

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                  />

                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {editingProduct
                 ? "Update Product"
                 : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No products added yet
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{product.name}</td>
                      <td className="py-3 px-4 capitalize">{product.category}</td>
                      <td className="py-3 px-4">
                        {/* <p className="font-semibold">{product.farmerName}</p>
                        <p className="text-sm text-gray-500">{product.mobile}</p>
                        <p className="text-sm text-gray-500">{product.location}</p> */}
                         <td className="py-3 px-4">₹{product.price}/{product.unit}</td>
                       
                      </td>
                      <td className="py-3 px-4">{product.stock} {product.unit}</td>
                      <td className="py-3 px-4">
                        <button

                            onClick={() => {

                              setEditingProduct(product);

                              setFormData({

                                name: product.name,

                                price: product.price.toString(),

                                unit: product.unit,

                                category: product.category,

                                stock: product.stock.toString(),

                                image: product.image || '',

                                farmerName: product.farmerName || '',

                                mobile: product.mobile || '',

                                location: product.location || '',

                              });

                              setShowAddForm(true);

                            }}

                            className="text-blue-500 hover:text-blue-700 p-2"

                          >

                            <Edit className="size-5" />

                          </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
          {myOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {myOrders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <p className="font-bold text-green-600">₹{order.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
