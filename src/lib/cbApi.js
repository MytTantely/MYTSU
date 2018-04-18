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
}

const couchbase = require('couchbase');
const cluster = new couchbase.Cluster('couchbase://localhost/');

cluster.authenticate('appUser','appUser');

const bucket = cluster.openBucket('mytBucket1');

const SpatialQuery = couchbase.SpatialQuery;

const query = SpatialQuery.from('location', 'byCoordinates').limit(10);

