const request=require('request');
const geoCode=(address,callBack)=>
{
    const geocoding=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2VuZHJvbmUiLCJhIjoiY2t5c2ltaWZnMTQ1czJ3bzVlbndiMHgwbyJ9.ojvWTvWUQ6l0ucKpnIkbZw&limit=1`;

    request({url:geocoding,json:true},(error,response)=>{
        if(error)
        {
            callBack('Unable to connect to location service',undefined);

        }
        else if(response.body.features.length===0)
        {
            callBack('Unable to find location. Try another search',undefined);
        }
        else
        {
            callBack(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode;