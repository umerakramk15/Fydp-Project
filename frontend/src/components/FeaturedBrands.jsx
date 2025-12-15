import React from "react";
import { Link } from "react-router";
import { FiCheck, FiStar, FiTrendingUp } from "react-icons/fi";

const FeaturedBrands = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
      description: "World leader in athletic footwear and apparel",
      rating: 4.8,
      products: 245,
      color: "bg-black",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      description: "Innovative technology and electronics",
      rating: 4.9,
      products: 189,
      color: "bg-gray-900",
      textColor: "text-white",
    },
    {
      id: 3,
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      description: "Leading electronics and home appliances",
      rating: 4.7,
      products: 312,
      color: "bg-blue-900",
      textColor: "text-white",
    },
    {
      id: 4,
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
      description: "Performance sportswear and footwear",
      rating: 4.6,
      products: 178,
      color: "bg-black",
      textColor: "text-white",
    },
    {
      id: 5,
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
      description: "Premium audio and entertainment",
      rating: 4.8,
      products: 156,
      color: "bg-black",
      textColor: "text-white",
    },
    {
      id: 6,
      name: "Levi's",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/Levi%27s_logo.svg",
      description: "Iconic denim and casual wear",
      rating: 4.5,
      products: 134,
      color: "bg-blue-900",
      textColor: "text-white",
    },
  ];

  const featuredBrand = {
    id: 1,
    name: "Apple",
    tagline: "Featured Brand of the Month",
    description:
      "Experience innovation like never before with the latest Apple products. Exclusive deals for our customers.",
    discount: "Up to 30% Off",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    stats: {
      products: "200+ Products",
      rating: "4.9/5.0",
      customers: "50K+ Happy Customers",
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <FiStar className="text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
              Premium Partners
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Shop from world-renowned brands trusted by millions worldwide
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/collection?brand=${brand.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                {/* Brand Logo */}
                <div
                  className={`${brand.color} rounded-2xl p-4 flex items-center justify-center mb-4 aspect-square`}
                >
                  <div className={`text-2xl font-bold ${brand.textColor}`}>
                    {brand.name}
                  </div>
                </div>

                {/* Brand Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {brand.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <div className="flex text-amber-400">
                      {"★".repeat(Math.floor(brand.rating))}
                      <span className="text-gray-300">★</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      ({brand.rating})
                    </span>
                  </div>

                  {/* Product Count */}
                  <div className="text-xs text-gray-500">
                    {brand.products} products
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-3 inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    <FiCheck size={10} />
                    Verified Partner
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Brand Highlight */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Content Side */}
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 mb-4">
                <FiTrendingUp className="text-blue-400" />
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                  Brand of the Month
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredBrand.name}
                <span className="text-blue-400 ml-2">
                  {featuredBrand.discount}
                </span>
              </h3>

              <p className="text-gray-300 mb-8 text-lg">
                {featuredBrand.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {featuredBrand.stats.products}
                  </div>
                  <div className="text-sm text-gray-300">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {featuredBrand.stats.rating}
                  </div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {featuredBrand.stats.customers}
                  </div>
                  <div className="text-sm text-gray-300">Customers</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/collection?brand=${featuredBrand.name.toLowerCase()}`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3.5 rounded-xl font-semibold transition-colors duration-300"
                >
                  Shop {featuredBrand.name}
                </Link>
                <Link
                  to="/brands"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white px-6 py-3.5 rounded-xl font-semibold transition-colors duration-300"
                >
                  View All Brands
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <img
                src={featuredBrand.image}
                alt={featuredBrand.name}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:hidden"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Brands CTA */}
        <div className="text-center mt-12">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-900 hover:text-white text-gray-900 border-2 border-gray-900 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 group"
          >
            Explore All Brands
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
