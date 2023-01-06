
//###############################################################//
//                    draw Multi Axes chart for X1 Y1 X2 Y2      //
//###############################################################//






function drawMultiAxes(){



// set the dimensions and margins of the graph
var margin = {top: 30, right: 60, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;




  function chart(selection){

     selection.each(function(data) {


          var svg = d3.select(this);
          svg.selectAll('*').remove();
          var chart = svg.append("g").attr("class", "chart").attr("transform", "translate(20," + 100 + ")");
          var columns_names = data.columns




 var subgroups = data.columns
 var columns_namesX = getXcolumns(data.columns) //get X variables names
 var columns_namesY= getYcolumns(data.columns) //get Y variables names


//======= scale color


var color= d3.scaleLinear()
             .domain([0,subgroups.length/2])
             .range([ "#db6454", "#f0c300","#c83d2a","blue","red","green","orange","gray","pink","yellow","purple"]);


//========= x scale

//computes max /min for all X
var MinX=Min(data,columns_namesX);
var MaxX=Max(data,columns_namesX);


         var x = d3.scaleLinear()
                   .domain([MinX,MaxX])
                   .range([0,width-50])
                   .nice();


        // Add X axis --> it is a date format
        svg.append("g")
           .attr("transform", "translate(50," + 440+ ")")
           .call(d3.axisBottom(x).ticks(5));


        //========== draw Y1 axis(the first) ==========
           var MinY=d3.min(data[subgroups[1]].$data, function(d) { return +d; })
           // Y1 Scales 
            var y1 = d3.scaleLinear()   
                       .domain(d3.extent(data[subgroups[1]].$data, function(d) { return +d; }))
                       .range([height-150,MinY])
                       .nice();
           
     
            svg.append("g")             
               .attr("transform", "translate(" + 50 + ",100)")
               .attr("class",function(d) { return "yaxis"+ 0 })
               .call(d3.axisLeft(y1).ticks(5))
          

            d3.select("svg  .yaxis0 path").attr("stroke",function(d){return color(0)}).attr("stroke-width",'1.6')
  

            // draw line XY1 
               var line_XY1= d3.line()
                               .curve(d3.curveBasis)
                               .x(function(d) { 
                                    return x(+d[0]);  //X1
                                           })
                               .y(function(d) { 
                                    return y1(+d[1]); //Y2
                                    });


               chart.append("path")
                    .attr("d", line_XY1(data.$data)) 
                    .attr("transform", "translate("+28+"," + 0 + ")")
                    .attr("fill", "none") 
                    .attr("stroke", color(0))
                    .attr("stroke-width", 1.5);
   

      //================= draw other axis Y2,Y3,......
      var padding=5;
      var space=600;

       var marge=subgroups.length/2
       space=width-marge;

      for (var i = 2; i <subgroups.length-1; i=i+2){
        drawLine(i)   
        space=space+padding;

       }




    function drawLine(i){

            var MinY=d3.min(data[subgroups[i+1]].$data, function(d) { return +d; })
     

            var yscale = d3.scaleLinear()   
                           .domain( d3.extent(data[subgroups[i+1]].$data, function(d) { return +d; }))
                           .range([height-150,0])
                           .nice();
                 
          
       
            var line_XY1 = d3.line()
                     .curve(d3.curveBasis)
                     .x(function(d) { 
                    
                           return x(+d[i]);  //Xi
                        })
                     .y(function(d) { 
                      
                           return yscale(d[i+1]); //Yi
                      });

          
          //========= draw line XiYi
          chart.append("path") 
                     .attr("transform", "translate("+28+"," + 0 + ")")
                     .attr("d", line_XY1(data.$data)) 
                     .attr("fill", "none") 
                     .attr("stroke",color(i))

           //========= draw Yi axis
          space=space+70
          svg.append("g")   
             .attr("transform", "translate("+space+"," + 100 + ")")
             .attr("class",function(d) { return "yaxis"+ i })
             .call(d3.axisLeft(yscale))
       




           var classY="svg   .yaxis"+ i+" path"; //add class name of this axis
           d3.select(classY).attr("stroke",function(d){return color(i)}).attr("stroke-width",'1.6')//color the axis
      
    }









      //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 15

   
     svg.selectAll("myline")
        .data(columns_namesY)
        .enter()
          .append("rect")
          .attr("x", 630)
        .attr("y", function(d,i){ return 22 + i*(size+5)}) 
        .attr("width", 30)
        .attr("height", 3)
        .style("fill", function(d,i){ return color(i)})


    svg.selectAll("myline")
      .data(columns_namesY)
      .enter()
      .append("text")
        .attr("x", 650 + size*1.2)
        .attr("y", function(d,i){ return 28+i*(size+6)}) 
        .style("fill", function(d,i){ return color(i)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")








//============== min function
function Min(data, col_names){
   var min1=d3.min(data[col_names[0]].$data, function(d) { return +d; });
   for (var i = 0; i < col_names.length; i++) {
       var m=d3.min(data[col_names[i]].$data, function(d) { return +d; })
       if(min1 > m)
          {min1=m}

      }
   return min1;
}





//============== max function
function Max(data, col_names){
   var max1=d3.max(data[col_names[0]].$data, function(d) { return +d; });
   for (var i = 0; i < col_names.length; i++) {
       var m=d3.max(data[col_names[i]].$data, function(d) { return +d; })
       if(max1 < m)
          {max1=m}

      }
   return max1;
}







//========== function get all x variables names

function getXcolumns(dataset){
var Xarray=[];

for (var i = 0; i < dataset.length; i=i+2){
  Xarray.push(dataset[i])
 }
return Xarray;
}



//========== function get all Y variables names

function getYcolumns(dataset){
var Xarray=[];

for (var i = 1; i < dataset.length; i=i+2){
  Xarray.push(dataset[i])
 }
return Xarray;
}





});





}


return chart;

}
