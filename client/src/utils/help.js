import moment from "moment";
export const getRecevierImage = (user_Id, convo_user) => {
  return convo_user[0]._id === user_Id
    ? convo_user[1].picture
    : convo_user[0].picture;
};
export const getRecevierName = (user_Id, convo_user) => {
  return convo_user[0]._id === user_Id
    ? convo_user[1].name
    : convo_user[0].name;
};
export const getRecevierId = (user_Id, convo_user) => {
  return convo_user[0]._id === user_Id
    ? convo_user[1]._id
    : convo_user[0]._id;
};
export const dateHandler = (date) => {
  let now = moment();
  let dateMoment = moment(date);
  let time = dateMoment.fromNow(true);
  let dateByHourAndMinute = dateMoment.format("HH:mm");
  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      return now.subtract(Number(days), "days").format("dddd");
    }else{
      return dateMoment.format("DD/MM/YYYY")
    }
  };
  if (time === "a few seconds") return "Now";
  if (time.search("minute") !== -1) {
    let mins = time.split("")[0];
    if (mins === "a") return "1 min";
    return `${mins} min`;
  }
  if (time.search("hour") !== -1) {
    return dateByHourAndMinute;
  }
  if (time.search("a day") !== -1) {
    return "Yesterday";
  }
  if (time.search("days") !== -1) {
    return getDay()
  }
  return time
};
