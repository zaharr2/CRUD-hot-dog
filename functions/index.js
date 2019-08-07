const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const app = express();

app.use(cors());

app.get('/hot-dogs', async (request, response) => {
  try {
    let hotDogs = []
    let hotDogsRef = db.collection('hotDogs');
    let allHotDogs = await hotDogsRef.get();
    allHotDogs.then(snapshot => {
      snapshot.forEach(doc => {
        hotDogs.push(doc.data())
      });
    })
    response.status(200).json(hotDogs).end();
  } catch (error) {
    response.status(500).send(error).end();
  }
});

app.post('/hot-dog', async (request, response) => {
  try {
    let rrr = {
      "additive": [
        "awdawd",
        "coawfwfle",
        "awdfaw"
      ],
      "sausage": "meersgrdgat",
      "bun": "gweesfreat",
      "ketchup": false,
      "mustard": false
    }
    let { additive, sausage, bun, ketchup, mustard } = rrr;
    let data = {
      additive,
      sausage,
      bun,
      ketchup,
      mustard
    }
    await db.collection('hotDogs').add(data);
    response.status(200).json({message: 'added'}).end();
  } catch(error){
    response.status(500).send(error).end();
  }
});

exports.api = functions.https.onRequest(app)
