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

    /**
     * Update existing products to use code
     * - neeed to get all restaurants
     * - for each restaurant get products
     * - for each product call updateCodeProduct
     * - replace the product by the one updated
     * - save the restaurant.
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 






     */
 
    /**
     * Get the Product Code from the Matrix
     * Return the product updated
     * @param {*} Product 
     */
    updateCodeProduct(product, callback){
        this.upGetMatrixProductCode(product.name, (code) => {
            product.code = code;
            callback(product);
        });        
    }

    upGetMatrixProductCode(productName, callback){
        // if value there, return the value of the code
        this.getId(MATRIX_PRODUCT_CODE_NAME, (data) => {
            console.log(data);
            let matrix = data.value;
            if(matrix[productName] === null || matrix[productName] === undefined){
                this.incProductNumber( (value) =>{
                    matrix[productName] = value;
                    this.upsertValue(MATRIX_PRODUCT_CODE_NAME, matrix , () => {
                        console.log('Updated!');
                        callback(value);
                    });
                });
            }else{
                callback(matrix[productName]);
            }
            console.log(data);
        });
        // if value not there
            // get last max productNumber
            // update it in DB
            // return new productCode
    }

    //FIXME do we need to play with lock/unlock when getting and setting
    getId(id, callback){
        bucket.get(id, (error, data) => {
            if(error){
                console.log(error);
            }
            callback(data);
        });
    }

    upsertValue(id, value, callback){
        bucket.upsert(id, value, (error,data) => {
            if(error){
                console.log(error);
                throw error;
            }

            callback(data); // FIXME is data always NULL
        });
    }

    getProductNumber(callback){
        bucket.get( MAX_PRODUCT_NUMBER, (error, data) => {
            if(error){
                console.log(error);
                throw error;
            }
            callback(data.value);
        });
    }

    incProductNumber(callback){
        bucket.getAndLock(MAX_PRODUCT_NUMBER, (error, data) => {
            let nextVal = data.value + 1;
            bucket.unlock(MAX_PRODUCT_NUMBER,data.cas, (error, data) => {
                if(error){
                    console.log(error);
                    throw error;
                }
                bucket.upsert(MAX_PRODUCT_NUMBER, nextVal, (error, val) => {
                    if(error){
                        console.log(error);
                        throw error;
                    }
                    
                    callback(nextVal);
                });
            });
            
        });
    }

    searchAllStore(){
        bucket.query(storeQuery, (err, rows, meta) => {
            for(let r = 0; r < rows.length; r++){
                console.log(JSON.stringify(rows[r]));
            }
        });
    }

    searchByName(productName, callback){
        console.log('Calling Search...');
        let queryByName;
        if(productName === null || productName === undefined){
            queryByName = ViewQuery.from('products','byName');
        }else{
            queryByName = ViewQuery.from('products','byName').key(productName);
        }
        

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

const MAX_PRODUCT_NUMBER = 'myt#productNumber';
const MATRIX_PRODUCT_CODE_NAME = 'myt#matrix#productCode';

const N1qlQuery = couchbase.N1qlQuery;
const storeQuery = N1qlQuery.fromString('select * from `mytBucket1` mb where mb.type = \'store\'');
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