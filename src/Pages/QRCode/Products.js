import React, { useState } from "react";

import MakeQRCode from "qrcode";

const Products = ({ key, data, UpdateStatus }) => {
  const [qrInputObject, setqrInputObject] = useState([]);
  const [qrCodeImg, setQrCodeImg] = useState();

  const generateQRCode = async (event, inputParams) => {
    event.preventDefault();
    const response = await MakeQRCode.toDataURL(inputParams);
    console.log("response 1 :", response);
    // setQrCodeImg(response);

    //let prevObj= data[key].item

    //

    //console.log("CreateQRCode :", qrCodeImg);
  };

  console.log("Product ::", data.action);
  return (
    <></>
    // <div key={key} className="product-box mt-3">
    //   <div className="row">
    //     <div className="col-md-2">
    //       <img
    //         src={data.productImg}
    //         style={{ width: "7rem" }}
    //         alt={data.productName}
    //       />
    //     </div>
    //     <div className="col-md-3">
    //       <div className=" p-box-title mt-5">
    //         <div className="p-name">{data.productName}</div>
    //         <div className="p-units">{data.productUnits}</div>
    //       </div>
    //     </div>
    //     <div className="col-md-2">
    //       <div className="pid mt-5">ID: {data.productId}</div>
    //     </div>
    //     <div className="col-md-2">
    //       <div className="qr-status mt-5">
    //         {/* CREATE_QRCODE */}
    //         {data.action === "CREATED" ? (
    //           <button
    //             type="button"
    //             onClick={(e) => {
    //               UpdateStatus(e, data.productId);
    //               generateQRCode(e, data.productId);
    //             }}
    //             className="btn btn-link qr-status"
    //             style={{ textDecoration: "none" }}
    //           >
    //             Create QR Code
    //           </button>
    //         ) : (
    //           <strong style={{ padding: "1px 6px" }}>Created</strong>
    //         )}
    //       </div>
    //     </div>
    //     <div className="col-md-3">
    //       {data.action === "CREATE_QRCODE"
    //         ? ""
    //         : qrCodeImg && (
    //             <div className="text-center">
    //               <img
    //                 src={qrCodeImg}
    //                 style={{ width: "6rem" }}
    //                 alt={data.productName}
    //               />
    //             </div>
    //           )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Products;
