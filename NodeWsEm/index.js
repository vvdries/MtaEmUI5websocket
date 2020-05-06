const WebSocketServer = require('ws').Server;
//We will create the websocket server on the port given by Cloud Foundry --> Port 8080
const ws = new WebSocketServer({
  port: process.env.PORT || 8080
});

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var emCreds = appEnv.getServiceCreds("EnterpriseMessaging");
var emCredsM = emCreds.messaging.filter(em => em.protocol[0] === 'amqp10ws');
const options = {
  uri: emCredsM[0].uri,
  oa2: {
    endpoint: emCredsM[0].oa2.tokenendpoint,
    client: emCredsM[0].oa2.clientid,
    secret: emCredsM[0].oa2.clientsecret
  },
  data: {
    source: "queue:ErrorQueue",
    payload: new Buffer.allocUnsafe(20),
    maxCount: 100,
    logCount: 10
  }
};

const { Client } = require('@sap/xb-msg-amqp-v100');
const client = new Client(options);
const stream = client.receiver('ErrorQueue').attach(options.data.source);

ws.on('connection', function (socket) {
  socket.send(JSON.stringify({
    "message": "Hi, this is the Echo-Server"
  }));
  // Can be used if you want to send message to the socket
	/*
	socket.on('message', function (message) {
		console.log('Received Message: ' + message);
		socket.send('Echo: ' + message);
	});
	*/

  stream.on('data', (message) => {
    var payload = JSON.parse(message.payload.toString('utf8'));
    console.log(`Received the following message: ${JSON.stringify(payload)}`);
    socket.send(JSON.stringify(payload));
    message.done();
  });

  client
    .on('connected', (destination, peerInfo) => {
      console.log('Connected!');
    })
    .on('assert', (error) => {
      console.log(error.message);
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('disconnected', (hadError, byBroker, statistics) => {
      console.log('Disconnected!');
    });

  client.connect();
});
