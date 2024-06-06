import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3001/v1/auth/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);

                console.log(data);
                setValidUrl(true);
                setTimeout(() => {
                    //  navigate('/login');
                }, 5000);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param, navigate]);

    return (
        <div>
            {validUrl ? (
                <div>
                    <div
                        className="flex h-screen items-center justify-center bg-fixed bg-cover bg-no-repeat bg-center"
                        style={{
                            backgroundImage:
                                "url('https://your-background-image-url.jpg')",
                        }}
                    >
                        <div className="bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 rounded-lg shadow-xl text-center max-w-lg">
                            <div className="mb-6 inline-flex rounded-full bg-green-500 p-3">
                                <svg
                                    className="w-12 h-12 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">
                                Xác thực thành công!
                            </h2>
                            <p className="mb-8">
                                Email của bạn đã được xác thực thành công! Cảm
                                ơn bạn đã tham gia cùng chúng tôi!
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                            >
                                Đi đến trang đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <NotFoundPage />
                </div>
            )}
        </div>
    );
};

export default EmailVerify;
