const Notification = ({ informationMessage }) => {
  if (informationMessage.message === null) {
    return null;
  }

  const { message, type } = informationMessage;
  console.log(message);
  console.log(type);

  const messageStyle = {
    color: type === "error" ? "red" : "green",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "lightgrey",
    border: `2px solid ${type === "error" ? "red" : "green"}`,
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
