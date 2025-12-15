import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Filter best sellers and sort by sales/rating
    const filteredProducts = products
      .filter((item) => item.bestseller || item.rating >= 4)
      .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
      .slice(0, 4);

    setBestSellers(filteredProducts);
  }, [products]);

  const categories = ["all", "clothing", "electronics", "home", "beauty"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <FiAward className="text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Customer Favorites
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Best Sellers
            </h2>
            <p className="text-gray-600 max-w-xl">
              Top-rated products loved by thousands of customers worldwide
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === category
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Best Seller Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      #{index + 1}
                    </div>
                  </div>
                  {/* Best Seller Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <FiTrendingUp size={12} />
                      Best Seller
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-gray-900">
                            {product.rating || 4.5}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({product.reviewCount || 128} reviews)
                          </span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-green-600 text-sm font-medium">
                          {product.stock || 42} in stock
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {product.description ||
                      "Premium quality product loved by customers worldwide"}
                  </p>

                  {/* Price and Sales */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </div>
                      {product.comparePrice && (
                        <div className="text-sm text-gray-400 line-through">
                          ${product.comparePrice}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Total Sales</div>
                      <div className="text-lg font-bold text-gray-900">
                        {product.salesCount || 1248}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Sold this month</span>
                      <span>{product.monthlySales || 248} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            ((product.monthlySales || 248) / 500) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-semibold transition-colors">
                      Add to Cart
                    </button>
                    <button className="px-5 py-3 border border-gray-300 hover:border-gray-900 rounded-lg transition-colors">
                      ❤️
                    </button>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-5 py-3 border border-gray-300 hover:border-gray-900 rounded-lg transition-colors"
                    >
                      👁️
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Products Sold</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
