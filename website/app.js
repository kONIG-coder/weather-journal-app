/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = '180bd9f9a2698eb069f24a0d48ea1833';
const submitButton = document.getElementById('generate');

// event listener for generate button
submitButton.addEventListener("click", handleGenerateData);

// callback function to handle clicking generate button
function handleGenerateData(event) {
    let d = new Date(); // Create a new date instance dynamically with JS
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let feeling = document.getElementById("feelings").value;
    let zip = document.getElementById('zip').value;

    if (zip) {
        getWeatherData(zip).then(function(weatherData) {
            postAllData("/addWeather", {
                temp: weatherData.main.temp,
                date: newDate,
                feeling: feeling
            });
        } 
        ).then(function() { updateUI(); });
    } else {
        alert("please enter a zip code");
    }
}

// asynchronous function to get weather information from external API
const getWeatherData = async function(zipCode) {
    const response = await fetch(`${baseUrl}&zip=${zipCode}&appid=${apiKey}`);
    try {
        const weatherData = await (response).json();
        console.log("got data succesfully using getWeatherData function");
        return weatherData;
    } catch(error) {
        console.log("error: " + error);
    }
}

// asynchronous function to post all data from user and external API to our server endpoint
const postAllData = async function(url, allData) {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(allData)
    })
    try {
        const status = await response.status;
        if (status == 200) {
            console.log("posted data succesfully using postAllData function");
        } else {
            console.log("post data failed using postAllData function status:" + status);
        }
    } catch(error) {
        console.log("error" + error);
    }
}

// asynchronous function to get all data from the server endpoint to update the UI with 
const getAllData = async function(url) {
    const response = await fetch(url);
    try {
        const projectData = await response.json();
        console.log("got data succesfully using getAllData function");
        return projectData;
    } catch(error) {
        console.log("error" + error)
    }
}

//asynchronous function to update the UI dynamically
const updateUI = async function() {
    const allData = await getAllData("/all");
    document.getElementById("date").innerHTML = `<span style="color: #3b4a6b">Date:</span> ${allData.date}`;
    document.getElementById("temp").innerHTML = `<span style="color: #3b4a6b">Temperature:</span> ${allData.temp}°`;
    document.getElementById("content").innerHTML = `<span style="color: #3b4a6b">Feeling:</span> ${allData.feeling}`;
}
