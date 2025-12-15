import React from "react";
import { assets } from "../assets/assets";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <FiShoppingBag className="text-blue-500" />
              <span>NEW COLLECTION 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Elevate Your
              <span className="block text-blue-600 mt-2">Style Game</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Discover premium fashion that blends comfort, style, and
              sustainability. Curated collections for the modern individual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/collection"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Shop Collection
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-900 text-gray-900 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  10K+
                </div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  500+
                </div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  24/7
                </div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={assets.hero_img}
                alt="Latest Fashion Collection"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Sale -50%
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiShoppingBag className="text-blue-600 text-xl" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Free Shipping</div>
                  <div className="text-xs text-gray-500">
                    On orders over $50
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.8★</div>
                <div className="text-xs text-gray-500">Rated by 2k+ users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
