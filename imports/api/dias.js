// dias.js
import { Mongo } from 'meteor/mongo';

export const insertDias = async ({ user, pass }) => {
    diasCollection.insert({ user, pass });
};

export const diasCollection = new Mongo.Collection('dias');

// {
//     "_id": "hZtcXheuE8Eb3g3on",
//     "user": "Dias1",
//     "pass": "123"
//   }