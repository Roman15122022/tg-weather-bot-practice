const axios = require('axios');

let city = 'Kyiv'

const tokenForApi = '2ee8f37454331bd4d00bb4271506044d';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + token + '&units=metric';


axios.get(apiUrl)
    .then(response => {
        console.log(response.data);
         const temp = response.data.main.temp;
         const wind = response.data.wind.speed;
    })
    .catch(error => {
        console.error('Error: ', error.message);
    });
