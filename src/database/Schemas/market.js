const mongoose = require("mongoose");
const MarketSchema = new mongoose.Schema({
  item: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  location: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  id: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});
module.exports = mongoose.model("market", MarketSchema);
