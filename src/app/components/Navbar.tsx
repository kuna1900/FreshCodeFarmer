import { Link, useNavigate } from 'react-router';
import { ShoppingCart, User, LogOut, Menu, X, Sprout } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <Sprout className="size-8" />
            <span className="font-bold text-xl">FreshCode Farmers</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Products
            </Link>
            {user?.role === 'farmer' && (
              <Link to="/farmer-dashboard" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Dashboard
              </Link>
            )}
            {user?.role === 'consumer' && (
              <Link to="/consumer-dashboard" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                My Orders
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="size-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full size-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/consumer-dashboard'} className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
                  <User className="size-5" />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-700 hover:text-red-600 transition-colors">
                  <LogOut className="size-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium">
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600 font-medium">
              Products
            </Link>
            {user?.role === 'farmer' && (
              <Link to="/farmer-dashboard" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600 font-medium">
                Dashboard
              </Link>
            )}
            {user?.role === 'consumer' && (
              <Link to="/consumer-dashboard" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600 font-medium">
                My Orders
              </Link>
            )}
            {user ? (
              <>
                <div className="text-gray-700 font-medium border-t pt-3">Welcome, {user.name}</div>
                <button onClick={handleLogout} className="block w-full text-left text-red-600 font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-green-600 font-medium">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block text-green-600 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
