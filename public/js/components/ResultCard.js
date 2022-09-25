const resultCard = function (props) {
  let div = document.createElement("div");
  function setTitle() {
    let title = document.createElement("h3");
    title.className = "result-card-title";
    let txt = document.createTextNode(props.title);
    title.appendChild(txt);
    div.appendChild(title);
  }

  function createNumbersDiv() {
    let d = document.createElement("div");
    d.className = "container-numbers-prediction";
    return d;
  }
  function createNumber(number) {
    let span = document.createElement("span");
    span.className = "number-prediction";
    let txt = document.createTextNode(number);
    span.appendChild(txt);
    return span;
  }
  function setNumbers() {
    let container = createNumbersDiv();
    props.numbers.map((item) => {
      let n = createNumber(item);
      container.appendChild(n);
    });
    div.appendChild(container);
  }
  function render() {
    div.className = "result-card";
    setTitle();
    setNumbers();
  }
  render();
  return div;
};

export default resultCard;
