import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Package, CheckCircle, Truck, Home, ArrowLeft } from 'lucide-react';

const trackingSteps = [

  {
    id: 'placed',
    label: 'Order Placed',
    icon: Package
  },

  {
    id: 'Confirmed',
    label: 'Confirmed',
    icon: CheckCircle
  },

  {
    id: 'Out For Delivery',
    label: 'Out For Delivery',
    icon: Truck
  },

  {
    id: 'Delivered',
    label: 'Delivered',
    icon: Home
  },

];

export function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: any) => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-600">Order not found</p>
          <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = trackingSteps.findIndex(step => step.id === order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/consumer-dashboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="size-5" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-gray-600">Order ID: {order.id}</p>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="relative mb-12">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{ width: `${(currentStepIndex / (trackingSteps.length - 1)) * 100}%` }}
              />
            </div>

            <div className="relative grid grid-cols-4 gap-4">
              {trackingSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`size-16 rounded-full flex items-center justify-center mb-3 transition-all ${
                        isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="size-8" />
                    </div>
                    <p
                      className={`text-sm font-semibold text-center ${
                        isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">by {item.farmer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">₹{order.total}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold mb-2">Delivery Address</p>
              <p className="text-sm text-gray-600">{order.address.address}</p>
              <p className="text-sm text-gray-600">{order.address.city}, {order.address.pincode}</p>
              <p className="text-sm text-gray-600">Phone: {order.address.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Note:</strong> This is a demo order tracking system. In production, orders would be automatically updated by the logistics system.
          </p>
        </div>
      </div>
    </div>
  );
}
