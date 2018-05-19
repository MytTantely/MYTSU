const rp = require('request-promise');
const URL_CB = 'http://www.google.com';

const queryObj = {
    query: {
        conjuncts:[
            {
                query: "mocha latte"
            },
            {
                location:{
                    lat: 51.1806706,
                    lon: -114.1037608
                },
                distance:"20mi",
                field:"geo"
            }
            
            ]
      
    },
    fields: [
        "name","subtype","gps.lon","gps.lat"
    ]
  };

const options = {
    method: 'POST',
    uri: 'http://localhost:8094/api/index/mytBucket1_index/query',
    body: 
        queryObj
    ,
    json: true // Automatically stringifies the body to JSON
    ,
    headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        'Content-Type':'application/json',
        'Authorization':'Basic QWRtaW5pc3RyYXRvcjpNVExwd2Q5OT0='
    }
};

rp(options)
    .then( response => {
        console.log('Here you are!' + '\n' + JSON.stringify(response.hits));
    })
    .catch( err => {
        console.log('Error Sir! \n' + err.message);
    })