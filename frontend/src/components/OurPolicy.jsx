import React from 'react'
import { assets } from '../assets/assets'
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi'

const OurPolicy = () => {
  const policies = [
    {
      icon: <FiTruck className="text-blue-600 text-2xl" />,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      icon: <FiRefreshCw className="text-green-600 text-2xl" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      bgColor: "bg-green-50",
      borderColor: "border-green-100"
    },
    {
      icon: <FiShield className="text-amber-600 text-2xl" />,
      title: "Quality Guarantee",
      description: "Premium quality products with 2-year warranty",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100"
    },
    {
      icon: <FiHeadphones className="text-purple-600 text-2xl" />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're committed to providing the best shopping experience with premium services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl border ${policy.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Icon Container */}
              <div className={`${policy.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {policy.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {policy.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {policy.description}
              </p>

              {/* Learn More Link */}
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 border-t-2 border-r-2 border-gray-200 rounded-tr-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Premium Shopping Experience
              </h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers who trust our quality and service
              </p>
            </div>
            <button className="px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold transition-colors duration-300 whitespace-nowrap">
              Shop With Confidence
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy;