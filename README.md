<h1 align="center">Welcome to Hapi-Rest_Service 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: harsha.hapi.project" src="https://img.shields.io/badge/License-harsha.hapi.project-yellow.svg" />
  </a>
</p>

## Description of Project:
> This project helps in exposing a web service to deploy convert remote json files to CSV files and store those csv files in AWS S3 storage


## Pre Requistes:

>BucketName >> Bucket Name  of S3 storage in AWS

>AccessKey >> AccessKey for AWS Account

>SecretKey >> SecretKey for AWS Account.

>Sample Url to be Used for Testing>> http://localhost:8080/api/storeData/BucketName/AccessKey/SecretKey

>For Testing Try hitting the above url in Browser.


### ✨ [Demo](http://localhost:8080/api/storeData/BucketName/AccessKey/SecretAccessKey)

## Install Dependencies --- Step 1
For Installing Dependencies:
```sh
npm install
```

## Server StartUp --- Step 2
For Starting HAPI Server: (This App cannot be tested in Local as we are injecting the server on AWS Lambda)
```sh
npm start
```

## Run tests
For running HAPI Tests:
```sh
npm test
```

## Author

👤 **Sree**

* Github: (https://github.com/sree70/hapiproject.git)
* LinkedIn: https://www.linkedin.com/in/sree-d/



