import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiUser,
  FiMessageSquare,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiExternalLink,
} from "react-icons/fi";
import { motion } from "framer-motion";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", phone: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Visit Our Store",
      details: [
        "52709 Williams Station",
        "Suite 350, Washington, DC 20001",
        "United States",
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "https://maps.google.com",
      linkText: "Get Directions",
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "Mon-Fri: 9AM-6PM EST",
        "Sat-Sun: 10AM-4PM EST",
      ],
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "tel:+15551234567",
      linkText: "Call Now",
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email Us",
      details: [
        "support@forever.com",
        "sales@forever.com",
        "careers@forever.com",
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "mailto:support@forever.com",
      linkText: "Send Email",
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM-6PM",
        "Saturday: 10AM-4PM",
        "Sunday: 12PM-4PM",
      ],
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      link: null,
    },
  ];

  const departments = [
    {
      name: "Customer Support",
      email: "support@forever.com",
      phone: "+1 (555) 123-4567",
      description: "Order inquiries, returns, and general questions",
    },
    {
      name: "Sales & Wholesale",
      email: "sales@forever.com",
      phone: "+1 (555) 123-4568",
      description: "Bulk orders and business partnerships",
    },
    {
      name: "Careers",
      email: "careers@forever.com",
      phone: "+1 (555) 123-4569",
      description: "Job opportunities and applications",
    },
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in original packaging. Returns are free for orders over $50.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for $9.99.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping takes 7-14 business days.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-blue-200">Touch</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're here to help! Reach out to us for any questions, feedback,
              or support you need.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`${info.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}
              >
                <span className={info.color}>{info.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {info.title}
              </h3>
              <div className="space-y-2 mb-6">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
              {info.link && (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {info.linkText}
                  <FiExternalLink />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiSend className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll respond to your message
                  shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FiUser className="text-gray-400" />
                        Your Name
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-gray-400" />
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" />
                      Phone Number (Optional)
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FiMessageSquare className="text-gray-400" />
                      Your Message
                    </div>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Departments & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Departments */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Departments
              </h2>
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {dept.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <a
                        href={`mailto:${dept.email}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {dept.email}
                      </a>
                      <a
                        href={`tel:${dept.phone}`}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        {dept.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
                <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-3">
                  View All FAQs →
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Connect With Us
              </h3>
              <p className="text-gray-600 mb-6">
                Follow us on social media for updates, style tips, and exclusive
                offers.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <FiFacebook size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                >
                  <FiTwitter size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-20">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Find Our Store
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="text-gray-700 font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-sm">
                      (Google Maps integration would go here)
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Store Hours
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: 12:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Parking</h3>
                  <p className="text-gray-600">
                    Free parking available in the adjacent lot. Valet service
                    available on weekends.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Accessibility
                  </h3>
                  <p className="text-gray-600">
                    Our store is wheelchair accessible with dedicated parking
                    spaces.
                  </p>
                </div>
                <button className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
