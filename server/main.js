//server/main.js
import { Meteor } from 'meteor/meteor';
import { conferenceCollection } from '/imports/api/conference';
import { delCollection } from '/imports/api/delegates';
import { diasCollection } from '/imports/api/dias';
import { dmCollection, insertDM } from '/imports/api/dm';
import { motionCollection } from '/imports/api/motions';
import { speakerCollection } from '/imports/api/speakers';
import { workingGroupCollection } from '/imports/api/workingGroups';

// Allow statements for each collection
conferenceCollection.allow({
  insert: () => true,
});
delCollection.allow({
  insert: () => true,
});
diasCollection.allow({
  insert: () => true,
});
dmCollection.allow({
  insert: () => true,
});
motionCollection.allow({
  insert: () => true,
});
speakerCollection.allow({
  insert: () => true,
});
workingGroupCollection.allow({
  insert: () => true,
});


//use these for pre-loaded data
export const insertConference = async ({ sessionID,delegates,dias,DMs,motions,
  speakers,workingGroups,status }) => {
  await conferenceCollection.insert({ sessionID,delegates,dias,DMs,motions,
    speakers,workingGroups,status });
};
export const insertDel = async ({ country, roleCall }) => {
  await delCollection.insert({ country, roleCall });
};
export const insertDias = async ({ user, pass }) => {
  await diasCollection.insert({ user, pass });
};
// export const insertDM = async ({ type, to, from, content, read, groupId}) => {
//   await dmCollection.insert({type, to, from, content, read, groupId});
// };

export const insertDMHandler = async ({ type, to, from, content, read, groupId }) => {
  await insertDM({ type, to, from, content, read, groupId });
};

export const insertMotion = async ({ content, votes }) => {
  motionCollection.insert({ active:false, content, votes });
};
export const insertSpeaker = async ({ country }) => {
  // Set timeAdded to the current date/time
  const timeAdded = new Date();
  await speakerCollection.insert({ country, timeAdded });
};
export const insertWG = async ({ countries, location, topic, name }) => {
  await workingGroupCollection.insert({ countries, location, topic,name });
};

Meteor.startup(async () => {
  
  // Publish "conferences" to clients
  Meteor.publish("conferences", function () {
    return conferenceCollection.find();
  });
  // Publish "delegates" to clients
  Meteor.publish("delegates", function () {
    return delCollection.find();
  });   
  // Publish "dias" to clients
  Meteor.publish("dias", function () {
    return diasCollection.find();
  });
  // Publish "dms" to clients
  Meteor.publish("DMs", function () {
    return dmCollection.find();
  });
  // Publish "motions" to clients
  Meteor.publish('motions', function () {
    return motionCollection.find();
  });
  // Publish "speakers" to clients
  Meteor.publish("speakers", function () {
    return speakerCollection.find();
  });
  // Publish "WGs" to clients
  Meteor.publish("workingGroups", function () {
      return workingGroupCollection.find();
  });
  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        fields: { country: 1, conference: 1 }
      });
    } else {
      this.ready();
    }
  });
});

// Custom delegate user info
Accounts.onCreateUser((options, user) => {
  user.country = options.country;
  user.conference = options.conference;

  return user;
});

/* 
Code to interact with delegate accounts:

Create user:
Accounts.createUser({username: 'Irelandxyz', password: 'xyz', country: 'Ireland', conference: 'xyz'})

Login:
Meteor.loginWithPassword('Irelandxyz', 'xyz')

Get user data:
Meteor.user()

Get just country:
Meteor.user().country 

You can put these in the code where needed, or in the console to test on the fly.
*/