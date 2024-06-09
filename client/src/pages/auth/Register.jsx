import React, { useEffect, useState } from 'react';
import imgBloodDonation from '../../assets/img/hienmau.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../../services/locationServices';
import { Spin } from 'antd';
import { useRegisterMutation } from '../../Redux/features/auth/authAPI';

const Register = () => {
    const [register] = useRegisterMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState([
        {
            id: '',
            name: '',
        },
    ]);
    const [selectedDistrict, setSelectedDistrict] = useState({
        id: '',
        name: '',
    });
    const [selectedWards, setSelectedWards] = useState({
        id: '',
        name: '',
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valueDate, setValueDate] = useState(null);
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    const [role, setRole] = useState('donor');
    const navigate = useNavigate();

    useEffect(() => {
        getProvinces().then(setProvinces);
    }, []);
    useEffect(() => {
        if (selectedProvince?.id) {
            getDistrictsByProvinceId(selectedProvince?.id)
                .then((response) => {
                    setDistricts(response);
                })
                .catch((error) => {
                    console.error('Failed to fetch districts:', error);
                });
        }
        setSelectedDistrict({ id: '', name: '' });
        setWards([]);
    }, [selectedProvince?.id]);
    useEffect(() => {
        if (selectedDistrict?.id) {
            getWardsByDistrictId(selectedDistrict?.id).then(setWards);
        }
    }, [selectedDistrict?.id]);

    // Handle Change

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;

        const province = provinces?.data?.find((p) => p?.id === provinceId);
        setSelectedProvince({
            id: provinceId,
            name: province?.full_name || '',
        });
        // Reset districts and wards when province changes
        setSelectedDistrict({ id: '', name: '' });
        // Fetch districts for the new province
        getDistrictsByProvinceId(provinceId).then(setDistricts);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const district = districts?.data?.find((d) => d?.id === districtId);
        setSelectedDistrict({
            id: districtId,
            name: district ? district?.full_name : '',
        });
        // Reset wards when district changes
        setWards([]);
    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const ward = wards?.data?.find((w) => w.id === wardId);
        setSelectedWards({ id: wardId, name: ward ? ward.full_name : '' });
    };
    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;

        const numbersOnly = input.replace(/[^0-9]/g, '');
        setPhoneNumber(numbersOnly);
    };
    // Submit Form
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const formatDate = moment(valueDate?.startDate).format(
                'DD/MM/YYYY'
            );
            const newUser = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                birthday: formatDate,
                gender: gender,
                address: {
                    province: selectedProvince.name,
                    district: selectedDistrict.name,
                    ward: selectedWards.name,
                    street: street,
                },
                password: password,
                role: role,
            };
            if (password === rePassword) {
                await register(newUser).unwrap();
                setIsLoading(false);
                navigate('/login');
            } else {
                toast.error('Mật khẩu nhập lại không khớp');
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Pane */}
            <div className="hidden lg:flex h-screen items-center justify-center flex-1 bg-white text-black">
                <div className="w-full h-full text-center">
                    <img
                        className="w-full h-full bg-cover object-cover"
                        src={imgBloodDonation}
                        alt=""
                    />
                </div>
            </div>

            {/* Right Pane */}
            <div className="w-full h-screen bg-gray-100 lg:w-1/2 flex items-center justify-center overflow-y-scroll">
                {/* Register */}
                <div className={`max-w-lg w-full p-6 h-screen `}>
                    <h1 className="text-4xl font-semibold mb-6 text-black text-center">
                        Đăng Ký
                    </h1>
                    <h2 className="text-lg font-thin mb-6 text-gray-500 text-center">
                        "Đăng ký tài khoản để cùng nhau kết nối với những người
                        đang cần máu"
                    </h2>
                    {/* Register */}
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="">
                            <label
                                htmlFor="username"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Họ và Tên
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field mt-1 p-2 w-full border rounded-md focus:shadow-sm focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2  transition-colors duration-300"
                            />
                        </div>

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
                                htmlFor="phoneNumber"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>

                        <div className=" ">
                            <label
                                htmlFor="role"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Bạn là:
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className=" mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            >
                                <option
                                    value={'Người hiến máu'}
                                    className=""
                                >
                                    Người hiến máu
                                </option>
                                <option
                                    value={'Người cần máu'}
                                    className="p-2 mt-1"
                                >
                                    Người cần hiến máu
                                </option>
                                <option
                                    value={'Cơ sở y tế'}
                                    className="p-2"
                                >
                                    Cơ sở y tế
                                </option>
                            </select>
                        </div>

                        {/* Date of birthday */}
                        {role !== 'Cơ sở y tế' ? (
                            <div>
                                <div>
                                    <label htmlFor="">Ngày Sinh</label>
                                    <div
                                        aria-required
                                        className="bg-white"
                                    >
                                        <Datepicker
                                            primaryColor="purple"
                                            asSingle={true}
                                            useRange={false}
                                            value={valueDate}
                                            maxDate={Date.now()}
                                            displayFormat="DD/MM/YYYY"
                                            onChange={(e) => setValueDate(e)}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Giới tính</label>
                                    <div className="flex  gap-4 my-4">
                                        <button
                                            type="button"
                                            className={`px-6 py-2 text-white font-semibold rounded-full transition-all duration-300 ${
                                                gender === 'Nam'
                                                    ? 'bg-blue-500 ring-2 ring-blue-300 border border-blue-500'
                                                    : 'bg-gray-300 hover:bg-blue-500'
                                            }`}
                                            onClick={() => setGender('Nam')}
                                        >
                                            Nam
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-6 py-2 text-white font-semibold rounded-full transition-all duration-300 ${
                                                gender === 'Nữ'
                                                    ? 'bg-pink-500 ring-2 ring-pink-300 border border-pink-500'
                                                    : 'bg-gray-300 hover:bg-pink-500'
                                            }`}
                                            onClick={() => setGender('Nữ')}
                                        >
                                            Nữ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        {/* Address */}
                        <div>
                            <label htmlFor="">Địa Chỉ</label>
                            <div>
                                <select
                                    required
                                    className=" mt-1 p-2 w-1/3 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={selectedProvince.id}
                                    onChange={handleProvinceChange}
                                >
                                    <option value="0">Chọn tỉnh</option>
                                    {provinces?.data?.map((province) => (
                                        <option
                                            key={province.id}
                                            value={province.id}
                                        >
                                            {province.full_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    required
                                    className=" mt-1 p-2 w-1/3 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    value={selectedDistrict.id}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Chọn quận/huyện</option>
                                    {districts?.data?.map((district) => (
                                        <option
                                            key={district.id}
                                            value={district.id}
                                        >
                                            {district.full_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    required
                                    className=" mt-1 p-2 w-1/3 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    onChange={handleWardChange}
                                    value={selectedWards?.id}
                                >
                                    <option value="">Chọn xã</option>
                                    {wards?.data?.map((ward) => (
                                        <option
                                            key={ward.id}
                                            value={ward.id}
                                        >
                                            {ward.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Tên đường, Số nhà"
                                onChange={(e) => setStreet(e.target.value)}
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
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="repassword"
                                className="block text-[16px] font-medium text-gray-700"
                            >
                                Nhập lại Password
                            </label>
                            <input
                                type="password"
                                id="repassword"
                                name="repassword"
                                onChange={(e) => setRepassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>

                        <Spin
                            spinning={isLoading}
                            size="default"
                        >
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-[#0866ff] text-white p-2 rounded-md hover:bg-[#1877f2] focus:outline-none focus:bg-black transition-colors duration-300"
                            >
                                Đăng Ký
                            </button>
                        </Spin>
                    </form>

                    <div className="mt-4 text-sm text-gray-600 text-center ">
                        <p className="">
                            Bạn đã có tài khoản?{' '}
                            <Link
                                className="hover:underline text-black"
                                to="/login"
                                relative="path"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
