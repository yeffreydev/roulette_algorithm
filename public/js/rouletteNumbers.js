let orderArray = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
let rouletteNumbers = orderArray.map((item, index) => {
  if (item == 0) {
    item = { id: index, value: item, color: "green" };
  } else if (index % 2 == 0) {
    item = { id: index, value: item, color: "red" };
  } else {
    item = { id: index, value: item, color: "black" };
  }

  return { id: item.id, value: item.value, color: item.color };
});
console.log(rouletteNumbers);
export default rouletteNumbers;
