// dias.js
import { Mongo } from 'meteor/mongo';



export const insertDias = async ({ user, pass }) => {
    await diasCollection.insert({ user, pass });
  };

export const diasCollection = new Mongo.Collection('dias');
