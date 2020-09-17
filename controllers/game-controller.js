const router = require('express').Router();
const fetch = require("node-fetch");

/*******************************
 *** Game Information BY ID ****
 ******************************/
router.get("/:id", (req, res) => {

    const apiKey = process.env.API_KEY;

    const headers = {
        "Content-Type": "application/json",
        'user-key': apiKey
    };

    const gameID = req.params.id;

    const gameURL = "https://api-v3.igdb.com/games";

    // const gameFields = "";
    // const gameFields = "fields *;";
    const gameFields = "fields id,alternative_names.*,name,age_ratings.*,alternative_names.*,artworks.*,bundles.*,collection.*,cover.*,dlcs.*,expansions.*,external_games.*,franchise.*,franchises.*,game_engines.*,game_modes.*,genres.*,involved_companies.*,keywords.*,multiplayer_modes.*,parent_game.*,platforms.*,player_perspectives.*,release_dates.*,screenshots.*,similar_games.*,standalone_expansions.*,themes.*,time_to_beat.*,version_parent.*,videos.*,websites.*;";
    // const whereClause = ""
    // const whereClause = "where id = 28540;"
    const whereClause = "where id = " + gameID + ";";
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = gameURL;
    const body = gameFields + " " + whereClause;

    console.log("search POST baseURL", baseURL);
    console.log("search POST body", body);

    // https://hackersandslackers.com/making-api-requests-with-nodejs/
    fetch(baseURL, {
            method: "POST",
            headers:  headers,
            body: body
            })
    .then(result => result.json())
    .then(result => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));

  });

  module.exports = router;