

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];


/*
*The code provided show the use of Higher-Order Functions (`forEach`, `map`, `sort`, `filter`, `reduce`) 
*to perform various operations on arrays. 
*Each task is explained with comments, and the results are logged to the console.

By using these built-in array methods, the code becomes shorter and more expressive, 
improving readability and reducing the need for manual iteration and manipulation of arrays
(avoids using the for loop).
*/

console.log('Task 1:');
// Task 1: Use forEach to console log each name
names.forEach((name) => {
  console.log(name);
});

console.log('Task 2:');
// Task 2: Use forEach to console log each name with a matching province
names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
});

console.log('Task 3:');
// Task 3: Use map to convert province names to uppercase
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

console.log('Task 4:');
// Task 4: Use map to create an array with the length of each name
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

console.log('Task 5:');
// Task 5: Use sort to sort provinces alphabetically
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

console.log('Task 6:');
// Task 6: Use filter to remove provinces with the word "Cape" and return the remaining count
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));
console.log('Remaining provinces count:', filteredProvinces.length);

console.log('Task 7:');
// Task 7: Use map and some to create a boolean array indicating whether a name contains the letter 'S'
const nameContainsS = names.map((name) => name.includes('S'));
console.log(nameContainsS);

console.log('Task 8:');
// Task 8: Use reduce to create an object indicating the province of each individual
const provinceByIndividual = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(provinceByIndividual);
