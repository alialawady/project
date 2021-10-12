
	    var CHART_WIDTH = 450;
	    var CHART_HEIGHT = 450;
	    
	    d3.csv("csv/pumps.csv", function(data){
		    pumps_loc = data;
		    console.log(pumps_loc);
		    	
		d3.csv("csv/workhouse.csv", function(data){
		    workhouse_loc = data;
		   d3.csv("csv/brewery.csv", function(data){
		    brewery_loc = data;
			d3.csv("csv/deaths_age_sex.csv", function(data){
		    deaths = data;
		    console.log(deaths);
		    	d3.json("data/streets.json",function(data) {
		    streets=data;
		    console.log(streets);
		    drawGeoMap(deaths);
	    });
	    	});
	    	});			    
	    	});
	    });
	    
	    

	    

	    

	    

	    	function drawGeoMap(deaths) 
		{			
						
			var g = d3.select("body")				
			  .append("svg")
			  .attr("id","main")
			  .attr("width", "550")
                          .attr("height", "700")
			  
     			  .call(d3.behavior.zoom().on("zoom", function () {
       			    g.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      			  }))
      			  .append("g")
			  
			  .attr("transform","translate(-50,150) ");

			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();

			xScale.domain([0,15]).range([0, CHART_WIDTH]);
			
			yScale.domain([15,0]).range( [0,CHART_HEIGHT]);

			var pathGenerator = d3.svg.line()
				.x(function(d) { return xScale(d.x); })
				.y(function(d) { return yScale(d.y); });

			

			g.selectAll(".line")
   	 		.data(streets)
    			.enter().append("path")
    			.style('fill', 'none')
    			.style('stroke', 'black')
    			.style('stroke-width', '2px')
    			.attr("class", "map")
    			.attr("d", pathGenerator)
			
			g.append("text")
  			.style("fill", "black")
  			.style("font-size", "16px")
  			.attr("dy", ".35em")
 		 	.attr("text-anchor", "middle")
  			.attr("transform", "translate(370,90) rotate(-28)")
  			.text("Broad Street");

			g.append("text")
  			.style("fill", "black")
  			.style("font-size", "16px")
  			.attr("dy", ".35em")
 		 	.attr("text-anchor", "middle")
  			.attr("transform", "translate(220,120) rotate(60)")
  			.text("Regent Street");

			g.append("text")
  			.style("fill", "black")
  			.style("font-size", "16px")
  			.attr("dy", ".35em")
 		 	.attr("text-anchor", "middle")
  			.attr("transform", "translate(300,-55) rotate(-10)")
  			.text("Oxford Street");

			g.append("text")
  			.style("fill", "black")
  			.style("font-size", "16px")
  			.attr("dy", ".35em")
 		 	.attr("text-anchor", "middle")
  			.attr("transform", "translate(503,-20) rotate(67)")
  			.text("Dean Street")

			drawPumps(pumps_loc);
			drawDeaths(deaths);
		    	drawWorkhouse(workhouse_loc);
			drawBrewery(brewery_loc)	    
		}
		
		
		function drawPumps(data)
		{
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0,15]).range([0, CHART_WIDTH]);
			
			yScale.domain([15,0]).range( [0,CHART_HEIGHT]);			

			var pumps = d3.select('#main').select('g').selectAll(".circle_p").data(data);
			
			pumps.enter().append("circle")
			  .attr("r", 6)
			  .style("fill", "black")
			  .attr("class","circle_p");

			pumps
			  .attr("cx", function (d){ return xScale(d.x); })
			  .attr("cy", function (d){ return yScale(d.y); });
		}
		
		

		function drawDeaths(data)
		{
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0,15]).range([0, CHART_WIDTH]);
			
			yScale.domain([15,0]).range( [0,CHART_HEIGHT]);			

			var circles = d3.select('#main').select('g').selectAll(".circle_d").data(data);
			
			circles.enter().append("circle")
			  .attr("r", 3)
			  .style("fill", function (d){if(d.gender==0) return "goldenrod"; else return "teal"})
			  .attr("class","circle_d");

			circles
			  .attr("cx", function (d){ return xScale(d.x); })
			  .attr("cy", function (d){ return yScale(d.y); })
			
			  .call(tip_age)
			  .on('mouseover', tip_age.show)
			  .on('mouseout', tip_age.hide);

			circles.exit().remove();
		}
		
		var tip_age = d3.tip()
  		.attr('class', 'd3-tip')
	  	.offset([-10, 0])
  		.html(function(d) {
    			return "<b>Age:</b> <span style='color:white'>" + d.age_real + "</span>";
  		})
		
		

		function drawWorkhouse(data)
		{
			
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0,15]).range([0, CHART_WIDTH]);
			
			yScale.domain([15,0]).range( [0,CHART_HEIGHT]);			

			var circles = d3.select('#main').select('g').selectAll(".circle_w").data(data);
			
			circles.enter().append("circle")
			  .attr("r", 13)
			  .style("fill", "red")
			  .attr("class","circle_w");

			circles
			  .attr("cx", function (d){ return xScale(d.x); })
			  .attr("cy", function (d){ return yScale(d.y); });

			circles.exit().remove();
		}

		
		function drawBrewery(data)
		{
			
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0,15]).range([0, CHART_WIDTH]);
			
			yScale.domain([15,0]).range( [0,CHART_HEIGHT]);			

			var circles = d3.select('#main').select('g').selectAll(".circle_b").data(data);
			
			circles.enter().append("circle")
			  .attr("r", 10)
			  .style("fill", "darkseagreen")
			  .attr("class","circle_b");

			circles
			  .attr("cx", function (d){ return xScale(d.x); })
			  .attr("cy", function (d){ return yScale(d.y); });

			circles.exit().remove();
		}
		
		function draw_cumulative(data) 
		{
			tip.show(data);
			drawPumps(pumps_loc);
			drawDeaths(deaths.slice(0,data.total));
		}
		
		d3.csv("csv/age_distribution.csv", function(data){
			drawAge(data)
		});
			
		function drawAge(data)
		{
			//var g = d3.select("body")				
			//  .append("svg")
			//  .attr("id","age_distribution")
			  
      			//  .attr("width", "700")
                        //  .attr("height", "300")
     			  
      			//  .append("g")
			//  .attr("transform","translate(30,350)");	
			var xScale = d3.scale.ordinal();
			var yScale = d3.scale.linear();
			xScale.domain(data.map(function(d) { return d.age; })).rangeRoundBands([0, 510], 0.1);
			
			yScale.domain([0,200]).range( [0,150]);			

			var rect = d3.select('#age_distribution').select('g').selectAll(".bar2").data(data);

			var xAxis = d3.svg.axis()
    			   .scale(xScale)
    		 	   .orient("bottom")			
	  
 			d3.select('#age_distribution').select('g').append('g')
      			   .attr("class", "axis")
      			   .attr("transform","translate(0," +-130 + ")")
            		   .call(xAxis)
			  .selectAll("text")
   			   .attr("y", 13)
    			   .attr("x", -13)
   			   .attr("dy", ".35em")
    			   .attr("transform", "rotate(0)")
   			   .style("text-anchor", "start");
		

			rect.enter().append("rect")
			  .attr("width", 38)
			  .attr("height", function (d){return yScale(d.deaths); }) 
			  

			rect
			  .attr("class", "bar2")
			  .attr("x", function (d) {return xScale(d.age); })
			  .attr("y", function (d){ return -130- yScale(d.deaths); })
			  
			  .call(tip_deaths)
			  .on('mouseover', tip_deaths.show)
			  .on('mouseout', tip_deaths.hide)
			  
			  
		}

		d3.csv("csv/gender_distribution.csv", function(data){
			drawGender(data)
		});

		function drawGender(data)
		{
			//var g = d3.select("body")				
			//  .append("svg")
			//  .attr("id","gender_distribution")
			  
      			//  .attr("width", "600")
                        //  .attr("height", "300")
     			  
      			//  .append("g")
			//  .attr("transform","translate(30,350)");	
			var xScale = d3.scale.ordinal();
			var yScale = d3.scale.linear();
			xScale.domain(data.map(function(d) { return d.gender; })).rangeRoundBands([0, 210], 0.1);
			
			yScale.domain([0,200]).range( [0,150]);			

			var rect = d3.select('#gender_distribution').select('g').selectAll(".bar2").data(data);

			var xAxis = d3.svg.axis()
    			   .scale(xScale)
    		 	   .orient("bottom")			
	  
 			d3.select('#gender_distribution').select('g').append('g')
      			   .attr("class", "axis")
      			   .attr("transform","translate(0," +-130 + ")")
            		   .call(xAxis)
			  .selectAll("text")
   			   .attr("y", 13)
    			   .attr("x", -13)
   			   .attr("dy", ".35em")
    			   .attr("transform", "rotate(0)")
   			   .style("text-anchor", "start");
		

			rect.enter().append("rect")
			  .attr("width", 47)
			  .attr("height", function (d){return yScale(d.deaths); }) 
			  .style("fill", function (d){if(d.gender=='male') return "goldenrod"; else return "teal"})

			rect
			  .attr("class", "bar2")
			  .attr("x", function (d) {return xScale(d.gender); })
			  .attr("y", function (d){ return -130- yScale(d.deaths); })
			  
			  .call(tip_deaths)
			  .on('mouseover', tip_deaths.show)
			  .on('mouseout', tip_deaths.hide);
			  
			  
		}		

		var tip_deaths = d3.tip()
  		.attr('class', 'd3-tip')
	  	.offset([-10, 0])
  		.html(function(d) {
    			return "<i>Deaths:</i> <span style='color:white'>" + d.deaths + "</span>";
  		})		

		d3.csv("csv/deathdays.csv", function(data){
		    deathdays = data
		    console.log(deathdays);
		    drawTimeline(data);
	   	});

		function drawTimeline(data)
		{
			
			var g = d3.select("body")				
			  .append("svg")
			  .attr("id","timeline")
			  
      			  .attr("width", "700")
                          .attr("height", "700")
     			  
      			  .append("g")
			  .attr("transform","translate(50,350)");

			var xScale = d3.scale.ordinal();
			var yScale = d3.scale.linear();
			xScale.domain(data.map(function(d) { return d.date; })).rangeRoundBands([0, 520], 0.1);
			
			yScale.domain([0,15]).range( [0,50]);			

			var rect = d3.select('#timeline').select('g').selectAll(".bar1").data(data);

			var xAxis = d3.svg.axis()
    			   .scale(xScale)
    		 	   .orient("bottom")			
			   
			
			
  			d3.select('#timeline').select('g').append('g')
      			   .attr("class", "axis")
      			   .attr("transform","translate(0," +130 + ")")
            		   .call(xAxis)
			  .selectAll("text")
   			   .attr("y", 0)
    			   .attr("x", 9)
   			   .attr("dy", ".35em")
    			   .attr("transform", "rotate(90)")
   			   .style("text-anchor", "start");
		

			rect.enter().append("rect")
			  .attr("width", 10)
			  .attr("height", function (d){return yScale(d.deaths); }) 
			  

			rect
			  .attr("class", "bar1")
			  .attr("x", function (d){ return xScale(d.date); })
			  .attr("y", function (d){ return 130- yScale(d.deaths); })
			  
			  .call(tip)
			  
			  .on('mouseover', draw_cumulative)
			  .on('mouseout', tip.hide);
			  
			 //read a change in the input
			 d3.select("#Day1").on("input", function() {
  			    day1=this.value
			    updateDay1(+this.value);
			 });

			 d3.select("#Day2").on("input", function() {
  			    day2=this.value
			    updateDay2(+this.value);
			 });
				
			//updateDay1(0);
			//updateDay2(0);

			 // Update the Day1 attributes
			function updateDay1(Day1) {

  			  // adjust the text on the range slider
  			  d3.select("#Day1-value").text(Day1);
  			  d3.select("#Day1").property("value", Day1);
			
			}

			// Update the Day2 attributes
			function updateDay2(Day2) {

			  // adjust the text on the range slider
  			  d3.select("#Day2-value").text(Day2);
  			  d3.select("#Day2").property("value", Day2);
			  
  			  }
			g.append("text")
  			.style("fill", "black")
  			.style("font-size", "16px")
  			.attr("dy", ".35em")
 		 	.attr("text-anchor", "middle")
  			.attr("transform", "translate(250,230) rotate(0)")
  			.text("Timeline Graph")
			
			g.append("circle")
			  .attr("r", 13)
			  .style("fill", "red")			
			  .attr("transform", "translate(545,-230) rotate(0)")

			g.append("text")
  			  .style("fill", "black")
  			  .style("font-size", "16px")
  			  .attr("dy", ".35em")
 		 	  .attr("text-anchor", "middle")
  			  .attr("transform", "translate(607,-230) rotate(0)")
  			  .text("Work House")

			g.append("circle")
			  .attr("r", 10)
			  .style("fill", "darkseagreen")
			  .attr("transform", "translate(544,-190) rotate(0)")

			g.append("text")
  			  .style("fill", "black")
  			  .style("font-size", "16px")
  			  .attr("dy", ".35em")
 		 	  .attr("text-anchor", "middle")
  			  .attr("transform", "translate(595,-190) rotate(0)")
  			  .text("Brewery")

			g.append("circle")
			  .attr("r", 6)
			  .style("fill", "black")
			  .attr("transform", "translate(544,-150) rotate(0)")

			g.append("text")
  			  .style("fill", "black")
  			  .style("font-size", "16px")
  			  .attr("dy", ".35em")
 		 	  .attr("text-anchor", "middle")
  			  .attr("transform", "translate(586,-150) rotate(0)")
  			  .text("Pump")
}
		function updateData(day1,day2){
			  drawDeaths(deaths.slice(deathdays[day1-1]['total']-1,deathdays[day2-1]['total']-1));
			  }
		
		 var tip = d3.tip()
  		.attr('class', 'd3-tip_time')
	  	.offset([-10, 0])
  		.html(function(d) {
    			return "<b>Deaths:</b> <span style='color:darkcyan'>" + d.deaths + "</span>"+"<br><b>Total Deaths:</b> <span style='color: darkseagreen'>" + d.total + "</span></br>";
  		})	

		
