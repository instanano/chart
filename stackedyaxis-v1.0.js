function draw_multiStackLines(){



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom,
    colum_names="";



function chart(selection){



              selection.each(function(data) {

var padding = 35;
var svg = d3.select(this);
var columns_names = data.columns;



svg.selectAll('*').remove();

var topchart = svg.append("g").attr("class", "topchart").attr("transform", "translate(0," + (5) + ")");
var midllechart = svg.append("g").attr("class", "midllechart").attr("transform", "translate(0," + ((height/3)-47) + ")");
var bottomchart = svg.append("g").attr("class", "bottomchart").attr("transform", "translate(0," + ((height/2)+10)+")");




//================= scales=====================//
  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
            .domain(d3.extent(data[columns_names[0]].$data, function(d) { return d; }))
            .range([padding, width - padding]);


  var y1 = d3.scaleLinear()
             .domain([0, d3.max(data[columns_names[1]].$data, function(d) { return +d; })])
            .range([height/3 - padding, padding]);



  var y2 = d3.scaleLinear()
             .domain([0, d3.max(data[columns_names[2]].$data, function(d) { return +d; })])
             .range([height/3 - padding, padding]);


  var y3 = d3.scaleLinear()
             .domain([0, d3.max(data[columns_names[3]].$data, function(d) { return +d; })])
             .range([height/3 - padding, padding]);




// y-axis for top chart
var yAxisTop = d3.axisLeft()
    .scale(y1).ticks(5);

// y-axis for Midlle chart
var yAxisMidlle = d3.axisLeft()
    .scale(y2).ticks(5)

// y-axis for bottom chart
var yAxisBottom = d3.axisLeft()
    .scale(y3).ticks(5)
 
// ===================  draw axis 

topchart.append("g")
    .attr("class", "axis y-axis1")
    .attr("transform", "translate(" + padding + ",-9)")
    .call(yAxisTop);


  topchart.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(" + 0 + ",130)")
      .call(d3.axisBottom(x).tickFormat((domain,number)=>{return ""}));


midllechart.append("g")
    .attr("class", "axis y-axis2")
  .attr("transform", "translate(" + padding + ",10)")
    .call(yAxisMidlle);

  midllechart.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + 150+")")
      .call(d3.axisBottom(x).tickFormat((domain,number)=>{return ""}));

bottomchart.append("g")
          .attr("class", "axis y-axis3")
          .attr("transform", "translate(" + padding + ",20)")
          .call(yAxisBottom);


  bottomchart.append("g")
             .attr("class", "axis x-axis")
             .attr("transform", "translate(0," + 160+")")
             .call(d3.axisBottom(x).tickFormat(d3.format("d")));


// ===================  draw lines with distance (padding)

var lineTop = d3.line()
    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y1(+d[1]); //Y1
    });



var lineMiddle= d3.line()

    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y2(+d[2]); //Y2
    });




var lineBottom= d3.line()

    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y3(+d[3]); //Y3
    });


topchart.append("path")
        .attr("d", lineTop(data.$data)) 
        .attr("fill", "none") 
        .attr("stroke", "red")
        .attr("stroke-width", 2.5)
        .on('mouseover', function (d,i){ //add interaction on line 
                  d3.selectAll('.dots1')
                    .style("opacity", 1)
                     })
         .on('mouseout', function(){
                d3.selectAll('.dots1')
               .style("opacity", 0); 
             });






midllechart.append("path")
           .attr("d", lineMiddle(data.$data)) 
           .attr("fill", "none") 
           .attr("stroke", "blue").attr("stroke-width", 2.5)
          .on('mouseover', function (d,i){ //add interaction on line 
                  d3.selectAll('.dots2')
                    .style("opacity", 1)
                     })
         .on('mouseout', function(){
                d3.selectAll('.dots2')
               .style("opacity", 0); 
             });


bottomchart.append("path")
           .attr("d", lineBottom(data.$data)) 
           .attr("fill", "none") 
           .attr("stroke", "green").attr("stroke-width", 2.5)
            .on('mouseover', function (d,i){ //add interaction on line 
                  d3.selectAll('.dots3')
                    .style("opacity", 1)
                     })
            .on('mouseout', function(){
                d3.selectAll('.dots3')
               .style("opacity", 0); 
             });




//==================Grid lines



 svg.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

 svg.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )

function make_x_axis() {        
    return d3.axisBottom(x)
         .ticks(5)
}



function make_y_axis() {        
    return d3.axisLeft(x)
         .ticks(10)
}




//////////
    // LEGEND //
    //////////


//================== Dots

 // Data dots
    topchart.append('g').attr("class","l1")
    .selectAll("my1")
   .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots1')
     .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y1(+d[1]); })
        .attr("opacity",0)
   .style("fill","red")
  

  


 // Data dots
     midllechart.append('g').attr("class","l2")
    .selectAll("my2")
   .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots2')
     .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y2(+d[2]); })
    .attr("opacity",0)
   .style("fill","blue")



 // Data dots
     bottomchart.append('g').attr("class","l3")
    .selectAll("my3")
    .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots3')
    .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y3(+d[3]); })
   .attr("opacity",0)
   .style("fill","green")


    // Add one dot in the legend for each name.
    var size = 160;

   var subgroups = data.columns.slice(1)
   // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
                .domain(subgroups)
               .range([ "red", "blue","green"]);

  


// Add one dot in the legend for each name.
    svg.selectAll("myline")
      .data(subgroups)
      .enter()
      .append("text")
        .attr("x", 580)
        .attr("y", function(d,i){ return 10+i*(size+10)}) 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")






});





}


return chart;

}
