const PrerequistiesConfig = (categoryName) => {
  const parameter = {
    args: categoryName,
    fcn: "getProduct",
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let token = process.env.REACT_APP_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      args: parameter.args,
      fcn: parameter.fcn,
      peer: parameter,
    },
  };
  return { endPoint, config };
};

const PrerequistiesConfigSummary = (categoryName) => {
  const parameter = {
    args: categoryName,
  };
  let endPointSummary = "http://20.96.181.1:5000/totalquantiity";
  let token = process.env.REACT_APP_TOKEN;
  const configSummary = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      args: parameter.args,
    },
  };

  console.log("config1-", categoryName, endPointSummary);
  return { endPointSummary, configSummary, token };
};

export { PrerequistiesConfig, PrerequistiesConfigSummary };
