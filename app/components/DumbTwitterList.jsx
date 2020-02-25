// DumbTwitterList.jsx
const React = require('react');

/* the main page for the index route of this app */
const DumbTwitterList = function(props) {
    const tweets = props.tweets || [];
    
    const asyncUSubmit = async () => {
        const response = await fetch('/api/tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({user, message})),
        });
        if (response.status === 200) {
            setUser("");
            setMessage("");
            if (props.onTweeted) props.onTweeted();
        }
    }

    const handleUSubmit = (event) => {
        const user = event.target.id;
        asyncUSubmit();
        event.preventDefault();
    }
    // The map function returns a new array, calling the function on each element of the array
    const tweetComponents = tweets.map((tweet, idx) => {
        return (
            <li key={idx}> {/* In a list of components, each one needs a unique key, or else you'll get a warning */}
                <a href={user} id={{user}} onClick={handleUSubmit}><strong>{tweet.user}:</strong></a> {tweet.message}
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