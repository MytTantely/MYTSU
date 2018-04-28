module.exports = class CouchbaseAPI {
    constructor() {
    }

    search(){
        console.log('Calling Search...');
        bucket.query(query, function(err, results){
            if(err){
                console.log(err);
                throw err;
            } 

            console.log('View no error');
            for(let i=0; i < results.length; i++){
                console.log(results[i]);
            }
        });
    }

    searchByName( callback){
        console.log('Calling Search...');
        bucket.query(queryByName, function(err, results){
            if(err){
                console.log(err);
                throw err;
            } 

            console.log('View no error');

            callback(null, results);
        });    
    }

    searchByPrice(){
        // let options = { 
        //     method: 'GET',
        //     uri: 'http://www.google.com'
        // };
        let options = { 
            method: 'GET',
            // uri: 'http://127.0.0.1:8092/mytBucket1/_design/dev_location/_spatial/byCoordinates?limit=6&stale=false&connection_timeout=60000&skip=0&full_set=',
            uri: 'http://127.0.0.1:8092/mytBucket1/_design/dev_location/_spatial/byCoordinates?start_range=[-115, 50, 0, 0]&end_range=[-110, 54, 5, null]&limit=60&stale=true&connection_timeout=60000&skip=0&full_set=',
            auth: {
                user: 'Administrator',
                pass: 'MTLpwd99='
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        
        return rp(options)
            .then(function (res) {
                console.log('data : ', JSON.stringify(res));
            })
            .catch(function (err) {
            // API call failed...
                console.log(err.message);
            });        
    }
}

const rp = require('request-promise');

const couchbase = require('couchbase');
const cluster = new couchbase.Cluster('couchbase://localhost/');

cluster.authenticate('appUser','appUser');

const bucket = cluster.openBucket('mytBucket1');

const SpatialQuery = couchbase.SpatialQuery;

const query = SpatialQuery.from('location', 'byCoordinates').limit(10);

const ViewQuery = couchbase.ViewQuery;
const queryByName = ViewQuery.from('products','byName');

// rp(options)
        //     .then(function (htmlString) {
        //             // Process html...
        //         console.log(htmlString);
        //     })
        //     .catch(function (err) {
        //         // Crawling failed...
        // });
        // let options = { 
        //     method: 'GET',
        //     uri: 'http://127.0.0.1:8092/mytBucket1/_design/dev_location/_spatial/byCoordinates?limit=6&stale=false&connection_timeout=60000&skip=0&full_set=',
        //     auth: {
        //         user: 'Administrator',
        //         pass: 'MTLpwd99='
        //     },
        //     headers: {
        //         'User-Agent': 'Request-Promise'
        //     },
        //     json: true
        // };
/*
curl -X GET \
  'http://127.0.0.1:8092/mytBucket1/_design/dev_location/_spatial/byCoordinates?limit=6&stale=false&connection_timeout=60000&skip=0&full_set=' \
  -H 'authorization: Basic QWRtaW5pc3RyYXRvcjpNVExwd2Q5OT0=' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: b40e00dc-d949-83d6-2ab3-739a5fcc6061'
*/