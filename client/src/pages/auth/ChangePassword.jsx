import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useChangePassMutation } from '../../Redux/features/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const ChangePassword = () => {
    useAutoRefreshToken('/home/');
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [changePass] = useChangePassMutation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
            toast.error('Vui lòng điền đầy đủ tất cả các trường mật khẩu.');
            return;
        }

        // Check if new password and confirm password match
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }
        try {
            const oldPass = passwords.oldPassword;
            const newPass = passwords.confirmPassword;
            await changePass({ oldPass, newPass }).unwrap();
            toast.success('Thay đổi mật khẩu thành công!');
            navigate('/');
        } catch (error) {
            console.log(error);
            if (error?.status === 401) {
                toast.error('Mật khẩu cũ không chính xác!');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(passwords).map(([key, value]) => (
                    <div key={key} className="relative">
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords[key] ? 'text' : 'password'}
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="w-full outline-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder={`Enter ${key
                                    .replace(/([A-Z])/g, ' $1')
                                    .trim()
                                    .toLowerCase()}`}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(key)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPasswords[key] ? (
                                    <FaEye className="h-5 w-5" />
                                ) : (
                                    <FaEyeSlash className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                >
                    Xác nhận
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
