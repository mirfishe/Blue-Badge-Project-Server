const router = require('express').Router();
const Item = require('../db').import('../models/item');
const List = require('../db').import('../models/list');
const validateSession = require('../middleware/validate-session');

/***************************
 ****** Add List Item ******
 ***************************/
router.post("/add/:id", validateSession, (req, res) => {

    Item.max('sortID', {where: { listId: req.params.id }})
    .then(maxSortID => {
        console.log("maxSortID", maxSortID);
        if (isNaN(maxSortID)) {
            return 1;
        } else {
            return maxSortID + 1;
        };
      })
    .then(newSortID => {
        List.findOne({ where: { id: req.params.id } })
    .then(list => {
        Item.create({
            itemName: req.body.item.itemName,
            itemURL: req.body.item.itemURL,
            imageURL: req.body.item.imageURL,
            sortID: newSortID,
            listId: list.id,
        })
    })
    })
    .then((item) => res.status(200).json({listItem: item, message: "List item added."}))
    .catch((err) => res.status(500).json({ error: err }))
});

/***************************
 **** Delete List Item *****
 ***************************/
router.delete("/delete/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id } };
    Item.destroy(query)
        .then(() => res.status(200).send("List item removed."))
        .catch((err) => res.status(500).json({ error: err }))
});

module.exports = router;
