import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';
import { fetchIngredients } from '../../services/slices/ingredient';
import { checkAuthorization } from '../../services/slices/user';

const ROUTE_PATHS = {
  HOME: '/',
  FEED: '/feed',
  FEED_DETAIL: '/feed/:number',
  INGREDIENT_DETAIL: '/ingredients/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDER_DETAIL: '/profile/orders/:number',
  NOT_FOUND: '*'
};

const AuthRoutes = [
  { path: ROUTE_PATHS.LOGIN, component: <Login /> },
  { path: ROUTE_PATHS.REGISTER, component: <Register /> },
  { path: ROUTE_PATHS.FORGOT_PASSWORD, component: <ForgotPassword /> },
  { path: ROUTE_PATHS.RESET_PASSWORD, component: <ResetPassword /> }
];

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modalBackground = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuthorization());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalBackground || location}>
        <Route path={ROUTE_PATHS.HOME} element={<ConstructorPage />} />
        <Route path={ROUTE_PATHS.FEED} element={<Feed />} />
        <Route
          path={ROUTE_PATHS.INGREDIENT_DETAIL}
          element={<IngredientDetails />}
        />
        <Route path={ROUTE_PATHS.FEED_DETAIL} element={<OrderInfo />} />

        {AuthRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute onlyUnAuth>{component}</ProtectedRoute>}
          />
        ))}

        <Route
          path={ROUTE_PATHS.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.PROFILE_ORDERS}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.PROFILE_ORDER_DETAIL}
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound404 />} />
      </Routes>

      {modalBackground && (
        <Routes>
          <Route
            path={ROUTE_PATHS.FEED_DETAIL}
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={ROUTE_PATHS.INGREDIENT_DETAIL}
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={ROUTE_PATHS.PROFILE_ORDER_DETAIL}
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
