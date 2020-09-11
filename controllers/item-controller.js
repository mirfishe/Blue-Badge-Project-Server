const router = require('express').Router();
const Item = require('../db').import('../models/item');
const List = require('../db').import('../models/list');
const validateSession = require('../middleware/validate-session');

router.post("/add/:id", validateSession, (req, res) => {
    List.findOne({ where: { id: req.params.id } })
        .then(list => {
            Item.create({
                itemName: req.body.item.itemName,
                itemURL: req.body.item.itemURL,
                imageURL: req.body.item.imageURL,
                sortID: req.body.item.sortID,
                listID: list.id,
            })
        })
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(500).json({ error: err }))
});

router.delete("/delete/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id, userID: req.user.id } };
    Item.destroy(query)
        .then(() => res.status(200).json(list))
        .catch((err) => res.status(500).json({ error: err }))
});

module.exports = router;
