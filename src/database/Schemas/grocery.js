const mongoose = require("mongoose");
const GrocerySchema = mongoose.Schema({
  item: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  quantity: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("groceries", GrocerySchema);
