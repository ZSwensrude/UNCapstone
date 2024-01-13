// conference.js
import { Mongo } from 'meteor/mongo';


export const insertConference = async ({ sessionID,delegates,dias,DMs,motions,
    speakers,workingGroups,status }) => {
     conferenceCollection.insert({ sessionID,delegates,dias,DMs,motions,
      speakers,workingGroups,status });
  };
  // Example usage of conference:
  // await insertConference({
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
  // });
  
export const conferenceCollection = new Mongo.Collection('conference');
