import helpers from "./modules/helpers.js";
import apiNumber from "./api.js";
import algorithm from "./algorithm.js";
import resultCard from "./components/ResultCard.js";

//numbers
let numbers = [];

//insert a specific position

Element.prototype.insertChildAtIndex = function (child, index) {
  if (!index) index = 0;
  if (index >= this.children.length) {
    this.appendChild(child);
  } else {
    this.insertBefore(child, this.children[index]);
  }
};

const roulette = document.querySelector(".roulette");
const viewResults = document.querySelector(".view-results");
const historyRoulette = document.querySelector(".history-roulette");
const viewButton = document.querySelector(".button-view");
const algsContainer = document.querySelector(".alg-results");

let viewState = false;
//ocult view
viewButton.addEventListener("click", (e) => {
  if (viewState) {
    viewButton.textContent = "view";
    viewResults.className = "view-results view-results_none";
  } else {
    viewButton.textContent = "don't show";
    viewResults.className = "view-results";
  }
  viewState = !viewState;
});
let svgP = {};
svgP.width = 300;
svgP.height = 300;
const orderRouletterNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

let savedNumbers = [];

let svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgImg.setAttribute("x", 0);
svgImg.setAttribute("y", 0);
svgImg.setAttribute("width", svgP.width);
svgImg.setAttribute("height", svgP.height);
svgImg.setAttribute("viewBox", `0 0 ${svgP.width} ${svgP.height}`);
svgImg.style.border = "1px solid red";

const circle3 = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
circle3.setAttribute("cx", svgP.width / 2);
circle3.setAttribute("cy", svgP.height / 2);
circle3.setAttribute("r", 60);
circle3.setAttribute("fill", "#654321");
circle3.setAttribute("stroke", "#FFD700");

const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", svgP.width / 2);
circle.setAttribute("cy", svgP.height / 2);
circle.setAttribute("r", svgP.width / 2 - 10);
circle.setAttribute("fill", "black");
circle.setAttribute("stroke", "#FFD700");
circle.setAttribute("stroke-width", 2);

const circle1 = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
circle1.setAttribute("cx", svgP.width / 2);
circle1.setAttribute("cy", svgP.height / 2);
circle1.setAttribute("r", 3);
circle1.setAttribute("fill", "black");

const circle2 = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
circle2.setAttribute("cx", svgP.width / 2);
circle2.setAttribute("cy", svgP.height / 2);
circle2.setAttribute("r", svgP.width / 2 - 30);
circle2.setAttribute("stroke", "#FFD700");
circle2.setAttribute("fill", "green");

svgImg.appendChild(circle);
svgImg.appendChild(circle1);
svgImg.appendChild(circle2);
svgImg.appendChild(circle3);
for (let i = 1; i <= 37; i++) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let textNOde = document.createTextNode(orderRouletterNumbers[i - 1]);
  line.setAttribute("x1", svgP.width / 2);
  line.setAttribute("y1", svgP.width - 10);
  line.setAttribute("x2", svgP.width / 2);
  line.setAttribute("y2", svgP.width - 90);
  line.setAttribute("stroke", "black");
  //150 is equal to radio segun el x2
  line.setAttribute("transform", "rotate(" + (i * 360) / 37 + " 150 150)");
  line.setAttribute("style", "stroke: #FFD700;");
  svgImg.appendChild(line);
  //working with text
  text.appendChild(textNOde);
  text.setAttribute("x", svgP.width / 2 + 5);
  text.setAttribute("y", svgP.width - 16);
  text.setAttribute("transform", "rotate(" + (i * 360) / 37 + " 150 150)");
  text.setAttribute("fill", "white");
  text.setAttribute("style", "font-weight: bold");
  svgImg.appendChild(text);
}

roulette.appendChild(svgImg);

//functions on dom
let buttonSubmitNumber = document.getElementById("submit_number_form");
let numberInput = document.getElementById("input_results");
let textErrorNumber = document.getElementById("input_error_number");

//change event
numberInput.addEventListener("input", (e) => {
  if (!numberInput.value) return (numberInput.value = "");
  let n = helpers.inputToNumber(numberInput.value);
  numberInput.value = n;
  if (textErrorNumber.textContent) textErrorNumber.textContent = "";
  !helpers.validateNumberInArray(n, orderRouletterNumbers) && numberInput.value
    ? (textErrorNumber.textContent = "* number not exist on roulette")
    : (textErrorNumber.textContent = "");
});

buttonSubmitNumber.addEventListener("submit", async (e) => {
  e.preventDefault();
  let n = !numberInput.value ? false : Number(numberInput.value);

  let numbeToSave =
    !numberInput.vaue && !numberInput.value.trim()
      ? null
      : numberInput.value.trim();
  if (!numbeToSave) {
    let txt = "* Number is required";
    return (textErrorNumber.textContent = txt);
  }
  if (
    !helpers.validateNumberInArray(n, orderRouletterNumbers) &&
    numberInput.value
  ) {
    return 0;
  }

  //save a number on database
  const res = await apiNumber.createNumber(numbeToSave);
  console.log(res);
  if (res.status == 200) {
    renderAllAlgorithms();
    numbers.push({ id: 0, number: numbeToSave });
    savedNumbers.push(numbeToSave);
    let span = document.createElement("span");
    let txt = document.createTextNode(numbeToSave);
    span.appendChild(txt);
    historyRoulette.insertBefore(span, historyRoulette.children[0]);
    window.location.reload();
  }
  numberInput.value = "";
});

// get all numbers

(async () => {
  let res = await apiNumber.getAllNumbers();
  if (res.status == 200) {
    numbers = res.data;
    renderAllAlgorithms();
    res.data.reverse().map((item) => {
      let span = document.createElement("span");
      let text = document.createTextNode(item.number);
      span.appendChild(text);
      historyRoulette.appendChild(span);
    });
  }
})();

function renderNumbersByMean() {
  let card = resultCard({ title: "render number by Mean", numbers: [] });
  algsContainer.appendChild(card);
}
function renderNumbersByMode3HotLong() {
  let array = algorithm.getHotNumbersByLongRtoL(
    numbers.map((item) => item.number),
    10
  );
  let card = resultCard({
    title: "render numbers by 10 hot long",
    numbers: array.map((item) => item.number),
  });
  algsContainer.appendChild(card);
}
function renderNumbersByLast40() {
  let aNumbers = numbers.map((item) => item.number);
  let cNumbers = algorithm.getLimitELements(aNumbers.reverse(), 40);
  console.log(cNumbers);
  let hotArray = algorithm.getHotNumbersByLongLtoR(cNumbers, 30);

  let card = resultCard({
    title: "render numbers by last 40 => 10 numbers",
    numbers: hotArray.map((item) => item.number),
  });
  algsContainer.appendChild(card);
}
function renderNumbersByMode10HotLong() {
  let array = algorithm.getHotNumbersByLongRtoL(
    numbers.map((item) => item.number),
    37
  );
  console.log(array);
  let card = resultCard({
    title: "render numbers by 10 hot long",
    numbers: array.map((item) => item.number),
  });
  algsContainer.appendChild(card);
}
function renderAllAlgorithms() {
  renderNumbersByMean();
  renderNumbersByMode3HotLong();
  renderNumbersByLast40();
  renderNumbersByMode10HotLong();
}
// (() => {
//   for (let i = 0; i < 5; i++) {
//     let card = resultCard({
//       title: "title" + i,
//       numbers: [
//         34, 3, 3, 1, 3, 4, 5, 34, 3, 3, 1, 3, 4, 534, 3, 3, 1, 3, 4, 534, 3, 3,
//         1, 3, 4, 5, 34, 3, 3, 1, 3, 4, 5,
//       ],
//     });
//     algsContainer.appendChild(card);
//   }
// })();
