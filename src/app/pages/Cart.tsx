import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <ShoppingBag className="size-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some fresh products to get started!</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-md flex gap-6">
                <div className="size-24 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl"/>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {item.farmer}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors ml-auto"
                  >
                    <Trash2 className="size-5" />
                  </button>
                  <span className="font-bold text-xl text-green-600">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-green-600">₹{total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
