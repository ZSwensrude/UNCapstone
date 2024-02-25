

const auth = () => {
    return new Promise((resolve, reject) => {
      const loggedIn = Meteor.userId();
      if (loggedIn) {
        resolve();
      } else {
        reject();
      }
    });
  }

export default auth;