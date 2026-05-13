import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ShoppingCart, Minus, Plus, Star, ArrowLeft, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);

const [rating, setRating] = useState(5);

const [comment, setComment] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] =
  useState<any[]>([]);
  useEffect(() => {

  const allReviews = JSON.parse(
    localStorage.getItem("reviews") || "[]"
  );

  const productReviews = allReviews.filter(
    (r: any) => r.productId == id
  );

  setReviews(productReviews);

}, [id]);
useEffect(() => {

  const allProducts = JSON.parse(

    localStorage.getItem(
      'farmerProducts'
    ) || '[]'

  );

  if (product) {

    const recommendations = allProducts.filter(

      (item: any) =>

        item.category === product.category &&

        item.id !== product.id

    );

    setRecommendedProducts(

      recommendations.slice(0, 4)

    );

  }

}, [product]);

const handleReview = () => {

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const allReviews = JSON.parse(
    localStorage.getItem("reviews") || "[]"
  );
  


const newReview = {

  id: Date.now(),

  productId: id,

  userName: currentUser?.name,

  rating,

  comment,

  date: new Date().toLocaleDateString()

};

  allReviews.push(newReview);

  localStorage.setItem(
    "reviews",
    JSON.stringify(allReviews)
  );

  setReviews([...reviews, newReview]);

  setComment("");

};
const handleDeleteReview = (id: number) => {

  const updatedReviews = reviews.filter(
    (review) => review.id !== id
  );

  setReviews(updatedReviews);

  localStorage.setItem(
    "reviews",
    JSON.stringify(updatedReviews)
  );

};

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    const product = allProducts.find((p: any) => p.id === id);
    if (product) {
      setProduct({
        ...product,
        reviews: 128,
        description: `Farm-fresh ${product.name.toLowerCase()} sourced directly from local farmers. Perfect for your daily needs.`,
        location: 'India',
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link to="/products" className="text-green-600 hover:text-green-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

 const handleAddToCart = () => {

  const existingCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingItem = existingCart.find(
    (item: any) => item.id === product.id
  );

  if (existingItem) {

    existingItem.quantity += quantity;

  } else {

    existingCart.push({

      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      farmerName: product.farmerName,
      mobile: product.mobile,
      location: product.location,

    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  );

  alert("Product Added To Cart");

};

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="size-5" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-lg">
          <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
           <img src={product.image} alt={product.name}  className="w-full h-full object-cover rounded-3xl"/>
          </div>

          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="space-y-3 mb-6">
             <div className="space-y-2 border-b pb-4">

                <p>
                  👨‍🌾 <span className="font-semibold">
                    {product.farmerName}
                  </span>
                </p>

                <p>
                  📞 {product.mobile}
                </p>

              </div>
              <div className="flex justify-between py-2 border-b">
                <p>
                  📍 {product.location}
                </p>
                <span className="font-semibold">{product.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">In Stock</span>
                <span className="font-semibold text-green-600">{product.stock} {product.unit}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
              <span className="text-gray-600 text-xl">/{product.unit}</span>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                    onClick={() =>
                   setQuantity(quantity > 1 ? quantity - 1 : 1)
                     }
                  className="px-4 py-2 bg-gray-200 rounded-lg"> 
                  <Minus className="size-5" />
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-100 text-green-600 py-3 rounded-lg hover:bg-green-200 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="size-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-6">

              🤖 AI Recommended Products

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              {recommendedProducts.map(

                (item) => (

                  <div

                    key={item.id}

                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"

                  >

                    <img

                      src={item.image}

                      alt={item.name}

                      className="w-full h-40 object-cover"

                    />

                    <div className="p-4">

                      <h3 className="font-bold text-lg">

                        {item.name}

                      </h3>

                      <p className="text-green-600 font-semibold">

                        ₹{item.price}

                      </p>

                      <p className="text-gray-500 text-sm">

                        {item.category}

                      </p>

                    </div>

                  </div>

                )

              )}

            </div>

          </div>
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {[
              { name: 'Priya Sharma', rating: 5, comment: 'Excellent quality! Very fresh.', date: '2 days ago' },
              { name: 'Amit Patel', rating: 4, comment: 'Good product, delivery was quick.', date: '1 week ago' },
              { name: 'Sunita Verma', rating: 5, comment: 'Best tomatoes I have bought online!', date: '2 weeks ago' },
            ].map((review, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 rounded-full size-10 flex items-center justify-center font-semibold text-green-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-gray-600">{review.date}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                {review.comment}</p><button onClick={() => handleDeleteReview(review.id)}   className="mt-3 text-red-500 text-sm font-semibold"> Delete Review</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white p-8 rounded-3xl shadow-md">

        <h2 className="text-3xl font-bold mb-8">
          Customer Reviews
        </h2>

        <div className="space-y-8">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="border-b pb-6"
            >

              <div className="flex items-start justify-between">

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">

                    {review.userName?.charAt(0)}

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {review.userName}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {review.date}
                    </p>

                  </div>

                </div>

                <div className="text-yellow-500 text-lg">

                  {"⭐".repeat(review.rating)}

                </div>

              </div>

              <p className="text-gray-700 mt-4">
                {review.comment}
              </p>
              <button

  onClick={() => handleDeleteReview(review.id)}

  className="mt-3 text-red-500 text-sm font-semibold"

>
  Delete Review
</button>

            </div>

          ))}

        </div>

        <div className="mt-10">

          <h3 className="text-2xl font-bold mb-4">
            Write a Review
          </h3>

          <div className="space-y-4">

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="border p-3 rounded-xl w-full"
            >

              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>

            </select>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-4 rounded-xl w-full"
              rows={4}
            />

            <button
              onClick={handleReview}
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
            >
              Submit Review
            </button>

          </div>

        </div>

      </div>
     </div>
  );
}
