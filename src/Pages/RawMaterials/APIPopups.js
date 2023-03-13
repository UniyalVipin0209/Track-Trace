import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ConfirmPopUpDelEdit = async (key, screenTitle, actionType) => {
  await Swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      Swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      Swal("Your imaginary file is safe!");
    }
  });
};

const ApiInsUpdConfirmation = async (modeMsg, screenTitle) => {
  await Swal.fire({
    title: `Data ${modeMsg}  Successfully!!`,
    icon: "success",
    html: `Data ${modeMsg}  Successfully for ${screenTitle}!! <br/>
            `,
  }).then((result) => {
    //console.log("ApiInsUpdConfirmation ::", result.isConfirmed);
    return true;
  });
  return false;
};

const ApiDeleteConfirmation = async (modeMsg, screenTitle) => {
  await Swal.fire({
    title: `Data ${modeMsg}  Successfully!!`,
    icon: "success",
    timer: 1500,
    html: `Data ${modeMsg}  Successfully for ${screenTitle}.`,
  }).then((result) => {
    return true;
  });
  return false;
};

const ApiInsUpdDelExceptions = async (mode, modeMsg, screenTitle) => {
  let modeMsgErr = "";
  modeMsgErr =
    mode === "add" ? "Inserting" : mode === "delete" ? "Deleting" : "Updating";
  await Swal.fire({
    title: `Error: Issue in ${modeMsgErr}  Successfully!!`,
    icon: "error",
    html: `Issue in ${modeMsg} data for ${screenTitle}.`,
  }).then((result) => {
    if (result.isConfirmed) return true;
    return false;
  });
  return false;
};

export {
  ConfirmPopUpDelEdit,
  ApiInsUpdConfirmation,
  ApiInsUpdDelExceptions,
  ApiDeleteConfirmation,
};
