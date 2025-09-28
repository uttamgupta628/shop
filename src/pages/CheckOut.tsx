import React, { useState } from 'react';
import {  ArrowLeft } from 'lucide-react';
import { useCart } from '../components/products/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [couponCode, setCouponCode] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyCoupon = () => {
    // Add coupon logic here
    console.log('Applying coupon:', couponCode);
  };

  const handlePlaceOrder = () => {
    // Add order placement logic here
    console.log('Placing order with:', formData, paymentMethod);
    // You could show success message or redirect to order confirmation
  };

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Breadcrumb */}
      <nav className="bg-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-gray-500">
            <span className="hover:text-orange-500 cursor-pointer">Account</span>
            <span className="mx-2">/</span>
            <span className="hover:text-orange-500 cursor-pointer">My Account</span>
            <span className="mx-2">/</span>
            <span className="hover:text-orange-500 cursor-pointer">Product</span>
            <span className="mx-2">/</span>
            <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate('/cart')}>View Cart</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">CheckOut</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Billing Details Form */}
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Billing Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address*
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town/City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg h-fit">
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-gray-900 font-medium">{item.title}</span>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bank"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <label htmlFor="bank" className="ml-3 text-gray-700">Bank</label>
                {/* <div className="ml-auto flex gap-2">
                  <img src="/api/placeholder/30/20" alt="Visa" className="h-5" />
                  <img src="/api/placeholder/30/20" alt="Mastercard" className="h-5" />
                  <img src="/api/placeholder/30/20" alt="Other" className="h-5" />
                </div> */}
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <label htmlFor="cash" className="ml-3 text-gray-700">Cash on delivery</label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mt-8 flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Apply Coupon
              </button>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors mt-8"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Back to Cart */}
        <div className="mt-8">
          <button 
            onClick={() => navigate('/cart')}
            className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;