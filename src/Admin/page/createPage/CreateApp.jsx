import React, { useState } from 'react';

function CreateApp(props) {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="max-h-screen flex max-w-screen ">
            <div className="w-full   bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <div className="flex justify-between mb-5">
                    <ul className="flex space-x-5">
                        <li className={`text-lg font-semibold ${currentStep === 1 ? 'text-[#da624a]' : 'text-gray-500'}`}>Step 1</li>
                        <li className={`text-lg font-semibold ${currentStep === 2 ? 'text-[#da624a]' : 'text-gray-500'}`}>Step 2</li>
                        <li className={`text-lg font-semibold ${currentStep === 3 ? 'text-[#da624a]' : 'text-gray-500'}`}>Step 3</li>
                    </ul>
                </div>

                <div className="mt-5 ">
                    {/* Step 1: User Info */}
                    {currentStep === 1 && (
                        <div className="step-pane active max-w-screen flex items-center justify-center">
                            <form className="space-y-4 w-full px-4 sm:px-96">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#da624a]">User Info</h3>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">User Name</label>
                                    <input id="username" className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" type="text" placeholder="User name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
                                    <input id="email" className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" type="email" placeholder="User E-Mail" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input id="password" className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" type="password" placeholder="Enter your password" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Verify Password</label>
                                    <input id="confirm-password" className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" type="password" placeholder="Enter your password again" />
                                </div>
                                <div className="flex justify-between mt-5">
                                    <button type="button" className="bg-gray-300 text-white py-2 px-4 rounded-md">Cancel</button>
                                    <button type="button" onClick={nextStep} className="bg-[#da624a] text-white py-2 px-4 rounded-md hover:bg-[#c25a4a]">Next Step</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 2: Notifications */}
                    {currentStep === 2 && (
                        <div className="step-pane active max-w-screen flex items-center justify-center ">
                            <form className="space-y-4 w-full px-4 sm:px-96 max-h-[1000px] overflow-y-auto">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#da624a]">Notifications</h3>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm">E-Mail Notifications</div>
                                    <input type="checkbox" className="h-5 w-5" checked />
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm">Phone Notifications</div>
                                    <input type="checkbox" className="h-5 w-5" checked />
                                </div>
                                <div className="flex justify-between mt-5">
                                    <button type="button" onClick={prevStep} className="bg-gray-300 text-white py-2 px-4 rounded-md">Previous</button>
                                    <button type="button" onClick={nextStep} className="bg-[#da624a] text-white py-2 px-4 rounded-md hover:bg-[#c25a4a]">Next Step</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 3: Configuration */}
                    {currentStep === 3 && (
                        <div className="step-pane active max-w-screen flex items-center justify-center ">
                            <form className="space-y-4 w-full px-4 sm:px-96">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#da624a]">Configuration</h3>
                                </div>
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-gray-700">Buy Credits</label>
                                    <input type="range" className="w-full mt-2" min="0" max="10" value="8" />
                                </div>
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-gray-700">Change Plan</label>
                                    <select className="w-full mt-2 p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]">
                                        <option>Basic</option>
                                        <option>Medium</option>
                                        <option>Standard</option>
                                        <option>Silver</option>
                                        <option>Gold</option>
                                    </select>
                                </div>
                                <div className="flex justify-between mt-5">
                                    <button type="button" onClick={prevStep} className="bg-gray-300 text-white py-2 px-4 rounded-md">Previous</button>
                                    <button type="button" className="bg-[#da624a] text-white py-2 px-4 rounded-md hover:bg-[#c25a4a]">Complete</button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default CreateApp;
