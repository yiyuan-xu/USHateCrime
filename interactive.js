var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 600 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz").append("svg")
.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");
svg.append('rect').attr('x','0').attr('y','0').attr('width',width).attr('height',height).attr('fill','aliceblue').attr('id','canvas')


// console.log(data.Crime_Rate)
// var allStates = d3.map(data, function(d){return(d.State)}).keys()

// var temp = new Set();
// data.forEach( d => {
//   temp.add(d.State) 
// })
// var allStates = Array.from(temp)

var allStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

var allFactor = ['Crime Rate','Median Income','Total Offenses']


var parseDate = d3.timeParse("%Y");
data.forEach(function(d,i) {
  d.Year = parseDate(d.Year);
});

var options1 = d3.select("#selectButton1")
  .selectAll("option")
  .data(allStates)
  .enter()
  .append('option')
  .property("selected", function(d){ return d === allStates[0]; })

options1.text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

var options2 = d3.select("#selectButton2")
  .selectAll("option")
  .data(allStates)
  .enter()
  .append('option')
  .property("selected", function(d){ return d === allStates[1]; })

options2.text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

var options3 = d3.select("#selectButton3")
  .selectAll("option")
  .data(allFactor)
  .enter()
  .append('option')
  .property("selected", function(d){ return d === allFactor[0]; })

options3.text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button



var myColor = d3.scaleOrdinal()
  .domain(allStates)
  .range(['#c23271', '#678007', '#82a68d', '#ac5906', '#ff7b91', '#437e8a', '#59c3fa', '#e509ae', '#698ffc', '#9dabfa', '#6ed014', '#ee534e', '#8a91a7', '#a946aa', '#faff16', '#158940', '#07c99d', '#b65d66', '#5776a9', '#c281fe', '#24c9d7', '#1b70fc', '#a88178', '#989e5d', '#d50527', '#c091ae', '#fa9316', '#16977e', '#22e67a', '#85c070', '#a978ba', '#fe9169', '#c5639c', '#07a2e6', '#fe6616', '#ff6ac8', '#6aa2a9', '#88fc07', '#cb9b64', '#f92b75', '#7a7352', '#d24506', '#b21bff', '#f898fd', '#678275', '#bfd544', '#c5a121', '#866888', '#9e8010', '#10b437', '#cd714a', '#94aa05']);


var x = d3.scaleTime()
  // .domain([d3.min(data, function(d) { return d.Year; }),d3.max(data, function(d) { return d.Year; })])
  .domain(d3.extent(data, function(d) { return d.Year; }))
  .range([ 0, width ]);

svg.append("g")
.attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(x));
.call(d3.axisBottom(x))

var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.Crime_Rate; })*1.3])
  .range([ height, 0 ]);

var yaxis = svg.append("g")
  .call(d3.axisLeft(y));

svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Year");

svg.append("text")
    .attr('id', 'ytext')
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Crime Rate");


// var tooltip = d3.select("#my_dataviz")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")


// var mouseover = function(d) {
//     tooltip
//       .style("opacity", 1)
//   }

// var mousemove = function(d) {
//     tooltip
//       .html("The exact value of<br>the Ground Living area is: " + d.Crime_Rate)
//       .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }

// var mouseleave = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }


var dot1 = svg
  .append('g')
  .attr('class','dot1')
  .selectAll("dot")
    .data(data.filter(function(d){return d.State==allStates[0]}))
    .enter()
    .append("circle")
    .attr('cx', function(d){ return x(d.Year) })
    .attr('cy', function(d){ return y(d.Crime_Rate) })
    .attr("r", 5)
    .attr('id','plot1')
    .style("fill", function(d){ return myColor(allStates[0]) })


// d3.select('svg').select('.dot1').selectAll('circle').on("mouseover", function(d) {tooltip.style("opacity", 1)})
// d3.select('svg').select('.dot1').selectAll('circle').on("mousemove", function(d) {tooltip
//       .html("The exact value of<br>the Ground Living area is: " + d.Crime_Rate)
//       .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px")})
// d3.select('svg').select('.dot1').selectAll('circle').on("mouseleave", function(d) {tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)})

var line1 = svg
  .append('g')
  .attr('class','plot1')
  .append('path')
  .datum(data.filter(function(d){return d.State==allStates[0]}))
  .attr("d", d3.line()
      .x(function(d) { return x(d.Year) })
      .y(function(d) { return y(+d.Crime_Rate) })
    )
   .attr("stroke", function(d){ return myColor(allStates[0]) })
   .style("stroke-width", 2)
   .style("fill", "none")


var dot2 = svg
  .append('g')
  .attr('class','dot2')
  .selectAll("dot")
    .data(data.filter(function(d){return d.State==allStates[1]}))
    .enter()
    .append("circle")
    .attr('cx', function(d){ return x(d.Year) })
    .attr('cy', function(d){ return y(d.Crime_Rate) })
    .attr("r", 5)
    .attr('id','plot2')
    .style("fill", function(d){ return myColor(allStates[1]) })
  // .on("mouseover",mouseover)
  // .on("mousemove",mousemove)
  // .on("mouseleave",mouseleave)

// d3.select('svg').select('.dot2').selectAll('circle').on("mouseover", function(d) {tooltip.style("opacity", 1)})
// d3.select('svg').select('.dot2').selectAll('circle').on("mousemove", function(d) {tooltip
//       .html("The exact value of<br>the Ground Living area is: " + d.Crime_Rate)
//       .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px")})
// d3.select('svg').select('.dot2').selectAll('circle').on("mouseleave", function(d) {tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)})

var line2 = svg
  .append('g')
  .attr('class','plot2')
  .append('path')
  .datum(data.filter(function(d){return d.State==allStates[1]}))
  .attr("d", d3.line()
      .x(function(d) { return x(d.Year) })
      .y(function(d) { return y(+d.Crime_Rate) })
    )
   .attr("stroke", function(d){ return myColor(allStates[1]) })
   .style("stroke-width", 2)
   .style("fill", "none")


svg.append("circle").attr("id","circle1").attr("cx",420).attr("cy",50).attr("r", 6).style("fill", myColor(allStates[0]))
svg.append("text").attr("id","legend1").attr("x", 440).attr("y", 50).text(allStates[0]).style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("id","circle2").attr("cx",420).attr("cy",70).attr("r", 6).style("fill", myColor(allStates[1]))
svg.append("text").attr("id","legend2").attr("x", 440).attr("y", 70).text(allStates[1]).style("font-size", "15px").attr("alignment-baseline","middle")




function update1(selectedState) {

  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.State==selectedState})
  var chosenFactor = d3.select("#selectButton3").property("value")

  // Give these new data to update line
  dot1
      .data(dataFilter)
      .transition()
      .duration(1000)
      .attr('cx', function(d){ return x(d.Year) })
      .attr('cy', function(d){ if(chosenFactor == "Crime Rate") {return y(d.Crime_Rate)}
                               else if(chosenFactor == "Median Income"){return y(d.Median_Income)}
                               else {return y(d.Offenses)};
                         })
      .attr("r", 5)
      .style("fill", function(d){ return myColor(selectedState) })

  line1
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { if(chosenFactor == "Crime Rate"){return y(+d.Crime_Rate)}
                         else if(chosenFactor == "Median Income"){return y(+d.Median_Income)} 
                         else {return y(+d.Offenses)}
                   })
      )
      .attr("stroke", function(d){ return myColor(selectedState) })

  svg.select("#circle1").attr("cx",420).attr("cy",50).attr("r", 6).style("fill", myColor(selectedState))
  svg.select("#legend1").attr("x", 440).attr("y", 50).text(selectedState).style("font-size", "15px").attr("alignment-baseline","middle")
}

// When the button is changed, run the updateChart function
d3.select("#selectButton1").on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update1(selectedOption)
})



function update2(selectedState) {

  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.State==selectedState})
  var chosenFactor = d3.select("#selectButton3").property("value")
  // Give these new data to update line
  dot2
      .data(dataFilter)
      .transition()
      .duration(1000)
      .attr('cx', function(d){ return x(d.Year) })
      .attr('cy', function(d){ if(chosenFactor == "Crime Rate") {return y(d.Crime_Rate)}
                               else if(chosenFactor == "Median Income"){return y(d.Median_Income)}
                               else {return y(d.Offenses)}; })
      .attr("r", 5)
      .style("fill", function(d){ return myColor(selectedState) })

  line2
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { if(chosenFactor == "Crime Rate"){return y(+d.Crime_Rate)}
                         else if(chosenFactor == "Median Income"){return y(+d.Median_Income)} 
                         else {return y(+d.Offenses)}
                   })
      )
      .attr("stroke", function(d){ return myColor(selectedState) })

  svg.select("#circle2").attr("cx",420).attr("cy",70).attr("r", 6).style("fill", myColor(selectedState))
  svg.select("#legend2").attr("x", 440).attr("y", 70).text(selectedState).style("font-size", "15px").attr("alignment-baseline","middle")
}

// When the button is changed, run the updateChart function
d3.select("#selectButton2").on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update2(selectedOption)
})



function update3(selectedFactor) {

  // Create new data with the selection?
  var selectedState1 = d3.select("#selectButton1").property("value")
  var dataFilter1 = data.filter(function(d){return d.State==selectedState1})

  var selectedState2 = d3.select("#selectButton2").property("value")
  var dataFilter2 = data.filter(function(d){return d.State==selectedState2})

  y.domain([0, d3.max(data, function(d) { if (selectedFactor == "Crime Rate") {return +d.Crime_Rate;}
                                          else if (selectedFactor == "Median Income") {return +d.Median_Income;}
                                          else {return +d.Offenses;}
                                    })*1.3])
  yaxis.transition().duration(1000).call(d3.axisLeft(y))

  d3.select('svg').select('text#ytext').transition().duration(1000).text(selectedFactor)
  // Give these new data to update line
  
  d3.select('svg').select(".dot1").selectAll('circle').data(dataFilter1).transition().duration(1000).attr('cx', function(d){ return x(d.Year) }).attr('cy', function(d){ if (selectedFactor == "Crime Rate") {return y(d.Crime_Rate)}
      else if (selectedFactor == "Median Income") {return y(d.Median_Income)} else {return y(d.Offenses)};}).attr('r',5)

  d3.select('svg').select(".dot2").selectAll('circle').data(dataFilter2).transition().duration(1000).attr('cx', function(d){ return x(d.Year) }).attr('cy', function(d){ if (selectedFactor == "Crime Rate") {return y(d.Crime_Rate)}
      else if (selectedFactor == "Median Income") {return y(d.Median_Income)} else {return y(d.Offenses)};}).attr('r',5)

  // console.log("This is a gap test!!!")

  d3.select('svg').select(".plot1").selectAll('path')
      .datum(dataFilter1)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { if(selectedFactor == "Crime Rate"){return y(+d.Crime_Rate)}
                         else if(selectedFactor == "Median Income"){return y(+d.Median_Income)} 
                         else {return y(+d.Offenses)}
                   })
      )

  
  d3.select('svg').select(".plot2").selectAll('path')
      .datum(dataFilter2)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { if(selectedFactor == "Crime Rate"){return y(+d.Crime_Rate)}
                         else if(selectedFactor == "Median Income"){return y(+d.Median_Income)} 
                         else {return y(+d.Offenses)}
                   })
      )
  // line1
  //     .data(dataFilter1)
  //     .transition()
  //     .duration(1000)
  //     .attr('cx', function(d){ return x(d.Year) })
  //     .attr('cy', function(d){ if (selectedFactor == "Crime Rate") {return y(d.Crime_Rate)}
  //                              else if (selectedFactor == "High School Rate") {return y(d.High_School_Rate)} 
  //                              else {return y(d.Living_Index)};
  //                  })
  //     .attr("r", 5)
  //     .style("fill", function(d){ return myColor(selectedState) });

  //svg.select("#circle1").attr("cx",320).attr("cy",50).attr("r", 6).style("fill", myColor(selectedState))
}
  //svg.select("#legend1").attr("x", 340).attr("y", 50).text(selectedState).style("font-size", "15px").attr("alignment-baseline","middle")


function update4(selectedFactor) {

  // Create new data with the selection?
  var selectedState1 = d3.select("#selectButton1").property("value")
  var dataFilter1 = data.filter(function(d){return d.State==selectedState1})

  var selectedState2 = d3.select("#selectButton2").property("value")
  var dataFilter2 = data.filter(function(d){return d.State==selectedState2})

  // y.domain([0, d3.max(data, function(d) { if (selectedFactor == "Crime Rate") {return +d.Crime_Rate;}
  //                                         else if (selectedFactor == "High School Rate") {return +d.High_School_Rate;}
  //                                         else {return +d.Living_Index;}
  //                                   })+5])
  // yaxis.transition().duration(1000).call(d3.axisLeft(y))
  // Give these new data to update line
  
  line2
      .data(dataFilter2)
      .transition()
      .duration(1000)
      .attr('cx', function(d){ return x(d.Year) })
      .attr('cy', function(d){ if (selectedFactor == "Crime Rate") {return y(d.Crime_Rate)}
                               else if (selectedFactor == "High School Rate") {return y(d.High_School_Rate)} 
                               else {return y(d.Living_Index)};
                   })
      .attr("r", 5)
      .style("fill", function(d){ return myColor(selectedState) });
  
  //svg.select("#circle1").attr("cx",320).attr("cy",50).attr("r", 6).style("fill", myColor(selectedState))
}


function rdsee(selectedOption){
      console.log("You have selected: "+selectedOption)
}


// When the button is changed, run the updateChart function
d3.select("#selectButton3").on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option

    update3(selectedOption)
    // update4(selectedOption)
    
})



// var xaxis = d3.scaleLinear()
// .domain([2009, 2019])
// .range([ 0, width ]);

// svg.append("g")
// .attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(xaxis));

// var yaxis = d3.scaleLinear()
// .domain([0, 20])
// .range([ height, 0]);
// svg.append("g")
// .call(d3.axisLeft(yaxis));


//       year = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]
//       crime_rate = [3.56,2.45,13.12,5.13,8.63,9.24,2.13,14.56,6.21,10.13,5.24]

//       //svg.selectAll('scatter').data(d).enter().append('circle').attr('cx',function(s){return xaxis(s+2008)}).attr('cy',function(s){return yaxis(s/2 + s*4.37)}).attr('r',2).style('fill','red')

// svg.selectAll('scatter').data(year).enter().append('circle').attr('cx',xaxis(year)).attr('cy',yaxis(crime_rate)).attr('r',2).style('fill','red')
