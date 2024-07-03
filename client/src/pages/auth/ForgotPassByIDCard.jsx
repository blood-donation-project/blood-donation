import React, { useState } from 'react';
import { IoMdSend, IoCardSharp } from 'react-icons/io5';
import EKYC from '../../components/EKYC/EKYC';

const ForgotPassByIDCard = () => {
    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isOpenEKYC, setIsOpenEKYC] = useState(false);
    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
    };
    const handleOpenPopup = () => {
        setIsOpenEKYC(true);
    };
    const handleClosePopup = () => {
        setIsOpenEKYC(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedMethod) {
            setStep(2);
            // Perform the next step logic here
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 shadow-lg rounded-lg">
            {isOpenEKYC ? (
                <EKYC isOpen={isOpenEKYC} onClose={handleClosePopup} type={'forgotPass'} />
            ) : (
                <div className="max-w-md w-full space-y-8 shadow-2xl border  border-gray-200 rounded-2xl p-6 bg-white">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
                    <p className="mt-2 text-center text-sm  text-gray-600">
                        Nếu bạn đã xác minh căn cước công dân bạn có thể lấy lại tài khoản bằng phương thức
                    </p>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => handleMethodSelect('IDCard')}
                            type="button"
                            className={`inline-flex items-center justify-center p-4 h-12 w-auto rounded-full shadow-md cursor-pointer ${selectedMethod === 'IDCard' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'} transform hover:scale-105 transition duration-500 ease-in-out focus:outline-none`}
                        >
                            <IoCardSharp className="h-6 w-6" />
                            <span className="ml-2">Căn cước công dân</span>
                        </button>
                    </div>
                    <button
                        onClick={handleOpenPopup}
                        disabled={!selectedMethod}
                        className={`group ${!selectedMethod ? 'cursor-not-allowed' : ''} relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        Tiếp tục
                    </button>
                </div>
            )}
        </div>
    );
};

export default ForgotPassByIDCard;
