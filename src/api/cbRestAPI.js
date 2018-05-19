const rp = require('request-promise');

const queryString = {
    query: "mocha latte"
};

const defaultLocation = {
    lat: 51.1806706,
    lon: -114.1037608
};

const loc = {
    location:defaultLocation,
    distance:"20mi",
    field:"geo"
};

const queryObj = {
    query: {
        conjuncts:[queryString, loc]
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

module.exports = class CBRestAPI{
    construct(){}
    search(name, callback, location = defaultLocation, distance = 20){
        _updateQuery(name);
        _updateLocation(location);
        _updateDistance(distance);

        
        rp(options)
        .then( response => {
            console.log('Here you are!' + '\n' + JSON.stringify(response.hits));
            callback(response.hits);
        })
        .catch( err => {
            console.log('Error Sir! \n' + err.message);
        })
    }
}

function _updateQuery(name){
    queryString.query = name;
    console.log('\n\n' + JSON.stringify(queryString) + '\n\n');
}

function _updateLocation(_location){
    loc.location = _location;
    console.log('\n\n' + JSON.stringify(loc.location) + '\n\n');
};

function _updateDistance(_distance){
    loc.distance = _distance + 'mi';
    console.log('\n\n' + JSON.stringify(loc) + '\n\n');
}
