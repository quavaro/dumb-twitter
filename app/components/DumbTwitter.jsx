const React = require('react');
const DumbTwitterForm = require("./DumbTwitterForm");
const DumbTwitterList = require("./DumbTwitterList");

const DumbTwitter = function() {

  // Initialize an array of tweets with an empty array
  const [tweets, setTweets] = React.useState([]);

  const fetchTweets = async () => {
    const response = await fetch("api/tweets");
    const body = await response.json();
    setTweets(body);
  }
  const fetchUserTweets = async (username) => {
    const response = await fetch('/api/user/'+username);
    const body = await response.json();
    setTweets(body);
  }
  const deleteTweet = async (tweetId) => {
    const deleteResponse = await fetch('/api/delete/'+tweetId, {method: 'delete'});
    const refetch = await fetch("api/tweets");
    const body = await refetch.json();
    setTweets(body);
  }
  // When this component loads, fetch tweets from the API
  React.useEffect(() => {
    fetchTweets();
  }, []); // Remember, an empty array as the second argument means "just do this once"

  return (
    <div id="main">
      <h1>Dumbest Twitter</h1>
      <hr />
      <DumbTwitterForm onTweeted={fetchTweets}/>
      <hr />
      <DumbTwitterList tweets={tweets} onUserClick={fetchUserTweets} onDelete={deleteTweet}/>
      <button id="backButton" onClick={fetchTweets}>Dumbest Twitter Homepage</button>
    </div>
  );
}

module.exports = DumbTwitter;