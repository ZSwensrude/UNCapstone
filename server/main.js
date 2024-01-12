import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

async function insertLink({ country, vote, motion }) {
  await LinksCollection.insertAsync({ country, vote, motion, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      country: 'USA',
      vote: 'Yes',
      motion: 'Motion A',
    });

    await insertLink({
      country: 'Canada',
      vote: 'No',
      motion: 'Motion B',
    });

    await insertLink({
      country: 'UK',
      vote: 'Abstain',
      motion: 'Motion C',
    });

    await insertLink({
      country: 'Australia',
      vote: 'Yes',
      motion: 'Motion D',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});
