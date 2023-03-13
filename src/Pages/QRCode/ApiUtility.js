import shortHash from "shorthash2";

const PrerequistiesConfig = (productProcessing) => {
  const parameter = {
    args: productProcessing,
    fcn: "getProductProcessing",
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

const PrerequistiesDeleteNotApplicable = (parameter) => {
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
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
    fcn: parameter.fcn,
    args: parameter.args,
  };

  return { endPoint, data, config };
};

const PrerequistiesInsUpd = (parameter) => {
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
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
    fcn: parameter.fcn,
    args: parameter.args,
  };
  console.log(" data ", data);
  return { endPoint, data, config };
};

const QRCodeGenerate = (tempObject) => {
  var strBuilder = [];
  for (var key in tempObject) {
    if (tempObject.hasOwnProperty(key)) {
      if (key === "Id") {
        strBuilder.push(`Farmer Id is ${tempObject[key]} \n`);
      }
      if (key === "FarmerName") {
        strBuilder.push(`Farmer Name: ${tempObject[key]} \n`);
      }
      if (key === "RawMaterial") {
        strBuilder.push(`RawMaterial used: ${tempObject[key]} \n`);
      }
    }
  }
};

export { PrerequistiesConfig, PrerequistiesInsUpd };
