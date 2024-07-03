import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { useSendEmailByIdCardMutation, useVerifyOTPMutation } from '../../Redux/features/auth/authAPI';
import { Spin } from 'antd';
import { toast } from 'react-toastify';

function OTPInput({ values, onChange }) {
    const inputsRef = useRef([]);
    const handleInputChange = (e, index) => {
        const newValue = e.target.value;
        onChange(newValue, index);
        if (newValue && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    return (
        <div className="flex justify-center space-x-2">
            {[...Array(4)].map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={values[index] || ''}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded shadow-inner focus:outline-none focus:border-blue-500"
                    onKeyUp={(e) => e.key === 'Backspace' && index > 0 && inputsRef.current[index - 1].focus()}
                />
            ))}
        </div>
    );
}

export default function VerifyEmailPassByIDCard() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(Array(4).fill(''));
    const [otpError, setOtpError] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const [userDataFound, setUserDataFound] = useState(null);
    const [sendEmail] = useSendEmailByIdCardMutation();
    const [isValidUrl, setValidUrl] = useState(false);
    const [verifyOTP] = useVerifyOTPMutation();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return email.match(/^\S+@\S+\.\S+$/);
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            const identification = params.idcard;
            await sendEmail({ email, identification }).unwrap();
            setIsLoading(false);
            toast.success('Vui lòng kiểm tra email của bạn');
            setShowOtpPopup(true);
        }
    };

    const handleOTPChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpError(false); // Reset error on new input
        if (newOtp.every((num) => num !== '')) {
            checkOtp(newOtp.join(''));
        }
    };

    const checkOtp = async (otp) => {
        try {
            const identification = params.idcard;
            await verifyOTP({ otp, identification, email }).unwrap();
            toast.success('Email của bạn đã được thay đổi thành công! Vui lòng lấy email mới để thay đổi mật khẩu.');
            navigate('/forgotpassword');
        } catch (error) {
            console.log(error);
            setOtpError(true);
        }
    };

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3001/v1/auth/${params.idcard}/checkEmailByIdCard/${params.token}`;
                const { data } = await axios.get(url);
                setUserDataFound(data);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [params]);

    return (
        <div>
            {isValidUrl ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-11/12 max-w-sm p-6 space-y-3 rounded-xl bg-white shadow-lg border">
                        <div className="text-center">
                            <h1 className="text-lg">Tài khoản của bạn</h1>
                            <div className="flex items-center justify-center w-full my-2 gap-1 bg-gray-200 p-2 rounded-md">
                                <img src={userDataFound?.user?.avatar} className="w-10 h-10 rounded-full" alt="" />
                                <h1 className="text-[16px] font-bold">{userDataFound?.user?.username}</h1>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitEmail} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập email mới của bạn"
                                required
                            />
                            <Spin spinning={isLoading}>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Continue
                                </button>
                            </Spin>
                        </form>
                        {showOtpPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                                    {otpError && <p className="text-red-500">Mã OTP không chính xác!</p>}
                                    <h2 className="text-lg font-bold">OTP Verification</h2>
                                    <p>Một mã OTP đã được gửi tới email của bạn. Vui lòng nhập mã OTP để xác thực</p>
                                    <OTPInput values={otp} onChange={handleOTPChange} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <NotFoundPage />
            )}
        </div>
    );
}
