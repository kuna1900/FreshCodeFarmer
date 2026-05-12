import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Edit, Trash2, Package, TrendingUp, IndianRupee, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { predictPrice } from '../utils/pricePrediction';
import axios from 'axios';


interface Product {

  id: string;

  name: string;

  price: number;

  unit: string;

  category: string;

  stock: number;

  farmerId: string;

  image?: string;

  farmerName?: string;

  mobile?: string;

  location?: string;

}

export function FarmerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [language, setLanguage] =useState("en");
  const [editingProduct, setEditingProduct] =
  useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  price: '',
  unit: 'kg',
  category: 'vegetables',
  stock: '',
  image: '',
  farmerName: '',
  mobile: '',
  location: '',
  address: '',
});

const [states, setStates] =
  useState<any[]>([]);

const [districts, setDistricts] =
  useState<any[]>([]);

const [villages, setVillages] =
  useState<any[]>([]);

const [selectedState, setSelectedState] =
  useState('');

const [selectedDistrict, setSelectedDistrict] =
  useState('');
const [predictedPrice, setPredictedPrice] =
  useState<number | null>(null);

const [bankDetails, setBankDetails] =
  useState({

    accountNumber: '',

    ifsc: '',

    holderName: ''

  });

const [withdrawAmount, setWithdrawAmount] =
  useState('');

const [kycDone, setKycDone] =
  useState(false);
const translations: any = {

  en: {
    title: "Farmer Dashboard",
    subtitle: "Manage your farm products",
    add: "Add Product",
    products: "Products",
    orders: "Orders",
    revenue: "Revenue"
  },

  hi: {
    title: "किसान डैशबोर्ड",
    subtitle: "अपने उत्पाद प्रबंधित करें",
    add: "प्रोडक्ट जोड़ें",
    products: "उत्पाद",
    orders: "ऑर्डर",
    revenue: "कमाई"
  },

  mr: {
    title: "शेतकरी डॅशबोर्ड",
    subtitle: "तुमची उत्पादने व्यवस्थापित करा",
    add: "उत्पादन जोडा",
    products: "उत्पादने",
    orders: "ऑर्डर्स",
    revenue: "कमाई"
  }

};

const t = translations[language];
useEffect(() => {

  axios

    .get(
      'https://countriesnow.space/api/v0.1/countries/states'
    )

    .then((res) => {

      const india =
        res.data.data.find(
          (c: any) =>
            c.name === 'India'
        );

      setStates(india.states);

    });

}, []);
const fetchDistricts = async (
  stateName: string
) => {

  const res = await axios.post(

    'https://countriesnow.space/api/v0.1/countries/state/cities',

    {

      country: 'India',

      state: stateName

    }

  );

  setDistricts(res.data.data);

};
  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      navigate('/');
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    setProducts(allProducts.filter((p: Product) => p.farmerId === user.id));
  }, [user, navigate]);
const handleKYCSubmit = () => {

  localStorage.setItem(
    "bankDetails",
    JSON.stringify(bankDetails)
  );

  setKycDone(true);

  toast.success(
    "KYC Submitted Successfully ✅"
  );

};
const handleWithdraw = () => {

  if (!withdrawAmount) {

    toast.error("Enter amount");

    return;

  }

  toast.success(
    `₹${withdrawAmount} Withdrawal Successful ✅`
  );

  setWithdrawAmount('');

};
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
const newProduct: Product = {

  id: Date.now().toString(),

  name: formData.name,

  category: formData.category,

  unit: formData.unit,

  image: formData.image || "",

  farmerName: formData.farmerName || "",

  mobile: formData.mobile || "",

  location: formData.location || "",

  price: parseFloat(formData.price),

  stock: parseInt(formData.stock),

  farmerId: user!.id,

};
if (editingProduct) {

  const updatedProducts = products.map((p) =>

    p.id === editingProduct.id

      ? newProduct

      : p

  );

  setProducts(updatedProducts);

  localStorage.setItem(
    'farmerProducts',
    JSON.stringify(updatedProducts)
  );

  setEditingProduct(null);

  setShowAddForm(false);

  toast.success('Product updated successfully!');

  return;

}
    const allProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    allProducts.push(newProduct);
    localStorage.setItem('farmerProducts', JSON.stringify(allProducts));

    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setFormData({ name: '', price: '', unit: 'kg', category: 'vegetables', stock: '' , image: '', farmerName: '',mobile: '',location: '',address: '',});
    toast.success('Product added successfully!');
  };

 const handleDeleteProduct = (id: string) => {

  const updatedProducts = products.filter(
    (product) => product.id !== id
  );

  setProducts(updatedProducts);

  localStorage.setItem(
    "farmerProducts",
    JSON.stringify(updatedProducts)
  );

};
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
const myOrders = orders.filter(

  (order: any) =>

    order.items.some(

      (item: any) =>

        item.farmer?.trim().toLowerCase() ===

        user?.name?.trim().toLowerCase()

    )

);
const totalEarnings = myOrders.reduce(

  (sum: number, order: any) =>

    sum + Number(order.total),

  0

);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-4">

  <select

    value={language}

    onChange={(e) =>
      setLanguage(e.target.value)
    }

    className="border px-4 py-2 rounded-lg"

  >

    <option value="en">
      English
    </option>

    <option value="hi">
      Hindi
    </option>

    <option value="mr">
      Marathi
    </option>

  </select>

</div>
          <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}, {user?.name}!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Package className="size-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{t.products}</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <TrendingUp className="size-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{t.orders}</p>
                <p className="text-3xl font-bold">{myOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <IndianRupee className="size-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">{t.revenue}</p>
                <p className="text-3xl font-bold">₹{totalEarnings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Products</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus className="size-5" />
              {t.add}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="mb-6 p-6 bg-gray-50 rounded-xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dairy">Dairy</option>
                    <option value="grains">Grains</option>
                  </select>
                </div>
                  <div>

                  <label className="block text-sm font-medium mb-2">
                    Price
                  </label>

                  <input

                    type="number"

                    value={predictedPrice || formData.price}

                    onChange={(e) => {

                      setPredictedPrice('');

                      setFormData({
                        ...formData,
                        price: e.target.value
                      });

                    }}

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                  />

                  <button

                    type="button"

                    onClick={async () => {

                      const result = await predictPrice(

                        formData.category,

                        Number(formData.stock)

                      );

                      setPredictedPrice(
                        result.toString()
                      );

                      setFormData({
                        ...formData,
                        price: result.toString()
                      });

                      toast.success(
                        "AI Price Predicted ✅"
                      );

                    }}

                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"

                  >

                    Predict AI Price

                  </button>

                  {predictedPrice && (

                    <p className="text-green-600 font-semibold mt-2">

                      🤖 AI Suggested Price:
                      ₹{predictedPrice}

                    </p>

                  )}

                </div>
                <div>

                <label className="block text-sm font-medium mb-2">
                  Full Address
                </label>

                <textarea

                  value={formData.address}

                  onChange={(e) =>

                    setFormData({

                      ...formData,

                      address: e.target.value

                    })

                  }

                  rows={3}

                  placeholder="Enter full farm address"

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                />

              </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="kg">Kg</option>
                    <option value="liter">Liter</option>
                    <option value="dozen">Dozen</option>
                    <option value="piece">Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Farmer Name
                  </label>

                  <input
                    type="text"
                    value={formData.farmerName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        farmerName: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

               <div>

                <label className="block text-sm font-medium mb-2">
                  State
                </label>

                <select

                  value={selectedState}

                  onChange={(e) => {

                    setSelectedState(e.target.value);

                    fetchDistricts(e.target.value);

                  }}

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                >

                  <option value="">
                    Select State
                  </option>

                  {states.map((state: any) => (

                    <option
                      key={state.name}
                      value={state.name}
                    >

                      {state.name}

                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  District / City
                </label>

                <select

                  value={selectedDistrict}

                  onChange={(e) => {

                    setSelectedDistrict(e.target.value);

                    setFormData({
                      ...formData,
                      location: e.target.value
                    });

                  }}

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                >

                  <option value="">
                    Select District
                  </option>

                  {districts.map((district: any) => (

                    <option
                      key={district}
                      value={district}
                    >

                      {district}

                    </option>

                  ))}

                </select>

              </div>
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Product Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"

                    onChange={(e: any) => {

                      const file = e.target.files[0];

                      if (!file) return;

                      const reader = new FileReader();

                      reader.readAsDataURL(file);

                      reader.onload = () => {

                        setFormData((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }));

                      };

                    }}

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"

                  />

                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {editingProduct
                 ? "Update Product"
                 : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No products added yet
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{product.name}</td>
                      <td className="py-3 px-4 capitalize">{product.category}</td>
                      <td className="py-3 px-4">
                        {/* <p className="font-semibold">{product.farmerName}</p>
                        <p className="text-sm text-gray-500">{product.mobile}</p>
                        <p className="text-sm text-gray-500">{product.location}</p> */}
                         <td className="py-3 px-4">₹{product.price}/{product.unit}</td>
                       
                      </td>
                      <td className="py-3 px-4">{product.stock} {product.unit}</td>
                      <td className="py-3 px-4">
                        <button

                            onClick={() => {

                              setEditingProduct(product);

                              setFormData({

                                name: product.name,

                                price: product.price.toString(),

                                unit: product.unit,

                                category: product.category,

                                stock: product.stock.toString(),

                                image: product.image || '',

                                farmerName: product.farmerName || '',

                                mobile: product.mobile || '',

                                location: product.location || '',
                                
                                address: product.address || '',
                              });

                              setShowAddForm(true);

                            }}

                            className="text-blue-500 hover:text-blue-700 p-2"

                          >

                            <Edit className="size-5" />

                          </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">

  <h2 className="text-2xl font-bold mb-6">
    Farmer KYC & Withdrawal
  </h2>

  {!kycDone ? (

    <div className="grid md:grid-cols-3 gap-4">

      <input

        type="text"

        placeholder="Account Holder Name"

        value={bankDetails.holderName}

        onChange={(e) =>
          setBankDetails({
            ...bankDetails,
            holderName: e.target.value
          })
        }

        className="border px-4 py-2 rounded-lg"

      />

      <input

        type="text"

        placeholder="Bank Account Number"

        value={bankDetails.accountNumber}

        onChange={(e) =>
          setBankDetails({
            ...bankDetails,
            accountNumber: e.target.value
          })
        }

        className="border px-4 py-2 rounded-lg"

      />

      <input

        type="text"

        placeholder="IFSC Code"

        value={bankDetails.ifsc}

        onChange={(e) =>
          setBankDetails({
            ...bankDetails,
            ifsc: e.target.value
          })
        }

        className="border px-4 py-2 rounded-lg"

      />

      <button

        onClick={handleKYCSubmit}

        className="bg-green-600 text-white px-6 py-2 rounded-lg"

      >

        Submit KYC

      </button>

    </div>

  ) : (

    <div>

      <p className="text-green-600 font-semibold mb-4">

        ✅ KYC Verified

      </p>

      <div className="flex gap-4">

        <input

          type="number"

          placeholder="Enter Withdrawal Amount"

          value={withdrawAmount}

          onChange={(e) =>
            setWithdrawAmount(e.target.value)
          }

          className="border px-4 py-2 rounded-lg"

        />

        <button

          onClick={handleWithdraw}

          className="bg-blue-600 text-white px-6 py-2 rounded-lg"

        >

          Withdraw

        </button>

      </div>

    </div>

  )}

</div>
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
          {myOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {myOrders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <p className="font-bold text-green-600">₹{order.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
