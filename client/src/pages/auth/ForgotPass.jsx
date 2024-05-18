import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg_hienmau from '../../assets/img/bg_hienmau3.jpg';
import { useDispatch } from 'react-redux';
import { forgotPass } from '../../Redux/apiRequest';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form data here
        const forgotPassword = {
            email: email,
        };

        forgotPass(forgotPassword, dispatch, navigate);
    };
    return (
        <div>
            <div className="flex h-screen">
                {/* Left Pane */}
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="w-full h-full text-center">
                        <img
                            className="w-full h-full  object-cover"
                            src={bg_hienmau}
                            alt=""
                        />
                    </div>
                </div>

                {/* Right Pane */}
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className=" max-w-md w-full p-6">
                        <h1 className="text-4xl font-semibold mb-6 text-black text-center">
                            Quên Mật Khẩu
                        </h1>
                        <h2 className="text-[16px] font-thin mb-6 text-gray-500 text-center">
                            "Hiến máu là bạn đang làm điều cao cả cho cộng đồng.
                            Việc hiến máu tạo nên sự khác biệt giữa sự sống và
                            cái chết. Nỗ lực nhỏ của bạn có thể cho người khác
                            cơ hội thứ hai để sống"
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
                            <button
                                type="submit"
                                className="w-full bg-[#0866ff] text-white p-2 rounded-md hover:bg-[#1877f2] focus:outline-none focus:bg-black transition-colors duration-300"
                            >
                                Gửi email xác thực
                            </button>
                        </form>

                        <div className="flex justify-between mt-4 text-sm text-gray-600 text-center">
                            <Link
                                to={'/login'}
                                className="cursor-pointer text-black hover:underline"
                            >
                                Đăng nhập
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
        </div>
    );
};

export default ForgotPass;
