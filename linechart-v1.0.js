function draw_multiLines(){

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 680 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    colum_names="";

var padding = 150;

function chart(selection){

         selection.each(function(data) {


 var svg = d3.select(this);
  svg.selectAll("*").remove();

 


var chart = svg.append("g").attr("class", "chart").attr("transform", "translate(20," + (80) + ")");

var columns_names = data.columns

//================= scales=====================//

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data[columns_names[0]].$data, function(d) { return +d; }))
    .range([ 0, width-50]);


 chart.append("g")
    .attr("transform", "translate(0," +(height-padding) + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  

//computes max /min for Y1, Y2 and Y3

var min_maxY=[d3.max(data[columns_names[1]].$data, function(d) { return +d; }),d3.min(data[columns_names[1]].$data, function(d) { return +d; }), d3.max(data[columns_names[2]].$data, function(d) { return +d; }),d3.min(data[columns_names[2]].$data, function(d) { return +d; }),d3.max(data[columns_names[3]].$data, function(d) { return +d; }),d3.min(data[columns_names[3]].$data, function(d) { return +d; })];


console.log("min_maxY=",min_maxY)
// Scales 
  var y = d3.scaleLinear()
      .domain(d3.extent(min_maxY, function(d) { return +d; }))
    .range([height-padding-10, 0 ]);
 console.log(y.domain())


//================= axis Y (Y1, Y2 and Y3)
chart.append("g")  //.attr("transform", "translate(0," +(height+10) + ")")

  .attr("class", "axis y-axis")
    .call(d3.axisLeft(y));


 // Add X axis label:


  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 320)
      .attr("y", height-25 )
      .text(columns_names[0]);


// Add Y axis label:
  svg.append("text")
      
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", 50 )
      .text("Y axis")
      .attr("text-anchor", "start")

//========================= lines ===================//



var line_XY1 = d3.line()
    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y(+d[1]); //Y1
    });



var line_XY2= d3.line()

    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y(+d[2]); //Y2
    });




var line_XY3= d3.line()

    .x(function(d) { 
        return x(+d[0]);  //X1
    })
    .y(function(d) { 
        return y(+d[3]); //Y3
    });




chart.append("path").attr("d", line_XY1(data.$data)) .attr("fill", "none") .attr("stroke", "red")
.attr("stroke-width", 1.5);
chart.append("path").attr("d", line_XY2(data.$data)) .attr("fill", "none") .attr("stroke", "blue").attr("stroke-width", 1.5).attr("class","l2");
chart.append("path").attr("d", line_XY3(data.$data)) .attr("fill", "none") .attr("stroke", "green").attr("stroke-width", 1.5);;

//================== circles

 // Data dots
    chart.append('g').attr("class","l1")
    .selectAll("my1")
   .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots')
  .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y(+d[1]); })
.attr("opacity",0)
   .style("fill","red")
  

  


 // Data dots
     chart.append('g').attr("class","l2")
    .selectAll("my2")
   .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots')
  .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y(+d[2]); })
.attr("opacity",0)
   .style("fill","blue")



 // Data dots
     chart.append('g').attr("class","l3")
    .selectAll("my3")
   .data(data.$data)
    .enter()
    .append("circle")
    .attr("class",'dots')
  .attr("r", 5)
        .attr("cx", function(d) { return x(+d[0]); })
        .attr("cy", function(d) { return y(+d[3]); })
.attr("opacity",0)
   .style("fill","green")




//==================Grid lines



 chart.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(50," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

 chart.append("g")         
        .attr("class", "grid")      //.attr("transform", "translate(0," + 0 + ")")
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

    // Add one dot in the legend for each name.
    var size = 15

   var subgroups = data.columns.slice(1)
   // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range([ "red", "blue","green"]);


svg.selectAll("myline")
   .data(subgroups)
    .enter()
    .append("circle")
   .attr("cx",550)
  .attr("cy", function(d,i){ return  8+i*(size+8)}) // 100 is where the first dot appears. 25 is the distance between 
   .attr("r", 6)
 .style("fill", function(d){ return color(d)})

.on('mouseover', function (d,i){
d3.selectAll('.dots')
.style("opacity", 1)
})
 .on('mouseout', function(){
d3.selectAll('.dots')
.style("opacity", 0); 
});
  


// Add one dot in the legend for each name.
    svg.selectAll("myline")
      .data(subgroups)
      .enter()
      .append("text")
        .attr("x", 550 + size*1.2)
        .attr("y", function(d,i){ return 10+i*(size+10)}) 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")

});

}

return chart;

}
