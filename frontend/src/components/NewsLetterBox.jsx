import React, { useState } from "react";
import { FiMail, FiCheck, FiSend } from "react-icons/fi";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <FiMail className="text-blue-400" />
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Stay Updated
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe & Get <span className="text-blue-400">20% Off</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Be the first to know about new collections, exclusive offers, and
            style tips
          </p>
        </div>

        {subscribed ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-white/90 mb-6">
              You've been successfully subscribed to our newsletter.
            </p>
            <p className="text-sm text-white/70">
              Check your email for the 20% discount code.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmitHandler}
            className="max-w-2xl mx-auto"
            aria-labelledby="newsletter-label"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group min-w-[180px]"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <FiSend className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Exclusive Discounts
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Early Access to Sales
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Style Tips & Trends
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-center text-sm text-gray-400 mt-8">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </form>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-300 text-sm">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300 text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300 text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">0 Spam</div>
            <div className="text-gray-300 text-sm">Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterBox;
