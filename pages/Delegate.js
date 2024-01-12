import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LinksCollection } from "../imports/api/links";

// Placeholder for delegate screen
const Delegate = () => {
  const [links, setLinks] = useState([]);

  useTracker(() => {
    const linksData = LinksCollection.find().fetch();
    setLinks(linksData);
  }, []);

  return (
    <div>
      <Typography variant="h1">Delegate</Typography>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <strong>Country:</strong> {link.country}, {" "}
            <strong>Vote:</strong> {link.vote}, {" "}
            <strong>Motion:</strong> {link.motion}, {" "}
            <strong>Created At:</strong> {link.createdAt.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delegate;
