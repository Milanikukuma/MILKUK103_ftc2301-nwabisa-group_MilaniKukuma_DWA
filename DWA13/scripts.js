const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // Exercise 1: Use forEach to console.log each product name
  console.log('Exercise 1:');
  products.forEach((product) => {
    console.log(product.product);
  });
  
  // Exercise 2: Use filter to filter out products with names longer than 5 characters
  console.log('Exercise 2:');
  const filteredProducts = products.filter((product) => product.product.length <= 5);
  console.log(filteredProducts);
  
  // Exercise 3: Use filter and map to convert string prices to numbers and remove products without prices, then use reduce to calculate the combined price
  console.log('Exercise 3:');
  const combinedPrice = products
    .filter((product) => product.price !== '' && !isNaN(product.price))
    .map((product) => ({ ...product, price: Number(product.price) }))
    .reduce((total, product) => total + product.price, 0);
  console.log('Combined price:', combinedPrice);
  
  // Exercise 4: Use reduce to concatenate all product names
  console.log('Exercise 4:');
  const concatenatedNames = products.reduce((result, product, index) => {
    if (index === 0) {
      return product.product;
    } else if (index === products.length - 1) {
      return `${result} and ${product.product}`;
    } else {
      return `${result}, ${product.product}`;
    }
  }, '');
  console.log('Concatenated names:', concatenatedNames);
  
  // Exercise 5: Use reduce to calculate the highest and lowest-priced items
  console.log('Exercise 5:');
  const priceRange = products.reduce(
    (result, product) => {
      if (product.price > result.highest.price) {
        result.highest = product;
      }
      if (product.price < result.lowest.price) {
        result.lowest = product;
      }
      return result;
    },
    { highest: { price: -Infinity }, lowest: { price: Infinity } }
  );
  console.log('Highest:', priceRange.highest.product);
  console.log('Lowest:', priceRange.lowest.product);
  
  // Exercise 6: Use Object.entries and reduce to change object keys and recreate the object
  console.log('Exercise 6:');
  const recreatedProducts = Object.entries(products).reduce((result, [key, value]) => {
    const { product, price } = value;
    result[key] = { name: product, cost: price };
    return result;
  }, {});
  console.log(recreatedProducts);
  