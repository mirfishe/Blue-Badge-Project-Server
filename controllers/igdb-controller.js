const router = require('express').Router();
const fetch = require("node-fetch");

/*******************
 *** Get IGDB Results ****
 ********************/
router.get("/:searchTerms", (req, res) => {

    const apiKey = process.env.API_KEY;

    const headers = {
        "Content-Type": "application/json",
        'user-key': apiKey
    };

    const searchTerms = req.params.searchTerms;

    // const testURL = "https://rickandmortyapi.com/api/"
    // const baseURL = testURL;


    const searchURL = "https://api-v3.igdb.com/search";
    // const searchBody = "search \"Halo\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const searchBody = "search \"LEGO\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const search = "search \"LEGO\";"
    const search = "search \"" + searchTerms + "\";"
    // console.log("search", search);
    // const searchFields = "fields *;";
    const searchFields = "fields id,alternative_name,name,game.*,game.age_ratings.*,game.alternative_names.*,game.artworks.*,game.bundles.*,game.collection.*,game.cover.*,game.dlcs.*,game.expansions.*,game.external_games.*,game.franchise.*,game.franchises.*,game.game_engines.*,game.game_modes.*,game.genres.*,game.involved_companies.*,game.keywords.*,game.multiplayer_modes.*,game.parent_game.*,game.platforms.*,game.player_perspectives.*,game.release_dates.*,game.screenshots.*,game.similar_games.*,game.standalone_expansions.*,game.themes.*,game.time_to_beat.*,game.version_parent.*,game.videos.*,game.websites.*;";
    // const searchLimit = "limit 50;";
    // const searchLimit = "limit 100;";
    const searchLimit = "limit 200;";
    const searchOffset = "";
    // const searchOffset = "offset 10;";
    const whereClause = ""
    // const whereClause = "where game = 28540;"
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = searchURL;
    const body = search + " " + searchFields + " " + whereClause + " " + searchLimit + " " + searchOffset;


    // https://hackersandslackers.com/making-api-requests-with-nodejs/
    fetch(baseURL, {
        method: "POST",
        headers:  headers, // {
        //     'Content-Type': 'application/json',
        //     'user-key': apiKey
        // },
        body: body
        })
    .then(result => result.json())
    .then(result => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));

  });

/*******************
 *** Search Games ****
 ********************/
router.post("/", (req, res) => {

    const apiKey = process.env.API_KEY;

    const headers = {
        "Content-Type": "application/json",
        'user-key': apiKey
    };

    const searchTerms = req.body.searchCriteria.searchTerms;

    const searchURL = "https://api-v3.igdb.com/search";
    // const searchBody = "search \"Halo\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const searchBody = "search \"LEGO\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const search = "search \"LEGO\";"
    const search = "search \"" + searchTerms + "\";"
    // console.log("search", search);
    // const searchFields = "fields *;";
    const searchFields = "fields id,alternative_name,name,game.*,game.age_ratings.*,game.alternative_names.*,game.artworks.*,game.bundles.*,game.collection.*,game.cover.*,game.dlcs.*,game.expansions.*,game.external_games.*,game.franchise.*,game.franchises.*,game.game_engines.*,game.game_modes.*,game.genres.*,game.involved_companies.*,game.keywords.*,game.multiplayer_modes.*,game.parent_game.*,game.platforms.*,game.player_perspectives.*,game.release_dates.*,game.screenshots.*,game.similar_games.*,game.standalone_expansions.*,game.themes.*,game.time_to_beat.*,game.version_parent.*,game.videos.*,game.websites.*;";
    // const searchLimit = "limit 50;";
    // const searchLimit = "limit 100;";
    const searchLimit = "limit 200;";
    const searchOffset = "";
    // const searchOffset = "offset 10;";
    const whereClause = ""
    // const whereClause = "where game = 28540;"
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = searchURL;
    const body = search + " " + searchFields + " " + whereClause + " " + searchLimit + " " + searchOffset;

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