const { Router } = require("express");
const router = Router();
const marketList = require("../database/Schemas/market");

router.get("", async (req, res) => {
  // res.cookie("visited", true, {
  //   maxAge: 10000,
  // });
  // const { id } = req.query;
  // const parsedId = parseInt(id);
  // if (!isNaN(parsedId)) {
  //   const filteredMarket = marketList.find((mark) => mark.id === parsedId);
  //   res.send(filteredMarket);
  // } else {
  //   res.send(marketList);
  // }
  const markets = await marketList.find();
  res.send(markets);
});

router.get("/:location", async (req, res) => {
  const loc = req.params.location;
  const foundItem = await marketList.findOne({ location: loc });
  if (foundItem) {
    res.send(foundItem);
  } else {
    res.sendStatus(404);
  }
});

router.post("", async (req, res) => {
  const { item, location, id } = req.body;
  const newItem = await marketList.create({ item, location, id });
  res.sendStatus(201);
});

module.exports = router;
