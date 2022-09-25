import rouletteNumbers from "./rouletteNumbers.js";
let algorithm = {};

algorithm.rouletteNumbers = rouletteNumbers;
//count numbers algorithm; return new array with objects with number value and count value
algorithm.countNumbers = function (array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let searchN = array[i];
    let count = 0;
    if (!newArray.find((item) => item.value == searchN)) {
      for (let f = 0; f < array.length; f++) {
        if (array[f] === searchN) count++;
      }
      newArray.push({ value: searchN, count });
    }
  }
  return newArray;
};

algorithm.getLimitELements = function (arrayN, n) {
  if (arrayN.length > n) arrayN.length = n;
  return arrayN;
};

algorithm.centralTendency = {
  //getMean function
  getMean: function (arrayN) {
    if (typeof arrayN != "object" || !arrayN) {
      throw new Error("type is number");
    }
    let all = 0;
    arrayN.map((number) => (all += number));
    return (all / arrayN.length).toFixed(1);
  },

  //getMode function
  getMode: function (arrayN) {
    let multiMode = [];
    let arrayCount = algorithm.countNumbers(arrayN);
    let maxCount =
      arrayCount.length > 0
        ? Math.max(...arrayCount.map((item) => item.count))
        : 0;
    multiMode = arrayCount.filter((item) => item.count == maxCount);
    return multiMode;
  },

  //get median method
  getMedian: function (arrayN) {
    arrayN.sort();
    console.log(arrayN);
    if (arrayN.length % 2 != 0) {
      return arrayN[Math.round(arrayN.length / 2) - 1];
    }
    return (
      (arrayN[Math.round(arrayN.length / 2) - 1] +
        arrayN[Math.round(arrayN.length / 2)]) /
      2
    ).toFixed(1);
  },
};

algorithm.getHotNumbers = function (arrayN, n) {
  let numbers = algorithm
    .countNumbers(arrayN)
    .sort((a, b) => a.count - b.count);
  return algorithm.getLimitELements(numbers.reverse(), n);
};

//complex algorithm for roulette

algorithm.findIndexOnRoulette = function (n) {
  let number = algorithm.rouletteNumbers.find((item) => item.value == n);
  return number.id;
};
algorithm.findNumberById = function (id) {
  let number = algorithm.rouletteNumbers.find((item) => item.id == id);
  if (number) return number.value;
  return 0;
};
algorithm.calculateDistanceIndexRoulette = function (n1, n2) {
  let index1 = algorithm.findIndexOnRoulette(n1);
  let index2 = algorithm.findIndexOnRoulette(n2);
  return index2 - index1;
};

//calculate in array from right to left absolute longitud; before to n
algorithm.findLeftLongIndexOnRoulette = function (beforeN, n) {
  let absoluteLongitud = 0;
  let index = algorithm.findIndexOnRoulette(n);
  let indexBefore = algorithm.findIndexOnRoulette(beforeN);
  if (index == indexBefore) return absoluteLongitud;
  if (indexBefore < index) {
    absoluteLongitud = index - indexBefore;
    return absoluteLongitud;
  }
  absoluteLongitud = index + (37 - indexBefore);
  return absoluteLongitud;
};

//calculate in array from left to right absolute longitud: before to n
algorithm.findRightLongIndexOnRoulette = function (beforeN, n) {
  let absoluteLongitud = 0;
  let index = algorithm.findIndexOnRoulette(n);
  let indexBefore = algorithm.findIndexOnRoulette(beforeN);
  if (index == indexBefore) return absoluteLongitud;
  if (indexBefore < index) {
    absoluteLongitud = 37 - index + indexBefore;
    return absoluteLongitud;
  }
  absoluteLongitud = 37 - (37 - indexBefore + index);
  return absoluteLongitud;
};

//if right to left calculate number
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
algorithm.findIndexByLongRtoL = function (n, long) {
  let nIndex = algorithm.findIndexOnRoulette(n);
  if (long == 0 || long == 37) return nIndex;
  if (nIndex >= long) return nIndex - long;
  if (long >= nIndex) return 37 - (long - nIndex);
};

//if right to left calculate number
algorithm.findIndexByLongLtoR = function (n, long) {
  let nIndex = algorithm.findIndexOnRoulette(n);
  if (long == 0 || long == 37) return nIndex;
  if (nIndex + long <= 36) return nIndex + long;
  return nIndex - (37 - long);
};

let nx1 = algorithm.findLeftLongIndexOnRoulette(29, 18);
let nx2 = algorithm.findRightLongIndexOnRoulette(29, 18);

console.log(`the right to left is ${nx1}`);
console.log(`the left to right is ${nx2}`);

//calculate number segun algorithm right to left
let n1 = algorithm.findIndexByLongRtoL(26, 35);
//calculate number segun algorithm left to right
let n2 = algorithm.findIndexByLongRtoL(20, 1);
console.log(algorithm.findIndexOnRoulette(26));
// console.log(algorithm.findNumberById(n1));
// console.log(algorithm.findNumberById(n2));
console.log("-----");

n1 = algorithm.findIndexByLongLtoR(19, 1);
n2 = algorithm.findIndexByLongLtoR(20, 1);
// console.log(algorithm.findNumberById(n1));
// console.log(algorithm.findNumberById(n2));

//recorrer numeros

console.log("index from 20 is: ", algorithm.findIndexOnRoulette(20));

for (let f = 0; f <= 36; f++) {
  console.log("number is: " + f);
  for (let i = 0; i <= 37; i++) {
    let n = algorithm.findNumberById(algorithm.findIndexByLongLtoR(f, i));
    let nx2 = algorithm.findNumberById(algorithm.findIndexByLongRtoL(f, i));
    console.log(
      `left to right ${i} from ${f} is ${n} and right to left ${i} from ${f} is ${nx2}`
    );
  }
}

export default algorithm;
