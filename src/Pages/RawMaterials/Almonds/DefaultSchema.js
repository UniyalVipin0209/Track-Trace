import { UID } from "../ApiUtility";

const createDataSchema = {
  key: UID("FAL_"),
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
  productType: "Almonds",
};

const postCreation = {
  key: UID("FAL_"),
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
  productType: "Almonds",
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
  productType: "Almonds",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
