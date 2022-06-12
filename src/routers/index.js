import Dashboard from "../pages/Dashboard";
import Model from "../pages/Model";
import Resources from "../pages/Resources";
import Tags from "../pages/Tags";

//PublicRoutes
export const publicRoutes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/model",
    component: Model,
  },
  {
    path: "/resources",
    component: Resources,
  },
  {
    path: "/tags",
    component: Tags,
  },
];
