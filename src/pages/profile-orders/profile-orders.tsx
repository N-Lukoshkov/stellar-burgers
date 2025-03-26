import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect, useState } from 'react';
import { getOrders, listOfOrders } from '../../services/slices/orders_list';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const loadOrders = useCallback(() => {
    dispatch(getOrders()).finally(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded) {
      loadOrders();
    }
  }, [isLoaded, loadOrders]);

  const orders: TOrder[] = useSelector(listOfOrders);

  return <ProfileOrdersUI orders={orders} />;
};
