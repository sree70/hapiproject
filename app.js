const Hapi = require("hapi");
var processor = require("./processor");

/* Server Configuration*/
/*const server = Hapi.server({
  host: "localhost",
  port: 8080
});*/

const server = new Hapi.Server();
server.connection();

/*Defined Basic route*/
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello World!";
  }
});

/*Route to store data into FileSystem*/
server.route({
  method: "GET",
  path: "/api/storeData/{BucketName}/{accessKeyId}/{secretAccessKey}",
  handler: (request, h) => {
    var returnMsg = "";
    try {
      var data = processor.startApiCall(request.params.BucketName,
        request.params.accessKeyId,
        request.params.secretAccessKey);

      returnMsg = "Process Executed successfully";
    } catch (err) {
      returnMsg = "Process Encountered  exceptions";
      console.log(err);
    }


    return returnMsg;
  }
});

/*server.start(error => {
  if (error) {
    throw error;
  }
  console.log("Listening at" + server.info.uri);
});*/

/*AWS Lambda Function Trigger*/
exports.handler = (event, context, callback) => {

  // map lambda event to hapi request
  const options = {
    method: event.httpMethod,
    url: event.path,
    payload: event.body,
    headers: event.headers,
    validate: false
  };

  server.inject(options, function (res) {
    const response = {
      statusCode: res.statusCode,
      body: res.result
    };
    callback(null, response);
  });
};

module.exports = app;