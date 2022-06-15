import { MainLayout } from "@components/main-layout";
import { commonRoutes } from "@routes/route_common";
import { productRoutes } from "@routes/route_product";
import { useCallback } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const routerData = [
  {
    route: commonRoutes,
  },
  {
    route: productRoutes,
  },
];

function App() {
  const location = useLocation();

  const isAuthenticated = true;
  const logout = false;

  const router = useCallback(() => {
    return routerData.map((dataItem) => {
      return dataItem.route.map(
        ({ path, title, component: Component, subItems, privateRoute }) => {
          if (subItems && subItems.length) {
            return subItems.map(
              ({ subPath, subTitle, subComponent: Component }) => {
                return (
                  <Route
                    key={`${path}${subPath}`}
                    path={`${path}${subPath}`}
                    element={
                      privateRoute ? (
                        <PrivateRoute
                          isAuthenticated={isAuthenticated}
                          logout={logout}
                          currentPath={location}
                        >
                          <MainLayout>
                            <Component />
                          </MainLayout>
                        </PrivateRoute>
                      ) : (
                        <MainLayout>
                          <Component />
                        </MainLayout>
                      )
                    }
                  />
                );
              }
            );
          }
          return (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  logout={logout}
                  currentPath={location}
                >
                  <MainLayout>
                    <Component />
                  </MainLayout>
                </PrivateRoute>
              }
            />
          );
        }
      );
    });
  }, [logout, isAuthenticated, location]);

  return (
    <Routes>
      {/* redirect to home on wildcard routes */}
      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />

      {/* routes registration */}
      {router()}
    </Routes>
  );
}

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
