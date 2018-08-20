const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: process.env.SLACKBOT_TOKEN,
    name: process.env.SLACKBOT_NAME
}); 

bot.on('start',()=>{
    const params = {
        icon_emoji: ':see_no_evil:'
    }

    bot.postMessageToChannel(
        'general',
        'Get Ready To Laugh with :see_no_evil: @Jokebot!',
        params
    );
});

// error handler

bot.on('error',(err)=> console.log(err));

// message handler

bot.on('message',(data)=>{
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
});

// response to Data

function handleMessage(message){

    if(message.includes(' chuck')){
        chuckJoke();
    }else if(message.includes(' yomama')){
        yoMamaJoke();
    }else if(message.includes(' random')){

        randomJoke();
    }else if(message.includes(' help')){
        runHelp();
    }else if(message.includes(' getrate')){
        getRates();
    }

}

function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res=>{
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general',
            `Chuck Norris: ${joke}`,
            params
        );
    })
}

function yoMamaJoke(){
    axios.get('http://api.yomomma.info/')
    .then(res=>{
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general',
            `Yo mamma: ${joke}`,
            params
        );
    })
}

function getRates(){
    axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.SLACKBOT_TOKEN}&symbols=INR,&format=1`)
    .then(res=>{
        const rates = res.data.rates.INR;
        const params = {
            icon_emoji: ':moneybag:'
        }
    
        bot.postMessageToChannel(
            'general',
            `1 EUR = ${rates} INR`,
            params
        );
        return;
    })
}

function randomJoke(){
    const rand = Math.floor(Math.random()*2) +1;

    if(rand === 1){
        chuckJoke();
    }else{
        yoMamaJoke();
    }
    
}
function runHelp(){
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'general',
        `type @Jokebot with either 'chuck', 'yomama', 'random' OR 'getrate'`,
        params
    );
}