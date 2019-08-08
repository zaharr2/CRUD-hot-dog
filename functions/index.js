const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()
const app = express()

app.use(cors())

exports.api = functions.https.onRequest(app)

// get all hot dogs
app.get('/hot-dogs', async (request, response) => {
  try {
    let hotDogs = []
    let allHotDogs = await db.collection('hotDogs').get()

    allHotDogs.forEach(doc => {
      let { bun, sausage, additive, mustard, ketchup } = doc.data()
      let credentials = { bun, sausage, additive, mustard, ketchup }
      Object.assign(credentials, { id: doc.id })
      hotDogs.push(credentials)
    })
    response.status(200).json(hotDogs)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

// create hot dog
app.post('/hot-dog', async (request, response) => {
  try {
    let { additive, sausage, bun, ketchup, mustard } = request.body
    let data = { additive, sausage, bun, ketchup, mustard }

    for (const key in data) {
      if ((typeof (data[key]) !== 'boolean') && !data[key]) {
        throw new Error(`Field ${key} empty`)
      }
    }

    await db.collection('hotDogs').add(data)
    response.status(200).json({ message: 'Added' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

// get one hot dog
app.get('/hot-dog/:id', async (request, response) => {
  try {
    let hotDogId = request.params.id

    if (!hotDogId) {
      throw new Error('Hot dog ID is required')
    }

    let hotDog = await db.collection('hotDogs').doc(hotDogId).get()

    if (hotDog.exists) {
      response.status(200).json(hotDog.data())
    } else {
      response.status(204).json({ message: 'Hot dog not found' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

app.put('/hot-dog/:id', async (request, response) => {
  try {
    let hotDogId = request.params.id

    if (!hotDogId) {
      throw new Error('Hot dog ID is required')
    }

    let { additive, bun, ketchup, mustard, sausage } = request.body
    let newData = { additive, bun, ketchup, mustard, sausage }

    for (const key in newData) {
      if ((typeof (newData[key]) !== 'boolean') && !newData[key]) {
        throw new Error(`Field ${key} empty`)
      }
    }

    let hotDog = db.collection('hotDogs').doc(hotDogId)
    let hotDogGet = await hotDog.get()

    if (hotDogGet.exists) {
      hotDog.set(newData, { merge: true })
      response.status(200).json({ message: 'Edited' })
    } else {
      response.status(204).json({ message: 'Hot dog not found' })
    }
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

// delete hot dog
app.delete('/hot-dog/:id', async (request, response) => {
  try {
    let hotDogId = request.params.id

    if (!hotDogId) {
      throw new Error('Hot dog ID is required')
    }

    await db.collection('hotDogs').doc(hotDogId).delete()

    response.status(200).json({ message: 'Deleted' })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})
