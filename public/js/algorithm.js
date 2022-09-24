let algorithm = {};

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
      count = 0;
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

let testArray = [
  2, 3, 4, 6, 6, 6, 10, 10, 23, 23, 23, 23, 23, 6, 6, 8, 8, 8, 8, 30, 30, 30,
];

// let mode = algorithm.centralTendency.getMode(testArray);
// let median = algorithm.centralTendency.getMedian(testArray);
// let mean = algorithm.centralTendency.getMean(testArray);
// console.log(`the mode is: ${JSON.stringify(mode)}`);
// console.log(`the median is: ${median}`);
// console.log(`the mean is: ${mean}`);

let numbers = algorithm.getHotNumbers(testArray, 4);
console.log("this hot numbers: " + JSON.stringify(numbers));
// export default algorithm;
