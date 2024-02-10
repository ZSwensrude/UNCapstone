// dm.js
import { Mongo } from 'meteor/mongo';

export const insertDM = async ({ type, to, from, content, read, groupId}) => {
    
  const createdAt = new Date();
  dmCollection.insert({ type, to, from, content, createdAt, read, groupId });
  return true;
};
export const updateDMReadStatus = async (dmId, newReadStatus) => {
  dmCollection.update(
    { _id: dmId },
    { $set: { read: newReadStatus } }
  );
  return true;
};



export const dmCollection = new Mongo.Collection('DMs');

// Define allow/deny rules for the dmCollection
dmCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow updating if the user is logged in
    return !!userId;
  }
});

// {
//   "_id": "sNfq36oKHmMjmxqEo",
//   "type": "invite",
//   "to": "burundi",
//   "from": "invite",
//   "content": "Please join our group!",
//   "createdAt": {
//     "$date": "2024-02-09T02:00:37.637Z"
//   },
//   "read": "false",
//   "groupId": "E9do2XCGcHcuY8KCn"
// }