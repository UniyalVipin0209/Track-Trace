import QRCode from "qrcode";

const GenerateQRCode = async (evnt) => {
    evnt.preventDefault();
    console.log("Create QR Code");

    setqrInputObject(tempObject);
    const response = await QRCode.toDataURL("Kartikey Kashyap");
    setQrCodeImg(response);
    console.log("typeof response ::", typeof response);
  };