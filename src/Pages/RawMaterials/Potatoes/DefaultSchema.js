import { UID } from "../ApiUtility";

const createDataSchema = {
  key: UID("FPO_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  storage_mechanism: "",
  material_color: "",
  ph_value: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Potatoes",
};
const postCreation = {
  key: UID("FPO_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  storage_mechanism: "",
  material_color: "",
  ph_value: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Potatoes",
};
const updateDataSchema = {
  key: "",
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  storage_mechanism: "",
  material_color: "",
  ph_value: 0,
  block: "",
  hash: "",
  temp: "",
  row_action: "edit",
  productType: "Potatoes",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
