import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUserPlus,
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
  FiCreditCard,
  FiFileText,
  FiShield,
  FiHome,
  FiUpload,
} from "react-icons/fi";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Business Info
    businessName: "",
    businessType: "",
    taxId: "",
    businessRegistrationNumber: "",

    // Store Info
    storeName: "",
    storeDescription: "",
    category: "",

    // Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",

    // Documents
    agreeToTerms: false,
    receiveUpdates: true,
  });

  const [documentUploads, setDocumentUploads] = useState({
    idProof: null,
    addressProof: null,
    businessProof: null,
    bankProof: null,
  });

  const businessTypes = [
    "Individual Proprietor",
    "Private Limited",
    "Partnership",
    "LLP (Limited Liability Partnership)",
    "Sole Proprietorship",
  ];

  const categories = [
    "Fashion & Apparel",
    "Electronics",
    "Home & Living",
    "Beauty & Personal Care",
    "Sports & Fitness",
    "Books & Stationery",
    "Toys & Games",
    "Food & Groceries",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (field, file) => {
    setDocumentUploads((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Seller registration submitted:", {
      formData,
      documentUploads,
    });
    // API call would go here
    alert(
      "Seller registration submitted successfully! Your application is under review."
    );
    navigate("/seller/dashboard");
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: <FiUserPlus /> },
    { number: 2, title: "Business Info", icon: <FiBriefcase /> },
    { number: 3, title: "Bank Details", icon: <FiCreditCard /> },
    { number: 4, title: "Documents", icon: <FiFileText /> },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Personal Information
              </h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Business Information
              </h3>
              <p className="text-gray-600">Details about your business</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID (GST/EIN) *
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="GST123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="businessRegistrationNumber"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="CIN/Udyam Number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Description *
              </label>
              <textarea
                name="storeDescription"
                value={formData.storeDescription}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe your store and products..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Bank Account Details
              </h3>
              <p className="text-gray-600">
                For receiving payments and payouts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name *
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., State Bank of India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name *
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Name as in bank account"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="SBIN0001234"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-3">
                <FiShield className="text-blue-600 text-xl mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Secure Banking Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your bank details are encrypted and stored securely. We use
                    bank-level security protocols to protect your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Document Upload
              </h3>
              <p className="text-gray-600">
                Upload required documents for verification
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <FiUpload className="text-3xl text-gray-400 mx-auto" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Identity Proof
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  PAN Card, Aadhaar Card, or Passport
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload("idProof", e.target.files[0])
                  }
                  className="hidden"
                  id="idProof"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="idProof"
                  className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer transition-colors"
                >
                  Upload File
                </label>
                {documentUploads.idProof && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documentUploads.idProof.name}
                  </p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <FiHome className="text-3xl text-gray-400 mx-auto" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Address Proof
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Utility bill, Rental agreement, or Bank statement
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload("addressProof", e.target.files[0])
                  }
                  className="hidden"
                  id="addressProof"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="addressProof"
                  className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer transition-colors"
                >
                  Upload File
                </label>
                {documentUploads.addressProof && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documentUploads.addressProof.name}
                  </p>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <FiBriefcase className="text-3xl text-gray-400 mx-auto" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Business Proof
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  GST certificate, Trade license, or Incorporation certificate
                </p>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload("businessProof", e.target.files[0])
                  }
                  className="hidden"
                  id="businessProof"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="businessProof"
                  className="inline-block px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer transition-colors"
                >
                  Upload File
                </label>
                {documentUploads.businessProof && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {documentUploads.businessProof.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-gray-700 font-medium">
                    I agree to the Seller Terms & Conditions *
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    By checking this box, you agree to our Seller Agreement,
                    Privacy Policy, and Commission structure.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  Receive updates about seller features, promotions, and
                  platform news
                </span>
              </label>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-600 text-xl mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Verification Process
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • Documents will be verified within 2-3 business days
                    </li>
                    <li>
                      • You'll receive email notifications about your
                      application status
                    </li>
                    <li>
                      • Once approved, you can start listing products
                      immediately
                    </li>
                    <li>
                      • For any issues, contact seller-support@forever.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Become a Seller
              </h1>
              <p className="text-gray-600 mt-1">
                Start selling on Forever and reach millions of customers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FiBriefcase className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Step {step} of 4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Progress & Benefits */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Registration Steps
              </h2>
              <div className="space-y-4">
                {steps.map((s) => (
                  <div
                    key={s.number}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      step === s.number
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step === s.number
                          ? "bg-blue-600 text-white"
                          : step > s.number
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step > s.number ? <FiCheckCircle /> : s.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Step {s.number}
                      </p>
                      <p className="text-sm text-gray-600">{s.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Seller Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Zero registration fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Access to 1M+ customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">15% commission rate</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">7-day payment cycles</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">24/7 seller support</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-gray-700">
                    Free shipping label generation
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our seller support team is here to help you through the
                registration process.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">📧 seller-support@forever.com</p>
                <p className="text-gray-700">📞 +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t">
                <div>
                  {step > 1 && (
                    <button
                      onClick={handlePrev}
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    >
                      ← Previous Step
                    </button>
                  )}
                </div>
                <div className="flex gap-4">
                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
                    >
                      Continue to Next Step
                      <FiArrowRight />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.agreeToTerms}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-colors ${
                        formData.agreeToTerms
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FiCheckCircle />
                      Submit Application
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Ready to Start Selling?
                  </h3>
                  <p className="text-gray-300">
                    Complete your registration and get access to our seller
                    dashboard within 24 hours.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold transition-colors">
                    View Seller Dashboard Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
