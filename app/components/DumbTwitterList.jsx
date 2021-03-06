// DumbTwitterList.jsx
const React = require('react');

/* the main page for the index route of this app */
const DumbTwitterList = function(props) {
    const tweets = props.tweets || [];
  
    const handleClick = (userClicked) => {
        if (props.onUserClick) props.onUserClick(userClicked);
    }
    const handleDelete = (tweetClicked) => {
        if (props.onDelete) props.onDelete(tweetClicked);
    }
    // The map function returns a new array, calling the function on each element of the array
    const tweetComponents = tweets.map((tweet, idx) => {
        return (
            <li key={idx}> {/* In a list of components, each one needs a unique key, or else you'll get a warning */}
                <a href="#" class="user" onClick={(event) => {event.preventDefault(); handleClick(tweet.user)}}>{tweet.user}:</a>
                <div class="dweet">{tweet.message}</div>
                <button class="deleteButton" onClick={(event) => {event.preventDefault(); handleDelete(tweet._id)}}>Delete</button>
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