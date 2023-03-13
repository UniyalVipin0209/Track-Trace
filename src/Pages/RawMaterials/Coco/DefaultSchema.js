import { UID } from "../ApiUtility";

const createDataSchema = {
  key: UID("FCO_"),
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
  productType: "Coco",
};

const postCreation = {
  key: UID("FCO_"),
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
  productType: "Coco",
};

const updateDataSchema = {
  key: "",
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
  row_action: "edit",
  productType: "Coco",
};

export { createDataSchema, updateDataSchema, postCreation };
//Api Config
