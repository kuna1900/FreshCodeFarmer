import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Sprout } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-green-500 mb-4">
              <Sprout className="size-8" />
              <span className="font-bold text-xl">FreshCode Farmers</span>
            </div>
            <p className="text-sm">
              Connecting farmers directly with consumers for fresh, affordable produce.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block hover:text-green-500 transition-colors">Products</Link>
              <Link to="/login" className="block hover:text-green-500 transition-colors">Login</Link>
              <Link to="/signup" className="block hover:text-green-500 transition-colors">Sign Up</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4" />
                <span>support@freshcodefarmers.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4" />
                <span>India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 FreshCode Farmers. All rights reserved. Built for BGI Hackathon 2026</p>
        </div>
      </div>
    </footer>
  );
}
