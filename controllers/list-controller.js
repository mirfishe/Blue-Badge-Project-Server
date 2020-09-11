const router = require('express').Router();
const List = require('../db').import('../models/list');
const validateSession = require('../middleware/validate-session');


/*******************
 *** Create Entry ****
 ********************/
router.post("/add", validateSession, (req, res) => {
    const newList = {
      listName: req.body.list.title,
      userID: req.user.id,
    };
    List.create(newList)
      .then((list) => res.status(200).json(list))
      .catch((err) => res.status(500).json({ error: err }));
  });


/***************************
 ******* Update List *******
 ***************************/
router.put("/update/:id", validateSession, (req, res) => {
    const updateList = {
      listName: req.body.list.title
    };
    const query = { where: { id: req.params.id, userID: req.user.id } };
  
    List.update(updateList, query)
      .then((list) => res.status(200).json(list))
      .catch((err) => res.status(500).json({ error: err }));
  });

/***************************
 ******* Delete List *******
 ***************************/
router.delete("/delete/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id, userID: req.user.id } };
  
    List.destroy(query)
      .then(() => res.status(200).send("List Deleted"))
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  module.exports = router;