import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Package, Heart, User, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ConsumerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
const [showWishlist, setShowWishlist] =
  useState(false);

  useEffect(() => {
    if (!user || user.role !== 'consumer') {
      navigate('/');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const myOrders = allOrders.filter((order: any) => order.userId === user.id);
    setOrders(myOrders.reverse());
    const savedWishlist = JSON.parse(
  localStorage.getItem("wishlist") || "[]"
);

setWishlist(savedWishlist);
  }, [user, navigate]);


  useEffect(() => {

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const allOrders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  const myOrders = allOrders.filter(
    (order: any) =>
      order.userId === currentUser?.id
  );

  setOrders(myOrders);

}, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-600';
      case 'packed':
        return 'bg-yellow-100 text-yellow-600';
      case 'shipped':
        return 'bg-purple-100 text-purple-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Package className="size-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Clock className="size-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold">
                  {orders.filter(o => o.status !== 'delivered').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Package className="size-8 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Delivered</p>
                <p className="text-3xl font-bold">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
        <div  onClick={() =>   setShowWishlist(!showWishlist) } className="bg-white rounded-2xl p-6 shadow-md cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <Heart className="size-8 text-red-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Saved Items</p>
                <p className="text-3xl font-bold"> {wishlist.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="size-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link
                    to="/products"
                    className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-lg">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                       <span

                              className={`px-3 py-1 rounded-full text-sm font-semibold

                              ${order.status === "Delivered"
                                ? "bg-green-100 text-green-600"

                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-600"

                                : order.status === "Out For Delivery"
                                ? "bg-yellow-100 text-yellow-600"

                                : "bg-blue-100 text-blue-600"
                              }`}

                            >

                              {order.status}

                            </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {order.items.map((item: any, i: number) => (
                          <p key={i} className="text-sm text-gray-600">
                            {item.name} x {item.quantity}
                          </p>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-bold text-green-600 text-lg">₹{order.total}</span>
                        <Link
                          to={`/order-tracking/${order.id}`}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <User className="size-8 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="font-semibold capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="bg-white rounded-2xl p-6 shadow-md mb-6">

                  <h2 className="text-2xl font-bold mb-4">
                    Wishlist
                  </h2>

                  {wishlist.length === 0 ? (

                    <p className="text-gray-500">
                      No wishlist items
                    </p>

                  ) : (

                    <div className="space-y-4">

                      {wishlist.map((item) => (

                        <div
                          key={item.id}
                          className="flex items-center gap-4 border-b pb-3"
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />

                          <div>

                            <p className="font-semibold">
                              {item.name}
                            </p>

                            <p className="text-green-600 font-bold">
                              ₹{item.price}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>
                {showWishlist && (

                  <div className="bg-white rounded-2xl p-6 shadow-md mb-6">

                    <div className="flex justify-between items-center mb-4">

                      <h2 className="text-2xl font-bold">
                        Wishlist Items
                      </h2>

                      <button

                        onClick={() =>
                          setShowWishlist(false)
                        }

                        className="text-red-500 font-bold"

                      >
                        ✕
                      </button>

                    </div>

                    {wishlist.length === 0 ? (

                      <p className="text-gray-500">
                        No wishlist items
                      </p>

                    ) : (

                      <div className="space-y-4">

                        {wishlist.map((item) => (

                          <div
                            key={item.id}
                            className="flex items-center gap-4 border-b pb-3"
                          >

                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />

                            <div>

                              <p className="font-semibold">
                                {item.name}
                              </p>

                              <p className="text-green-600 font-bold">
                                ₹{item.price}
                              </p>

                            </div>

                          </div>

                        ))}

                      </div>

                    )}

                  </div>

                )}
              <h3 className="text-xl font-bold mb-2">Fresh Deals!</h3>
              <p className="text-sm mb-4 opacity-90">Get 10% off on your next order</p>
              <Link
                to="/products"
                className="block w-full bg-white text-green-600 py-2 rounded-lg hover:bg-gray-100 transition-colors text-center font-semibold"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
