import * as tf from '@tensorflow/tfjs';

const categoryMap: any = {
  vegetables: 1,
  fruits: 2,
  dairy: 3,
  grains: 4,
};

export async function predictPrice(

  category: string,

  stock: number

) {

  if (!stock || stock <= 0) {

    return 0;

  }

  let basePrice = 50;

  switch (category) {

    case 'vegetables':
      basePrice = 40;
      break;

    case 'fruits':
      basePrice = 80;
      break;

    case 'dairy':
      basePrice = 60;
      break;

    case 'grains':
      basePrice = 50;
      break;

    default:
      basePrice = 50;

  }

  const predictedPrice =

    basePrice - stock * 0.3;

  return Math.max(
    Math.round(predictedPrice),
    10
  );

}