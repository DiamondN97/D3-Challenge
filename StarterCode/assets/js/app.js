// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 660;
console.log(svgHeight);

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 70,
    left: 70
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
          .select("#scatter")
          .append("svg")
          .attr("height", svgHeight)
          .attr("width", svgWidth);


var chartGroup = svg.append("g")
                 .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

