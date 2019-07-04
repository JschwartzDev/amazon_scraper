const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardCompleteSchema = new Schema({
  id: String,
  name: String,
  type: String,
  desc: String,
  race: String,
  set_tag: String,
  setcode: String,
  image_url: String,
  image_url_small: String,
  tnt_info: Object,
  amazon_price: String,
  ebay_price: String
});

const CardCompleteModel = mongoose.model("allcard", CardCompleteSchema);
module.exports = CardCompleteModel;
