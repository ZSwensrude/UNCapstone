// conference.js
import { Mongo } from 'meteor/mongo';


export const insertConference = async ({ sessionID,delegates,dias,DMs,motions,
    speakers,workingGroups,status, activeSpeakerList, rollCallOpen, deadlines }) => {
     conferenceCollection.insert({ sessionID,delegates,dias,DMs,motions,
      speakers,workingGroups,status, activeSpeakerList, rollCallOpen, deadlines });
  };
  // Example usage of conference:
// const conference = insertConference(
//   {
//   "_id": "hgHyefrMrSTCNQnDp",
//   "sessionID": "xyz",
//   "delegates": [
//     {
//       "id": "1",
//       "country": "USA",
//       "roleCall": "present"
//     },
//     {
//       "id": "2",
//       "country": "Canada",
//       "roleCall": "absent"
//     }
//   ],
//   "dias": [
//     {
//       "id": "1",
//       "user": "john_doe",
//       "pass": "password123"
//     }
//   ],
//   "DMs": [
//     {
//       "id": "1",
//       "to": "user1",
//       "from": "user2",
//       "content": "Hello!",
//       "datetime": {
//         "$date": "2024-02-10T21:02:12.471Z"
//       }
//     }
//   ],
//   "motions": [
//     {
//       "id": "1",
//       "content": "Motion A",
//       "votes": [
//         {
//           "country": "USA",
//           "vote": "Yes"
//         }
//       ]
//     }
//   ],
//   "speakers": [
//     {
//       "id": "1",
//       "country": "USA",
//       "timeAdded": {
//         "$date": "2024-02-10T21:02:12.471Z"
//       },
//       "currentSpeaker": true
//     }
//   ],
//   "workingGroups": [
//     {
//       "id": "1",
//       "countries": [
//         "USA",
//         "Canada"
//       ],
//       "location": "Room A",
//       "topic": "Climate Change"
//     }
//   ],
//   "deadlines": [
//     {
//       "deadlineAdded": "Deadline: 2pm"
//     },
//     {
//       "deadlineAdded": "Lunch: 12pm"
//     },
//     {
//       "deadlineAdded": "Papers due: 3pm"
//     },
//     {
//       "deadlineAdded": "longer deadline jasndkjansdnaskdjnas askdnakjsndljnsald naksd nak sdja nsdk an"
//     }
//   ],
//   "status": "informal",
//   "activeSpeakerList": true,
//   "rollCallOpen": true
// }
//);
  
export const conferenceCollection = new Mongo.Collection('conference');

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