// dashboard

// Users
import UserListView from "pages/Users/ListView";
import UserGridView from "pages/Users/GridView";

// auth

// Reset Password

import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";

import UserProfile from "pages/Authentication/UserProfile";
import Account from "pages/Pages/Account";
import Skills from "pages/skills/Skills";
import Roles from "pages/roles/Roles";
import ServiceCategory from "pages/serviceCategory/ServiceCategory";
import JobPlans from "pages/jobPlans/JobPlans";
import SubscriptionPlans from "pages/subscriptionPlans";
import Notifications from "pages/notifications";
import Bookings from "pages/bookings";
import SendInvoice from "pages/send-invoice";
import ServicePlns from "pages/servicePlans";
import Dashboard from "pages/Pages/dashboard";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/dashboard", component: Dashboard },
  // Users
  { path: "/apps-users-list", component: UserListView },
  { path: "/apps-users-grid", component: UserGridView },

  { path: "/skills", component: Skills },
  { path: "/roles", component: Roles },
  { path: "/service-category", component: ServiceCategory },
  { path: "/job-plans", component: JobPlans },
  { path: "/subscription-plans", component: SubscriptionPlans },
  { path: "/notifications", component: Notifications },
  { path: "/bookings", component: Bookings },
  { path: "/send-invoice", component: SendInvoice },
  { path: "/service-plans", component: ServicePlns },
  // { path: "/login", component: Login },

  // pages
  { path: "/pages-account/:id", component: Account },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  ,
  // Landing

  // auth

  // logout

  // authentication
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };
