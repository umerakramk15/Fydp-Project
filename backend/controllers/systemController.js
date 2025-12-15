const systemController = {
  async getSystemStatus(req, res) {
    try {
      const status = {
        status: "online",
        timestamp: new Date().toISOString(),
        service: "E-commerce API",
        version: "1.0.0",
        uptime: process.uptime(),
        endpoints: 56, // Updated count
        environment: process.env.NODE_ENV || "development",
        database: "MongoDB",
        features: [
          "Multi-vendor Support",
          "Role-based Access (Buyer/Seller/Admin)",
          "Product Management",
          "Order Processing",
          "Shopping Cart",
          "Payment Integration",
          "Refund System",
        ],
      };

      res.status(200).json({
        success: true,
        data: status,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async getApiEndpoints(req, res) {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}/api/v1`;

      const endpoints = {
        summary: {
          total_endpoints: 56,
          authentication_types: ["Public", "Buyer", "Seller", "Admin"],
          models_used: ["User", "Product", "Order", "Cart", "Store"],
          last_updated: "2024-01-15",
        },

        // ===================== AUTH ENDPOINTS =====================
        auth: {
          base_path: `${baseUrl}/auth`,
          endpoints: [
            {
              method: "POST",
              path: "/register",
              auth_required: false,
              description: "Register new user",
              required_fields: {
                firstName: "string",
                lastName: "string",
                email: "string",
                password: "string",
                role: "string (buyer/seller/admin)",
              },
              optional_fields: {
                addresses: "array",
                creditCards: "array",
              },
              response_example: {
                success: "boolean",
                data: "User object",
                token: "JWT token",
              },
            },
            {
              method: "POST",
              path: "/login",
              auth_required: false,
              description: "User login",
              required_fields: {
                email: "string",
                password: "string",
              },
              response_example: {
                success: "boolean",
                token: "JWT token",
                user: "User object",
              },
            },
            {
              method: "POST",
              path: "/logout",
              auth_required: true,
              description: "User logout",
              response_example: {
                success: "boolean",
                message: "Logged out successfully",
              },
            },
            {
              method: "GET",
              path: "/me",
              auth_required: true,
              role_required: "Any",
              description: "Get current user profile",
              response_example: {
                success: "boolean",
                data: "Complete user object with addresses, cards, etc.",
              },
            },
          ],
        },

        // ===================== PRODUCT ENDPOINTS =====================
        products: {
          base_path: `${baseUrl}/products`,
          endpoints: [
            {
              method: "GET",
              path: "/public",
              auth_required: false,
              description: "Get all published products (public)",
              query_params: {
                page: "number (optional)",
                limit: "number (optional)",
                category: "string (optional)",
                minPrice: "number (optional)",
                maxPrice: "number (optional)",
              },
            },
            {
              method: "GET",
              path: "/:id",
              auth_required: false,
              description: "Get single product by ID or slug",
              params: {
                id: "Product ID or slug",
              },
            },
            {
              method: "POST",
              path: "/seller/create",
              auth_required: true,
              role_required: "seller",
              description: "Seller creates product",
              content_type: "multipart/form-data",
              required_fields: {
                name: "string",
                description: "string",
                price: "number",
                stock: "number",
                "category.main": "string",
              },
              optional_fields: {
                images: "array of files (max 10)",
                comparePrice: "number",
                brand: "string",
                color: "string",
                size: "array",
                tags: "array",
              },
            },
          ],
        },

        // ===================== CART ENDPOINTS =====================
        cart: {
          base_path: `${baseUrl}/cart`,
          endpoints: [
            {
              method: "POST",
              path: "/",
              auth_required: true,
              role_required: "buyer",
              description: "Add item to cart",
              required_fields: {
                productId: "string (Product ID)",
                quantity: "number",
              },
            },
            {
              method: "GET",
              path: "/",
              auth_required: true,
              role_required: "buyer",
              description: "Get user's cart",
              response_structure: {
                items: "array of cart items",
                subTotal: "number",
              },
            },
          ],
        },

        // ===================== ORDER ENDPOINTS =====================
        orders: {
          base_path: `${baseUrl}/orders`,
          endpoints: [
            {
              method: "POST",
              path: "/",
              auth_required: true,
              role_required: "buyer",
              description: "Create order from cart",
              required_fields: {
                shippingAddress: "object",
                paymentMethod: "string (cod/card/paypal)",
              },
            },
            {
              method: "GET",
              path: "/my-orders",
              auth_required: true,
              role_required: "buyer",
              description: "Get user's orders",
              query_params: {
                status: "string (optional)",
                page: "number (optional)",
                limit: "number (optional)",
              },
            },
          ],
        },

        // ===================== SELLER ENDPOINTS =====================
        seller: {
          base_path: `${baseUrl}/seller`,
          endpoints: [
            {
              method: "POST",
              path: "/register",
              auth_required: true,
              description: "Register as seller (buyer to seller)",
              required_fields: {
                businessName: "string",
                businessType: "string",
              },
            },
            {
              method: "GET",
              path: "/dashboard",
              auth_required: true,
              role_required: "seller",
              description: "Get seller dashboard stats",
            },
            {
              method: "POST",
              path: "/stores",
              auth_required: true,
              role_required: "seller",
              description: "Create store",
              content_type: "multipart/form-data",
              required_fields: {
                name: "string",
                slug: "string",
              },
            },
          ],
        },

        // ===================== ADMIN ENDPOINTS =====================
        admin: {
          base_path: `${baseUrl}/admin`,
          endpoints: [
            {
              method: "GET",
              path: "/users",
              auth_required: true,
              role_required: "admin",
              description: "Get all users",
              query_params: {
                role: "string (optional)",
                page: "number (optional)",
              },
            },
            {
              method: "PUT",
              path: "/users/:id/role",
              auth_required: true,
              role_required: "admin",
              description: "Update user role",
              params: { id: "User ID" },
              body: { role: "string (buyer/seller/admin)" },
            },
            {
              method: "GET",
              path: "/stats",
              auth_required: true,
              role_required: "admin",
              description: "Get platform analytics",
            },
          ],
        },

        // ===================== PAYMENT ENDPOINTS =====================
        payment: {
          base_path: `${baseUrl}/payment`,
          note: "⚠️ Payment gateway integration pending",
          endpoints: [
            {
              method: "POST",
              path: "/initiate",
              auth_required: true,
              role_required: "buyer",
              description: "Initiate payment (COD only for now)",
              body: { orderId: "string", amount: "number" },
            },
            {
              method: "GET",
              path: "/methods",
              auth_required: false,
              description: "Get available payment methods",
              note: "Currently only COD is active",
            },
          ],
        },

        // ===================== REFUND ENDPOINTS =====================
        refund: {
          base_path: `${baseUrl}/refund`,
          endpoints: [
            {
              method: "POST",
              path: "/request",
              auth_required: true,
              role_required: "buyer",
              description: "Request refund for order",
              required_fields: {
                orderId: "string",
                reason: "string",
              },
            },
          ],
        },

        // ===================== DATA MODELS REFERENCE =====================
        models_reference: {
          User: {
            required: ["firstName", "lastName", "email", "password"],
            optional: ["role", "addresses", "sellerProfile"],
            role_values: ["buyer", "seller", "admin"],
          },
          Product: {
            required: [
              "name",
              "description",
              "price",
              "stock",
              "seller",
              "store",
            ],
            optional: ["images", "variants", "discount", "seo", "tags"],
            status_values: [
              "draft",
              "active",
              "inactive",
              "out_of_stock",
              "archived",
            ],
          },
          Order: {
            required: [
              "orderNumber",
              "user",
              "items",
              "total",
              "shippingAddress",
            ],
            payment_status: ["pending", "paid", "failed", "refunded"],
            order_status: [
              "pending",
              "confirmed",
              "shipped",
              "delivered",
              "cancelled",
            ],
          },
        },

        // ===================== COMMON RESPONSE FORMATS =====================
        response_formats: {
          success_response: {
            success: "true",
            data: "response data",
            message: "optional message",
          },
          error_response: {
            success: "false",
            message: "error message",
            error_code: "optional error code",
          },
          pagination_response: {
            success: "true",
            data: "array of items",
            pagination: {
              page: "current page",
              limit: "items per page",
              total: "total items",
              pages: "total pages",
            },
          },
        },

        // ===================== AUTHENTICATION =====================
        authentication: {
          jwt_token: "Required in Authorization header as 'Bearer <token>'",
          token_lifetime: "7 days",
          public_endpoints: [
            "/auth/register",
            "/auth/login",
            "/products/public",
            "/products/:id",
          ],
          role_access: {
            buyer: ["cart", "orders", "/auth/me"],
            seller: ["/seller/*", "products/seller/*"],
            admin: ["/admin/*", "all endpoints"],
          },
        },
      };

      res.status(200).json({
        success: true,
        data: endpoints,
        documentation:
          "Use this reference for frontend integration. All required fields must be provided for successful requests.",
      });
    } catch (error) {
      console.error("Endpoint error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate endpoint documentation",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

  // NEW: Get specific endpoint details
  async getEndpointDetails(req, res) {
    try {
      const { endpoint } = req.params;
      const allEndpoints = await this.getAllEndpointsData();

      const endpointData = allEndpoints.find(
        (ep) => ep.path === `/${endpoint}` || ep.path.includes(endpoint)
      );

      if (!endpointData) {
        return res.status(404).json({
          success: false,
          message: `Endpoint '${endpoint}' not found`,
        });
      }

      res.status(200).json({
        success: true,
        data: endpointData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  // Helper method to get all endpoints (could be extracted)
  async getAllEndpointsData() {
    // This would be populated from your actual routes
    return [
      // Sample data - you would generate this from your route definitions
      {
        method: "POST",
        path: "/auth/register",
        description: "User registration",
        auth_required: false,
        required_fields: ["firstName", "lastName", "email", "password"],
      },
    ];
  },
};

export default systemController;
