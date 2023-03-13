import { UID } from "../ApiUtility";

const postCreation = {
  key: UID("FMA_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  bean_type: "",
  material_color: "",
  drying: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Mangoes",
};
const createDataSchema = {
  key: UID("FMA_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  storage_mechanism: "",
  material_color: "",
  ph_value: "",
  drying: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Mangoes",
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
  drying: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "edit",
  productType: "Mangoes",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
