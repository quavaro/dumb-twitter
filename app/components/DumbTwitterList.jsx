// DumbTwitterList.jsx
const React = require('react');

/* the main page for the index route of this app */
const DumbTwitterList = function(props) {
    const tweets = props.tweets || [];

    // The map function returns a new array, calling the function on each element of the array
    const tweetComponents = tweets.map((tweet, idx) => {
        return (
            <li key={idx}> {/* In a list of components, each one needs a unique key, or else you'll get a warning */}
                <a href={"/user/" + tweet.user}><strong>{tweet.user}:</strong></a> {tweet.message}
            </li>
        )
    })

    return (
        <div>
            <ul>
                {tweetComponents}
            </ul>
        </div>
    );
}

module.exports = DumbTwitterList;