// server.js

// init project
const express = require('express');
const port = process.env.PORT || 3000;

const mongo = require('mongodb').MongoClient;
let url = process.env.MONGODB_URI || "mongodb://localhost:27017/dumb-twitter";
const app = express();
let dbClient;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", async (req, res) => {

    try {
     
        
        // Finally, report back the number of pageviews
        res.sendFile(__dirname + '/app/index.html');

        
    } catch (e) {
        res.status(500).send("Some kind of terrible error happened");
        console.log(e);
    }
});



// Fetch tweets from the database
app.get("/api/tweets", async (_, res) => {
  const tweetsCollection = await dbClient.collection("tweets");
  const tweets = tweetsCollection.find({});
  res.json(await tweets.toArray());
});

// Post a new tweet
app.post("/api/tweet", async (req, res) => {
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {
    const tweetsCollection = await dbClient.collection("tweets");
    tweetsCollection.insert({user, message});
    res.sendStatus(200);
  }
});
// listen for requests :)

// We're not using async/await here because there's no top-level await
// First connect to the database given the url.
mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((client) => {

  // Store the client connection so that we can use it later
  dbClient = client.db();

  // Finally, start the server like normal
  app.listen(port, () => {
      console.log(`Express app listening on port ${port}`);
  });
}).catch((err) => {
  console.log("Couldn't connect to the database");
  console.log(err);
});
