import React, { useState } from 'react';
import imgBloodDonation from '../../assets/img/hienmau.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../Redux/features/auth/authAPI';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    // Example function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle the form data here
        try {
            await login({ email, password }).unwrap();
            navigate('/');
        } catch (error) {}
    };

    return (
        <div className="flex h-screen">
            {/* Left Pane */}
            <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <div className="w-full h-full text-center">
                    <img
                        className="w-full h-full bg-cover object-cover"
                        src={imgBloodDonation}
                        alt=""
                    />
                </div>
            </div>

            {/* Right Pane */}
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className=" max-w-md w-full p-6">
                    <h1 className="text-4xl font-semibold mb-6 text-black text-center">
                        Đăng Nhập
                    </h1>
                    <h2 className="text-[16px] font-thin mb-6 text-gray-500 text-center">
                        "Mỗi lần hiến máu, bạn không những cứu sống một mạng
                        người mà còn trao đi sự hy vọng và tình yêu thương"
                    </h2>
                    {/* Register */}
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0866ff] text-white p-2 rounded-md hover:bg-[#1877f2] focus:outline-none focus:bg-black transition-colors duration-300"
                        >
                            Đăng Nhập
                        </button>
                    </form>

                    <div className="flex justify-between mt-4 text-sm text-gray-600 text-center">
                        <Link
                            to={'/forgotpassword'}
                            className="cursor-pointer hover:underline"
                        >
                            Quên mật khẩu?
                        </Link>
                        <p>
                            Bạn chưa có tài khoản?{' '}
                            <Link
                                className="hover:underline text-black"
                                to="/register"
                                relative="path"
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
