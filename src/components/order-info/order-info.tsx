import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredient';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const id = Number(number);

  const initialOrderData: TOrder = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: '',
    number: 0
  };

  const [orderData, setOrderData] = useState<TOrder>(initialOrderData);

  const ingredientsList: TIngredient[] = useSelector(getIngredients);
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredientsList.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredientsList.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredientsList]);

  useEffect(() => {
    getOrderByNumberApi(Number(id))
      .then((data) => {
        setOrderData(data.orders[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
