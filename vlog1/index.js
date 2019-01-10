//javascript

// d3.select();
// d3.selectAll();
//
// d3.select('h1').style('color','red')
//   .attr('class','heading')
//   .text('Updated h1 tag');
//
// d3.select('body').append('p').text('First Paragraph')
// d3.select('body').append('p').text('Second Paragraph')
// d3.select('body').append('p').text('Third Paragraph')


// var dataset = [1,2,3,4,5]
//
// d3.select('body')
//       .selectAll('p')
//       .data(dataset)
//       .enter()
//       .append('p')  //append Paragraph for Each element
//       .text(function(d) {
//         return d;
//       })


//create simple bar chart

var dataset = [80,100,56,120,180,30,40,120,168]

var svgWidth = 500, svgHeight = 300 , barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr('width',svgWidth)
    .attr('height',svgHeight);

var barChart = svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("y",function(d) {
         return svgHeight-d
     })
     .attr("height", function(d) {
         return d;
     })
     .attr("width",barWidth - barPadding)
     .attr("transform",function(d,i) {
         var translate = [barWidth * i , 0];
         return "translate("+ translate +")";
     });

var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d) {
      return d;
    })
    .attr("y",function(d) {
        return svgHeight - d - 2;
    })
    .attr("x",function(d,i) {
       return barWidth * i;
    })
    .attr("fill","#A64C38")
