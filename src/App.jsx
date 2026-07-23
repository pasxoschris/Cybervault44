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
import TransferOrder from './pages/tutorial/TransferOrder';
import MergeOrders from './pages/tutorial/MergeOrders';
import Login from './pages/tutorial/Login';
import OrderDetails from './pages/tutorial/OrderDetails';
import Scenarios from './pages/tutorial/Scenarios';
import Shift from './pages/tutorial/Shift';
import StartShift from './pages/tutorial/StartShift';
import Settings from './pages/tutorial/Settings';
import ServiceDesk from './pages/ServiceDesk';
import Whitelist from './pages/admin/Whitelist';
import RoleSelection from './pages/RoleSelection';
import RolePath from './pages/RolePath';
import PlaceholderLesson from './pages/tutorial/PlaceholderLesson';
import InitialScreenCashier from './pages/tutorial/cashier/InitialScreen';
import AccompanimentsCashier from './pages/tutorial/cashier/Accompaniments';
import OrderItemsCashier from './pages/tutorial/cashier/OrderItems';
import SwipeActionsCashier from './pages/tutorial/cashier/SwipeActions';
import PaymentsCashier from './pages/tutorial/cashier/Payments';
import SettingsCashier from './pages/tutorial/cashier/Settings';
import InvoiceCashier from './pages/tutorial/cashier/Invoice';
import SplitCashier from './pages/tutorial/cashier/Split';
import Payment from './pages/tutorial/Payment';
import Assistant from './pages/academy/Assistant';
import Stores from './pages/stores/Stores';
import StoreDetails from './pages/stores/StoreDetails';
import StoreNew from './pages/stores/StoreNew';
import StoreEdit from './pages/stores/StoreEdit';
import ResellerConsole from './pages/ResellerConsole';
import PublicOfferPage from './pages/PublicOfferPage';
import ServiceDeskAdmin from './pages/admin/ServiceDeskAdmin';

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
      <Route path="/tutorial/transfer-order" element={<TransferOrder />} />
      <Route path="/tutorial/merge-orders" element={<MergeOrders />} />
      <Route path="/tutorial/login" element={<Login />} />
      <Route path="/tutorial/order-details" element={<OrderDetails />} />
      <Route path="/tutorial/scenarios" element={<Scenarios />} />
      <Route path="/tutorial/start-shift" element={<StartShift />} />
      <Route path="/tutorial/settings" element={<Settings />} />
      <Route path="/service-desk" element={<ServiceDesk />} />
      <Route path="/admin/whitelist" element={<Whitelist />} />
      {/* Academy / Role-based learning */}
      <Route path="/spotlight-pos-guide/roles" element={<RoleSelection />} />
      <Route path="/academy/:roleId" element={<RolePath />} />
      {/* Payment & Shift (were missing) */}
      <Route path="/tutorial/payment" element={<Payment />} />
      <Route path="/tutorial/shift" element={<Shift />} />
      <Route path="/academy/assistant" element={<Assistant />} />
      {/* Store Registry */}
      <Route path="/stores" element={<Stores />} />
      <Route path="/stores/new" element={<StoreNew />} />
      <Route path="/stores/:id" element={<StoreDetails />} />
      <Route path="/stores/:id/edit" element={<StoreEdit />} />
      <Route path="/reseller-console" element={<ResellerConsole />} />
      <Route path="/offers/:publicToken" element={<PublicOfferPage />} />
      <Route path="/admin/service-desk-admin" element={<ServiceDeskAdmin />} />
      {/* Placeholder lessons for all other roles */}
      <Route path="/tutorial/maitre-service/*" element={<PlaceholderLesson />} />
      <Route path="/tutorial/maitre-mode/*" element={<PlaceholderLesson />} />
      <Route path="/tutorial/cashier/initial-screen" element={<InitialScreenCashier />} />
      <Route path="/tutorial/cashier/accompaniments" element={<AccompanimentsCashier />} />
      <Route path="/tutorial/cashier/order-items" element={<OrderItemsCashier />} />
      <Route path="/tutorial/cashier/swipe-actions" element={<SwipeActionsCashier />} />
      <Route path="/tutorial/cashier/payments" element={<PaymentsCashier />} />
      <Route path="/tutorial/cashier/settings" element={<SettingsCashier />} />
      <Route path="/tutorial/cashier/invoice" element={<InvoiceCashier />} />
      <Route path="/tutorial/cashier/split" element={<SplitCashier />} />
      <Route path="/tutorial/cashier/*" element={<PlaceholderLesson />} />
      <Route path="/tutorial/backoffice/*" element={<PlaceholderLesson />} />
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