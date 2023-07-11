const login = require('facebook-chat-api');

// Authenticate with Facebook
login({email: 'lukas.kurniawan1829@gmail.com', password: 'LKSkRNWN@100701'}, (err, api) => {
  if (err) {
    return console.error(err);
  }

  // Start listening for incoming messages
  api.listen((err, message) => {
    if (err) {
      return console.error(err);
    }

    console.log(`Received message: ${message.body}`);
  });
});
