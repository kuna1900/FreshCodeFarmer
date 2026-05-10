# FreshCode Farmers - Direct Farmer-to-Consumer Marketplace

> BGI Hackathon 2026 - Agriculture, FoodTech & Rural Innovation  
> Problem Statement: BT3P2 - Direct Farmer-To-Consumer Digital Marketplace Platform

## 🌾 Overview

**FreshCode Farmers** is a modern, full-stack agriculture marketplace web application that connects farmers directly with consumers, eliminating middlemen and ensuring fair pricing for both parties. The platform empowers farmers with direct market access while providing consumers with fresh, affordable, and transparent produce sourcing.

## ✨ Key Features

### For Consumers
- Browse fresh products by category (Vegetables, Fruits, Dairy, Grains)
- Advanced search and filtering
- Add products to cart with quantity management
- Secure checkout with multiple payment options (UPI, Card, Cash on Delivery)
- Order tracking with visual timeline
- Order history and profile management
- Product ratings and reviews

### For Farmers
- Complete dashboard to manage products
- Add, edit, and delete product listings
- Track orders and earnings
- View sales analytics
- Inventory management

### For Administrators
- User management system
- Product oversight
- Order management
- Revenue analytics
- Platform statistics

## 🛠️ Technology Stack

- **Frontend**: React.js + TypeScript
- **Routing**: React Router v7 (Data Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Storage**: LocalStorage (for demo/prototype)
- **Build Tool**: Vite
- **Font**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm installed

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
The Vite dev server is already running in this environment.

4. Open your browser and access the application through the preview surface

## 👥 Demo Accounts

The application comes with pre-configured demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@freshcode.com | admin123 |
| **Farmer** | ramesh@farmer.com | farmer123 |
| **Consumer** | priya@consumer.com | consumer123 |

## 📱 Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar with cart
│   │   ├── Footer.tsx          # Footer with social links
│   │   └── RootLayout.tsx      # Main layout wrapper
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication state management
│   │   └── CartContext.tsx     # Shopping cart state management
│   ├── pages/
│   │   ├── Home.tsx            # Landing page with hero section
│   │   ├── Login.tsx           # Login page
│   │   ├── Signup.tsx          # Registration page
│   │   ├── Products.tsx        # Product listing with filters
│   │   ├── ProductDetails.tsx  # Individual product page
│   │   ├── Cart.tsx            # Shopping cart
│   │   ├── Checkout.tsx        # Checkout and payment
│   │   ├── FarmerDashboard.tsx # Farmer management panel
│   │   ├── ConsumerDashboard.tsx # Consumer order history
│   │   ├── OrderTracking.tsx   # Order tracking timeline
│   │   └── AdminPanel.tsx      # Admin management
│   ├── utils/
│   │   └── initializeData.ts   # Demo data initialization
│   ├── routes.tsx              # React Router configuration
│   └── App.tsx                 # Root component
└── styles/
    ├── fonts.css               # Font imports
    └── theme.css               # Tailwind theme configuration
```

## 🎯 Key Workflows

### Consumer Journey
1. Browse products by category or search
2. View product details with farmer information
3. Add items to cart
4. Proceed to checkout
5. Enter delivery address
6. Select payment method
7. Place order and receive order ID
8. Track order status
9. View order history in dashboard

### Farmer Journey
1. Login as farmer
2. Access farmer dashboard
3. Add new products with details (name, price, category, stock)
4. View and manage product listings
5. Monitor orders and earnings
6. Track sales analytics

### Admin Journey
1. Login as admin
2. View platform statistics (users, products, orders, revenue)
3. Manage users
4. Oversee product listings
5. Monitor recent orders

## 🌟 Unique Features

- **Zero Middlemen**: Direct connection between farmers and consumers
- **Fair Pricing**: Transparent pricing benefiting both parties
- **LocalStorage Persistence**: All data persists across sessions
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Modern UI/UX**: Clean, eco-friendly green theme with smooth animations
- **Real-time Updates**: Cart and order status update instantly
- **Guest Browsing**: Users can browse without login
- **Demo Mode**: Pre-loaded with sample data for testing

## 🎨 Design Highlights

- Modern, startup-style UI with eco-friendly green color palette
- Smooth animations and hover effects
- Rounded cards and contemporary buttons
- Responsive Bootstrap-like grid system
- Attractive hero section
- Professional typography (Inter font family)
- Consistent design language across all pages

## 📊 Impact & Benefits

### Economic
- Higher income for farmers by eliminating middlemen
- Reduced costs for consumers through direct sourcing

### Social
- Farmer empowerment and better rural livelihoods
- Support for local vendors and regional trade

### Environmental
- Reduced transportation and lower carbon footprint
- Promotes sustainable farming practices

### Technological
- Promotes digital adoption in rural areas
- Provides accessible technology for all user groups

## 🔒 Security Features (Production Ready)

For production deployment, implement:
- JWT-based authentication
- Encrypted password storage (bcrypt)
- HTTPS/SSL certificates
- CSRF protection
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure payment gateway integration (Razorpay/Stripe)

## 🚀 Future Enhancements

- Backend integration with Node.js/Java
- MySQL/PostgreSQL database
- Real payment gateway integration (UPI, Razorpay)
- SMS/Email notifications
- Real-time chat between farmers and consumers
- AI-based product recommendations
- Multi-language support
- Mobile app (React Native)
- GPS-based farmer location
- Weather integration for farmers
- Crop advisory system

## 📝 License

This project was developed for BGI Hackathon 2026.

## 👨‍💻 Team

**Team Name**: FreshCode Farmers  
**Problem Statement**: BT3P2 - Direct Farmer-To-Consumer Digital Marketplace Platform  
**Theme**: Agriculture, FoodTech & Rural Innovation

---

Built with ❤️ for Indian farmers and consumers
