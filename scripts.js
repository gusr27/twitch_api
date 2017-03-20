function fetchChannelApi(name, online){
	
 	 $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/"+name, function(data){
	 	 
	 	 
	 	 printResults(data, online);
	 	 
 	 });
};

function fetchStreamApi(name){
	var online = false;
	$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+name, function(data){
	 	 
	 	 if (data.stream == null && data != undefined){
		 	 
		 	 fetchChannelApi(name, online);
	 	 }
	 	 else{
		 	 fetchChannelApi(name, true);
	 	 }
	 	 
	 	 
 	});
}

function printResults(results,online){
	var html = "";
	var link = "twitch.tv/" + results.name;
	var name = results.display_name;
	var logo = results.logo;
	var lastDetail = results.status + " on " + results.game;
	
	if (online == false){
		html += "<li class='list-group-item list-group-item-danger offline'value='"+name+"'>"; 	 
		html += "<img class='img-circle img-responsive' src='"+logo+ "' alt='Twitch page for "+name+"'>";
		html += "<a href='" + link + "'>" + name + "</a>" ;
		html += "<p> Last Stream: " + lastDetail + "</p>";
		html+="</li>";
		
		$("#streams").append(html);
	}
	else{
 	 
 	 	html += "<li class='list-group-item list-group-item-success online' value='"+name+"'>"; 	 
		html += "<img class='img-circle img-responsive' src='"+logo+ "' alt='Twitch page for "+name+"'>";
		html += "<a href='" + link + "'>" + name + "</a>" ;
		html += "<p> Currently Streaming: " + lastDetail + "</p>";
		html+="</li>";
		$("#streams").append(html);
	}
	
	
};

function results(html){
	
};

function filter(element){
	var value = $(element).val();
	
	$("#streams > li").each(function(){
		if ($(this).text().search(value) > -1) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
	});
};

$(document).ready(function(){
	
	var streams = ["ivanprovorov", "trumpsc", "destiny","OgamingSC2", "cretetion", "freecodecamp",  "habathcx", "RobotCaleb", "noobs2ninjas"].map(function(name){
			return name.toLowerCase();
		}).sort();
		
		console.log(streams);
	streams.forEach(function(name){
		fetchStreamApi(name);
	});
	
	$("#online").on('click', function(){
		$(".offline").hide();
		$(".online").show();
	});
	$("#offline").on('click', function(){
		$(".online").hide();
		$(".offline").show();
	});
	$("#all").on('click', function(){
		$(".online").show();
		$(".offline").show();	
	});
	
	
}); 