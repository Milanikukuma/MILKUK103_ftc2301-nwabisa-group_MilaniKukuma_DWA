import  {html ,render} from "lit-html";

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Partial application function
function partialArray(array) {
    return function(tag) {
      return function(strings, ...values) {
        const interpolated = strings.map((string, i) => {
          const value = values[i] !== undefined ? values[i] : "";
          return string + value;
        });
        return tag(interpolated, ...array);
      };
    };
  }
  
  // Partially apply the provinces and names arrays
  const partialAppTemplate = partialArray([...provinces, ...names]);
  
  // Create the final appTemplate using partialAppTemplate with html tag function
  export const appTemplate = partialAppTemplate(html)`
    <div>
      <h1>Provinces</h1>
      <ul>
        ${provinces.map((province) => html`<li>${province}</li>`)}
      </ul>
  
      <h1>Names</h1>
      <ul>
        ${names.map((name) => html`<li>${name}</li>`)}
      </ul>
    </div>
  `;
  
  // Render HTML using lit-html
  render(appTemplate, document.body);

/*
*The code provided show the use of Higher-Order Functions (`forEach`, `map`, `sort`, `filter`, `reduce`) 
*to perform various operations on arrays. 
*Each task is explained with comments, and the results are logged to the console.

By using these built-in array methods, the code becomes shorter and more expressive, 
improving readability and reducing the need for manual iteration and manipulation of arrays
(avoids using the for loop).
*/

// Task 1: Use forEach to console log each name
console.log('Task 1:');
names.forEach((name) => {
  console.log(name);
});

// Task 2: Use forEach to console log each name with a matching province
console.log('Task 2:');
names.forEach((name, index) => {
  const province = provinces[index];
  console.log(`${name} (${province})`);
});

// Task 3: Use map to convert province names to uppercase
console.log('Task 3:');
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Task 4: Use map to create an array with the length of each name
console.log('Task 4:');
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Task 5: Use sort to sort provinces alphabetically
console.log('Task 5:');
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Task 6: Use filter to remove provinces with the word "Cape" and return the remaining count
console.log('Task 6:');
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));
console.log('Remaining provinces count:', filteredProvinces.length);

// Task 7: Use map and some to create a boolean array indicating whether a name contains the letter 'S'
console.log('Task 7:');
const nameContainsS = names.map((name) => name.includes('S'));
console.log(nameContainsS);

// Task 8: Use reduce to create an object indicating the province of each individual
console.log('Task 8:');
const provinceByIndividual = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(provinceByIndividual);
