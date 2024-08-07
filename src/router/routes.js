
export default [
  {
    path: "/",
    name: "default",
    meta: {
      requiresAuth: true,
    },
    component: () => import("./views/dashboards/blog/index"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/account/login"),
    meta: {
      requiresVisitor: true,
    },
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("./views/account/register"),
  //   meta: {
  //     beforeResolve(routeTo, routeFrom, next) {
  //       // If the user is already logged in
  //       if (store.getters["auth/loggedIn"]) {
  //         // Redirect to the home page instead
  //         next({ name: "default" });
  //       } else {
  //         // Continue to the login page
  //         next();
  //       }
  //     },
  //   },
  // },
  // {
  //   path: "/forgot-password",
  //   name: "Forgot password",
  //   component: () => import("./views/account/forgot-password"),
  //   meta: {
  //     beforeResolve(routeTo, routeFrom, next) {
  //       // If the user is already logged in
  //       if (store.getters["auth/loggedIn"]) {
  //         // Redirect to the home page instead
  //         next({ name: "default" });
  //       } else {
  //         // Continue to the login page
  //         next();
  //       }
  //     },
  //   },
  // },
  // {
  //   path: "/logout",
  //   name: "logout",
  //   component: () => import("./views/account/logout"),
  //   meta: {
  //     requiresAuth: true,
  //     beforeResolve(routeTo, routeFrom, next) {
  //       if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  //         store.dispatch("auth/logOut");
  //       } else {
  //         store.dispatch("authfack/logout");
  //       }
  //       const requiresAuthOnPreviousRoute = routeFrom.matched.some((route) =>
  //         route.push("/login")
  //       );
  //       // Navigate back to previous page, or home as a fallback
  //       next(
  //         requiresAuthOnPreviousRoute ? { name: "default" } : { ...routeFrom }
  //       );
  //     },
  //   },
  // },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: require("./views/utility/404").default,
  // },
  // // Redirect any unmatched routes to the 404 page. This may
  // // require some server configuration to work in production:
  // // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  // // {
  // //   path: "*",
  // //   redirect: "404",
  // // },
  // {
  //   path: "/dashboard/saas",
  //   name: "saas-dashboard",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/dashboards/saas/index"),
  // },
  // {
  //   path: "/dashboard/crypto",
  //   name: "crypto-dashboard",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/dashboards/crypto/index"),
  // },
  // {
  //   path: "/dashboard/blog",
  //   name: "blog-dashboard",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/dashboards/blog/index"),
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/calendar/calendar"),
  // },
  // {
  //   path: "/chat",
  //   name: "chat",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/chat/index"),
  // },
  // {
  //   path: "/apps/file-manager",
  //   name: "file-manager",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/file-manager/index"),
  // },
  // {
  //   path: "/ecommerce/products",
  //   name: "Products",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/products"),
  // },
  // {
  //   path: "/ecommerce/product-detail/:id",
  //   name: "Product Detail",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/product-detail"),
  // },
  // {
  //   path: "/ecommerce/orders",
  //   name: "Orders",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/orders"),
  // },
  // {
  //   path: "/ecommerce/customers",
  //   name: "Customers",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/customers"),
  // },
  // {
  //   path: "/ecommerce/cart",
  //   name: "Cart",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/cart"),
  // },
  // {
  //   path: "/ecommerce/checkout",
  //   name: "Checkout",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/checkout"),
  // },
  // {
  //   path: "/ecommerce/shops",
  //   name: "Shops",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/shops"),
  // },
  // {
  //   path: "/ecommerce/add-product",
  //   name: "Add Product",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ecommerce/add-product"),
  // },
  // {
  //   path: "/blog/list",
  //   name: "blog-list",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/blog/list"),
  // },
  // {
  //   path: "/blog/grid",
  //   name: "blog-grid",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/blog/grid"),
  // },
  // {
  //   path: "/blog/detail",
  //   name: "blog-detail",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/blog/detail"),
  // },
  // {
  //   path: "/crypto/wallet",
  //   name: "Wallet",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/wallet/index"),
  // },
  // {
  //   path: "/crypto/buy-sell",
  //   name: "Buy/sell",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/buysell/index"),
  // },
  // {
  //   path: "/crypto/exchange",
  //   name: "Exchange",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/exchange/index"),
  // },
  // {
  //   path: "/crypto/lending",
  //   name: "Lending",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/lending/index"),
  // },
  // {
  //   path: "/crypto/orders",
  //   name: "crypto-orders",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/orders/index"),
  // },
  // {
  //   path: "/crypto/kyc-application",
  //   name: "kyc-application",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/kycapplication/index"),
  // },
  // {
  //   path: "/crypto/ico-landing",
  //   name: "Ico-landing",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/crypto/ico-landing"),
  // },
  // {
  //   path: "/invoices/detail",
  //   name: "Invoice Detail",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/invoices/detail"),
  // },
  // {
  //   path: "/invoices/list",
  //   name: "Invoice List",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/invoices/list"),
  // },
  // {
  //   path: "/ui/alerts",
  //   name: "Alerts",
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import("./views/ui/alerts"),
  // },
  // {
  //   path: "/ui/buttons",
  //   name: "Buttons",
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import("./views/ui/buttons"),
  // },
  // {
  //   path: "/ui/cards",
  //   name: "Cards",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/cards"),
  // },
  // {
  //   path: "/ui/carousel",
  //   name: "Carousel",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/carousel"),
  // },
  // {
  //   path: "/ui/dropdowns",
  //   name: "Dropdowns",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/dropdowns"),
  // },
  // {
  //   path: "/ui/grid",
  //   name: "Grid",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/grid"),
  // },
  // {
  //   path: "/ui/images",
  //   name: "Images",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/images"),
  // },
  // {
  //   path: "/ui/modals",
  //   name: "Modals",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/modals"),
  // },
  // {
  //   path: "/ui/offcanvas",
  //   name: "offcanvas",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/offcanvas"),
  // },
  // {
  //   path: "/ui/rangeslider",
  //   name: "Rangeslider",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/rangeslider"),
  // },
  // {
  //   path: "/ui/progressbars",
  //   name: "Progressbars",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/progressbars"),
  // },
  // {
  //   path: "/ui/placeholder",
  //   name: "Placeholder",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/placeholder"),
  // },
  // {
  //   path: "/ui/sweet-alert",
  //   name: "Sweet-alert",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/sweet-alert"),
  // },
  // {
  //   path: "/ui/tabs-accordions",
  //   name: "Tabs-accordions",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/tabs-accordions"),
  // },
  // {
  //   path: "/ui/typography",
  //   name: "Typography",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/typography"),
  // },
  // {
  //   path: "/ui/video",
  //   name: "Video",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/video"),
  // },
  // {
  //   path: "/ui/general",
  //   name: "General",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/general"),
  // },
  // {
  //   path: "/ui/colors",
  //   name: "Colors",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/colors"),
  // },
  // {
  //   path: "/ui/lightbox",
  //   name: "Lightbox",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/lightbox"),
  // },
  // {
  //   path: "/ui/image-cropper",
  //   name: "Image Cropper",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/ui/cropper"),
  // },
  // {
  //   path: "/projects/grid",
  //   name: "Projects Grid",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/projects/projects-grid"),
  // },
  // {
  //   path: "/projects/list",
  //   name: "Projects List",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/projects/projects-list"),
  // },
  // {
  //   path: "/projects/overview",
  //   name: "Project Overview",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/projects/overview"),
  // },
  // {
  //   path: "/projects/create",
  //   name: "Create New",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/projects/create"),
  // },
  // {
  //   path: "/contacts/grid",
  //   name: "User Grid",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/contacts/contacts-grid"),
  // },
  // {
  //   path: "/contacts/list",
  //   name: "User List",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/contacts/contacts-list"),
  // },
  // {
  //   path: "/contacts/profile",
  //   name: "Profile",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/contacts/contacts-profile"),
  // },
  // {
  //   path: "/charts/apex",
  //   name: "Apex chart",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/charts/apex"),
  // },
  // {
  //   path: "/charts/chartjs",
  //   name: "Chartjs chart",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/charts/chartjs/index"),
  // },
  // {
  //   path: "/charts/chartist",
  //   name: "Chartist chart",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/charts/chartist"),
  // },
  // {
  //   path: "/charts/echart",
  //   name: "Echart chart",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/charts/echart/index"),
  // },
  {
    path: "/icons/boxicons",
    name: "Boxicons Icon",
    meta: { requiresAuth: true },
    component: () => import("./views/icons/boxicons"),
  },
  // {
  //   path: "/icons/materialdesign",
  //   name: "Materialdesign Icon",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/icons/materialdesign"),
  // },
  // {
  //   path: "/icons/dripicons",
  //   name: "Dripicons Icon",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/icons/dripicons"),
  // },
  // {
  //   path: "/icons/fontawesome",
  //   name: "Fontawesome Icon",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/icons/fontawesome"),
  // },
  // {
  //   path: "/maps/google",
  //   name: "Google Maps",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/maps/google"),
  // },
  // {
  //   path: "/maps/leaflet",
  //   name: "Leaflet Maps",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/maps/leaflet/index"),
  // },
  // {
  //   path: "/tables/basic",
  //   name: "Basic Tables",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/tables/basictable"),
  // },
  // {
  //   path: "/form/advanced",
  //   name: "Form Advanced",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/advanced"),
  // },
  // {
  //   path: "/form/elements",
  //   name: "Form Elements",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/elements"),
  // },
  // {
  //   path: "/form/layouts",
  //   name: "Form Layouts",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/layouts"),
  // },
  // {
  //   path: "/form/editor",
  //   name: "Form Editors",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/editors"),
  // },
  // {
  //   path: "/form/uploads",
  //   name: "File Uploads",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/uploads"),
  // },
  // {
  //   path: "/form/validation",
  //   name: "Form Validation",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/validation"),
  // },
  // {
  //   path: "/form/wizard",
  //   name: "Form Wizard",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/wizard"),
  // },
  // {
  //   path: "/form/repeater",
  //   name: "Form Repeater",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/repeater"),
  // },
  // {
  //   path: "/form/mask",
  //   name: "Form Mask",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/forms/mask"),
  // },
  // {
  //   path: "/pages/starter",
  //   name: "Starter",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/starter"),
  // },
  // {
  //   path: "/pages/maintenance",
  //   name: "Maintenance",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/maintenance"),
  // },
  // {
  //   path: "/pages/coming-soon",
  //   name: "coming-soon",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/coming-soon"),
  // },
  // {
  //   path: "/pages/timeline",
  //   name: "Timeline",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/timeline"),
  // },
  // {
  //   path: "/pages/faqs",
  //   name: "FAQs",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/faqs"),
  // },
  // {
  //   path: "/pages/pricing",
  //   name: "Pricing",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/pricing"),
  // },
  // {
  //   path: "/pages/404",
  //   name: "Error-404",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/404"),
  // },
  // {
  //   path: "/pages/500",
  //   name: "Error-500",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/utility/500"),
  // },
  // {
  //   path: "/email/inbox",
  //   name: "Inbox",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/email/inbox"),
  // },
  // {
  //   path: "/email/reademail/:id",
  //   name: "Read Email",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/email/reademail"),
  // },
  // {
  //   path: "/email/templates/basic",
  //   name: "Email template basic",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/email/templates/basic"),
  // },
  // {
  //   path: "/email/templates/billing",
  //   name: "Email template billing",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/email/templates/billing"),
  // },
  // {
  //   path: "/email/templates/alert",
  //   name: "Email template alert",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/email/templates/alert"),
  // },
  // {
  //   path: "/tasks/list",
  //   name: "Task list",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/tasks/task-list"),
  // },
  // {
  //   path: "/tasks/kanban",
  //   name: "Kanbanboard",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/tasks/kanbanboard"),
  // },
  // {
  //   path: "/tasks/create",
  //   name: "Create Task",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/tasks/task-create"),
  // },
  // {
  //   path: "/auth/login-1",
  //   name: "Login sample",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/login-sample"),
  // },
  // {
  //   path: "/auth/login-2",
  //   name: "Login-2-sample",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/login-2"),
  // },
  // {
  //   path: "/auth/register-1",
  //   name: "Register sample",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/register-sample"),
  // },
  // {
  //   path: "/auth/register-2",
  //   name: "Register-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/register-2"),
  // },
  // {
  //   path: "/auth/recoverpwd",
  //   name: "Recover pwd",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/recoverpw-sample"),
  // },
  // {
  //   path: "/auth/recoverpwd-2",
  //   name: "Recover pwd-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/recoverpwd-2"),
  // },
  // {
  //   path: "/auth/lock-screen",
  //   name: "Lock screen",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/lockscreen"),
  // },
  // {
  //   path: "/auth/lock-screen-2",
  //   name: "Lock screen-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/lockscreen-2"),
  // },
  // {
  //   path: "/auth/confirm-mail",
  //   name: "confirm-mail",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/confirm-mail"),
  // },
  // {
  //   path: "/auth/confirm-mail-2",
  //   name: "confirm-mail-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/confirm-mail-2"),
  // },
  // {
  //   path: "/auth/email-verification",
  //   name: "email-verification",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/email-verification"),
  // },
  // {
  //   path: "/auth/email-verification-2",
  //   name: "email-verification-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/email-verification-2"),
  // },
  // {
  //   path: "/auth/two-step-verification",
  //   name: "two-step-verification",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/two-step-verification"),
  // },
  // {
  //   path: "/auth/two-step-verification-2",
  //   name: "two-step-verification-2",
  //   meta: { requiresAuth: true },
  //   component: () => import("./views/sample-pages/two-step-verification-2"),
  // },
  {
    path: "/admin-list",
    name: "admin-list",
    meta: { requiresAuth: true },
    component: () => import("./views/_admin-management/list"),
  },
  {
    path: "/user-list",
    name: "user-list",
    meta: { requiresAuth: true },
    component: () => import("./views/_user-management/list"),
  },
  {
    path: "/ban-controls",
    name: "ban-controls",
    meta: { requiresAuth: true },
    component: () => import("./views/_admin-management/ban-controls"),
  },
  {
    path: "/filter-words/list",
    name: "filter-words-list",
    meta: { requiresAuth: true },
    component: () => import("./views/_filter-words/list"),
  },
  {
    path: "/filter-words/create",
    name: "filter-words-create",
    meta: { requiresAuth: true },
    component: () => import("./views/_filter-words/create"),
  },
  {
    path: "/notifications/advertisements",
    name: "notifications-advertisements",
    meta: { requiresAuth: true },
    component: () => import("./views/_notifications/advertisements"),
  },
  {
    path: "/notifications/announcements",
    name: "notifications-announcements",
    meta: { requiresAuth: true },
    component: () => import("./views/_notifications/announcements"),
  },
  {
    path: "/notifications/charity",
    name: "notifications-charity",
    meta: { requiresAuth: true },
    component: () => import("./views/_notifications/charity"),
  },
];