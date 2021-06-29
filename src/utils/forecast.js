const request=require('request')

const forecast=(x,y,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=dda20e96179e757c48e4178f111e084f&query='+ x+ ','+y

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")  
        }
    })
}

module.exports=forecast