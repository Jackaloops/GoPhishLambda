# serverless

This is a sample template for serverless - Below is a brief explanation of how GoPhish is hosting its services:

```bash
.
├── README.md                   <-- This instructions file
├── serverless                 <-- Source code for a lambda function
│   ├── index.js                  <-- Lambda function code
│   ├── package.json            <-- NodeJS dependencies
│   └── tests                   <-- Unit tests
│       └── unit
│           └── test_handler.js
└── template.yaml               <-- SAM template (for CLI only version)
```

## Machine Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)


## Setup process

### Building the project

[AWS Lambda requires a flat folder](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) with the application as well as its dependencies in a `node_modules` folder. When we make changes to our source code or dependency manifest.

Create a basic `index.js` with your Node.js code and place this in the root folder within the Lambda IDLE. Save changes to the function and it will call your .js file during runtime once it is invoked. 


### Development

**Invoking function locally through AWS API Gateway**

You must link you Lambda function to the API Gateway directly in the AWS console. Once linked, choose to Deploy API and copy and paste the `Invoke URL` from the API Gateway AWS console in your web browswer and hit enter. 

If the previous URL ran successfully you should now be able to hit the following endpoint to invoke your function `/js/index.js`

You may have to enable CORS and re-deploy your API if you are not able to run the Lambda code. 

**SAM CLI** is used to emulate both Lambda and API Gateway locally and uses the `template.yaml` to test and understand how to bootstrap this environment (runtime, where the source code is, etc.) - The following excerpt is what the CLI will read in order to initialize an API and its routes:

```yaml
...
Events:
    HelloWorld:
        Type: API
        Properties:
            Path: /js/index.js
            Method: get
```

## Packaging and deployment

AWS Lambda NodeJS runtime requires a archive folder with all dependencies including the application. You can use any archiving utility will to package all the files.

Once all files are packaged in an archive, drag and drop the archive to the Lambda function and you are ready to go. 

## Testing

Invoke the API Gateway URL and the Lambda function will be called, displaying your output. 

# Appendix

## AWS CLI commands

AWS CLI commands to package, deploy and describe outputs defined within the cloudformation stack:

```bash
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME

sam deploy \
    --template-file packaged.yaml \
    --stack-name server \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides MyParameterSample=MySampleValue

aws cloudformation describe-stacks \
    --stack-name server --query 'Stacks[].Outputs'
```


