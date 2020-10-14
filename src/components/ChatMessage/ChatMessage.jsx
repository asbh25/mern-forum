import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import "./ChatMessage.css";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
  },
}));

const getDateFrom = (milliseconds) => {
  const t = new Date(1970, 0, 1);
  t.setSeconds(milliseconds / 1000);
  return t.toDateString();
};

export const ChatMessage = ({ message }) => {
  const { name, comment, createdAt, photoUrl } = message;
  const [date] = useState(getDateFrom(createdAt));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="avatar"
            src={
              photoUrl ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
        }
        title={name.toUpperCase()}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};
