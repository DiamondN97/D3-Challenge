
var svgWidth = 960;
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
    console.log("healthdata test line 42");
    healthData.forEach(function(d){
        d.poverty = +d.income;
        d.obesityHigh = +d.obesityHigh;
        abbr = +d.abbr;
        state = +d.state
        // console.log("in function abbr", d.abbr)
        

    // console.log(d.abbr)
    var xLinearScale = xScale(healthData, "income");

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
        // .append("text", d.abbr)
        // .append("state")
        .attr("class", "circle")
        .attr("cx", d=>xLinearScale(d.income))
        .attr("cy", d=>yLinearScale(d.obesityHigh))
        // .attr("text", d=>d.abbr)
        .attr("r", "14",)
        .attr("fill", "blue")
        .attr("opacity", ".5")
        .attr("stroke", "black");
        // console.log(d.abbr)
    
    chartGroup.selectAll('.stateText')
        .data(healthData)
        .enter()
        .append('text')
        .classed('stateText', true)
        .text(d=>d.abbr)
        .attr("dx", d=>xLinearScale(d.income))
        .attr("dy", d=>yLinearScale(d.obesityHigh)+2);
        
    // console.log("abbr test", d.abbr)


       
    chartGroup.append("g")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight})`);
});
chartGroup.append("text")
.attr("y", 0 + chartMargin.bottom+475)
.attr("x", 0 + (chartHeight-100))
.attr("value", "income")
.text("Income in $")



chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - chartMargin.left)
.attr("x", 0 - (chartHeight/1.5))
.attr("dy", "1em")
.text("Avg. Highest Body Mass Index")
xLinearScale = xScale(healthData, x_axis);

chartGroup.selectAll("text")
  
});
// console.log("bottom test line 107")
