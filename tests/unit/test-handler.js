'use strict';

const app = require('../../index');
const chai = require('chai');
const expect = chai.expect;
var event = { queryStringParameters: { id: '101' }}, context;


describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.handler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
    });
});

