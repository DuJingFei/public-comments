import { combineReducers } from "redux";
import products from "./products";
import shops from "./shops";
import orders from "./orders";
import comments from "./comments";

const entities = combineReducers({
  products,
  shops,
  orders,
  comments
})

export default entities

