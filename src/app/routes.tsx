import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { OrderTracking } from './pages/OrderTracking';
import { AdminPanel } from './pages/AdminPanel';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'signup', Component: Signup },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetails },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'farmer-dashboard', Component: FarmerDashboard },
      { path: 'consumer-dashboard', Component: ConsumerDashboard },
      { path: 'order-tracking/:orderId', Component: OrderTracking },
      { path: 'admin', Component: AdminPanel },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
