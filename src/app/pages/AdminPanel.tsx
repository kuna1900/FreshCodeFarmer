import { useState, useEffect } from 'react';
import {BarChart, Bar, XAxis,YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import { useNavigate } from 'react-router';
import { Users, Package, ShoppingCart, TrendingUp, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const storedProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    setUsers(storedUsers);
    setOrders(storedOrders);
    setProducts(storedProducts);
    setReviews(storedReviews);

  }, [user, navigate]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
const chartData = [

  {
    name: 'Users',
    value: users.length
  },

  {
    name: 'Products',
    value: products.length
  },

  {
    name: 'Orders',
    value: orders.length
  },

  {
    name: 'Revenue',
    value: totalRevenue
  }

];
  const handleDeleteUser = (userId: string) => {
    const updated = users.filter(u => u.id !== userId);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };
  const updateOrderStatus = (

  orderId: string,

  status: string

) => {

  const updatedOrders = orders.map((order) =>

    order.id === orderId

      ? { ...order, status }

      : order

  );

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

};
const handleDeleteReview = (reviewId: number) => {

  const updated = reviews.filter(
    r => r.id !== reviewId
  );

  setReviews(updated);

  localStorage.setItem(
    'reviews',
    JSON.stringify(updated)
  );

};

  return (
    
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">Platform management and analytics</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Analytics Overview
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="size-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>

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
              <div className="bg-purple-100 rounded-full p-3">
                <ShoppingCart className="size-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <TrendingUp className="size-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Role</th>
                    <th className="text-left py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{u.name}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{u.email}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {order.status}
                      <div className="flex gap-2 mt-3 flex-wrap">

                        <button

                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Confirmed"
                            )
                          }

                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"

                        >
                          Confirm
                        </button>

                        <button

                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Out For Delivery"
                            )
                          }

                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"

                        >
                          Delivery
                        </button>

                        <button

                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Delivered"
                            )
                          }

                          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"

                        >
                          Delivered
                        </button>

                        <button

                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              "Cancelled"
                            )
                          }

                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"

                        >
                          Cancel
                        </button>

                      </div>
                    </span>
                  </div>
                  <p className="font-bold text-green-600">₹{order.total}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Product Listings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 6).map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 capitalize">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">₹{product.price}/{product.unit}</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-md lg:col-span-2">

  <h2 className="text-2xl font-bold mb-6">
    Reviews Management
  </h2>

  <div className="space-y-4">

    {reviews.map(review => (

      <div
        key={review.id}
        className="border rounded-xl p-4"
      >

        <div className="flex justify-between items-start">

          <div>

            <p className="font-bold">
              👤 {review.userName}
            </p>

            <p className="text-yellow-500">
              ⭐ {review.rating}
            </p>

            <p className="text-gray-600 mt-2">
              {review.comment}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              📅 {review.date}
            </p>

          </div>

          <button

            onClick={() =>
              handleDeleteReview(review.id)
            }

            className="text-red-500 hover:text-red-700"

          >
            <Trash2 className="size-5" />
          </button>

        </div>

      </div>

    ))}

  </div>

</div>
    </div>
  );
}
