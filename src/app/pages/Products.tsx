import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Search,
  Filter,
  Leaf,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [minPrice, setMinPrice] =
  useState(0);

const [maxPrice, setMaxPrice] =
  useState(1000);
  const [showFilters, setShowFilters] =
  useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    setProducts(storedProducts);
  }, []);

useEffect(() => {

  const savedWishlist = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );

  setWishlist(savedWishlist);

}, []);

  const categories = ['all', 'vegetables', 'fruits', 'dairy', 'grains'];

const filteredProducts = products.filter(

  (product) => {

    const matchesSearch =

      product.name
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        );

    const matchesCategory =

      selectedCategory === 'all' ||

      product.category ===
      selectedCategory;

    const matchesPrice =

      product.price >= minPrice &&

      product.price <= maxPrice;

    return (

      matchesSearch &&

      matchesCategory &&

      matchesPrice

    );

  }

);


  const toggleWishlist = (product: any) => {

  const exists = wishlist.find(
    (item) => item.id === product.id
  );

  let updatedWishlist;

  if (exists) {

    updatedWishlist = wishlist.filter(
      (item) => item.id !== product.id
    );

  } else {

    updatedWishlist = [...wishlist, product];

  }

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

};


  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.name,
      farmer: product.farmerName,
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Fresh Products</h1>
          <p className="text-gray-600">Browse our selection of farm-fresh produce</p>
        </div>
        <div className="flex justify-between items-center mb-6">

          <button

            onClick={() =>
              setShowFilters(!showFilters)
            }

            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all flex items-center gap-2"

          >

            <Filter className="size-5" />

            Filters

          </button>

        </div>
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

            {showFilters && (

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">

            <h2 className="text-2xl font-bold mb-6">

              Product Filters

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div>

                <label className="block mb-2 font-semibold">

                  Category

                </label>

                <select

                  value={selectedCategory}

                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }

                  className="w-full border px-4 py-3 rounded-xl"

                >

                  {categories.map((category) => (

                    <option
                      key={category}
                      value={category}
                    >

                      {category}

                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="block mb-2 font-semibold">

                  Min Price

                </label>

                <input

                  type="number"

                  value={minPrice}

                  onChange={(e) =>
                    setMinPrice(
                      Number(e.target.value)
                    )
                  }

                  className="w-full border px-4 py-3 rounded-xl"

                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">

                  Max Price

                </label>

                <input

                  type="number"

                  value={maxPrice}

                  onChange={(e) =>
                    setMaxPrice(
                      Number(e.target.value)
                    )
                  }

                  className="w-full border px-4 py-3 rounded-xl"

                />

              </div>

            </div>

          </div>

        )}
        <div className="grid md:grid-cols-2 gap-4 mb-8">

        <div>

          <label className="block mb-2 font-medium">
            Min Price
          </label>

          <input

            type="number"

            value={minPrice}

            onChange={(e) =>
              setMinPrice(
                Number(e.target.value)
              )
            }

            className="w-full border px-4 py-2 rounded-lg"

          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Max Price
          </label>

          <input

            type="number"

            value={maxPrice}

            onChange={(e) =>
              setMaxPrice(
                Number(e.target.value)
              )
            }

            className="w-full border px-4 py-2 rounded-lg"

          />

        </div>

      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
              <Link to={`/products/${product.id}`}>
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                 <img src={product.image} alt={product.name}  className="w-full h-48 object-cover rounded-t-2xl"/>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-end mb-2">

                      <button

                        onClick={() =>
                          toggleWishlist(product)
                        }

                      >

                        <Heart

                          className={`size-6 ${
                            wishlist.find(
                              (item) => item.id === product.id
                            )

                              ? "fill-red-500 text-red-500"

                              : "text-gray-400"
                          }`}

                        />

                      </button>

                    </div>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-green-600">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-600 font-bold text-xl">₹{product.price}/{product.unit}</span>
                  <span className="text-yellow-500 text-sm">★ {product.rating}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
