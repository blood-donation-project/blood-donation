import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotFoundPage from './NotFoundPage';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const param = useParams();
    const [validURL, setValidURL] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setValidURL(true);
    }, [param]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Mật khẩu nhập lại không khớp.');
            return;
        }
        try {
            await axios.patch(
                `http://localhost:3001/v1/auth/${param.id}/forgotpass/${param.token}`,
                { password: password }
            );
            setTimeout(() => {
                toast.success('Đặt lại mật khẩu thành công!');
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error('Đặt lại mật khẩu thất bại!');
            setValidURL(false);
        }
    };

    return (
        <div>
            {validURL ? (
                <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                            Đặt Lại Mật Khẩu Của Bạn
                        </h2>
                        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
                            Và trở lại đăng nhập một cách an toàn
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                            <form
                                className="mb-0 space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Mật khẩu mới
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Xác nhận mật khẩu mới
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        Đặt lại mật khẩu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <NotFoundPage />
            )}
        </div>
    );
};

export default PasswordReset;
