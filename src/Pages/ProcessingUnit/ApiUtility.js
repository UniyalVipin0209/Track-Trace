const PrerequistiesConfigure = (categoryName) => {
  const parameter = {
    args: "tes1",
  };
  // let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let endPoint = "http://20.96.181.1:5000/allRawMaterialWithFarmerName";
  let token = process.env.REACT_APP_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      args: parameter.args,
    },
  };
  return { endPoint, config };
};

const PrerequistiesInsUpd = (parameter) => {
  // let endPoint = process.env.REACT_APP_ENDPOINT_PROCESSPRODUCT;
  let endPoint = "http://20.96.181.1:5000/productProcessing";
  let token = process.env.REACT_APP_TOKEN;

  const config = {
    method: parameter.actiontype,
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const data = {
    peers: parameter.defaultpeers,
    fcn: "processingProduct",
    input: parameter.input,
  };

  return { endPoint, data, config };
};

const PrerequistiesConfigCarton = (distributionParam) => {
  const parameter = {
    args: distributionParam,
    fcn: distributionParam,
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  //let endPoint = process.env.REACT_APP_ENDPOINT_CARTONLIST;
  let endPoint =
    "http://20.96.181.1:5000/channels/mychannel/chaincodes/supplychain";
  console.log("endpoint -", endPoint);
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
  console.log("Params :", config.params);
  return { endPoint, config };
};

export {
  PrerequistiesInsUpd,
  PrerequistiesConfigure,
  PrerequistiesConfigCarton,
};
