import { UID } from "../ApiUtility";

const createDataSchema = {
  key: UID("FAP_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  size: "",
  material_color: "",
  ph_value: 0,
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Apples",
};

const postCreation = {
  key: UID("FAP_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  size: "",
  material_color: "",
  ph_value: 0,
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Apples",
};

const updateDataSchema = {
  key: "",
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  size: "",
  material_color: "",
  ph_value: 0,
  block: "",
  hash: "",
  temp: "",
  row_action: "edit",
  productType: "Apples",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
