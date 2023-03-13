const createDataSchema = {
  key: `${"FPO_" + Math.floor(new Date().getTime() + Math.random(0, 500))}`,
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

export { createDataSchema };
//Api Config
