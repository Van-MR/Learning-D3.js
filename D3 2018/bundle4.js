(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  //creates rectangles for each row
  // Quantitative attributes
  // Domain = Data space
  // Range = screen space (pixel coords)

  // Quantitative attributes
  // Domain = Data space
  // Range = screen space (pixel coords)

  // mpg,cylinders,displacement,horsepower,weight,acceleration,model_year,origin,name
  // d.mpg = +d.mpg;
  // d.cylinders = +d.cylinders;
  // d.displacement = +d.displacement;
  // d.horsepower = +d.horsepower;
  // d.weight = +d.weight;
  // d.acceleration = +d.acceleration;
  // d.model_year = +d.model_year;


  const render = data => {

    const xValue = d => d.timestamp;
    const xAxisLabel = "Time";
  	const yValue = d => d.temperature;
    const yAxisLabel = "Temperature";
    const margin = {top:100, right:100, bottom:90, left:150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const title = 'A week in SFO - weather';


    const xScale = d3.scaleTime() // maps domain onto range
    .domain(d3.extent(data, xValue)) //min(data, xValue),max(data, xValue)])
    .range([0, innerWidth]); // min max
    //.nice();

    const yScale = d3.scaleLinear() // categorical variables
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0]) // min max
    .nice();

    const g = svg.append('g')
    	.attr('transform', `translate(${margin.left},${margin.top})`);


    const xAxis = d3.axisBottom(xScale)
    	.tickSize(-innerHeight)
    	.tickPadding(15)
    	.ticks(6);

    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const yAxisG = g
    	.append('g')
      .call(yAxis);

    yAxisG
    	.selectAll('.domain')
    	.remove();

    yAxisG.append('text')
    	.attr('class', 'axis-label')
      .attr('y', -93)
    	.attr('fill', 'black')
      .attr('x', -innerHeight/2)
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);


    const xAxisG = g.append('g')
      .call(xAxis)
    	.attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
    	.attr('class', 'axis-label')
      .attr('y', 75)
    	.attr('fill', 'black')
      .attr('x', innerWidth/2)
      .text(xAxisLabel);


    const areaGen = d3.area()
      .x(d => xScale(xValue(d)))
    	.y0(innerHeight)
      .y1(d => yScale(yValue(d)));
    	//.curve(curveBundle.beta(0.75))
    //.curve(d3.curveBasis);

    //console.log(line)

    g.append("path")
        //.data([data])
        .attr("class", "line-path")
        .attr("d", areaGen(data));

   //add the title
    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
  	  .attr('fill', 'black')
      .text(title);



  };

  d3.csv('https://vizhub.com/dpique/datasets/temperature-in-san-francisco.csv')
    .then(data => { // => is the arrow function // then is a promise
  		console.log(data);
      data.forEach(d => { // 1 object per *row* of original table
        d.timestamp = new Date(d.timestamp);
        d.temperature = +d.temperature;
    });
    render(data);
  });

}(d3));
