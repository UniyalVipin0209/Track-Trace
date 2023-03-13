const createDataSchema = {
  key: `${"FAL_" + Math.floor(new Date().getTime() + Math.random(0, 500))}`,
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

export { createDataSchema };
//Api Config
