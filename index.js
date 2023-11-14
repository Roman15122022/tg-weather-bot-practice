const telegramApi = require('node-telegram-bot-api');
const axios = require('axios');

const token = '6989483827:AAG6XLvg1nFslujMOVri7B5iG2QCqZcFngs';
const bot = new telegramApi(token, { polling: true });

let city = '';
let data = {};

const tokenForApi = '2ee8f37454331bd4d00bb4271506044d\n';
const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${tokenForApi}&units=metric&q=`;

bot.setMyCommands([
    { command: '/start', description: 'Start using bot for weather' },
    { command: '/info', description: 'How to use' },
]);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, `Hello ${msg.from.first_name}! I am a weather bot :)`);
    } else if (text === '/info') {
        bot.sendMessage(chatId, `Just input the city name to get weather information.`);
    } else {
        // Input validation
        if (text && typeof text === 'string' && text.trim() !== '') {
            city = text.trim();
            bot.sendMessage(chatId, 'Fetching weather data...');
            axios.get(openWeatherMapUrl + city)
                .then(response => {
                    console.log(response.data);
                    data = response.data;
                    const temp = Math.floor(data.main.temp);
                    const wind = data.wind.speed;
                    const description = data.weather[0].description.toUpperCase();
                    bot.sendMessage(chatId, `Weather in ${city} :
                    Temperature: ${temp}°
                    Wind: ${wind} m/s
                    ${description}`);
                })
                .catch(error => {
                    bot.sendMessage(chatId, 'Error: ' + error.message);
                });
        } else {
            bot.sendMessage(chatId, 'Please enter a valid city name.');
        }
    }
});
