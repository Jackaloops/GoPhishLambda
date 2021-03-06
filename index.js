const { fetchProducts } = require('./products');
const { fetchAllProducts } = require( './products' );
const { fetchModulePage } = require( './products' );
const log = console.log;

exports.handler = async (event, context) => {
    const queryParams = event.queryStringParameters;

    try {
        if (queryParams.id) {
            const id = queryParams.id;
            log('Lambda Processing...');
            const data = await fetchProducts(id);
            log('Data: ', data);

            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    data
                })
            };

            return response;
        }
        else if( queryParams.fetchAll ) {
            log( 'Lambda Processing: fetch all modules...' );
            const data = await fetchAllProducts();
            log( 'Data: ' + data )

            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    data
                })
            };

            return response;
        }
        else if( queryParams.getModulePage ) {

            const data = await fetchModulePage( queryParams.getModulePage, queryParams.pageNum );
            
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    data
                }) 
            };

            return response;
        }

    } catch (error) {
        log('Error: ', error);
        return {
            statusCode: 501,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: error.message || 'Internal Error'
            })
        }
    }
};