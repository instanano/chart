function drawGroupedBars(){



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 680 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    colum_names="";

var padding = 130;

function chart(selection){

     selection.each(function(data) {

         var padding=30;
         var svg = d3.select(this);
         var columns_names = data.columns


         svg.selectAll('*').remove();


         // List of groups = species here X values 
         var groups = d3.map(data[columns_names[0]].$data, function(d){return(d)}).keys();

        // List of subgroups = header of the csv files = soil condition here
        var subgroups = data.columns.slice(1)

  
        // Add X axis
        var x = d3.scaleBand()
                  .domain(groups)
                  .range([0, (width-100)])
                  .padding([0.2])


        svg.append("g")
           .attr("transform", "translate(35," +(height-15) + ")")
           .call(d3.axisBottom(x).tickSize(0));



        // Add X axis label:
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", 300)
           .attr("y", height+30 )
           .text(columns_names[0]);


        //computes max /min for Y1, Y2 and Y3

        var min_maxY=[d3.max(data[columns_names[1]].$data, function(d) { return +d; }),d3.min(data[columns_names[1]].$data, function(d) { return +d; }), d3.max(data[columns_names[2]].$data, function(d) { return +d; }),d3.min(data[columns_names[2]].$data, function(d) { return +d; }),d3.max(data[columns_names[3]].$data, function(d) { return +d; }),d3.min(data[columns_names[3]].$data, function(d) { return +d; })];


        // Add Y scale
        var y = d3.scaleLinear()
                  .domain(d3.extent(min_maxY, function(d) { return +d; }))
                  .range([height-padding-10, padding]);//padding
   
        // Add Y axis
        svg.append("g")
           .attr("transform", "translate(35," +(10)+ ")")
           .call(d3.axisLeft(y));

        //  scale for subgroup Y1 Y2 Y3
        var xSubgroup = d3.scaleBand()
                          .domain(subgroups)
                          .range([0, x.bandwidth()])
                          .padding([0.05])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
                      .domain(subgroups)
                      .range([ "#db6454", "#f0c300","#c83d2a"]);


        // show bars
        svg.append("g")
           .attr("transform", "translate(35," +(30)+ ")")
           .selectAll("g")
           .data(data.$data)
           .enter()
           .append("g")
             .attr("transform", function(d) { return "translate(" + x(d[0]) + ",-50)"; })
             .selectAll("rect")
                .data(function(d) { return subgroups.map(function(key,i) { return {key: key, value: d[i+1]}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return xSubgroup(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", xSubgroup.bandwidth())
                .attr("height", function(d) { return height - y(+d.value); })
                .attr("fill", function(d) { return color(d.key); });

 
    // LEGEND //
   
    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
      .data(subgroups)
      .enter()
      .append("rect")
        .attr("x", 550)
        .attr("y", function(d,i){ return 1 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
       

    // Add one dot in the legend for each name.
    svg.selectAll("myrect")
       .data(subgroups)
       .enter()
       .append("text")
        .attr("x", 550 + size*1.2)
        .attr("y", function(d,i){ return 5 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between 
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")



});





}


return chart;

}
