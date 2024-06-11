// dashboard
import Analytics from "pages/Dashboards/Analytics";
import Ecommerce from "pages/Dashboards/Ecommerce";
import Email from "pages/Dashboards/Email";
import HRDashboard from "pages/Dashboards/HR";
import SocialMediaDashboard from "pages/Dashboards/SocialMedia";

// Users
import UserListView from "pages/Users/ListView";
import UserGridView from "pages/Users/GridView";

// Landing
import OnePage from "pages/Components/Landing/Onepage";
import Product from "pages/Components/Landing/Product";

// auth
import Basic from "pages/AuthenticationInner/Login/Basic";
import LoginCover from "pages/AuthenticationInner/Login/LoginCover";
import LoginBoxed from "pages/AuthenticationInner/Login/LoginBoxed";
import LoginModern from "pages/AuthenticationInner/Login/LoginModern";

// Logout
import BasicLogout from "pages/AuthenticationInner/Logout/Basic";
import LogoutCover from "pages/AuthenticationInner/Logout/LogoutCover";
import LogoutBoxed from "pages/AuthenticationInner/Logout/LogoutBoxed";
import LogoutModern from "pages/AuthenticationInner/Logout/LogoutModern";

// Reset Password

import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Pages404 from "pages/AuthenticationInner/Pages404";
import UserProfile from "pages/Authentication/UserProfile";
import Account from "pages/Pages/Account";
import Skills from "pages/skills/Skills";
import Roles from "pages/roles/Roles";
import ServiceCategory from "pages/serviceCategory/ServiceCategory";
import JobPlans from "pages/jobPlans/JobPlans";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Ecommerce },
  { path: "/dashboard", component: Ecommerce },
  { path: "/dashboards-analytics", component: Analytics },
  { path: "/dashboards-email", component: Email },
  { path: "/dashboards-hr", component: HRDashboard },
  { path: "/dashboards-social", component: SocialMediaDashboard },

  // Users
  { path: "/apps-users-list", component: UserListView },
  { path: "/apps-users-grid", component: UserGridView },

  { path: "/skills", component: Skills },
  { path: "/roles", component: Roles },
  { path: "/service-category", component: ServiceCategory },
  { path: "/job-plans", component: JobPlans },

  // pages
  { path: "/pages-account/:id", component: Account },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // Landing
  { path: "/onepage-landing", component: OnePage },
  { path: "/product-landing", component: Product },

  // auth
  { path: "/auth-login-basic", component: Basic },
  { path: "/auth-login-cover", component: LoginCover },
  { path: "/auth-login-boxed", component: LoginBoxed },
  { path: "/auth-login-modern", component: LoginModern },
  ,
  // logout
  { path: "/auth-logout-basic", component: BasicLogout },
  { path: "/auth-logout-cover", component: LogoutCover },
  { path: "/auth-logout-boxed", component: LogoutBoxed },
  { path: "/auth-logout-modern", component: LogoutModern },

  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };
