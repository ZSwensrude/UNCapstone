// dias.js
import { Mongo } from 'meteor/mongo';

export const insertDias = async ({ user, pass }) => {
    diasCollection.insert({ user, pass });
};

export const diasCollection = new Mongo.Collection('dias');
