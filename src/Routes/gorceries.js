const { Router, request } = require("express");
const router = Router();
const GrocList = require("../database/Schemas/grocery");

router.get("", async (request, response, next) => {
  //this is also a middleware and we can chain their execution by calling next if there is other middleware to execute after this middleware
  const grocList = await GrocList.find();
  response.send(grocList);
});

router.get("/:item", async (req, res) => {
  // console.log(req.params.item);
  const itemToGet = req.params.item;
  const foundItem = await GrocList.findOne({ item: itemToGet });
  if (foundItem) {
    console.log(foundItem);
    res.send(foundItem);
  } else {
    console.log("item not found");
    res.sendStatus(404);
  }

  // const item = grocList.find((groc) => groc.item === req.params.item);
  // res.send(item);
});

router.post("", async (request, response) => {
  const { item, quantity } = request.body;
  const newItem = await GrocList.create({ item, quantity });
  // grocList.push(request.body);
  response.sendStatus(201);
});

router.get("/shopping/cart", (req, res) => {
  if (req.session.cart) {
    res.send(req.session.cart.items);
  } else {
    res.send("you have no data");
  }
});

const Session = {
  cokkie: "abcsdef",
  cart: {
    items: [
      { item: "grapes", quantity: 2 },
      { item: "banana", quantity: 3 },
    ],
  },
};

router.post("/shopping/cart/item", (req, res) => {
  const data = req.body;
  const { cart } = req.session;
  if (cart) {
    const { items } = cart;
    items.push(data);
    request.session.cart.items = items;
  } else {
    req.session.cart = {
      items: [data],
    };
  }

  res.sendStatus(201);
});

module.exports = router;
