function drawStackedArea(){



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 680 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var padding = 10;

function chart(selection){



              selection.each(function(data) {

var padding=30;
 var svg = d3.select(this);


  

svg.selectAll('*').remove();


var columns_names = data.columns


  // List of groups = species here X values 
  var groups = d3.map(data[columns_names[0]].$data, function(d){return(d)}).keys();


 // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)




//y scale


var min_maxY=[d3.max(data[columns_names[1]].$data, function(d) { return +d; }),d3.min(data[columns_names[1]].$data, function(d) { return +d; }), d3.max(data[columns_names[2]].$data, function(d) { return +d; }),d3.min(data[columns_names[2]].$data, function(d) { return +d; }),d3.max(data[columns_names[3]].$data, function(d) { return +d; }),d3.min(data[columns_names[3]].$data, function(d) { return +d; })];



  // color palette
  var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range([ "#db6454", "#f0c300","#c83d2a"]);
 



  // Add a clipPath: everything out of this area won't be drawn.
  var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

////////////////////////////////////////////////////////////////////////////
var index=['1','2','3']
console.log("Data=",index)

  //stack the data
  var stackedData = d3.stack()
    .keys(index)
    (data.$data)

console.log("stackedData=",stackedData)


  //////////
  // AXIS //
  //////////

  // Add X axis
 
  
 var x = d3.scaleLinear()
    .domain(d3.extent(data[columns_names[0]].$data, function(d) { return d; }))
   .range([ 0, width-130]);
  



var xAxis = svg.append("g")
               .attr("transform", "translate(40," +(height-8) + ")")
               .call(d3.axisBottom(x).tickFormat(d3.format("d")))


//================== Add Y axis


//computes max /min for Y1, Y2 and Y3

 y = d3.scaleLinear()
     .domain(d3.extent(min_maxY, function(d) { return +d; }))
    .range([ height-100, 0 ]);
  
svg.append("g")
 .attr("transform", "translate(38," +(55)+ ")")
    .call(d3.axisLeft(y))


    // Add X axis label:

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 300)
      .attr("y", height+30 )
      .text(columns_names[0]);

 // Add Y axis label:
  svg.append("text")
      
      .attr("text-anchor", "end")
      .attr("x", 30)
      .attr("y", 20 )
      .text("Y axis")
      .attr("text-anchor", "start")

  // Create the scatter variable: where both the circles and the brush take place
  var areaChart = svg.append('g')
    .attr("clip-path", "url(#clip)")
    .attr("transform","translate(" + 40 + "," + 50 + ")");



// Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data[0]); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })


 // Create the scatter variable: where both the circles and the brush take place
  
  // Show the areas
  areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", function(d) { return "myArea" })
      .style("fill", function(d) { return color(d.key); })
     .attr('opacity','0.8')
     .attr("d", area)
     .on('mouseover', function(d,i){
     
         d3.selectAll('.myArea').attr("opacity", 0.2); 
            d3.select(this).attr("opacity", 0.8)
        
      })
    .on('mouseout', function(){
            d3.selectAll('.myArea').attr("opacity", 0.8); 

      })
   
 //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 15
    svg.selectAll("myrect")
      .data(subgroups)
      .enter()
      .append("rect")
        .attr("x", 530)
        .attr("y", function(d,i){ return 1 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
       

        
       

// Add one dot in the legend for each name.
    svg.selectAll("myrect")
      .data(subgroups)
      .enter()
      .append("text")
        .attr("x", 535 + size*1.2)
        .attr("y", function(d,i){ return 5+ i*(size+5) + (size/2)}) 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")




});





}


return chart;

}
