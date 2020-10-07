
var svgWidth = 960;
var svgHeight = 660;
// console.log("width", svgWidth);
// console.log("height" ,svgHeight);


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


var x_axis = "age";

function xScale(healthData, x_axis){
    var xLinearScale = d3.scaleLinear()
                    .domain([d3.min(healthData, d=>d[x_axis]),
                    d3.max(healthData, d=>d[x_axis])])
                    .range([0, chartWidth]);
    return xLinearScale;
}

function renderAxes(newXScale, xAxis){
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
         .duration(1000)
         .call(bottomAxis);
    return xAxis;
}

function renderCircles(circlesGroup, newXScale, x_axis){
    circlesGroup.transition()
                .duration(1000)
                .attr("cx", d=>newXScale(d[x_axis]));

    return circlesGroup;
}



d3.csv("assets/data/data.csv").then(function(healthData){
    console.log("heathdata test");
    healthData.forEach(function(d){
        d.age = +d.age;
        d.smokes = +d.smokes;
        d.income = +d.income;
        d.abbr = +d.abbr;
    });
    console.log("test1")
    var xLinearScale = xScale(healthData, x_axis);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d =>d.smokes)])
        .range([chartHeight, 0]);

    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
   
    chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    

    chartGroup.selectAll(".circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", d=>xLinearScale(d.age))
        .attr("cy", d=>yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("stroke", "black");
    chartGroup.append("g")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight})`);

chartGroup.append("text")
.attr("x", 375)
.attr("y",600)
.attr("value", "age")
.text("Median Age")



chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - chartMargin.left-5)
.attr("x", 0 - (chartHeight/2))
.attr("dy", "1em")
.text("Smokers per Capita")
xLinearScale = xScale(healthData, x_axis);

chartGroup.selectAll("text")
  
});
console.log("bottom test")
