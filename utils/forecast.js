
const request = require("request");


const forecast=(lat,lon,callback)=>{
    const weather_stack =
  `http://api.weatherstack.com/current?access_key=24b5f301cfd3a80de18e01ee35584d8c&%20query=${lat},${lon}&units=f`;
  request({url:weather_stack,json:true},(error,response)=>{
      if(error)
      {
          callback('unable to connect to Internet',undefined);
      }
      else if(response.body.error)
      {
          callback('unable to find the location. Please enter valid Coordinates',undefined);
      }
      else{
          callback(undefined,`it is currently ${response.body.current.temperature} Fahrenheit and it feels like ${response.body.current.feelslike} Fahrenheit and it is ${response.body.current.weather_descriptions[0]} here.`);
      }
  })
}

module.exports=forecast;
