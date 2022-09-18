import circle from "./modules/circle.svg.js";

let container = document.querySelector(".container-practice-svg");
let svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgNode.setAttribute("x", 0);
svgNode.setAttribute("y", 0);
svgNode.setAttribute("width", 400);
svgNode.setAttribute("width", 400);
svgNode.setAttribute("viewBox", "0 0 400 400");
svgNode.setAttribute("stroke", 1);
svgNode.style.border = "1px solid #000";

//draw circles

circle.draw(svgNode, 50, 50, 50, "#f00", "ball");
circle.draw(svgNode, 70, 200, 50, "#f00", "ball");

container.appendChild(svgNode);
