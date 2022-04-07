let imdb_id = 'tt3896198'

window.onload = function(){

    $("#submit").click(function() {
        console.log($('#date').val());
    })

    $('.showtimeRow').click(function() {
        populateForm($(this).attr('id'));
    });

    $('#movieDetails').hide();
}

function populateForm(id) {

    document.getElementById('rating').innerHTML = '';

    fetch('http://www.omdbapi.com/?i=' + id + '&apikey=3da1ad3e')
    .then((response) => response.json())
    .then(function(movie) {
        $("#poster").attr("src", movie.Poster);
        $("#title").attr("value", movie.Title);
        $("#year").attr("value", movie.Year);
        $("#genre").attr("value", movie.Genre);
        $("#runtime").attr("value", movie.Runtime);
        $("#director").attr("value", movie.Director);
        $("#writer").text(movie.Writer);
        $("#actors").text(movie.Actors);
        $("#plot").text(movie.Plot);  
        
        for(var i = 0; i < Math.floor(movie.imdbRating); i++){

            var trophy = document.createElement("img");
            trophy.setAttribute("alt", "Trophy Icon");
            trophy.setAttribute("src", "./assets/trophy.png");

            $("#rating").append(trophy);
        }
    });

    $('#movieDetails').show();
}