$(document).ready(function () {

    var gifTopics = ["Cats", "Birds", "Baseball", "Yankees", "Mets",
        "Angry Birds", "Flying", "Planes", "Food", "Steak", "Bacon",
        "Burgers"];


    function renderButtons() {

        $("#buttons").empty();

        for (let i = 0; i < gifTopics.length; i++) {
            var button = $("<button>")
            button.addClass("buttons");
            button.attr("data-category", gifTopics[i]);
            button.text(gifTopics[i]);
            $("#buttons").append(button);
        };
    };

    function renderGifs() {

        var apiKey = "&api_key=dc6zaTOxFJmzC";
        var category = $(this).attr("data-category");
        var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + category + "&limit=10" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (apiData) {

            for (let i = 0; i < apiData.data.length; i++) {

                var imageDiv = $("<div class='images'>");
                var imageAnimate = apiData.data[i].images.original.url;
                var imageElement = $("<img>");
                var imageRating = (apiData.data[i].rating).toUpperCase();
                var imageStill = apiData.data[i].images.original_still.url;
                var showRating = "<p><strong>Rating: " + imageRating + "</strong><p>";

                imageDiv.append(showRating);
                imageElement.addClass("gifs");
                imageElement.attr("src", imageStill);
                imageElement.attr("alt", category + " Image");
                imageElement.attr("data-still", imageStill);
                imageElement.attr("data-animate", imageAnimate);
                imageElement.attr("data-state", "still");
                imageDiv.append(imageElement);
                $("#gifs").prepend(imageDiv);

            };

        });


    };

    function toggleGifs() {

        var imageState = $(this).attr("data-state");

        if (imageState === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        };

    };

    renderButtons();

    $(document).on("click", ".buttons", renderGifs);

    $(document).on("click", ".gifs", toggleGifs);

    $(document).on("click", "#addGif", function(event) {

        event.preventDefault();

        var category = $("#gifInput").val().trim();
        $("#gifInput").val("");

        if (category === "") {
            return;
        }

        gifTopics.push(category);
        renderButtons();

    });

});