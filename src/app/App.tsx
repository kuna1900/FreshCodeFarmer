import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { initializeData } from './utils/initializeData';

export default function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}