const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

async function fetchProducts(id) {
    const params = generateParamsById(id);
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

async function fetchAllProducts() {
    // const TableName = 'modules';
    // const params = {
    //     TableName
    // } 
    // return new Promise((resolve, reject) => {
    //     docClient.scan(params, function (err, data) {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(data);
    //     });
    // });
    const params = generateParamsById(001);
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function generateParamsById(id) {
    const TableName = 'modules';
    const params = {
        TableName,
        KeyConditionExpression: "#id = :iii",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ':iii': parseFloat(id)
        }
    };
    return params;
}

module.exports = {
    generateParamsById,
    fetchProducts,
    fetchAllProducts
};