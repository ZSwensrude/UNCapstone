// workingGroup.js
import { Mongo } from 'meteor/mongo';

// export const insertWG = async ({ countries, location, topic, name}) => {
//      workingGroupCollection.insert({ countries, location, topic, name });
//   };
export const insertWG = async ({ countries, location, topic, name }) => {
  try {
    const existingGroup = workingGroupCollection.findOne({ name });

    if (existingGroup) {
      // If the group already exists, update its fields
      workingGroupCollection.update(
        { name },
        { $set: { countries, location, topic } }
      );
      console.log(`Updated existing working group: ${name}`);
      return existingGroup._id; // Return the ID of the existing group
    } else {
      // If the group does not exist, insert a new document
      const groupId = workingGroupCollection.insert({ countries, location, topic, name });
      console.log(`Inserted new working group: ${name}`);
      return groupId; // Return the ID of the newly inserted group
    }
  } catch (error) {
    console.error('Error inserting/updating working group:', error);
    throw error; // Re-throw the error to handle it in the calling code if necessary
  }
};
  
export const workingGroupCollection = new Mongo.Collection('workingGroups');
// Define allow/deny rules for the workingGroups collection
workingGroupCollection.allow({
  // Allow updates if the user is logged in
  update(userId, doc, fieldNames, modifier) {
    return !!userId; // Return true if the user is logged in
  }
});


// {
//   "_id": "E9do2XCGcHcuY8KCn",
//   "location": "invite lco",
//   "topic": "invite top",
//   "name": "invite",
//   "countries": [
//     {
//       "country": "ireland"
//     },
//     {
//       "country": "burundi"
//     }
//   ]
// }