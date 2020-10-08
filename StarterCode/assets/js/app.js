
var svgWidth = 1800;
var svgHeight = 660;
// console.log("width", svgWidth);
// console.log("height" ,svgHeight);


var chartMargin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 80
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


var x_axis = "income";

function xScale(healthData, x_axis){
    var xLinearScale = d3.scaleLinear()
                    .domain([d3.min(healthData, d=>d[x_axis]),
                    d3.max(healthData, d=>d[x_axis])])
                    .range([0, chartWidth]);
    return xLinearScale;
}

d3.csv("assets/data/data.csv").then(function(healthData){
    console.log("heathdata test");
    healthData.forEach(function(d){
        d.poverty = +d.income;
        d.obesityHigh = +d.obesityHigh;
        d.abbr = +d.abbr;
    });
    console.log("test1")
    var xLinearScale = xScale(healthData, x_axis);

    var yLinearScale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d =>d.obesityHigh)])
        .range([chartHeight, 20]);

    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
   
    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    // var abbr = healthData;
    // console.log(healthData);

    chartGroup.selectAll(".circle")
        .data(healthData)
        .enter()
        .append("circle")
        // .append("text")
        .attr("class", "circle")
        .attr("cx", d=>xLinearScale(d.income))
        .attr("cy", d=>yLinearScale(d.obesityHigh))
        .attr("r", "10")
        .attr("fill", "green")
        .attr("stroke", "black")
        
    chartGroup.append("g")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight})`);

chartGroup.append("text")
.attr("y", 0 + chartMargin.bottom+475)
.attr("x", 0 + (chartHeight))
.attr("value", "income")
.text("Income in $", "bold")



chartGroup.append("text")
.attr("transform", "rotate(-90)", "bold")
.attr("y", 0 - chartMargin.left)
.attr("x", 0 - (chartHeight/1.5))
.attr("dy", "1em")
.text("Avg. Highest Body Mass Index")
xLinearScale = xScale(healthData, x_axis);

chartGroup.selectAll("text")
  
});
console.log("bottom test")
