import * as tf from '@tensorflow/tfjs';

const categoryMap: any = {
  vegetables: 1,
  fruits: 2,
  dairy: 3,
  grains: 4,
};

const trainingData = [

  // Vegetables
  { category: 'vegetables', stock: 10, price: 60 },
  { category: 'vegetables', stock: 20, price: 55 },
  { category: 'vegetables', stock: 30, price: 50 },
  { category: 'vegetables', stock: 40, price: 45 },
  { category: 'vegetables', stock: 50, price: 40 },
  { category: 'vegetables', stock: 70, price: 35 },

  // Fruits
  { category: 'fruits', stock: 10, price: 140 },
  { category: 'fruits', stock: 20, price: 130 },
  { category: 'fruits', stock: 40, price: 110 },
  { category: 'fruits', stock: 60, price: 90 },
  { category: 'fruits', stock: 80, price: 75 },

  // Dairy
  { category: 'dairy', stock: 10, price: 80 },
  { category: 'dairy', stock: 20, price: 75 },
  { category: 'dairy', stock: 30, price: 70 },
  { category: 'dairy', stock: 50, price: 60 },

  // Grains
  { category: 'grains', stock: 20, price: 55 },
  { category: 'grains', stock: 40, price: 50 },
  { category: 'grains', stock: 60, price: 45 },
  { category: 'grains', stock: 100, price: 40 },

];
export async function predictPrice(

  category: string,

  stock: number

) {

  const categoryData = trainingData.filter(

    (item) =>

      item.category === category

  );

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

  return nearest.price;

}