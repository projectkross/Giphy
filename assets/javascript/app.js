 var topics = ["Cat", "Dog", "Tiger", "Red Panda", "Wolf", "Owl", "Turtle", "Ferret", "Hamster", "Bear", "Cheetah", "Lion", "Panda"];


    	function displayAnimalInfo() {

    		var animal = $(this).attr("data-name");
    		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=qYDmHenpLVA9gBjApOflXR5xeFhs3Zzq&limit=10";

    		$.ajax({
	          url: queryURL,
	          method: "GET"
        	}).then(function(response) {

        		console.log (response.data);

        		var results = response.data;

        		for (var i = 0; i < results.length; i++) {

        			var animalDiv = $("<div>");

        			var p = $("<p>").text("Ratings: " + results[i].rating);

        			var animalImage = $("<img class='gif'>");

        			animalImage.attr("src", results[i].images.fixed_height_still.url);

        			animalImage.attr("alt", 'animal image');

              //attr to handle pausing 
              animalImage.attr("data-state", "still");
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);



        			animalDiv.append(p);

        			animalDiv.append(animalImage);

        			$("#gif-view").prepend(animalDiv);	

        		}

        		
    	});
      }

      $(document).on("click", ".gif", function(event) { // only runs when a gif is clicked
          var state = $(this).attr("data-state");
          var still = $(this).attr("data-still");
          var animate = $(this).attr("data-animate");

          if($(this).attr("data-state") === "still"){
            $(this).attr({
              "data-state": "animate",
              "src": animate
            })
          }
          else if($(this).attr("data-state") === "animate") {
            $(this).attr({
              "data-state": "still",
              "src": still
            })
          }
        }) // end of gif click
     	

      	function renderButtons() {

      	$("#buttons-view").empty();

      	for (var i = 0; i < topics.length; i++) {

      		var animalBtn = $("<button>");

      		animalBtn.addClass("animal");
      		animalBtn.attr("data-name", topics[i]);
      		animalBtn.text(topics[i]);

      		$("#buttons-view").append(animalBtn);

      	}
      }

       $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        if (animal === "") {
          return false;
        }

        else {

        // The animal from the textbox is then added to our array
        topics.push(animal);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
        
        $("#animal-input").val("");


        }

      });

    	$(document).on("click", ".animal", displayAnimalInfo);
      
    	renderButtons();
