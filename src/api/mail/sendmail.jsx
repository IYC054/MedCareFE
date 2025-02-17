import axios from "axios";

const SendMail = async (to, subject, body) => {
  try {
    await axios
      .post(
        "http://localhost:8080/api/mail/send",
        {
          to: "vonghung849@gmail.com",
          subject: "Hóa Đơn Thanh Toán",
          htmlContent: body,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((respone) => {
        console.log("Email sent successfully:", respone.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
export default SendMail;