# 🛒 SabBecho - Modern E-Commerce Store

A full-featured, responsive e-commerce application built with React, Vite, and Tailwind CSS. Features advanced product browsing, intelligent search & filtering, shopping cart management, and a complete checkout flow with payment integration.

![SabBecho Homepage](./public/grid_view.png)

## ✨ Features

### 🏪 Product Management
- **Advanced Product Catalog** - Browse products with detailed information, images, and specifications
- **Multiple View Modes** - Switch between grid and list views for optimal browsing experience
- **Product Detail Pages** - Comprehensive product information with image galleries and reviews
- **Category-based Navigation** - Organized product categories for easy browsing

### 🔍 Search & Discovery
- **Smart Search Bar** - Real-time search with autocomplete suggestions
- **Advanced Filtering** - Filter by category, price range, brand, ratings, and availability
- **Sort Options** - Sort by price, popularity, ratings, and newest arrivals
- **Recent & Trending** - Quick access to recently viewed and trending products

![Search and Filters](./public/search.png)

### 🛍️ Shopping Experience
- **Intelligent Cart Management** - Add, remove, and update product quantities
- **Persistent Cart State** - Cart contents saved across browser sessions
- **Coupon System** - Apply discount codes for savings
- **Price Calculations** - Real-time subtotal, tax, and shipping calculations
- **Cart Badge** - Visual indicator of cart items in the header

### 💳 Checkout Process
- **Multi-Step Checkout** - Streamlined checkout with progress indication
- **Address Management** - Separate shipping and billing address forms
- **Shipping Options** - Multiple delivery options with pricing
- **Payment Integration** - Mock payment gateway with realistic flow
- **Order Confirmation** - Detailed order summary and confirmation

![Checkout Process](./public/checkout.png)

### 📱 User Experience
- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Loading States** - Elegant loading indicators for better user feedback
- **Error Handling** - Graceful error handling with user-friendly messages
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sab-becho.git
   cd sab-becho
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks and context
- **Vite 7.0.4** - Fast build tool and development server
- **React Router DOM 7.7.0** - Client-side routing and navigation
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### Icons & UI
- **Lucide React 0.525.0** - Beautiful, customizable icon library
- **Custom Components** - Reusable UI components built with Tailwind

### Development Tools
- **ESLint** - Code linting and quality checks
- **Vite Plugin React** - Hot module replacement and fast refresh

## 📁 Project Structure

```
sab-becho/
├── public/
│   ├── grid_view.png          # Homepage screenshot
│   ├── list-view.png          # List view screenshot  
│   ├── search.png             # Search & filters screenshot
│   ├── checkout.png           # Checkout process screenshot
│   └── vite.svg               # Vite logo
├── src/
│   ├── components/
│   │   ├── checkout/          # Checkout-related components
│   │   │   ├── BillingForm.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   ├── ShippingForm.jsx
│   │   │   └── ShippingOptions.jsx
│   │   ├── Cart.jsx           # Shopping cart sidebar
│   │   ├── Checkout.jsx       # Main checkout component
│   │   ├── FilterSidebar.jsx  # Product filtering component
│   │   ├── OrderConfirmation.jsx # Order success page
│   │   ├── PaymentStatusModal.jsx # Payment processing modal
│   │   ├── ProductCard.jsx    # Product display card
│   │   ├── ProductDetail.jsx  # Product detail page
│   │   ├── ProductListing.jsx # Product grid/list view
│   │   └── SearchBar.jsx      # Search with autocomplete
│   ├── context/
│   │   ├── CartContext.jsx    # Global cart state management
│   │   └── CheckoutContext.jsx # Checkout flow state
│   ├── data/
│   │   └── products.js        # Mock product data
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite build configuration
└── README.md                  # Project documentation
```

## 🎯 Key Components

### Context Providers
- **CartContext** - Manages cart state, items, coupons, and persistence
- **CheckoutContext** - Handles multi-step checkout flow and validation

### Core Components
- **ProductListing** - Main product catalog with grid/list views, sorting, and filtering
- **ProductDetail** - Detailed product view with specifications and add-to-cart
- **Cart** - Sliding cart sidebar with item management and totals
- **Checkout** - Multi-step checkout process with form validation
- **SearchBar** - Intelligent search with autocomplete and suggestions
- **FilterSidebar** - Advanced product filtering with multiple criteria

## 💡 Features in Detail

### Product Catalog
- Grid and list view toggle
- Product cards with images, titles, prices, and ratings
- Quick add-to-cart functionality
- Category-based browsing

### Advanced Search & Filtering
- Real-time search with autocomplete
- Filter by category, price range, brand, and ratings
- Sort by price, popularity, and ratings
- Recent searches and trending products

### Shopping Cart Management
- Add/remove products with quantity controls
- Persistent cart state using localStorage
- Coupon code system with validation
- Real-time price calculations including tax and shipping

### Checkout Flow
1. **Cart Review** - Review items and apply coupons
2. **Shipping Information** - Enter delivery address
3. **Billing Information** - Payment address (option to use shipping address)
4. **Shipping Options** - Choose delivery speed and cost
5. **Payment** - Mock payment processing with realistic flow
6. **Confirmation** - Order summary and tracking information

### Payment Integration
- Mock payment gateway with 90% success rate
- Payment processing simulation with loading states
- Transaction ID generation
- Payment failure handling with retry options
- **Note**: Currently using mock payment - real gateway integration planned

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration for:
- Custom color palette
- Responsive breakpoints
- Component utilities
- Animation classes

### Vite Configuration
Optimized build settings with:
- React plugin for fast refresh
- Build optimizations
- Development server configuration

## 🚀 Deployment

### Build Process
1. Run `npm run build` to create production build
2. The `dist/` folder contains optimized static files
3. Deploy to any static hosting service (Vercel, Netlify, etc.)

### Environment Variables
Create a `.env` file for configuration:
```env
VITE_API_URL=your_api_endpoint
VITE_PAYMENT_GATEWAY_KEY=your_payment_key
```

## 🧪 Testing

Run the linter to check for code quality:
```bash
npm run lint
```

## 📋 Roadmap

### Upcoming Features
- [ ] Real payment gateway integration (Stripe/PayPal)
- [ ] User authentication and accounts
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Multi-language support

### Backend Integration
- [ ] REST API development
- [ ] Database integration
- [ ] Inventory management
- [ ] Order processing system
- [ ] User management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help with the project:

- Open an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: Check the component files for detailed implementation

## 🌟 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Vite for the fast build tool

---

**SabBecho** - Your one-stop destination for modern e-commerce shopping! 🛍️