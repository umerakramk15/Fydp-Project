import { useState } from "react";
import {
  FiCreditCard,
  FiTrash2,
  FiCheck,
  FiPlus,
  FiLock,
  FiShield,
  // FiPaypal,
} from "react-icons/fi";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      lastFour: "4242",
      cardHolder: "YUSRA JOHNSON",
      expiryDate: "12/25",
      isDefault: true,
      brandColor: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      type: "mastercard",
      lastFour: "8888",
      cardHolder: "YUSRA JOHNSON",
      expiryDate: "08/24",
      isDefault: false,
      brandColor: "bg-red-600",
      textColor: "text-red-600",
    },
    {
      id: 3,
      type: "paypal",
      email: "yusra@example.com",
      isDefault: false,
      brandColor: "bg-blue-500",
      textColor: "text-blue-500",
    },
  ]);

  const [showCardForm, setShowCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
    type: "visa",
  });

  const handleAddCard = () => {
    if (
      newCard.cardNumber.length >= 16 &&
      newCard.cardHolder &&
      newCard.expiryDate &&
      newCard.cvv.length >= 3
    ) {
      const lastFour = newCard.cardNumber.slice(-4);
      const newPaymentMethod = {
        id: paymentMethods.length + 1,
        type: newCard.type,
        lastFour: lastFour,
        cardHolder: newCard.cardHolder.toUpperCase(),
        expiryDate: newCard.expiryDate,
        isDefault: newCard.isDefault,
        brandColor:
          newCard.type === "visa"
            ? "bg-blue-600"
            : newCard.type === "mastercard"
            ? "bg-red-600"
            : "bg-blue-500",
        textColor:
          newCard.type === "visa"
            ? "text-blue-600"
            : newCard.type === "mastercard"
            ? "text-red-600"
            : "text-blue-500",
      };

      if (newCard.isDefault) {
        setPaymentMethods((prev) =>
          prev.map((pm) => ({ ...pm, isDefault: false }))
        );
      }

      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setNewCard({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
        type: "visa",
      });
      setShowCardForm(false);
      alert("Card added successfully!");
    } else {
      alert("Please fill all required fields correctly");
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    const methodToDelete = paymentMethods.find((pm) => pm.id === id);
    if (methodToDelete.isDefault && paymentMethods.length > 1) {
      alert(
        "You cannot delete your default payment method. Please set another method as default first."
      );
      return;
    }

    if (
      window.confirm("Are you sure you want to delete this payment method?")
    ) {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    }
  };

  const getCardIcon = (type) => {
    switch (type) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "MASTERCARD";
      case "paypal":
        return <FiPaypal className="text-2xl" />;
      default:
        return "💳";
    }
  };

  const formatCardNumber = (number) => {
    return number.replace(/\d{4}(?=.)/g, "$& ");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your saved payment options
          </p>
        </div>
        <button
          onClick={() => setShowCardForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FiPlus size={16} />
          Add Payment Method
        </button>
      </div>

      {showCardForm && (
        <div className="mb-8 p-6 border border-blue-200 rounded-2xl bg-blue-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Add New Card
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-12"
                  value={formatCardNumber(newCard.cardNumber)}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      cardNumber: e.target.value
                        .replace(/\s/g, "")
                        .replace(/\D/g, "")
                        .slice(0, 16),
                    })
                  }
                  maxLength={19}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FiCreditCard className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                placeholder="JOHN DOE"
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={newCard.cardHolder}
                onChange={(e) =>
                  setNewCard({ ...newCard, cardHolder: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={newCard.expiryDate}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      expiryDate: e.target.value
                        .replace(/\D/g, "")
                        .replace(/^(\d{2})/, "$1/")
                        .slice(0, 5),
                    })
                  }
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="123"
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newCard.cvv}
                    onChange={(e) =>
                      setNewCard({
                        ...newCard,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                      })
                    }
                    maxLength={3}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FiLock className="text-gray-400" size={14} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Type
              </label>
              <select
                className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({ ...newCard, type: e.target.value })
                }
              >
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="amex">American Express</option>
              </select>
            </div>

            <div className="flex items-center h-full">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newCard.isDefault}
                  onChange={(e) =>
                    setNewCard({ ...newCard, isDefault: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">
                  Set as default payment method
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddCard}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
            >
              Save Card
            </button>
            <button
              onClick={() => {
                setShowCardForm(false);
                setNewCard({
                  cardNumber: "",
                  cardHolder: "",
                  expiryDate: "",
                  cvv: "",
                  isDefault: false,
                  type: "visa",
                });
              }}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
            <FiShield className="text-gray-400 mt-0.5" />
            <p>
              Your card details are securely encrypted. We never store your CVV
              code.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-2xl p-6 relative transition-all duration-200 hover:shadow-md ${
              method.isDefault
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {method.isDefault && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium">
                <FiCheck /> DEFAULT
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-8 ${method.brandColor} rounded-lg flex items-center justify-center text-white font-bold text-sm`}
                >
                  {getCardIcon(method.type)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {method.type === "paypal"
                      ? "PayPal"
                      : `${
                          method.type.charAt(0).toUpperCase() +
                          method.type.slice(1)
                        } **** ${method.lastFour}`}
                  </div>
                  <div className="text-sm text-gray-600">
                    {method.type === "paypal"
                      ? method.email
                      : method.cardHolder}
                  </div>
                </div>
              </div>
            </div>

            {method.type !== "paypal" && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">
                  Expires {method.expiryDate}
                </div>
                <div className="text-xs text-gray-500">
                  Card is active and ready to use
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-sm font-medium">
                <span className={method.textColor}>
                  {method.type === "visa" && "Visa"}
                  {method.type === "mastercard" && "MasterCard"}
                  {method.type === "paypal" && "PayPal Account"}
                </span>
              </div>

              <div className="flex gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-300 mb-4 text-6xl">💳</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No payment methods
          </h3>
          <p className="text-gray-500 mb-6">
            Add a payment method to make purchases faster
          </p>
          <button
            onClick={() => setShowCardForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium"
          >
            <FiPlus size={16} />
            Add Your First Payment Method
          </button>
        </div>
      )}

      {/* Security Info */}
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <FiShield className="text-blue-600 text-xl" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">
              Secure Payment Processing
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              All payment information is encrypted using bank-level 256-bit SSL
              encryption. We are PCI DSS compliant and never store your CVV
              code.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                SSL Encrypted
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                PCI DSS Compliant
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                3D Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
