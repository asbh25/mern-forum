import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import axios from 'axios';
import faker from 'faker';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";


import "./Forum.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

export const Forum = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
		axios
			.get("/api/comments")
			.then((msgs) => {
				setMessages(msgs.data)
			})
			.catch((err) => console.log(err));
	}, []);

	const sendMessage = async (event) => {
    event.preventDefault();
    
    const photoUrl = await faker.image.avatar();

		var data = {
      "name": name,
			"comment": comment,
      "createdAt": +Date.now(),
      "photoUrl": photoUrl
		};

		var config = {
			method: 'post',
			url: '/api/comments',
			headers: { },
			data : data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});

		axios
			.get("/api/comments")
			.then((msgs) => {
				setMessages(msgs.data)
			})
      .catch((err) => console.log(err));
      
      setName('');
      setComment('');
	}

  return (
    <>
      <div className="container">
        {messages &&
          messages
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((msg) => (
              <div className="wrapper" key={msg.id}>
                <ChatMessage message={msg} />
              </div>
            ))}
      </div>

      <form onSubmit={sendMessage} className="makeStyles-root-4">
        <div className="input-box">
          <TextField
            required
            id="standard-required"
            value={name}
            onChange={({ target }) => setName(target.value.trimLeft())}
            placeholder="Name"
          />

          <TextField
            required
            id="standard-required"
            value={comment}
            onChange={({ target }) => setComment(target.value.trimLeft())}
            placeholder="Say something nice"
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            type="submit"
            disabled={!name && !comment}
          >
            Send
          </Button>
        </div>
      </form>
    </>
  );
};
