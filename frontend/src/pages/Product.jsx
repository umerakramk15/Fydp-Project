import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ShopContext } from "../context/ShopContext";
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiStar,
  FiShoppingCart,
  FiPackage,
  FiTag,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, AddToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Mock product data if none exists
  const mockProduct = {
    _id: productId,
    name: "Premium Casual Shirt",
    price: 49.99,
    comparePrice: 79.99,
    description:
      "Experience ultimate comfort and style with our premium casual shirt. Made from 100% organic cotton with a slim fit design that's perfect for both casual and semi-formal occasions.",
    category: "men",
    subcategory: "topwear",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592878940526-3297c2e0e6f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy Blue", value: "#1e3a8a" },
      { name: "Charcoal Gray", value: "#374151" },
      { name: "Forest Green", value: "#065f46" },
      { name: "Burgundy", value: "#831843" },
    ],
    rating: 4.5,
    reviewCount: 128,
    stock: 42,
    sku: "PRD-2024-001",
    material: "100% Organic Cotton",
    care: "Machine wash cold, tumble dry low",
    brand: "Premium Apparel",
    features: [
      "Breathable organic cotton fabric",
      "Slim fit design",
      "Button-down collar",
      "Single chest pocket",
      "French seam construction",
    ],
  };

  useEffect(() => {
    const fetchProductData = () => {
      if (products && products.length > 0) {
        const foundProduct = products.find((item) => item._id === productId);
        if (foundProduct) {
          setProductData(foundProduct);
          setSelectedImage(
            foundProduct.image?.[0] || foundProduct.images?.[0] || ""
          );
        } else {
          setProductData(mockProduct);
          setSelectedImage(mockProduct.images[0]);
        }
      } else {
        setProductData(mockProduct);
        setSelectedImage(mockProduct.images[0]);
      }
    };

    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!selectedSize && productData.sizes?.length > 0) {
      alert("Please select a size");
      return;
    }
    AddToCart(productId, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
            >
              <FiArrowLeft />
              Back
            </button>
            <FiChevronRight className="mx-2" />
            <span className="capitalize">{productData.category}</span>
            <FiChevronRight className="mx-2" />
            <span className="capitalize">{productData.subcategory}</span>
            <FiChevronRight className="mx-2" />
            <span className="text-gray-900 font-medium truncate">
              {productData.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 mb-6">
              <img
                src={selectedImage || productData.images?.[0]}
                alt={productData.name}
                className="w-full h-[400px] md:h-[600px] object-fit"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {(productData.images || productData.image || []).map(
                (img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                      selectedImage === img
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {productData.brand || "Premium Brand"}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  In Stock ({productData.stock || 42})
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating || 4.5)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold text-gray-900">
                    {productData.rating || 4.5}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {productData.reviewCount || 128} reviews
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {productData.sku || "PRD-2024-001"}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {currency} {productData.price}
                </span>
                {productData.comparePrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {currency} {productData.comparePrice}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-lg">
                      {Math.round(
                        (1 - productData.price / productData.comparePrice) * 100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Color Selection */}
            {productData.colors && productData.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Color:{" "}
                  <span className="font-normal">
                    {selectedColor || "Select"}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                        selectedColor === color.name
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Size:{" "}
                    <span className="font-normal">
                      {selectedSize || "Select"}
                    </span>
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {productData.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-medium transition-all ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-2 border-gray-900"
                          : "bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  Only {productData.stock || 42} items left
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl"
              >
                Buy Now
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-xl border transition-colors ${
                  isWishlisted
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 hover:border-gray-900 text-gray-700"
                }`}
              >
                <FiHeart className={isWishlisted ? "fill-red-500" : ""} />
              </button>
              <button className="px-6 py-4 border border-gray-300 hover:border-gray-900 rounded-xl transition-colors text-gray-700">
                <FiShare2 />
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiTruck className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiRefreshCw className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiShield className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">2-Year Warranty</p>
                  <p className="text-sm text-gray-600">Quality guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {["description", "specifications", "reviews", "shipping"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium text-lg capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Product Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {productData.description}
                </p>

                {productData.features && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {productData.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FiCheck className="text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {productData.material && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Material & Care
                    </h4>
                    <p className="text-gray-700">
                      <strong>Material:</strong> {productData.material}
                    </p>
                    {productData.care && (
                      <p className="text-gray-700">
                        <strong>Care Instructions:</strong> {productData.care}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">
                        {productData.brand || "Premium Apparel"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-medium">
                        {productData.sku || "PRD-2024-001"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium capitalize">
                        {productData.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">
                        {productData.material || "100% Cotton"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Fit</span>
                      <span className="font-medium">Slim Fit</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Origin</span>
                      <span className="font-medium">Made in India</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Customer Reviews ({productData.reviewCount || 128})
                </h3>
                {/* Reviews content would go here */}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Shipping & Delivery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Standard Shipping
                    </h4>
                    <p className="text-gray-600">
                      5-7 business days • Free on orders over $50
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Express Shipping
                    </h4>
                    <p className="text-gray-600">2-3 business days • $9.99</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      International
                    </h4>
                    <p className="text-gray-600">7-14 business days • $19.99</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subcategory={productData.subcategory}
          currentProductId={productId}
        />
      </div>
    </div>
  );
};

export default Product;
