// conference.js
import { Mongo } from 'meteor/mongo';

export const conferenceCollection = new Mongo.Collection('conference');

export const insertConference = async ({ sessionID, dias, title, committee }) => {
  conferenceCollection.insert({ sessionID: sessionID, title: title, committee: committee,
  delegates: [], DMs: [], motions: [], speakers: [], workingGroups: [], deadlines: [], 
  status: 'waiting', activeSpeakerList: false, rollCallOpen: false,
  timer: {
    status: 'paused',
    timer: 0
  }, feedback: false, dias});
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

// Define allow rules for the update method on the conferenceCollection
conferenceCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  }


});