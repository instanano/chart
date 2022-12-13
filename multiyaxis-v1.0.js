function drawMultiAxes(){



  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 680 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      colum_names="";

  var padding = 130;

  function chart(selection){

     selection.each(function(data) {


          var svg = d3.select(this);
          svg.selectAll('*').remove();
          var chart = svg.append("g").attr("class", "chart").attr("transform", "translate(20," + 50 + ")");
          var columns_names = data.columns


        //================= scales=====================//

        // scale X 
        var x = d3.scaleLinear()
                  .domain(d3.extent(data[columns_names[0]].$data, function(d) { return d; }))
                  .range([ 0, width-50]);

        // Add X axis --> it is a date format
        chart.append("g")
             .attr("transform", "translate(0," +(height-padding+20) + ")")
             .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        // Add X axis label:
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", 300)
           .attr("y", height-20 )
           .text(columns_names[0]);

        var subgroups = data.columns.slice(1)
   
        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
                      .domain(subgroups)
                      .range([ "red", "blue","green"]);

        // Y Scales 
        var y1 = d3.scaleLinear()
                   .domain([0, d3.max(data[columns_names[1]].$data, function(d) { return +d; })])
                   .range([ height-padding+10, 0 ]);
 

        var y2 = d3.scaleLinear()
                   .domain([0, d3.max(data[columns_names[2]].$data, function(d) { return +d; })])
                   .range([ height-padding+10, 0 ]);


        var y3= d3.scaleLinear()
                  .domain([0, d3.max(data[columns_names[3]].$data, function(d) { return +d; })])
                  .range([ height-padding+10, 0 ]);


        //================= axis Y1
        chart.append("g")
             .attr("class", "axis y1-axis")
             .call(d3.axisLeft(y1));


        // Add Y1 axis label:
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", 0)
           .attr("y", 30 )
           .text(subgroups[0])
           .style("fill", "red")
           .attr("text-anchor", "start")


        //================= axis Y2
        chart.append("g")
             .attr("class", "axis y2-axis")
             .attr("transform", "translate(550," + 0 + ")")
             .call(d3.axisLeft(y2));

        // Add Y2 axis label:
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", 540)
           .attr("y", 30 )
           .text(subgroups[1])
           .style("fill", "blue")
           .attr("text-anchor", "start")

        //================= axis Y3
        chart.append("g")
             .attr("class", "axis y3-axis")
             .attr("transform", "translate(600," + 0 + ")")
             .call(d3.axisLeft(y3));


        // Add Y3 axis label:
        svg.append("text")
           .attr("text-anchor", "end")
           .attr("x", 600)
           .attr("y", 30 )
           .text(subgroups[2])
           .style("fill", "green")
           .attr("text-anchor", "start")

        //========================= lines ===================//

        var line_XY1 = d3.line()
                      .x(function(d) { 
                             return x(+d[0]);  //X1
                       })
                      .y(function(d) { 
                             return y1(+d[1]); //Y1
                       });



        var line_XY2= d3.line()
                      .x(function(d) { 
                            return x(+d[0]);  //X1
                       })
                      .y(function(d) { 
                           return y2(+d[2]); //Y2
                       });


         var line_XY3= d3.line()
                        .x(function(d) { 
                          return x(+d[0]);  //X1
                       })
                        .y(function(d) { 
                          return y3(+d[3]); //Y3
                       });




         chart.append("path").attr("d", line_XY1(data.$data)) .attr("fill", "none") .attr("stroke", "red").attr("stroke-width", 1.5);
         chart.append("path").attr("d", line_XY2(data.$data)) .attr("fill", "none") .attr("stroke", "blue").attr("stroke-width", 1.5);
         chart.append("path").attr("d", line_XY3(data.$data)) .attr("fill", "none") .attr("stroke", "green").attr("stroke-width", 1.5);;


        //==================Grid lines
        chart.append("g")         
             .attr("class", "grid")
             .attr("transform", "translate(0," + height + ")")
             .call(make_x_axis()
               .tickSize(-height, 0, 0)
               .tickFormat("")
             )

        chart.append("g")         
             .attr("class", "grid")
             .call(make_y_axis()
               .tickSize(-width, 0, 0)
               .tickFormat("")
             )


        function make_x_axis() {        
                return d3.axisBottom(x).ticks(5)
         }

        function make_y_axis() {        
           return d3.axisLeft(x).ticks(10)
         }



});





}


return chart;

}
