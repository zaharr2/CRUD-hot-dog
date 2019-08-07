const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()
const app = express()

app.use(cors())

// get all hot dogs
app.get('/hot-dogs', async (request, response) => {
  try {
    let hotDogs = []
    let hotDogsRef = db.collection('hotDogs')
    let allHotDogs = await hotDogsRef.get()
    allHotDogs.forEach(doc => {
      hotDogs.push({
        bun: doc.data().bun,
        sausage: doc.data().sausage,
        additive: doc.data().additive,
        mustard: doc.data().mustard,
        ketchup: doc.data().ketchup
      })
    })
    response.status(200).json(hotDogs)
  } catch (error) {
    response.status(500).send(error)
  }
});

// get one hot dog
app.get('/hot-dog/:id', (request, response) => {
  let hotDogId = request.params.id
  if (!hotDogId) throw new Error('HotDog ID is required')
  let hotDog = db.collection('hotDogs').doc(hotDogId).get().then(doc => {
    if (!doc.exists) {
      response.status(204).json({ message: 'no-contact' })
    } else {
      response.status(200).json(doc.data())
    }
  }).catch(err => {
    response.status(500).send(err)
  });
});

// create hot dog
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
    let { additive, sausage, bun, ketchup, mustard } = rrr
    let data = {
      additive,
      sausage,
      bun,
      ketchup,
      mustard
    }
    await db.collection('hotDogs').add(data)
    response.status(200).json({message: 'added'})
  } catch(error){
    response.status(500).send(error)
  }
})

exports.api = functions.https.onRequest(app)
