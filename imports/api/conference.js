// conference.js
import { Mongo } from 'meteor/mongo';


export const insertConference = async ({ sessionID,delegates,dias,DMs,motions,
    speakers,workingGroups,status, activeSpeakerList, rollCallOpen }) => {
     conferenceCollection.insert({ sessionID,delegates,dias,DMs,motions,
      speakers,workingGroups,status, activeSpeakerList, rollCallOpen });
  };
  // Example usage of conference:
  // const conference = insertConference({
  //   sessionID: '12345',
  //   delegates: [
  //     { id: '1', country: 'USA', roleCall: 'present' },
  //     { id: '2', country: 'Canada', roleCall: 'absent' },
  //     // Add more delegates as needed
  //   ],
  //   dias: [
  //     { id: '1', user: 'john_doe', pass: 'password123' },
  //     // Add more dias as needed
  //   ],
  //   DMs: [
  //     { id: '1', to: 'user1', from: 'user2', content: 'Hello!', datetime: new Date() },
  //     // Add more DMs as needed
  //   ],
  //   motions: [
  //     { id: '1', content: 'Motion A', votes: [{ country: 'USA', vote: 'Yes' }] },
  //     // Add more motions as needed
  //   ],
  //   speakers: [
  //     { id: '1', country: 'USA', timeAdded: new Date(), currentSpeaker: true },
  //     // Add more speakers as needed
  //   ],
  //   workingGroups: [
  //     { id: '1', countries: ['USA', 'Canada'], location: 'Room A', topic: 'Climate Change' },
  //     // Add more working groups as needed
  //   ],
  //   status: 'formal',
  //   activeSpeakerList: true
  // });
  
export const conferenceCollection = new Mongo.Collection('conference');

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
// Define allow rules for the update method on the conferenceCollection
conferenceCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  }


});