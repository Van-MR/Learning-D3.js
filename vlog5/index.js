//javascript

const api = 'http://api.coindesk.com/v1/bpi/historical/close.josn?start=2017-12-31&end=2018-04-01';


/**
 *   Loadig data form api when dom content has been load.
 */

 document.addEventListener("DomContentLoaded",function(event) {
     fetch(api)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var paeseData = parseData(data);
            drawChart(parseData);
        })
        .catch(function(err) {
          console.log(err);
        })
 })

 /**
  *
 */


  function parseData(data) {
      var arr  = [];
      for(var i in data.bpi){
           arr.push({
               date:new Date(i), //date
               value: +data.bpi[i]  //convert string to number
           })
      }
       return arr;
  }


/**
 *  Create a chart using d3
 *  @params{object} data Object containing historical data of BPI
 */

 function drawChart(data) {
     var svgWidth  = 688, svgHeight = 400;
     var margin = { top: 20 , right: 20, bottom: 30, lefft: 50};
     var width = svgWidth - margin.left - margin.right;
     var height = svgWidth - margin.top - margin.bottom;

     var svg = d3.select('svg')
         .attr("width",svgWidth)
         .attr("height",svgHeight)

    var g = svg.append("g")
        .attr("transform","translate(" + margin.left + ","+ margin.top +")");

    var x = d3.scaleTime()
         .rangeRound([8,width]);

    var y = d3.scaleLiner()
        .rangeRound([height,8]);


    var line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.value)})
        x.domain(d3.extent(data, function(d) { return d.date }))
        y.domain(d3.extent(data, function(d) { return d.value }))


    g.append("g")
        .attr("transform","translate(0,"+ height +")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

   g.append("g")
       .call(d3.axisLeft(y))
       .append("text")
       .attr("fill","#000")
       .attr("transform","rotate(-90)")
       .attr("y",6)
       .attr("dy","0.71em")
       .attr("text-anchor","end")
       .text("price($)")

  g.append("path")
     .datum(data)
      .attr("fill","none")
      .attr("stroke","stellblue")
      .attr("stroke-linejoin","round")
      .attr("stroke-width",1.5)
      .attr("d",line);
 }
