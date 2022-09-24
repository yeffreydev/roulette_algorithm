let algorithm = {};

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
    let newArray = [];
    let multiMode = [];
    for (let i = 0; i < arrayN.length; i++) {
      let searchN = arrayN[i];
      let countN = 0;
      for (let f = 0; f < arrayN.length; f++) {
        if (arrayN[f] == searchN) {
          countN++;
        }
      }
      if (!newArray.find((n) => n.value == searchN))
        newArray.push({ value: arrayN[i], count: countN });
    }
    let maxCount =
      newArray.length > 0 ? Math.max(...newArray.map((item) => item.count)) : 0;
    multiMode = newArray.filter((item) => item.count == maxCount);
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

let testArray = [2, 3, 4, 6];
let mode = algorithm.centralTendency.getMode(testArray);
let median = algorithm.centralTendency.getMedian(testArray);
let mean = algorithm.centralTendency.getMean(testArray);
console.log(`the mode is: ${JSON.stringify(mode)}`);
console.log(`the median is: ${median}`);
console.log(`the mean is: ${mean}`);

// export default algorithm;
