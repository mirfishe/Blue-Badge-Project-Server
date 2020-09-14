const router = require("express").Router();
const User = require("../db").import("../models/user");
const List = require("../db").import("../models/list");
const Item = require("../db").import("../models/item");
const validateSession = require("../middleware/validate-session");

/******************************
 ***** Get Lists By UserID *****
 ******************************/
router.get("/user/:id", validateSession, (req, res) => {
  List.findAll({ where: { userId: req.user.id } })
    .then((list) => res.status(200).json(list))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

/**************************
 ***** Get List By ID *****
 **************************/
router.get("/:listID", validateSession, (req, res) => {
  List.findOne({ where: { id: req.params.listID, userId: req.user.id } })
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
  User.findOne({ where: { id: req.user.id } })
    .then((user) => {
      List.create({
        listName: req.body.list.title,
        userId: user.id,
      });
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
  const query = { where: { id: req.params.id, userId: req.user.id } };

  List.update(updateList, query)
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

/***************************
 ******* Delete List *******
 ***************************/
router.delete("/delete/:id", validateSession, (req, res) => {

List.destroy({
    where: { id: req.params.id, userId: req.user.id },
  })
    .then(() => res.status(200).send("List deleted."))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
