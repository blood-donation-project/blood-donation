import React from 'react';
import img404Page from '../../assets/img/img404Page.gif';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (
        <div>
            <div className="h-screen w-screen bg-[#cfbcbe] flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                        <div className="text-9xl font-dark font-bold">404</div>
                        <p className="text-7xl md:text-3xl font-light leading-normal">
                            Xin lỗi chúng tôi không thể tìm thấy trang này!.{' '}
                        </p>
                        <p className="mb-8 text-xl">
                            Nhưng đừng lo lắng, bạn có thể tìm thấy nhiều thứ
                            khác trên trang chủ của chúng tôi.
                        </p>

                        <Link
                            to={'/'}
                            className="px-4 inline py-4 text-lg font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
                        >
                            Quay lại trang chủ
                        </Link>
                    </div>
                    <div className="max-w-lg">
                        <img
                            src={img404Page}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
