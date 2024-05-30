import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './style.css';
import { toast } from 'react-toastify';
import Datepicker from 'react-tailwindcss-datepicker';
import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../../services/locationServices';
const CreateEvent = ({ isOpen, onClose }) => {
    const [eventName, setEventName] = useState('');
    const [centerName, setCenterName] = useState('');
    const [address, setAddress] = useState('');
    const [operationTime, setOperationTime] = useState('');
    const [donationTime, setDonationTime] = useState('');
    const [dateValue, setDateValue] = useState();
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

        const province = provinces?.results?.find(
            (p) => p?.province_id === provinceId
        );
        setSelectedProvince({
            id: provinceId,
            name: province?.province_name || '',
        });
        // Reset districts and wards when province changes
        setSelectedDistrict({ id: '', name: '' });
        // Fetch districts for the new province
        getDistrictsByProvinceId(provinceId).then(setDistricts);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const district = districts?.results?.find(
            (d) => d?.district_id === districtId
        );
        setSelectedDistrict({
            id: districtId,
            name: district ? district?.district_name : '',
        });
        // Reset wards when district changes
        setWards([]);
    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const ward = wards?.results?.find((w) => w.ward_id === wardId);
        setSelectedWards({ id: wardId, name: ward ? ward.ward_name : '' });
    };

    const handleDateValueChange = (newValue) => {
        console.log(newValue);
        setDateValue(newValue);
    };
    // Handle Form
    console.log(dateValue);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (dateValue.startDate === null && dateValue.endDate === null) {
            toast.error('Vui lòng nhập đầy đủ ngày tháng');
        }
    };

    if (!isOpen) return null;

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames={'popup'}
            unmountOnExit
        >
            <div className="fixed inset-0 flex overflow-auto items-center justify-center bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-700">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                    <button
                        className="absolute outline-none top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Thêm mới sự kiện
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[16px] font-medium text-gray-700">
                                Tên sự kiện
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tên trung tâm y tế
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={centerName}
                                onChange={(e) => setCenterName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col overflow-hidden">
                                <label htmlFor="">Địa chỉ</label>
                                <div className="mt-1">
                                    <select
                                        name="provinces"
                                        id="provices"
                                        value={selectedProvince.id}
                                        onChange={handleProvinceChange}
                                        className=" mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">
                                            Chọn Tỉnh/Thành Phố
                                        </option>
                                        {provinces?.results?.map((province) => (
                                            <option
                                                key={province.province_id}
                                                value={province.province_id}
                                            >
                                                {province.province_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-1">
                                    <select
                                        name="district"
                                        id="district"
                                        value={selectedDistrict.district_name}
                                        onChange={handleDistrictChange}
                                        className=" mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">
                                            Chọn Quận/Huyện
                                        </option>
                                        {districts?.results?.map((district) => (
                                            <option
                                                key={district.district_id}
                                                value={district.district_id}
                                            >
                                                {district.district_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-1 mb-1">
                                    <select
                                        name="wards"
                                        id="wards"
                                        onChange={handleWardChange}
                                        value={selectedWards?.district_name}
                                        className=" mt-1 p-2 w-full border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">Chọn Xã/Phường</option>
                                        {wards?.results?.map((ward) => (
                                            <option
                                                key={ward.ward_id}
                                                value={ward.ward_id}
                                            >
                                                {ward.ward_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Tên đường, Số nhà"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Thời gian hoạt động
                            </label>
                            <Datepicker
                                primaryColor="blue"
                                displayFormat="DD/MM/YYYY"
                                separator="-"
                                minDate={new Date()}
                                asSingle={true}
                                useRange={false}
                                value={dateValue}
                                inputClassName={
                                    ' outline-none p-2 py-3 w-full border border-gray-300 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg'
                                }
                                onChange={handleDateValueChange}
                                readOnly={true}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Thời gian hiến máu
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={address}
                                onChange={(e) =>
                                    setOperationTime(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-3 outline-none px-4 py-2 bg-gray-300 text-gray-700 hover:text-gray-200 rounded-lg hover:bg-gray-400 transition duration-150"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 outline-none py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                            >
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CSSTransition>
    );
};

export default CreateEvent;
