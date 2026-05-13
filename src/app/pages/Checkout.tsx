import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import qrCode from '../assets/upi-qr.png'

export function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [paymentSuccess, setPaymentSuccess] =
  useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [coupon, setCoupon] = useState('');

const [discount, setDiscount] = useState(0);


const applyCoupon = () => {

  if (coupon === 'SAVE10') {

    setDiscount(total * 0.10);

    toast.success('10% Discount Applied');

  }

  else if (coupon === 'FRESH20') {

    setDiscount(total * 0.20);

    toast.success('20% Discount Applied');

  }

  else {

    toast.error('Invalid Coupon');

  }

};

const handleFakePayment = () => {

  setTimeout(() => {

    setPaymentSuccess(true);

    toast.success(
      'Payment Successful ✅'
    );

  }, 2000);

};
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    const newOrderId = `ORD${Date.now()}`;
    const order = {
      id: newOrderId,
      userId: user.id,
      items: cart,
      total,
      address: { address, city, pincode, phone },
      paymentMethod,
      status: 'placed',
      createdAt: new Date().toISOString(),
    };


    if (paymentMethod === 'upi') {

  alert('UPI Payment Successful ✅');

}

if (paymentMethod === 'card') {

  alert('Card Payment Successful ✅');

}

if (paymentMethod === 'cod') {

  alert('Order Placed with Cash on Delivery ✅');

}


    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setOrderId(newOrderId);
    setShowSuccess(true);
    clearCart();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
            <div className="bg-green-100 rounded-full size-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="size-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-2">Your order ID is</p>
            <p className="text-2xl font-bold text-green-600 mb-8">{orderId}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/order-tracking/${orderId}`)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Track Order
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'upi' ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Smartphone className="size-6 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">UPI Payment</div>
                  <div className="text-sm text-gray-600">Pay using UPI apps</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'card' ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <CreditCard className="size-6 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">Card Payment</div>
                  <div className="text-sm text-gray-600">Debit/Credit card</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'cod' ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Banknote className="size-6 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when you receive</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

              <h2 className="text-2xl font-bold mb-4">
                💳 UPI Payment
              </h2>

              <div className="flex flex-col items-center">

                <img
                  src={qrCode}
                  alt="UPI QR"
                  className="w-64 h-64 object-cover rounded-2xl border"
                />

                <p className="mt-4 text-gray-600 text-center">
                  Scan QR using any UPI app
                </p>

                <div className="mt-4 bg-gray-100 px-4 py-2 rounded-lg font-semibold">
                  freshcodefarmer@upi
                </div>

                {!paymentSuccess ? (

                  <button
                    onClick={handleFakePayment}
                    className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold"
                  >
                    Verify Payment
                  </button>

                ) : (

                  <div className="mt-6 text-green-600 font-bold text-xl">
                    ✅ Payment Verified
                  </div>

                )}

              </div>

            </div>
            <div className="flex gap-3 mb-4">

            <input

              type="text"

              placeholder="Enter Coupon"

              value={coupon}

              onChange={(e) =>
                setCoupon(e.target.value)
              }

              className="flex-1 border px-4 py-2 rounded-lg"

            />

            <button

              type="button"

              onClick={applyCoupon}

              className="bg-green-600 text-white px-4 rounded-lg"

            >

              Apply

            </button>

          </div>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">₹{total - discount} </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
