/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do?
// Adds an svg within the hard-coded-bar div and sets the dimensions of the svg 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// svg 2: bar chart
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height-margin.top-margin.bottom)
  .attr("viewBox", [0,0,width,height])

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

// bar chart with csv data
d3.csv("/data/barchart.csv").then((data) => {
   svg2.selectAll(".bar")
    .data(data)
    .enter()  
    .append("rect")
    .attr("class", "bar")
     .attr("x", (d,i) => xScale1(i))
     .attr("y", (d) => yScale1(d.score))
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
     .attr("width", xScale1.bandwidth())
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);
});



/*

  Axes

*/ 

// TODO: What does this code do?
// find the max score as y
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do? 
// This defines scale functions that
// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)  
let yScale1 = d3.scaleLinear() // linear data -> linear scale
            .domain([0,maxY1]) // input for the function
            .range([height-margin.bottom,margin.top]); // outputs for the function

// TODO: What does each line of this code do? 

let xScale1 = d3.scaleBand() // band scale
            .domain(d3.range(data1.length)) // input for the function, length of the data
            .range([margin.left, width - margin.right]) // outputs for the function
            .padding(0.1);  // assigns some padding 

// TODO: What does each line of this code do?  
svg1.append("g") // g is the placeholder svg
   .attr("transform", `translate(${margin.left}, 0)`) // moves the y-axis inisde to the left margin
   .call(d3.axisLeft(yScale1)) // built in function for left axis given the scale function defined above
   .attr("font-size", '20px');  // sets the font size to 20 pixels

// TODO: What does each line of this code do? 
svg1.append("g") // g is the placeholder svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // moves the x-axis to the bottom of the svg
    .call(d3.axisBottom(xScale1) // built in function for the bottom axis given the scale function
            .tickFormat(i => data1[i].name)) //  sets the ticks to the names of each category
    .attr("font-size", '20px'); // sets the font size to 20pixels


    // TODO: What does each line of this code do?  
svg2.append("g") // g is the placeholder svg
   .attr("transform", `translate(${margin.left}, 0)`) // moves the y-axis inisde to the left margin
   .call(d3.axisLeft(yScale1)) // built in function for left axis given the scale function defined above
   .attr("font-size", '20px');  // sets the font size to 20 pixels

// TODO: What does each line of this code do? 
svg2.append("g") // g is the placeholder svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // moves the x-axis to the bottom of the svg
    .call(d3.axisBottom(xScale1) // built in function for the bottom axis given the scale function
            .tickFormat(i => data1[i].name)) //  sets the ticks to the names of each category
    .attr("font-size", '20px'); // sets the font size to 20pixels

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// creates the area where the information of what is being hovered over
const tooltip1 = d3.select("#hard-coded-bar") // selects the element that has the id hard-coded-bar
                .append("div") // adds a div
                .attr('id', "tooltip1") // gives it the id tooltip1
                .style("opacity", 0) // changes the style, the opacity is 0
                .attr("class", "tooltip"); // gives it the class tooltip

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) { // creates a function
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")  //adds the name and score to each tooltip for the bar chart when hovering
          .style("opacity", 1);  // changes the style, the opacity is 1 while the mouse is hovering over the assigned part
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) { // creates a function
  tooltip1.style("left", (event.x)+"px") // adds left values so it moves with the mouse
          .style("top", (event.y + yTooltipOffset) +"px"); // adds top values so it moves with the mouse
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { // creates a function
  tooltip1.style("opacity", 0); // changes the opacity of tooltip1 to be 0 when the mouse leaves the bar
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar") // selects all the bars in the char
   .data(data1) // adds the data to the svg
   .enter()  
   .append("rect") // adds rectangle to svg1 for each row of data
     .attr("class", "bar") // assigns the class as bar
     .attr("x", (d,i) => xScale1(i)) // makes the x an indent equally spaced out for each category
     .attr("y", (d) => yScale1(d.score)) // makes the y the scale of the max data
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // adds the height to each bar
     .attr("width", xScale1.bandwidth()) // assigns the width of the bars
     .on("mouseover", mouseover1) // looks for a mouse over event
     .on("mousemove", mousemove1) // looks for a mousemove event
     .on("mouseleave", mouseleave1); // looks for a mouseleave event









