// App.js
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './App.css';

// Import all your components and pages...
import { AdminAuthProvider } from './admin/AdminAuthContext';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import Analytics from './admin/Analytics';
import MenuManagement from './admin/MenuManagement';
import OrderManagement from './admin/OrderManagement';
import RestaurantDashboard from './admin/RestaurantDashboard';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import Reviews from './pages/Reviews';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <MenuProvider>
            <AdminAuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <Navbar />
              
              {/* MODIFICATION: Added 'pt-24' for padding between Navbar and page content */}
              <main className="main-content pt-24">
                <Routes>
                  {/* User routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<RestaurantDashboard />} />
                    <Route path="dashboard" element={<RestaurantDashboard />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="menu" element={<MenuManagement />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="reservations" element={<AdminPanel />} />
                  </Route>
                </Routes>
              </main>
              
              <Footer />
                          </Router>
              </AdminAuthProvider>
            </MenuProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;