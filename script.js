const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchBtn");
const searchForm = document.querySelector("form");
const moviePoster = document.querySelector(".movie-poster")
const movieDetails = document.querySelector(".movie-details");
const movieContainer = document.querySelector('.movie-container')

// 

//function to fetch movie details using Imdb API
const getMovieInfo = async (movie) => {
    // Show the fetching message first
    showErrorMessage("Fetching Movie information...");
    try {
        const key = '********';
        const url =  `http://www.omdbapi.com/?apikey=${key}&t=${movie}`; 

        const resp = await fetch(url);

        // Check if the response was successful
        if (!resp.ok) {
            throw new Error("Unable to fetch movie data!!!");
        }

        const data = await resp.json();

        // Check if the movie was found or not
        if (data.Response === "False") {
            throw new Error("No Movie Found...");
        }

        showMovieData(data);  // Show the new movie data if everything is fine
    } catch (error) {
        showErrorMessage(error.message);  // Display the error message if something goes wrong
    }
};




//function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.add('bg');

    inputBox.value = '';

    //array destructuring
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add("movie-info")
    movieElement.innerHTML = `<h2>${Title}</h2> 
                        <p><span style="font-weight: bold;">Rating:</span> &#11088 ${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add("movie-genre")

    Genre.split(',').forEach(element => {
        const span = document.createElement('span');
        span.innerHTML = `${element}&nbsp;`;
        movieGenreElement.appendChild(span);
    });

    const br = document.createElement("br");
    //movieGenreElement.appendChild(br);
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><span style="font-weight: bold;">Released Date:</span> ${Released}</p>
                                <p><span style="font-weight: bold;">Duration:</span> ${Runtime}</p>
                                <p><span style="font-weight: bold;">Cast:</span> ${Actors}</p>
                                <p><span style="font-weight: bold;">Plot:</span> ${Plot}</p>`;

    //creating a div for poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);

}

// function for displaying various error messages
const showErrorMessage = (msg) => {
    movieContainer.classList.remove('bg');
    movieContainer.innerHTML = "";  // Clear previous content

    const errorElement = document.createElement('h2');  // Create an element for the message
    errorElement.innerText = msg;
    movieContainer.appendChild(errorElement);  // Add the message to the movie container
};


//adding event listener to search form
searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName != '')
    {
        showErrorMessage("Fetching Movie information...");
        getMovieInfo(movieName);
    }else
    {
        showErrorMessage("enter valid movie name...")
    }
});