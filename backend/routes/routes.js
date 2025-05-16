const express = require('express')
const router = express.Router()
// const NuevanSchema = require('../models/Nuevan.js')
const ShoppingSchema = require("../models/shopping-list.js")
const SupplierSchema = require("../models/suppliers.js")

//CASHIER ENDPOINTS

router.get('/suppliers', (req, res) => {
  SupplierSchema.find(req.query)
  .then(supplier => {
    console.log("succesfully got supplier db!")
    console.log(supplier)
    res.json(supplier)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

router.post('/suppliers/add', (req, res) => {
  SupplierSchema.create(req.body)
  .then(supplier => {
    console.log("succesfully added!")
    console.log(supplier)
    res.json(supplier)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

//finding/updating suppliers by id
router.put('/suppliers/:id', (req, res) => {
  SupplierSchema.findByIdAndUpdate({_id: req.params.id},req.body)
  .then(supplier => {
    console.log("succesfully updated")
    console.log(supplier)
    res.json(supplier)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

router.delete('/supplier/:id', (req,res) => {
  ShoppingSchema.findOneAndDelete({_id: req.params.id})
  .then(items => {
    console.log("succesfully deleted")
    console.log(items)
    res.json(items)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})



//SHOPPING LIST ENDPOINTS

router.get('/list', (req, res) => {
  ShoppingSchema.find(req.query)
  .then(item => {
    console.log("succesfully got shopping list db!")
    console.log(item)
    res.json(item)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})


//get unpurchased items only
router.get('/unpurchased', (req, res) => {
  ShoppingSchema.find({purchased: false})
  .then(items => {
    console.log("These are your unpurchased items")
    console.log(items)
    res.json(items)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

//adding new item
router.post('/list/add', async (req, res) => {
  try {
    const { item, quantity, category, price } = req.body
    const foundSupplier = await SupplierSchema.findOne({ produce: item })
        const newItem = await ShoppingSchema.create({
      item,
      quantity,
      category,
      price,
      supplier: foundSupplier ? foundSupplier.supplierName : "no supplier found"
    });
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

//finding an item by name to update
router.put('/item/:itemId', (req, res) => {
    ShoppingSchema.findOneAndUpdate({item:req.params.itemId},req.body)
    .then(items => {
      console.log("succesfully updated")
      console.log(items)
      res.json(items)
    })
    .catch(err => {
      console.error(err)
      res.send(error)
    })
})

//deleting by item name
router.delete('/item/:itemId', (req,res) => {
  ShoppingSchema.findOneAndDelete({item: req.params.itemId})
  .then(items => {
    console.log("succesfully deleted")
    console.log(items)
    res.json(items)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

//deleting all purchased items
router.delete('/purchased', (req,res) => {
  ShoppingSchema.deleteMany({purchased: true})
  .then(items => {
    console.log("succesfully deleted")
    console.log(items)
    res.json(items)
  })
  .catch(err => {
    console.error(err)
    res.send(error)
  })
})

module.exports = router
