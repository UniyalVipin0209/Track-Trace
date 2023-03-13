const PrerequistiesConfigAll = () => {
  let rawMaterials = ["Mangoes", "Apples", "Honey"];
  // let rawMaterials = ["Mangoes"];
  let config = [];
  rawMaterials.map((ele, idx) => config.push(PrerequistiesConfig(ele, idx)));
  console.log("Config :", config);
  return config;
};

const PrerequistiesConfig = (categoryName, idx) => {
  const parameter = {
    args: categoryName,
    fcn: "getProduct",
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  let URL = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let token = process.env.REACT_APP_TOKEN;
  const CONFIG = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
    params: {
      args: parameter.args,
      fcn: parameter.fcn,
      peer: parameter,
    },
  };
  const IDX = idx;
  return { IDX, URL, CONFIG };
};

export { PrerequistiesConfigAll };
