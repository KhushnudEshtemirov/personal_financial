import { routesName } from "../constants/routes";
import Expenses from "../pages/expenses";
import Home from "../pages/home";
import Income from "../pages/income";
import Login from "../pages/login";

export const publicRoutes = [{ path: routesName.LOGIN, element: Login }];

export const privateRoutes = [
  { path: routesName.HOME, element: Home },
  { path: routesName.EXPENSES, element: Expenses },
  { path: routesName.INCOME, element: Income },
];
