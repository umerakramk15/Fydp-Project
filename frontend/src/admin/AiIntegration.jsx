// pages/AIIntegrations.js
import  { useState } from 'react';
import { Brain, Zap, Shield, BarChart3, Sparkles } from 'lucide-react';

const AIIntegrations = () => {
  const [aiFeatures, setAiFeatures] = useState([
    {
      id: 1,
      name: 'Smart Product Recommendations',
      description: 'AI-powered personalized product suggestions for customers',
      enabled: true,
      type: 'customer-facing'
    },
    {
      id: 2,
      name: 'Dynamic Pricing Engine',
      description: 'Automatically adjust prices based on demand and competition',
      enabled: true,
      type: 'revenue'
    },
    {
      id: 3,
      name: 'Fraud Detection',
      description: 'AI models to detect and prevent fraudulent transactions',
      enabled: false,
      type: 'security'
    },
    {
      id: 4,
      name: 'Customer Sentiment Analysis',
      description: 'Analyze reviews and feedback to understand customer satisfaction',
      enabled: true,
      type: 'analytics'
    },
    {
      id: 5,
      name: 'Inventory Forecasting',
      description: 'Predict inventory needs and optimize stock levels',
      enabled: false,
      type: 'operations'
    }
  ]);

  const toggleFeature = (id) => {
    setAiFeatures(features =>
      features.map(feature =>
        feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
      )
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'customer-facing':
        return Sparkles;
      case 'revenue':
        return BarChart3;
      case 'security':
        return Shield;
      case 'analytics':
        return Brain;
      case 'operations':
        return Zap;
      default:
        return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Integrations</h1>
          <p className="text-gray-600">Manage and configure AI-powered features for your store</p>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiFeatures.map((feature) => {
          const Icon = getIcon(feature.type);
          return (
            <div key={feature.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    feature.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      feature.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              
              {feature.enabled && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-sm text-green-800">
                    <Zap className="h-4 w-4 mr-1" />
                    AI is actively analyzing data and making recommendations
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <div className="text-sm text-gray-600">Recommendation Accuracy</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$12.5K</div>
            <div className="text-sm text-gray-600">Revenue from AI Suggestions</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3.2x</div>
            <div className="text-sm text-gray-600">ROI on AI Implementation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIIntegrations;