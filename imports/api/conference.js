// conference.js
import { Mongo } from 'meteor/mongo';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid library

export const conferenceCollection = new Mongo.Collection('conference');

export const insertConference = async ({ sessionID, dias, title, committee }) => {
  conferenceCollection.insert({ sessionID: sessionID, title: title, committee: committee,
  delegates: [], DMs: [], motions: [], speakers: [], workingGroups: [], deadlines: [], 
  status: 'waiting', activeSpeakerList: false, rollCallOpen: false, displayMotions: false,
  timer: {
    status: 'paused',
    timer: 0
  }, feedback: false, dias, date: new Date()});
};
  

export const addDeadlineToConf = async ( conferenceID, deadlineToAdd ) => {
  await conferenceCollection.update(
    { _id: conferenceID },
    { $push: { deadlines: { deadlineAdded: deadlineToAdd } } }
  )
}

export const removeDeadlineFromConf = async ( conferenceID, deadlineToRemove ) => {
  await conferenceCollection.update(
    { _id: conferenceID },
    { $pull: { deadlines: { deadlineAdded: deadlineToRemove } } }
  )
}

export const setTimerTime = async ( conferenceID, time ) => {
  try {

    await conferenceCollection.update(
      { _id: conferenceID },
      { $set: { 'timer.time': time } }
    )
  } catch (e) {
    console.log("error setting time: ", e);
  }
}

export const setTimerStatus = async ( conferenceID, status ) => {
  await conferenceCollection.update(
    { _id: conferenceID },
    { $set: { 'timer.status': status } }
  )
}

export const updateConferenceActiveStatus = async ({ conferenceId, activeSpeakerList }) => {
  await conferenceCollection.update(
    { _id: conferenceId },
    {
      $set: { activeSpeakerList }
    }
  );
};

export const updateConfMotion = async ( conferenceId, motionStatus ) => {
  //console.log("updateConfMotion",conferenceId, motionStatus )
  await conferenceCollection.update(
    { _id: conferenceId },
    {
      $set: { displayMotions: motionStatus }
    }
  );
};

export const updateRollCallStatus = async ( conferenceId, openRollCall ) => {
  await conferenceCollection.update(
    { _id: conferenceId },
    {
      $set: { rollCallOpen: openRollCall }
    }
  );
};

export const updateConfStatus = async ( conferenceId, newStatus ) => {
  await conferenceCollection.update(
    { _id: conferenceId },
    {
      $set: { status: newStatus }
    }
  );
};

export const getRollCallStatus = async ( conferenceId ) => {
  const conference = conferenceCollection.findOne( {_id: conferenceId} )
  if (conference) {
    return conference.rollCallOpen;
  }
  return null;
} 
//start delegates ----------------------------------------------------------------------------------

export const insertDel = async ({ country, roleCall, sessionId }) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  // Check if the item already exists in the collection
  if (conference) {
    const existingDelegate = conference.delegates.find((delegate) => delegate.country === country);
    // If the item already exists, return false
    if (existingDelegate) {
      return false;
    }
    else{
      const delegateId = uuidv4();
      // Insert the delegate into the delegates array
      conferenceCollection.update(
        { _id: conference._id },
        { $push: { delegates: { _id:delegateId, country, roleCall } } }
      );
      return true; // Indicate successful insertion
    }
  } else {
    //handle if conf not found
    return false;
  }
};

export const updateDelRole = async (countryToUpdate, roleCall, sessionId) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });

  // Check if conference is null or undefined
  if (!conference) {
    return false; // Indicate conference not found
  }

  // Find the index of the delegate in the delegates array by country
  const delegateIndex = conference.delegates.findIndex((delegate) => delegate.country === countryToUpdate);

  // If delegate is found, update its roleCall
  if (delegateIndex !== -1) {
    const updatedDelegates = [...conference.delegates]; // Create a copy of the delegates array
    updatedDelegates[delegateIndex] = { ...updatedDelegates[delegateIndex], roleCall }; // Update roleCall
    conferenceCollection.update(
      { _id: conference._id },
      { $set: { delegates: updatedDelegates } }
    );
    return true; // Indicate successful update
  } else {
    return false; // Indicate delegate not found
  }
};
//end delegates ----------------------------------------------------------------------------------

//start speakers ----------------------------------------------------------------------------------

export const insertSpeaker = async ({ country, sessionId }) => {
  let currentDate = null;
  const speakerId = uuidv4();
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  fetch('https://worldtimeapi.org/api/timezone/Europe/London')
  .then(response => response.json())
  .then(data => {
    currentDate = new Date(data.datetime);
    conferenceCollection.update(
      { _id: conference._id },
      { $push: { speakers: { _id:speakerId, country, createdAt:currentDate } } }
    );    return true;
  })
  .catch(error => {
    console.error('Error fetching time:', error);
  });
};


export const removeSpeaker = async ({ sessionId, _idspeaker }) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  const updatedspeakers = conference.speakers.filter(speaker => speaker._id !== _idspeaker);

  conferenceCollection.update(
    { _id: conference._id },
    { $set: { speakers: updatedspeakers } }
  );};

//end speakers ----------------------------------------------------------------------------------

//start motions ----------------------------------------------------------------------------------

export const addMotionVote = async (motionId, userCountry, vote, sessionId) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  if (!conference) {
    console.error('Conference not found.');
    return false;
  }
  // Find the motion in the conference
  const motionIndex = conference.motions.findIndex((motion) => motion._id === motionId);
  if (motionIndex === -1) {
    console.error('Motion not found.');
    return false;
  }
  // Check if the user's country has already voted on this motion
  const countryAlreadyVoted = conference.motions[motionIndex].votes.some((v) => v.country === userCountry);
  if (countryAlreadyVoted) {
    console.error('Country already voted on this motion.');
    return false;
  }
  // Update the votes array of the motion with the new vote
  const updatedVotes = [...conference.motions[motionIndex].votes, { country: userCountry, vote }];
  const updatedMotions = [...conference.motions];
  updatedMotions[motionIndex] = { ...updatedMotions[motionIndex], votes: updatedVotes };

  // Update the conference with the modified motion
  conferenceCollection.update(
    { _id: conference._id },
    { $set: { motions: updatedMotions } }
  );

  return true;
};

export const insertMotion = async ({ sessionId, content, abstain }) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  if (conference) {
    const motionId = uuidv4(); // Generate a unique ID for the motion
    const newMotion = {
      _id: motionId,
      active: false,
      content,
      votes: [],
      abstain
    };
    conferenceCollection.update(
      { _id: conference._id },
      { $push: { motions: newMotion } }
    );
  } else {
    console.error('Conference not found.');
  }
};

export const removeMotion = async ({ sessionId, motionId }) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });

  if (!conference) {
    console.error('Conference not found.');
    return;
  }
  const updatedMotions = conference.motions.filter(motion => motion._id !== motionId);

  conferenceCollection.update(
    { _id: conference._id },
    { $set: { motions: updatedMotions } }
  );};
export const clearallMotions = async (sessionId) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  conferenceCollection.update(
    { _id: conference._id },
    { $set: { motions: [] } }
  );
};

export const switchActiveMotion = async (sessionId, motionId) => {
  try {
    // Find the conference with the given sessionId
    const conference = conferenceCollection.findOne({ sessionID: sessionId });

    // Check if the conference exists
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }

    // Find the index of the selected motion within the conference's motions array
    const selectedMotionIndex = conference.motions.findIndex(motion => motion._id === motionId);

    // Update the motions array to set all motions' active status to false except the selected motion
    const updatedMotions = conference.motions.map((motion, index) => ({
      ...motion,
      active: index === selectedMotionIndex // Set active status to true only for the selected motion
    }));

    // Update the conference's motions array
    conferenceCollection.update(
      { _id: conference._id },
      { $set: { motions: updatedMotions } }
    );

    //console.log(`Updated motion with ID ${motionId}`);
  } catch (error) {
    console.error('Error switching active motion:', error);
    return "error";
  }
};

export const setMotionInactive = async (sessionId, motionId) => {
  try {
    // Find the conference with the given sessionId
    const conference = conferenceCollection.findOne({ sessionID: sessionId });

    // Check if the conference exists
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }

    // Find the index of the selected motion within the conference's motions array
    const selectedMotionIndex = conference.motions.findIndex(motion => motion._id === motionId);

    // Update the motions array to set all motions' active status to false except the selected motion
    const updatedMotions = conference.motions.map((motion, index) => ({
      ...motion,
      active: false // Set active status to true only for the selected motion
    }));

    // Update the conference's motions array
    conferenceCollection.update(
      { _id: conference._id },
      { $set: { motions: updatedMotions } }
    );

    //console.log(`Updated motion with ID ${motionId}`);
  } catch (error) {
    console.error('Error switching active motion:', error);
    return "error";
  }
};


//end motions ----------------------------------------------------------------------------------

//start dms ----------------------------------------------------------------------------------

export const insertDM = async ({ sessionId, type, to, from, content, read, groupId}) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  const dmId = uuidv4();
  const createdAt = new Date();
  conferenceCollection.update(
    { _id: conference._id },
    { $push: { DMs: { _id:dmId, type, to, from, content, createdAt, read, groupId } } }
  );
  return true;
};

export const updateDMReadStatus = async (sessionId, dmId, newReadStatus) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  const updatedDMs = conference.DMs.map(dm => {
    if (dm._id === dmId) {
      return { ...dm, read: newReadStatus };
    }
    return dm;
  });

  conferenceCollection.update(
    { _id: conference._id },
    { $set: { DMs: updatedDMs } }
  );

  return true;
};
export const deleteDMFromDB = async (sessionId, dmId) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  const updatedDMs = conference.DMs.filter(dm => dm._id !== dmId);

      conferenceCollection.update(
        { _id: conference._id },
        { $set: { DMs: updatedDMs } }
      );
  
  return true;
};
export const markAsReadDIAS = async (sessionId) => {
  try {
    const conference = conferenceCollection.findOne({ sessionID: sessionId });
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }
    
    const diasMessages = conference.DMs.filter(message => message.to === 'Dias');
    
    diasMessages.forEach(message => {
      updateDMReadStatus(sessionId, message._id, true);
    });
    
    //console.log('Successfully marked all messages as read.');
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return "error";
  }
};
export const deleteSentMessagesDIAS = (sessionId) => {
  const conference = conferenceCollection.findOne({ sessionID: sessionId });
  if (!conference) {
      console.error('Conference not found.');
      return;
  }
  const diasMessages = conference.DMs.filter(message => message.to === 'delegates');
  diasMessages.forEach(message => {
      deleteDMFromDB(sessionId, message._id);
  });
};

//end dms ----------------------------------------------------------------------------------

//start WGs ----------------------------------------------------------------------------------

export const insertWG = async ({ sessionId, countries, location, topic, name }) => {
  try {
    const conference = conferenceCollection.findOne({ sessionID: sessionId });
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }
    const wgId = uuidv4();
    const existingGroup = conference.workingGroups.find(group => group.name === name);

    if (existingGroup) {
      // If the group already exists, update its fields
      const updatedGroups = conference.workingGroups.map(group => {
        if (group.name === name) {
          return { ...group, countries, location, topic };
        }
        return group;
      });

      conferenceCollection.update(
        { _id: conference._id },
        { $set: { workingGroups: updatedGroups } }
      );
      //console.log(`Updated existing working group: ${name}`);
      return existingGroup._id; // Return the ID of the existing group
    } else {
      // If the group does not exist, insert a new document
      const newGroup = {_id:wgId, countries, location, topic, name };
      conferenceCollection.update(
        { _id: conference._id },
        { $push: { workingGroups: newGroup } }
      );
      //console.log(`Inserted new working group: ${name}`);
      return newGroup._id; // Return the ID of the newly inserted group
    }
  } catch (error) {
    console.error('Error inserting/updating working group:', error);
    return "error";
  }
};

export const updateWG = async ({ groupId, name, topic, location }) => {
  try {
    const conference = conferenceCollection.findOne({ 'workingGroups._id': groupId });
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }

    // Find the index of the working group within the conference's workingGroups array
    const groupIndex = conference.workingGroups.findIndex(group => group._id === groupId);

    if (groupIndex !== -1) {
      // If the working group exists, update its fields
      const updatedGroup = {
        ...conference.workingGroups[groupIndex],
        name,
        topic,
        location
      };

      const updatedGroups = [...conference.workingGroups];
      updatedGroups[groupIndex] = updatedGroup;

      conferenceCollection.update(
        { _id: conference._id },
        { $set: { workingGroups: updatedGroups } }
      );
      //console.log(`Updated working group with ID ${groupId}`);
    } else {
      console.error('Working group not found.');
      return "error";
    }
  } catch (error) {
    console.error('Error updating working group:', error);
    return "error";
  }
};

export const joinWG = ({ sessionId, groupId, user }) => {
  try {
    const conference = conferenceCollection.findOne({ sessionID: sessionId });
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }

    // Find the index of the working group within the conference's workingGroups array
    const groupIndex = conference.workingGroups.findIndex(group => group._id === groupId);

    if (groupIndex !== -1) {
      // If the working group exists, update its fields
      const updatedGroup = {
        ...conference.workingGroups[groupIndex],
        countries: [
          ...conference.workingGroups[groupIndex].countries,
          { country: user.country, name: user.countryName, flagPath: user.flagPath }
        ]
      };

      const updatedGroups = [...conference.workingGroups];
      updatedGroups[groupIndex] = updatedGroup;

      conferenceCollection.update(
        { _id: conference._id },
        { $set: { workingGroups: updatedGroups } }
      );
      //console.log(`Successfully joined the working group with ID ${groupId}`);
    } else {
      console.error('Working group not found.');
      return "error";
    }
  } catch (error) {
    console.error('Error joining working group:', error);
    return "error";
  }
};
export const removeFromWG = ({ sessionId, groupId, user }) => {
  try {
    const conference = conferenceCollection.findOne({ sessionID: sessionId });
    if (!conference) {
      console.error('Conference not found.');
      return "error";
    }

    // Find the index of the working group within the conference's workingGroups array
    const groupIndex = conference.workingGroups.findIndex(group => group._id === groupId);

    if (groupIndex !== -1) {
      // If the working group exists, remove the user's country from the countries array
      const updatedGroup = {
        ...conference.workingGroups[groupIndex],
        countries: conference.workingGroups[groupIndex].countries.filter(country => country.country !== user.country)
      };

      const updatedGroups = [...conference.workingGroups];
      updatedGroups[groupIndex] = updatedGroup;

      conferenceCollection.update(
        { _id: conference._id },
        { $set: { workingGroups: updatedGroups } }
      );
      //console.log(`Successfully removed from the working group with ID ${groupId}`);
    } else {
      console.error('Working group not found.');
      return "error";
    }
  } catch (error) {
    console.error('Error removing from working group:', error);
    return "error";
  }
};
export const deleteWG = async (sessionId, groupId) => {
  try {
    const conference = conferenceCollection.findOne({ sessionID: sessionId });

    if (!conference) {
      console.error('Conference not found.');
      return;
    }
    const updatedworkingGroups= conference.workingGroups.filter(wg => wg._id !== groupId);
  
    conferenceCollection.update(
      { _id: conference._id },
      { $set: { workingGroups: updatedworkingGroups } }
    );
  } catch (error) {
    console.error('Error deleting working group:', error);
    throw error;
  }
};

//end WGs ----------------------------------------------------------------------------------


// Define allow rules for the update method on the conferenceCollection
conferenceCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  }


});