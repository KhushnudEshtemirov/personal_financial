import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";

const AppRouter = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((el, idx) => (
          <Route
            key={idx}
            path={el.path}
            element={<PublicRoute>{<el.element />}</PublicRoute>}
          />
        ))}

        {privateRoutes.map((el, idx) => (
          <Route
            key={idx}
            path={el.path}
            element={<PrivateRoute>{<el.element />}</PrivateRoute>}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
