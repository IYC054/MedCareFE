import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateApp(props) {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [shift, setShift] = useState('');
    const [credits, setCredits] = useState(0); // Bắt đầu từ 0 đồng

    const specialties = ["Cardiology", "Neurology", "Orthopedics"];
    const doctors = [
        { id: 1, name: "Dr. John", specialty: "Cardiology", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
        { id: 2, name: "Dr. Jane", specialty: "Neurology", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
        { id: 3, name: "Dr. Smith", specialty: "Orthopedics", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
    ];

    const handleSpecialtyChange = (e) => {
        const specialty = e.target.value;
        setSelectedSpecialty(specialty);
        const filtered = doctors.filter((doctor) => doctor.specialty === specialty);
        setFilteredDoctors(filtered);
        setSelectedDoctor(null);
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        const doctor = doctors.find((doc) => doc.id === parseInt(doctorId, 10));
        setSelectedDoctor(doctor);
    };

    const handleShiftSelection = (selectedShift) => {
        setShift(selectedShift);
    };

    const handleSliderChange = (event) => {
        let newCredits = event.target.value * 50000; // max 5 triệu = 100 * 50000
        if (newCredits > 5000000) newCredits = 5000000; // Giới hạn ở 5 triệu
        setCredits(newCredits);
    };

    const handleChange = (e) => {
        let rawValue = e.target.value.replace(/[^\d]/g, ''); // Loại bỏ tất cả ký tự không phải số
        if (rawValue === '') rawValue = '0'; // Trường hợp nhập rỗng
        let numericValue = parseInt(rawValue, 10);

        if (numericValue < 0) numericValue = 0; // Không cho giá trị âm
        if (numericValue > 5000000) numericValue = 5000000; // Giới hạn ở 5 triệu

        setCredits(numericValue); // Cập nhật giá trị
    };
    return (
        <div className="max-h-full pb-3 flex max-w-screen" id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <div className="mt-5">
                    <div className="step-pane active max-w-screen flex items-center justify-center">
                        <form className="space-y-4 w-fit sm:px-96">
                            <div>
                                <h3 className="text-xl font-semibold text-[#da624a]">Room Info</h3>
                            </div>
                            <div>
                                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                                    Choose a Specialty
                                </label>
                                <select
                                    id="specialty"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    value={selectedSpecialty}
                                    onChange={handleSpecialtyChange}
                                >
                                    <option value="">Select a Specialty</option>
                                    {specialties.map((specialty) => (
                                        <option key={specialty} value={specialty}>
                                            {specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                                    Choose a Doctor
                                </label>
                                <select
                                    id="doctor"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    value={selectedDoctor ? selectedDoctor.id : ''}
                                    onChange={handleDoctorChange}
                                    disabled={!selectedSpecialty}
                                >
                                    <option value="">Select a Doctor</option>
                                    {filteredDoctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedDoctor && (
                                <div className="mt-4 flex items-center">
                                    <img
                                        src={selectedDoctor.image}
                                        alt={selectedDoctor.name}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <span className="text-lg font-medium">{selectedDoctor.name}</span>
                                </div>
                            )}
                            <div>
                                <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
                                    Room Name
                                </label>
                                <input
                                    id="roomName"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    type="text"
                                    placeholder="Room Name"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#da624a]">Schedule Notification</h3>
                            </div>

                            {/* Chọn từ ngày */}
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">From Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                        placeholderText="Select start date"
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">To Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="dd/MM/yyyy"
                                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                        placeholderText="Select end date"
                                    />
                                </div>
                            </div>

                            {/* Chọn giờ làm */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Shift</label>
                                <div className="flex space-x-4 mt-2">
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md ${shift === 'morning' ? 'bg-[#da624a] text-white' : 'bg-gray-300 text-gray-700'}`}
                                        onClick={() => handleShiftSelection('morning')}
                                    >
                                        Morning (8:00 - 12:00)
                                    </button>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md ${shift === 'afternoon' ? 'bg-[#da624a] text-white' : 'bg-gray-300 text-gray-700'}`}
                                        onClick={() => handleShiftSelection('afternoon')}
                                    >
                                        Afternoon (13:00 - 17:00)
                                    </button>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md ${shift === 'fulltime' ? 'bg-[#da624a] text-white' : 'bg-gray-300 text-gray-700'}`}
                                        onClick={() => handleShiftSelection('fulltime')}
                                    >
                                        Fulltime (8:00 - 12:00) & (13:00 - 17:00)
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#da624a]">Amount</h3>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                                    Credits
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        id="credits"
                                        className="w-full p-2 border border-[#da624a] rounded-md"
                                        type="text"
                                        value={credits.toLocaleString()}
                                        onChange={handleChange}
                                        placeholder="Enter amount"
                                    />
                                    <span className="absolute top-3 right-3 text-sm text-gray-500">VND</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={credits / 50000}
                                    onChange={handleSliderChange}
                                    className="w-full mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="button"
                                    className="px-6 py-2 bg-[#da624a] text-white rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateApp;
