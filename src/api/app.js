const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const CBApi = require('../../src/lib/cbApi');
const cbApi = new CBApi();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ROUTES FOR OUR API
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// BUSINESS ***

// Create a business

// Search a business

// Delete a business

// Update a business

// PRODUCTS

// Create a product for one company

// Search a product for one company

// Delete a product for one company

// Update a product for one company

// SEARCH
router.route('/search/:name')
// Search by name around an address //FIXME simple view or Full Text Search
    .get( (req, res) => {
        let results = cbApi.searchByName(req.params.name, (err, results) => {
            res.json(results);
        } );
        
    });
// Search by name without an address

// Search by price/name/ around current location


// START THE SERVER
// =================
app.listen(port, () => {
    console.log('Magic happens on port ' + port);

});