let circle = {};
circle.newCircle = function () {
  return document.createElementNS("http://www.w3.org/2000/svg", "circle");
};
circle.draw = function (svgEl, cx, cy, r, fill, className) {
  let el = this.newCircle();
  el.setAttribute("class", className);
  el.setAttribute("cx", cx);
  el.setAttribute("cy", cy);
  el.setAttribute("r", r);
  el.setAttribute("fill", fill);
  svgEl.appendChild(el);
};

export default circle;
