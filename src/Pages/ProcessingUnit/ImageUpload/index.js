import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import openNotification from "../../notification.js";

const ImageUpload = ({ setProductImage }) => {
  const [file, setFile] = useState();

  const handleChangeFileUpload = async (event) => {
    if (ValidateFileUpload(event)) await handleChange(event);
  };
  const ValidateFileUpload = (event) => {
    var fileInput = document.getElementById("uploadFile");

    var filePath = fileInput.value;
    console.log("FilePath :", filePath);
    // Allowing file type jfif
    var allowedExtensions = /(\.jpg|\.png|\.jpeg\.JPG|\.PNG|\.JPEG)$/i;

    if (!allowedExtensions.exec(filePath)) {
      openNotification(
        "Invalid File",
        "Invalid file type. Please provide JPG, JPEG or pNG file format!!",
        "",
        "error",
        "topRight"
      );
      fileInput.value = "";
      setFile();
      return false;
    } else {
      // Image preview
      return true;
    }
  };
  const handleChange = async (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        var filename = document.getElementById("uploadFile").value;
        var fileExt = filename.split(".").pop();

        await Resizer.imageFileResizer(
          event.target.files[0],
          80,
          100,
          fileExt,
          100,
          0,
          (uri) => {
            console.log(uri);
            //setFile(window.decodeURI(uri));
            setFile(uri);
            setProductImage(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        var fileInput1 = document.getElementById("uploadFile");

        fileInput1.value = "";
        console.log(err);
        openNotification(
          "Error",
          `Error: Oops Issue occured while uploading the file ${err}!!`,
          "",
          "error",
          "topRight"
        );
      }
    }
  };
  return (
    <>
      <div className="row mt-2">
        <div className="col-6" style={{ width: "40%" }}>
          <span style={{ marginRight: "10px" }}>Please Upload</span>
          <input
            type="file"
            accept="image/*"
            id="uploadFile"
            onChange={(event) => {
              handleChangeFileUpload(event);
            }}
            style={{ width: "40%", fontFamily: "cursive" }}
          />
        </div>
      </div>

      <div className="row mt-2" style={{ height: "250px" }}>
        <div className="col-6">{file && <img src={file} alt="" />}</div>
      </div>
    </>
  );
};

export { ImageUpload };
