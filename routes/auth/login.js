const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");

router.get('/', (req,res) => {
  console.log('login is working')
  res.json(200);
})



module.exports = router;