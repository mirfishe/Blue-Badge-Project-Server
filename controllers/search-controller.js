const router = require('express').Router();
const fetch = require("node-fetch");

/*****************************************
 *** Get IGDB Results - No Pagination ****
 *****************************************/
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
    // const search = "search \"LEGO\";";
    const search = "search \"" + searchTerms + "\";";
    // console.log("search", search);
    // const searchFields = "fields *;";
    const searchFields = "fields id,alternative_name,name,game.*,game.age_ratings.*,game.alternative_names.*,game.artworks.*,game.bundles.*,game.collection.*,game.cover.*,game.dlcs.*,game.expansions.*,game.external_games.*,game.franchise.*,game.franchises.*,game.game_engines.*,game.game_modes.*,game.genres.*,game.involved_companies.*,game.keywords.*,game.multiplayer_modes.*,game.parent_game.*,game.platforms.*,game.player_perspectives.*,game.release_dates.*,game.screenshots.*,game.similar_games.*,game.standalone_expansions.*,game.themes.*,game.time_to_beat.*,game.version_parent.*,game.videos.*,game.websites.*;";
    // The default limit is 10. The maximum value you can set for limit is 500.
    const searchLimit = "";
    // const searchLimit = "limit 50;";
    // const searchLimit = "limit 100;";
    // const searchLimit = "limit 200;";
    // const searchLimit = "limit " + limit + ";";
    // The maximum value you can set for offset is 5000.
    const searchOffset = "";
    // const searchOffset = "offset 10;";
    // const searchOffset = "offset " +  offset + ";";
    const whereClause = "";
    // const whereClause = "where game = 28540;"
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = searchURL;
    const body = search + " " + searchFields + " " + whereClause + " " + searchLimit + " " + searchOffset;

    // console.log("search POST baseURL", baseURL);
    // console.log("search POST body", body);

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

/*****************************************
 *** Get IGDB Results - Pagination ****
 *****************************************/
router.get("/:searchTerms/:limit/:offset", (req, res) => {

    const apiKey = process.env.API_KEY;

    const headers = {
        "Content-Type": "application/json",
        'user-key': apiKey
    };

    const searchTerms = req.params.searchTerms;
    const limit = req.params.limit !== undefined ? req.params.limit : 10;
    const offset = req.params.offset !== undefined ? req.params.offset : 0;

    // const testURL = "https://rickandmortyapi.com/api/"
    // const baseURL = testURL;


    const searchURL = "https://api-v3.igdb.com/search";
    // const searchBody = "search \"Halo\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const searchBody = "search \"LEGO\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const search = "search \"LEGO\";";
    const search = "search \"" + searchTerms + "\";";
    // console.log("search", search);
    // const searchFields = "fields *;";
    const searchFields = "fields id,alternative_name,name,game.*,game.age_ratings.*,game.alternative_names.*,game.artworks.*,game.bundles.*,game.collection.*,game.cover.*,game.dlcs.*,game.expansions.*,game.external_games.*,game.franchise.*,game.franchises.*,game.game_engines.*,game.game_modes.*,game.genres.*,game.involved_companies.*,game.keywords.*,game.multiplayer_modes.*,game.parent_game.*,game.platforms.*,game.player_perspectives.*,game.release_dates.*,game.screenshots.*,game.similar_games.*,game.standalone_expansions.*,game.themes.*,game.time_to_beat.*,game.version_parent.*,game.videos.*,game.websites.*;";
    // The default limit is 10. The maximum value you can set for limit is 500.
    // const searchLimit = "";
    // const searchLimit = "limit 50;";
    // const searchLimit = "limit 100;";
    // const searchLimit = "limit 200;";
    const searchLimit = "limit " + limit + ";";
    // The maximum value you can set for offset is 5000.
    // const searchOffset = "";
    // const searchOffset = "offset 10;";
    const searchOffset = "offset " +  offset + ";";
    const whereClause = "";
    // const whereClause = "where game = 28540;"
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = searchURL;
    const body = search + " " + searchFields + " " + whereClause + " " + searchLimit + " " + searchOffset;

    // console.log("search POST baseURL", baseURL);
    // console.log("search POST body", body);

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

/*********************
 *** Search Games ****
 ********************/
router.post("/", (req, res) => {

    const apiKey = process.env.API_KEY;

    const headers = {
        "Content-Type": "application/json",
        'user-key': apiKey
    };

    const searchTerms = req.body.searchCriteria.searchTerms;
    const limit = req.body.searchCriteria.limit !== undefined ? req.body.searchCriteria.limit : 10;
    const offset = req.body.searchCriteria.offset !== undefined ? req.body.searchCriteria.offset : 0;

    const searchURL = "https://api-v3.igdb.com/search";
    // const searchBody = "search \"Halo\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const searchBody = "search \"LEGO\"; fields alternative_name,character,checksum,collection,company,description,game,name,person,platform,popularity,published_at,test_dummy,theme;";
    // const search = "search \"LEGO\";"
    const search = "search \"" + searchTerms + "\";"
    // console.log("search", search);
    // const searchFields = "fields *;";
    const searchFields = "fields id,alternative_name,name,game.*,game.age_ratings.*,game.alternative_names.*,game.artworks.*,game.bundles.*,game.collection.*,game.cover.*,game.dlcs.*,game.expansions.*,game.external_games.*,game.franchise.*,game.franchises.*,game.game_engines.*,game.game_modes.*,game.genres.*,game.involved_companies.*,game.keywords.*,game.multiplayer_modes.*,game.parent_game.*,game.platforms.*,game.player_perspectives.*,game.release_dates.*,game.screenshots.*,game.similar_games.*,game.standalone_expansions.*,game.themes.*,game.time_to_beat.*,game.version_parent.*,game.videos.*,game.websites.*;";
    // The default limit is 10. The maximum value you can set for limit is 500.
    // const searchLimit = "limit 50;";
    // const searchLimit = "limit 100;";
    // const searchLimit = "limit 200;";
    const searchLimit = "limit " + limit + ";";
    // The maximum value you can set for offset is 5000.
    // const searchOffset = "";
    // const searchOffset = "offset 10;";
    const searchOffset = "offset " +  offset + ";";
    const whereClause = ""
    // const whereClause = "where game = 28540;"
    // const whereClause = "where category = 0;" // Doesn't work?
    const baseURL = searchURL;
    const body = search + " " + searchFields + " " + whereClause + " " + searchLimit + " " + searchOffset;

    // console.log("search POST baseURL", baseURL);
    // console.log("search POST body", body);

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