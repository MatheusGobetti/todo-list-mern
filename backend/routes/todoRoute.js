var express = require('express')
var router = express.Router()
const db = require("../services/db")
const { ObjectId } = require('mongodb')

db.main((err) => {
  if (err) console.log(err);

  const checkBodyObjectID = (req, res, next) => {
    if ("_id" in req.body) {
      req.body._id = ObjectId(req.body._id)
    }
    next()
  }

  router.get("/list", async (req, res) => {
    const result = await db.findDocuments()
    res.send(result)
  })
  
  router.post("/add", async (req, res) => {
    const result = await db.insertDocuments(req.body)
    res.send(result)
  })
  
  router.patch("/update", checkBodyObjectID, async (req, res) => {
    const result = await db.updateDocuments(req.body)
    res.send(result)
  })
  
  router.delete("/delete", checkBodyObjectID, async (req, res) => {
    const result = await db.removeDocuments(req.body)
    res.send(result)
  })
  
})

module.exports = router