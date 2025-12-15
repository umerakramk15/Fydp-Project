import React from 'react';
import { Link } from 'react-router';
import { 
  FiSmartphone, 
  FiWatch, 
  FiHeadphones, 
  FiCamera, 
  FiMonitor, 
  FiHome,
  FiDroplet,
  FiCoffee
} from 'react-icons/fi';

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: <FiSmartphone className="text-2xl" />,
      count: '245 Products',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      link: '/collection?category=electronics'
    },
    {
      id: 2,
      name: 'Fashion',
      icon: <FiWatch className="text-2xl" />,
      count: '189 Products',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      link: '/collection?category=fashion'
    },
    {
      id: 3,
      name: 'Home & Living',
      icon: <FiHome className="text-2xl" />,
      count: '156 Products',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      link: '/collection?category=home'
    },
    {
      id: 4,
      name: 'Beauty',
      icon: <FiDroplet className="text-2xl" />,
      count: '98 Products',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      link: '/collection?category=beauty'
    },
    {
      id: 5,
      name: 'Sports',
      icon: <FiMonitor className="text-2xl" />,
      count: '76 Products',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      link: '/collection?category=sports'
    },
    {
      id: 6,
      name: 'Books',
      icon: <FiCamera className="text-2xl" />,
      count: '203 Products',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/collection?category=books'
    },
    {
      id: 7,
      name: 'Toys',
      icon: <FiHeadphones className="text-2xl" />,
      count: '134 Products',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      link: '/collection?category=toys'
    },
    {
      id: 8,
      name: 'Groceries',
      icon: <FiCoffee className="text-2xl" />,
      count: '312 Products',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      link: '/collection?category=groceries'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Browse through our wide range of categories and find exactly what you need
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group"
            >
              <div className={`${category.bgColor} rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-900 transition-colors">
                  {category.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm text-gray-500">
                  {category.count}
                </p>

                {/* Arrow Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-900 hover:text-white text-gray-900 border-2 border-gray-900 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 group"
          >
            Explore All Categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Featured Category Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  Featured
                </span>
                <span className="text-sm text-gray-600">Limited Time Offer</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Electronics Sale
                <span className="text-blue-600 ml-2">Up to 50% Off</span>
              </h3>
              <p className="text-gray-600 max-w-xl">
                Latest gadgets, smartphones, and accessories at unbeatable prices. 
                Limited stock available!
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/collection?category=electronics&sale=true"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors duration-300 whitespace-nowrap"
              >
                Shop Electronics
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;