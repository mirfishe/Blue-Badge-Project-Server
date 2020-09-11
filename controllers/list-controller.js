const router = require('express').Router();
const User = require('../db').import('../models/user');
const List = require('../db').import('../models/list');
const Item = require('../db').import('../models/item');
const validateSession = require('../middleware/validate-session');

/********************
 ***** Get List *****
 *******************/
router.get("/", (req, res) => {
  List.findAll()
    .then((list) => res.status(200).json(list))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

/*************************
 ***** Get List By ID*****
 *************************/
router.get("/:id", (req, res) => {
  List.findOne({ where: { listName: req.params.list.id } })
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

/*******************
 *** Create List ****
 ********************/
router.post("/add", validateSession, (req, res) => {
    // const newList = {
    //   listName: req.body.list.title,
    //   userId: req.user.id
    // };
    // List.create(newList)
    User.findOne({ where: { id: req.user.id} })
    .then(user => {
        List.create({
          listName: req.body.list.title,
          userId: user.id
        })
    })
      .then((list) => res.status(200).json(list))
      .catch((err) => res.status(500).json({ error: err }));
  });

/***************************
 ******* Update List *******
 ***************************/
router.put("/update/:id", validateSession, (req, res) => {
  const updateList = {
    listName: req.body.list.title,
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
  //const query = { where: { id: req.params.id, userID: req.user.id } };

  // https://stackoverflow.com/questions/48376479/executing-multiple-sequelize-js-model-query-methods-with-promises-node
  const deleteList = List.destroy({
    where: { id: req.params.id, userID: req.user.id },
  });

  const deleteListItems = Item.destroy({ where: { listID: req.params.id } });

  Promise.all([deleteList, deleteListItems])
    // .then(responses => {
    //     console.log('**********COMPLETE RESULTS****************');
    //     console.log(responses[0]); // deleteList
    //     console.log(responses[1]); // deleteListItems
    // })
    .then(() => res.status(200).send("List Deleted"))
    .catch((err) => res.status(500).json({ error: err }));
  // .catch(err => {
  //     console.log('**********ERROR RESULT****************');
  //     console.log(err);
  // });

  // List.destroy(query)
  //   .then(() => res.status(200).send("List Deleted"))
  //   .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
