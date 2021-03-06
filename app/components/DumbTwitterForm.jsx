const React = require('react');
const qs = require("qs");

/* the main page for the index route of this app */
const DumbTwitterForm = function(props) {

    const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    const asyncSubmit = async () => {
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

    const handleSubmit = (event) => {
        asyncSubmit();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User: 
                <input type="text"value={user} onChange={updateUser}/>
            </label>
            <label id="message-label" >
                Message: 
                <textarea id="message" value={message} onChange={updateMessage}></textarea>
            </label>
            <input type="submit" value="Send your dumb tweet" id="sendDweet"/>
        </form>
    );
}

module.exports = DumbTwitterForm;