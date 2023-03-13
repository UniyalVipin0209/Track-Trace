import { UID } from "../ApiUtility";

const createDataSchema = {
  key: UID("FMI_"),
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  animal_type: "",
  material_color: "",
  ph_value: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "Updated",
  productType: "Milk",
};

const postCreation = {
  key: UID("FMI_"),
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
  productType: "Milk",
};

const updateDataSchema = {
  key: "",
  material_name: "",
  farmer_name: "",
  quantity: "",
  exp_date: "",
  animal_type: "",
  material_color: "",
  ph_value: "",
  block: "",
  hash: "",
  temp: "",
  row_action: "edit",
  productType: "Milk",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
