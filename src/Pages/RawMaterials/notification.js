import { notification } from "antd";
import "antd/dist/antd.css";

const openNotification = (_notificationTitle, _desc, msg, _type, placement) => {
  notification.open({
    message: _notificationTitle,
    description: _desc,
    type: _type,
    onClick: () => {
      console.log(msg);
    },
    placement,
  });
};

export default openNotification;
