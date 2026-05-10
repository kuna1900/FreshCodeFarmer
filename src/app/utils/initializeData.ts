export function initializeData() {
  if (localStorage.getItem('dataInitialized')) {
    return;
  }

  const demoUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@freshcode.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Ramesh Kumar',
      email: 'ramesh@farmer.com',
      password: 'farmer123',
      role: 'farmer'
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya@consumer.com',
      password: 'consumer123',
      role: 'consumer'
    }
  ];

  const demoProducts = [
    { id: '1', name: 'Fresh Tomatoes', price: 40, unit: 'kg', category: 'vegetables', farmer: 'Ramesh Kumar', rating: 4.5, stock: 100, farmerId: '2' },
    { id: '2', name: 'Organic Milk', price: 60, unit: 'liter', category: 'dairy', farmer: 'Suresh Dairy', rating: 4.8, stock: 50, farmerId: '2' },
    { id: '3', name: 'Fresh Spinach', price: 30, unit: 'kg', category: 'vegetables', farmer: 'Kavita Farms', rating: 4.6, stock: 75, farmerId: '2' },
    { id: '4', name: 'Wheat Flour', price: 35, unit: 'kg', category: 'grains', farmer: 'Farmers Co-op', rating: 4.7, stock: 200, farmerId: '2' },
    { id: '5', name: 'Fresh Apples', price: 120, unit: 'kg', category: 'fruits', farmer: 'Himachal Orchards', rating: 4.9, stock: 60, farmerId: '2' },
    { id: '6', name: 'Carrots', price: 35, unit: 'kg', category: 'vegetables', farmer: 'Green Valley', rating: 4.4, stock: 90, farmerId: '2' },
    { id: '7', name: 'Bananas', price: 50, unit: 'dozen', category: 'fruits', farmer: 'South India Co-op', rating: 4.6, stock: 120, farmerId: '2' },
    { id: '8', name: 'Basmati Rice', price: 80, unit: 'kg', category: 'grains', farmer: 'Punjab Farms', rating: 4.8, stock: 150, farmerId: '2' },
  ];

  localStorage.setItem('users', JSON.stringify(demoUsers));
  localStorage.setItem('farmerProducts', JSON.stringify(demoProducts));
  localStorage.setItem('orders', JSON.stringify([]));
  localStorage.setItem('dataInitialized', 'true');

  console.log('Demo data initialized!');
  console.log('Demo Accounts:');
  console.log('Admin: admin@freshcode.com / admin123');
  console.log('Farmer: ramesh@farmer.com / farmer123');
  console.log('Consumer: priya@consumer.com / consumer123');
}
