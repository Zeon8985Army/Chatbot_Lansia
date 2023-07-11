const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const Client = require('@line/bot-sdk').Client;

const app = express()
userId = ""

const config = {
  channelAccessToken: 'X6PFGFC51kiYVBl0E1lISeWLzc0AAZQdLakoBX7JwWKtGCFBTJ+4HpUUyfJ59OfHy6PjxPTNDMr+Gf3ByCnDlORFcc9jtA7XfbC1Jtp/qZmjgjCc39/G2gMEyRYXiUE0w4YyoE557euSMv19To2evQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd1dc3fa288edaa66bd06c5d21e95613c'
};

app.use(middleware(config))

app.post('/callback', (req, res) => {
  userId = (req.body.events[0].source.userId);
  // Client
  const client = new Client(config);

  const event = req.body.events[0];

  if (event.type === 'message') {
    const message = event.message;

    if (message.type === 'text' && message.text === 'hallo') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hi !',
      });
    }else{
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Text masuk = '+message.text,
      });
    }
  }

  res.json(req.body.events); // req.body will be webhook event object
})

// Handling
app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})


app.listen(3000)