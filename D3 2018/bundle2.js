(function (d3,topojson) {
  'use strict';

  const svg = d3.select('svg');


  /*let selectcountry=null;
  const onClick= id=>{selectcountry=id;
  render();};
  */


  const projection = d3.geoEquirectangular(); //changed map
  const pathGenerator = d3.geoPath().projection(projection);

  const g = svg.append('g');

  g.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({type: 'Sphere'}));

  svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
  }));

  Promise.all([
    //tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
    d3.csv('https://vizhub.com/MukundKhandelwal/datasets/primary_1.csv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')//from world atlas
  ]).then(([tsvData, topoJSONdata]) => {

    const countryName = tsvData.reduce((accumulator, d) => {
      accumulator[d.iso_n3] = d.name;
      return accumulator;
    }, {});


    const Eco = {}; // economic status of the country
    tsvData.forEach(d => {
      Eco[d.iso_n3] = d.economy;
    });

  /*function ecoadd(a,b) { return a + '' + b };
  function detail (d) {
  return countryName[d.id]+'\n'+Eco[d.id] };.*/


    const cont = {}; // continent of the country
    tsvData.forEach(d => {
      cont[d.iso_n3] = d.continent;
    });



    const pb = {}; // continent of the country
    tsvData.forEach(d => {
      pb[d.iso_n3] = d.primary_balance;
    });

    const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
    g.selectAll('path').data(countries.features)
      .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
      .append('title')
        //.text(detail);
    .text( function(d){return countryName[d.id]+
      ', ' + pb[d.id]
      + '\n'+Eco[d.id]+','+cont[d.id]; // broader economic position
    });
  });

}(d3,topojson));
