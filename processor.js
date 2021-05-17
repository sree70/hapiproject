const fetch = require("node-fetch");
const converter = require("json-2-csv");
const fastcsv = require("fast-csv");
const fs = require("fs");
const AWS = require("aws-sdk");

/*Declarations*/
var apiUrl = "https://gbfs.divvybikes.com/gbfs/en/station_information.json";
var fileName = "formList.csv";
var BucketName = "";
var AccessKeyId = "";
var SecretAccessKey = "";
var s3 = "";

function startApiCall(bucketName, accessKeyId, secretAccessKey) {
  BucketName = bucketName;
  AccessKeyId = accessKeyId;
  SecretAccessKey = secretAccessKey;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(response => {
    if (response.ok) {
      response.json().then(json => {
        startDataFilteration(json);
      });
    }
  });
}

function startDataFilteration(data) {
  for (var i = 0; i < data.data.stations.length; i++) {
    delete data.data.stations[i]["rental_methods"];
    delete data.data.stations[i]["rental_uris"];
    data.data.stations[i]["externalId"] = data.data.stations[i]["external_id"];
    data.data.stations[i]["stationId"] = data.data.stations[i]["station_id"];
    data.data.stations[i]["legacyId"] = data.data.stations[i]["legacy_id"];
    delete data.data.stations[i]["external_id"];
    delete data.data.stations[i]["station_id"];
    delete data.data.stations[i]["legacy_id"];
    if (data.data.stations[i]["capacity"] > 12) {
      delete data.data.stations[i];
    }
  }
  startCsvConversion(data);
  return data;
}

function startCsvConversion(data) {
  converter.json2csv(data.data.stations, (err, csv) => {
    if (err) {
      throw err;
    }
    csvObject = csv;

    /*File writing*/
    fs.writeFile(fileName, csv, "utf8", function(err) {
      if (err) {
        console.log(
          "Some error occured - file either not saved or corrupted file saved."
        );
      } else {
        transferFileToS3();
        console.log("File Has been saved to fileSystem!");
      }
    });
  });
}

function transferFileToS3() {

    console.log('BucketName', BucketName);
    console.log('AccessKey', AccessKeyId);
    console.log('SecretKey', SecretAccessKey);
  /*Configuring S3*/
  s3 = new AWS.S3({
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey
  });
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: BucketName,
    Key: fileName,
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
}

module.exports = {
  startApiCall,
  startDataFilteration,
  startCsvConversion,
  transferFileToS3
};
