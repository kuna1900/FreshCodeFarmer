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

  const trainingData = [

    {
      category: 'vegetables',
      stock: 10,
      price: 60
    },

    {
      category: 'vegetables',
      stock: 50,
      price: 35
    },

    {
      category: 'fruits',
      stock: 20,
      price: 120
    },

    {
      category: 'fruits',
      stock: 80,
      price: 70
    },

    {
      category: 'dairy',
      stock: 30,
      price: 65
    },

    {
      category: 'grains',
      stock: 100,
      price: 40
    }

  ];

  const categoryData = trainingData.filter(

    (item) =>

      item.category === category

  );

  if (categoryData.length === 0) {

    return 50;

  }

  let nearest = categoryData[0];

  let minDiff = Math.abs(

    stock - nearest.stock

  );

  categoryData.forEach((item) => {

    const diff = Math.abs(

      stock - item.stock

    );

    if (diff < minDiff) {

      minDiff = diff;

      nearest = item;

    }

  });

  const randomVariation =

    Math.floor(Math.random() * 10);

  return nearest.price - randomVariation;

}