const request=require('request')

const geocode=(address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGRhZ2EiLCJhIjoiY2txYjBtcWVkMGR5czJva2QzdXB4b3Y2biJ9.wkcu2g1PbRUw2yxIhIx-Pg&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to location service!',undefined)
        } else if (body.features.length=== 0) {
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                position: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode