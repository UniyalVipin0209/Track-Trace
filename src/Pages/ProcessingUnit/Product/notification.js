import { notification } from "antd";
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