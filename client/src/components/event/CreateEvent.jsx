import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './style.css';
import { toast } from 'react-toastify';
import Datepicker from 'react-tailwindcss-datepicker';

import { TimePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../../services/locationServices';
import { useCreateEventMutation } from '../../Redux/features/events/eventAPI';
import axios from 'axios';
const CreateEvent = ({ isOpen, onClose }) => {
    const [createEvent] = useCreateEventMutation();
    const [eventName, setEventName] = useState('');
    const { RangePicker } = TimePicker;
    const [selectedTime, setSelectedTime] = useState([
        dayjs('07:00', 'HH:mm'),
        dayjs('16:00', 'HH:mm'),
    ]);
    const [imageEvent, setImageEvent] = useState(null);
    const [street, setStreet] = useState('');
    const [dateValue, setDateValue] = useState({
        startDate: null,
        endDate: null,
    });
    const onChange = (time) => {
        setSelectedTime(time);
    };

    const [description, setDescription] = useState('');
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
        const province = provinces?.find((p) => p?.idProvince === provinceId);
        setSelectedProvince({
            id: provinceId,
            name: province?.name || '',
        });
        // Reset districts and wards when province changes
        setSelectedDistrict({ id: '', name: '' });
        // Fetch districts for the new province
        getDistrictsByProvinceId(provinceId).then(setDistricts);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const district = districts?.find((d) => d?.idDistrict === districtId);
        setSelectedDistrict({
            id: districtId,
            name: district ? district?.name : '',
        });
        // Reset wards when district changes
        setWards([]);
    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const ward = wards?.find((w) => w.idCommune === wardId);
        setSelectedWards({ id: wardId, name: ward ? ward.name : '' });
    };
    const handleDateValueChange = (newValue) => {
        setDateValue(newValue);
    };

    // Handle Close
    const handleClose = () => {
        setDateValue('');
        setEventName('');
        setSelectedProvince('');
        setSelectedDistrict('');
        setSelectedWards('');
        onClose();
    };

    // Handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', imageEvent);
        let imageUrl;
        try {
            const response = await axios.post(
                'http://localhost:3001/news/upload-image',
                formData
            );
            imageUrl = response.data.url;
            const newEvent = {
                eventName: eventName,
                image: imageUrl,
                address: {
                    province: selectedProvince.name,
                    district: selectedDistrict.name,
                    ward: selectedWards.name,
                    street: street,
                },
                description: description,
                donationTime: dateValue.startDate,
                startTime: selectedTime[0].format('HH:mm'),
                endTime: selectedTime[1].format('HH:mm'),
            };
            if (dateValue.startDate === null && dateValue.endDate === null) {
                toast.error('Vui lòng nhập đầy đủ ngày tháng');
            }
            createEvent(newEvent)
                .unwrap()
                .then(() => {
                    setDateValue('');
                    setEventName('');
                    setSelectedProvince('');
                    setSelectedDistrict('');
                    setSelectedWards('');
                    setStreet('');
                    setImageEvent('');
                    setDescription('');
                    onClose();
                })
                .catch((error) => {
                    console.log(' Error: ', error);
                });
        } catch (error) {
            console.log(' Error: ', error);
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
            <div className="fixed  inset-0 flex overflow-auto items-center justify-center bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-700">
                <div className="bg-white h-[90%] top-6 overflow-y-scroll p-8  shadow-lg w-full max-w-lg relative">
                    <button
                        className="absolute outline-none top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={handleClose}
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
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col overflow-hidden">
                                <label htmlFor="">Địa chỉ</label>
                                <div className="my-2">
                                    <label
                                        className="mr-2"
                                        htmlFor="provinces"
                                    >
                                        Tỉnh/ Thành Phố:
                                    </label>
                                    <select
                                        name="provinces"
                                        id="provices"
                                        value={selectedProvince.id}
                                        onChange={handleProvinceChange}
                                        className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">
                                            Chọn Tỉnh/Thành Phố
                                        </option>
                                        {provinces?.map((province) => (
                                            <option
                                                key={province.idProvince}
                                                value={province.idProvince}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label
                                        htmlFor="district"
                                        className="mr-9"
                                    >
                                        Quận/Huyện:
                                    </label>
                                    <select
                                        name="district"
                                        id="district"
                                        value={selectedDistrict.id}
                                        onChange={handleDistrictChange}
                                        className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">
                                            Chọn Quận/Huyện
                                        </option>
                                        {districts?.map((district) => (
                                            <option
                                                key={district.idDistrict}
                                                value={district.idDistrict}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="my-2 ">
                                    <label
                                        htmlFor="wards"
                                        className="mr-12"
                                    >
                                        Xã/Phường:
                                    </label>
                                    <select
                                        name="wards"
                                        id="wards"
                                        onChange={handleWardChange}
                                        value={selectedWards?.id}
                                        className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    >
                                        <option value="">Chọn Xã/Phường</option>
                                        {wards?.map((ward) => (
                                            <option
                                                key={ward.idCommune}
                                                value={ward.idCommune}
                                            >
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="Tên đường, Số nhà"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
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
                            <RangePicker
                                className="mt-1 w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={selectedTime}
                                onChange={onChange}
                                format={'HH:mm'}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Thêm ảnh
                            </label>
                            {/* Input */}
                            <input
                                type="file"
                                name="image"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(event) =>
                                    setImageEvent(event.target.files[0])
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Giới thiệu
                            </label>
                            {/* Input */}
                            <textarea
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                cols={70}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-3 outline-none px-4 py-2 bg-gray-300 text-gray-700 hover:text-gray-200 rounded-lg hover:bg-gray-400 transition duration-150"
                                onClick={handleClose}
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
