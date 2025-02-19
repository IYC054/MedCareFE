import axios from 'axios';
const RateDoctor = async (description, rate,doctorId,userid) => {
    try {
        const res = await axios.post(
            `http://localhost:8080/api/rates`, {
            description: description,
            rate: rate,
            "doctor_id": {
                "id": doctorId
            },
            "patient_id": {
                "id": userid
            }
        }
        );
        if (res.data) {
           return res.data;
        } else {
            alert("Thanh toán thất bại. Vui lòng thử lại.");
        }
    } catch (error) {
        console.log(`${error.res.data}`);
    }
};
export default RateDoctor;