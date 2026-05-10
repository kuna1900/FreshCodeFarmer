import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { LogIn, Mail, Lock, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(email, password)) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleGuestContinue = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <Sprout className="size-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-8">Login to access fresh produce</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <LogIn className="size-5" />
              Login
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGuestContinue}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Continue as Guest
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Demo Accounts</h3>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-gray-800">Admin</p>
              <p className="text-gray-600">admin@freshcode.com / admin123</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-gray-800">Farmer</p>
              <p className="text-gray-600">ramesh@farmer.com / farmer123</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold text-gray-800">Consumer</p>
              <p className="text-gray-600">priya@consumer.com / consumer123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
