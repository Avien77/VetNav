import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { EmploymentPath } from "./pages/EmploymentPath";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/results",
    Component: Results,
  },
  {
    path: "/employment",
    Component: EmploymentPath,
  },
]);