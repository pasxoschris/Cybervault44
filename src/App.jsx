import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SpotlightPOSGuide from './pages/SpotlightPOSGuide';
import CreateOrder from './pages/tutorial/CreateOrder';
import Discount from './pages/tutorial/Discount';
import EditOrder from './pages/tutorial/EditOrder';
import Installation from './pages/tutorial/Installation';
import Invoice from './pages/tutorial/Invoice';
import Login from './pages/tutorial/Login';
import OrderDetails from './pages/tutorial/OrderDetails';
import Scenarios from './pages/tutorial/Scenarios';
import Shift from './pages/tutorial/Shift';
import StartShift from './pages/tutorial/StartShift';
import Settings from './pages/tutorial/Settings';
import Faults from './pages/Faults';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/spotlight-pos-guide" element={<SpotlightPOSGuide />} />
      <Route path="/tutorial/create-order" element={<CreateOrder />} />
      <Route path="/tutorial/discount" element={<Discount />} />
      <Route path="/tutorial/edit-order" element={<EditOrder />} />
      <Route path="/tutorial/installation" element={<Installation />} />
      <Route path="/tutorial/invoice" element={<Invoice />} />
      <Route path="/tutorial/login" element={<Login />} />
      <Route path="/tutorial/order-details" element={<OrderDetails />} />
      <Route path="/tutorial/scenarios" element={<Scenarios />} />
      <Route path="/tutorial/start-shift" element={<StartShift />} />
      <Route path="/tutorial/settings" element={<Settings />} />
      <Route path="/faults" element={<Faults />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App