import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import SpotlightPOSGuide from './pages/SpotlightPOSGuide';
import CreateOrder from './pages/tutorial/CreateOrder';
import DiscountGeneral from './pages/tutorial/DiscountGeneral';
import DiscountOwn from './pages/tutorial/DiscountOwn';
import DiscountOther from './pages/tutorial/DiscountOther';
import EditOrder from './pages/tutorial/EditOrder';
import Installation from './pages/tutorial/Installation';
import Invoice from './pages/tutorial/Invoice';
import IssueReceipt from './pages/tutorial/IssueReceipt';
import TransferOrder from './pages/tutorial/TransferOrder';
import MergeOrders from './pages/tutorial/MergeOrders';
import Login from './pages/tutorial/Login';
import LoginDevice from './pages/tutorial/LoginDevice';
import OrderDetails from './pages/tutorial/OrderDetails';
import CancelProduct from './pages/tutorial/CancelProduct';
import CancelOrder from './pages/tutorial/CancelOrder';
import AddSimilar from './pages/tutorial/AddSimilar';
import CancelReceipt from './pages/tutorial/CancelReceipt';
import Shift from './pages/tutorial/Shift';
import ShiftAnalysis from './pages/tutorial/ShiftAnalysis';
import XReport from './pages/tutorial/XReport';
import ShiftClose from './pages/tutorial/ShiftClose';
import StartShift from './pages/tutorial/StartShift';
import SyncStatus from './pages/tutorial/SyncStatus';
import Settings from './pages/tutorial/Settings';
import ServiceDesk from './pages/ServiceDesk';
import Whitelist from './pages/admin/Whitelist';
import RoleSelection from './pages/RoleSelection';
import RolePath from './pages/RolePath';
import PlaceholderLesson from './pages/tutorial/PlaceholderLesson';
import B2GInvoices from './pages/tutorial/secure/B2GInvoices';
import OrderFlow from './pages/tutorial/secure/OrderFlow';
import Now from './pages/tutorial/secure/Now';
import SecureNavigation from './pages/tutorial/secure/Navigation';
import SecureChecklist from './pages/tutorial/secure/Checklist';
import SecurePrintNames from './pages/tutorial/secure/PrintNames';
import SecureInvoices from './pages/tutorial/secure/Invoices';
import SecureOverview from './pages/tutorial/secure/Overview';
import SecureTablesList from './pages/tutorial/secure/TablesList';
import SecureFloorPlan from './pages/tutorial/secure/FloorPlan';
import SecureSync from './pages/tutorial/secure/Sync';
import SecurePosDevices from './pages/tutorial/secure/PosDevices';
import SecureOtherDevices from './pages/tutorial/secure/OtherDevices';
import SecureEftpos from './pages/tutorial/secure/EftposTerminals';
import SecureCallerId from './pages/tutorial/secure/CallerId';
import SecureCustomerDisplay from './pages/tutorial/secure/CustomerDisplay';
import SecureModifiers from './pages/tutorial/secure/Modifiers';
import SecurePriceLists from './pages/tutorial/secure/PriceLists';
import SecureVatTypes from './pages/tutorial/secure/VatTypes';
import SecureFoodTypes from './pages/tutorial/secure/FoodTypes';
import SecureCourses from './pages/tutorial/secure/Courses';
import SecureBrands from './pages/tutorial/secure/Brands';
import SecureFavorites from './pages/tutorial/secure/Favorites';
import SecureCombos from './pages/tutorial/secure/Combos';
import SecureActionMessages from './pages/tutorial/secure/ActionMessages';
import SecureProductTags from './pages/tutorial/secure/ProductTags';
import SecureUsers from './pages/tutorial/secure/Users';
import SecureAdminCodeRights from './pages/tutorial/secure/AdminCodeRights';
import SecureRoles from './pages/tutorial/secure/Roles';
import SecureProducts from './pages/tutorial/secure/Products';
import SecurePrinters from './pages/tutorial/secure/Printers';
import InitialScreenCashier from './pages/tutorial/cashier/InitialScreen';
import AccompanimentsCashier from './pages/tutorial/cashier/Accompaniments';
import OrderItemsCashier from './pages/tutorial/cashier/OrderItems';
import SwipeActionsCashier from './pages/tutorial/cashier/SwipeActions';
import PaymentsCashier from './pages/tutorial/cashier/Payments';
import SettingsCashier from './pages/tutorial/cashier/Settings';
import InvoiceCashier from './pages/tutorial/cashier/Invoice';
import SplitCashier from './pages/tutorial/cashier/Split';
import DeliveryCashier from './pages/tutorial/cashier/Delivery';
import LoginCashier from './pages/tutorial/cashier/Login';
import OpenCashier from './pages/tutorial/cashier/Open';
import SyncStatusCashier from './pages/tutorial/cashier/SyncStatus';
import CloseCashier from './pages/tutorial/cashier/Close';
import PrinterWarning from './pages/tutorial/PrinterWarning';
import PrinterWarningCashier from './pages/tutorial/cashier/PrinterWarning';
import Payment from './pages/tutorial/Payment';
import PaymentCash from './pages/tutorial/PaymentCash';
import PaymentCard from './pages/tutorial/PaymentCard';
import PaymentSplit from './pages/tutorial/PaymentSplit';
import PaymentOnline from './pages/tutorial/PaymentOnline';
import PaymentCredit from './pages/tutorial/PaymentCredit';
import PaymentIris from './pages/tutorial/PaymentIris';
import Assistant from './pages/academy/Assistant';
import Stores from './pages/stores/Stores';
import StoreDetails from './pages/stores/StoreDetails';
import StoreNew from './pages/stores/StoreNew';
import StoreEdit from './pages/stores/StoreEdit';
import ResellerConsole from './pages/ResellerConsole';
import PublicOfferPage from './pages/PublicOfferPage';
import ServiceDeskAdmin from './pages/admin/ServiceDeskAdmin';
import AssistantQuestions from './pages/admin/AssistantQuestions';
import Connect from './pages/Connect';
import OAuthConsent from './pages/OAuthConsent';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Mfa from './pages/Mfa';

const AuthenticatedApp = () => {
  return (
    <Routes>
      {/* Custom auth pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/mfa" element={<Mfa />} />
      {/* Public offer page — no login required */}
      <Route path="/offers/:publicToken" element={<PublicOfferPage />} />
      {/* MCP OAuth consent — must stay outside any auth guard */}
      <Route path="/oauth/consent" element={<OAuthConsent />} />

      {/* Public corporate pages — no login required */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      {/* Δημόσια σελίδα παρουσίασης του Οδηγού — τα μαθήματα θέλουν σύνδεση */}
      <Route path="/spotlight-pos-guide" element={<SpotlightPOSGuide />} />
      {/* Δημόσιες οδηγίες σύνδεσης AI client (MCP) — η ίδια η πρόσβαση θέλει σύνδεση & whitelist */}
      <Route path="/connect" element={<Connect />} />

      {/* Everything else requires login */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
      <Route path="/tutorial/create-order" element={<CreateOrder />} />
      <Route path="/tutorial/discount" element={<DiscountGeneral />} />
      <Route path="/tutorial/discount-own" element={<DiscountOwn />} />
      <Route path="/tutorial/discount-other" element={<DiscountOther />} />
      <Route path="/tutorial/edit-order" element={<EditOrder />} />
      <Route path="/tutorial/installation" element={<Installation />} />
      <Route path="/tutorial/issue-receipt" element={<IssueReceipt />} />
      <Route path="/tutorial/invoice" element={<Invoice />} />
      <Route path="/tutorial/transfer-order" element={<TransferOrder />} />
      <Route path="/tutorial/merge-orders" element={<MergeOrders />} />
      <Route path="/tutorial/login" element={<Login />} />
      <Route path="/tutorial/login-device" element={<LoginDevice />} />
      <Route path="/tutorial/order-details" element={<OrderDetails />} />
      <Route path="/tutorial/cancel-product" element={<CancelProduct />} />
      <Route path="/tutorial/cancel-order" element={<CancelOrder />} />
      <Route path="/tutorial/add-similar" element={<AddSimilar />} />
      <Route path="/tutorial/cancel-receipt" element={<CancelReceipt />} />
      <Route path="/tutorial/start-shift" element={<StartShift />} />
      <Route path="/tutorial/sync-status" element={<SyncStatus />} />
      <Route path="/tutorial/printer-warning" element={<PrinterWarning />} />
      <Route path="/tutorial/settings" element={<Settings />} />
      <Route path="/service-desk" element={<ServiceDesk />} />
      <Route path="/admin/whitelist" element={<Whitelist />} />
      {/* Academy / Role-based learning */}
      <Route path="/spotlight-pos-guide/roles" element={<RoleSelection />} />
      <Route path="/academy/:roleId" element={<RolePath />} />
      {/* Payment & Shift (were missing) */}
      <Route path="/tutorial/payment" element={<Payment />} />
      <Route path="/tutorial/payment-cash" element={<PaymentCash />} />
      <Route path="/tutorial/payment-card" element={<PaymentCard />} />
      <Route path="/tutorial/split-payment" element={<PaymentSplit />} />
      <Route path="/tutorial/payment-online" element={<PaymentOnline />} />
      <Route path="/tutorial/payment-credit" element={<PaymentCredit />} />
      <Route path="/tutorial/payment-iris" element={<PaymentIris />} />
      <Route path="/tutorial/shift" element={<Shift />} />
      <Route path="/tutorial/x-report" element={<XReport />} />
      <Route path="/tutorial/shift-analysis" element={<ShiftAnalysis />} />
      <Route path="/tutorial/shift-close" element={<ShiftClose />} />
      <Route path="/academy/assistant" element={<Assistant />} />
      {/* Store Registry */}
      <Route path="/stores" element={<Stores />} />
      <Route path="/stores/new" element={<StoreNew />} />
      <Route path="/stores/:id" element={<StoreDetails />} />
      <Route path="/stores/:id/edit" element={<StoreEdit />} />
      <Route path="/reseller-console" element={<ResellerConsole />} />
      <Route path="/admin/service-desk-admin" element={<ServiceDeskAdmin />} />
      <Route path="/admin/assistant-questions" element={<AssistantQuestions />} />
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
      <Route path="/tutorial/cashier/delivery" element={<DeliveryCashier />} />
      <Route path="/tutorial/cashier/login" element={<LoginCashier />} />
      <Route path="/tutorial/cashier/open" element={<OpenCashier />} />
      <Route path="/tutorial/cashier/sync-status" element={<SyncStatusCashier />} />
      <Route path="/tutorial/cashier/close" element={<CloseCashier />} />
      <Route path="/tutorial/cashier/printer-warning" element={<PrinterWarningCashier />} />
      <Route path="/tutorial/cashier/*" element={<PlaceholderLesson />} />
      <Route path="/tutorial/secure/h-b2g" element={<B2GInvoices />} />
      <Route path="/tutorial/secure/c-now" element={<Now />} />
      <Route path="/tutorial/secure/a-navigation" element={<SecureNavigation />} />
      <Route path="/tutorial/secure/b-checklist" element={<SecureChecklist />} />
      <Route path="/tutorial/secure/b-sync-check" element={<SecureSync />} />
      <Route path="/tutorial/secure/e-print-names" element={<SecurePrintNames />} />
      <Route path="/tutorial/secure/h-invoices" element={<SecureInvoices />} />
      <Route path="/tutorial/secure/d-overview" element={<SecureOverview />} />
      <Route path="/tutorial/secure/f-tables-list" element={<SecureTablesList />} />
      <Route path="/tutorial/secure/f-floor-plan" element={<SecureFloorPlan />} />
      <Route path="/tutorial/secure/a-sync" element={<SecureSync />} />
      <Route path="/tutorial/secure/i-sync" element={<SecureSync />} />
      <Route path="/tutorial/secure/f-pos-devices" element={<SecurePosDevices />} />
      <Route path="/tutorial/secure/f-other-devices" element={<SecureOtherDevices />} />
      <Route path="/tutorial/secure/b-terminals" element={<SecureEftpos />} />
      <Route path="/tutorial/secure/b-tables" element={<SecureTablesList />} />
      <Route path="/tutorial/secure/b-printers" element={<SecurePrinters />} />
      <Route path="/tutorial/secure/b-other-devices" element={<SecureOtherDevices />} />
      <Route path="/tutorial/secure/b-catalog" element={<SecureProducts />} />
      <Route path="/tutorial/secure/b-workstations" element={<SecurePosDevices />} />
      <Route path="/tutorial/secure/b-roles-users" element={<SecureUsers />} />
      <Route path="/tutorial/secure/f-eftpos" element={<SecureEftpos />} />
      <Route path="/tutorial/secure/f-caller-id" element={<SecureCallerId />} />
      <Route path="/tutorial/secure/f-customer-display" element={<SecureCustomerDisplay />} />
      <Route path="/tutorial/secure/e-modifiers" element={<SecureModifiers />} />
      <Route path="/tutorial/secure/e-pricelists" element={<SecurePriceLists />} />
      <Route path="/tutorial/secure/e-vat" element={<SecureVatTypes />} />
      <Route path="/tutorial/secure/e-food-types" element={<SecureFoodTypes />} />
      <Route path="/tutorial/secure/e-courses" element={<SecureCourses />} />
      <Route path="/tutorial/secure/e-brands" element={<SecureBrands />} />
      <Route path="/tutorial/secure/e-favorites" element={<SecureFavorites />} />
      <Route path="/tutorial/secure/e-combos" element={<SecureCombos />} />
      <Route path="/tutorial/secure/e-action-messages" element={<SecureActionMessages />} />
      <Route path="/tutorial/secure/e-product-tags" element={<SecureProductTags />} />
      <Route path="/tutorial/secure/i-users" element={<SecureUsers />} />
      <Route path="/tutorial/secure/i-admin-code-rights" element={<SecureAdminCodeRights />} />
      <Route path="/tutorial/secure/i-roles" element={<SecureRoles />} />
      <Route path="/tutorial/secure/e-products" element={<SecureProducts />} />
      <Route path="/tutorial/secure/f-printers" element={<SecurePrinters />} />
      <Route path="/tutorial/secure/c-order-flow" element={<OrderFlow />} />
      <Route path="/tutorial/secure/*" element={<PlaceholderLesson />} />
      <Route path="/tutorial/backoffice/*" element={<PlaceholderLesson />} />
      </Route>
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