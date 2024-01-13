import { Meteor } from 'meteor/meteor';
import { conferenceCollection } from '/imports/api/conference';
import { delCollection } from '/imports/api/delegates';
import { diasCollection } from '/imports/api/dias';
import { dmCollection } from '/imports/api/dm';
import { motionCollection } from '/imports/api/motions';
import { speakerCollection } from '/imports/api/speakers';
import { userCollection } from '/imports/api/users';
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
userCollection.allow({
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
export const insertDM = async ({ country, roleCall }) => {
  await dmCollection.insert({ country, roleCall });
};
export const insertMotion = async ({ content, votes }) => {
  await motionCollection.insert({ content, votes });
};
export const insertSpeaker = async ({ country }) => {
  // Set timeAdded to the current date/time
  const timeAdded = new Date();
  await speakerCollection.insert({ country, timeAdded });
};
export const insertUser = async ({ user, pass }) => {
  await userCollection.insert({ user, pass });
};
export const insertWG = async ({ countries, location, topic }) => {
  await workingGroupCollection.insert({ countries, location, topic });
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
  Meteor.publish("motions", function () {
  return motionCollection.find();
  });
  // Publish "speakers" to clients
  Meteor.publish("speakers", function () {
    return speakerCollection.find();
  });
  // Publish "users" to clients
  Meteor.publish("users", function () {
    return userCollection.find();
  });
  // Publish "WGs" to clients
  Meteor.publish("WGs", function () {
      return workingGroupCollection.find();
  });
});
