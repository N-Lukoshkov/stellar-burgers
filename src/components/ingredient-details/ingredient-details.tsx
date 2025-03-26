import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredient';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredients);
  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) return <Preloader />;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
