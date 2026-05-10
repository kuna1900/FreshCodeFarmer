import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserPlus, Mail, Lock, User as UserIcon, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'consumer' | 'admin'>('consumer') ;
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {

  e.preventDefault();

  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const existingUser = users.find(
    (u: any) => u.email === email
  );

  if (existingUser) {

    toast.error('Email already exists');

    return;

  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role,
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  localStorage.setItem(
    "currentUser",
    JSON.stringify(newUser)
  );

  toast.success('Account created successfully!');

  navigate('/');

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

          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-gray-600 text-center mb-8">Join the FreshCode Farmers community</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('consumer')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                    role === 'consumer'
                      ? 'bg-green-50 border-green-600 text-green-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Consumer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                    role === 'farmer'
                      ? 'bg-green-50 border-green-600 text-green-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Farmer
                </button>
                <button

                    type="button"

                    onClick={() => setRole('admin')}

                    className={`py-3 px-4 rounded-lg border-2 transition-all font-semibold ${
                      role === 'admin'
                        ? 'bg-green-50 border-green-600 text-green-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}

                  >

                    Admin

                  </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <UserPlus className="size-5" />
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
