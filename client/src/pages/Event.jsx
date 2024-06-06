import React, { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import Interest from '../components/event/Interest';
import Datepicker from 'react-tailwindcss-datepicker';
import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../services/locationServices';
import SearchEvent from '../components/event/SearchEvent';
import ManageEvent from '../components/event/ManageEvent';
import { useVerifyToken } from '../hooks/useAutoRefreshToken';
import { useGetUserMutation } from '../Redux/features/user/userAPI';
import { useGetEventMutation } from '../Redux/features/events/eventAPI';

const Event = () => {
    // Redux
    useVerifyToken('/events/');
    const [getUser, { data: userData }] = useGetUserMutation();
    const [getEvent, { data: eventData }] = useGetEventMutation();
    const [isCheck, setCheck] = useState(true);
    const [eventName, setEventName] = useState('');
    const [dateValue, setDateValue] = useState({
        startDate: null,
        endDate: null,
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: '',
        name: '',
    });
    const [selectedDistrict, setSelectedDistrict] = useState({
        id: '',
        name: '',
    });
    const [selectedWards, setSelectedWards] = useState({
        id: '',
        name: '',
    });

    //* Handle Data From Child
    const handleDataFromChild = (data) => {
        setCheck(data);
    };

    // GET USER
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser().unwrap();
            } catch (error) {}
        };
        fetchData();
    }, [getUser]);

    // GET EVENTS
    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const result = await getEvent().unwrap();
                if (result) {
                    setCheck(true);
                }
            } catch (error) {}
        };
        fetchData();
    }, [getEvent]);

    // GET LOCATION
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
        setDistricts([]);
        setSelectedDistrict([]);
        setSelectedWards([]);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const district = districts?.find((d) => d?.idDistrict === districtId);
        setSelectedDistrict({
            id: districtId,
            name: district ? district?.name : '',
        });
        // Reset wards when district changes
        setSelectedWards([]);
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
    // Handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchParams = {
            eventName,
            startDate: dateValue.startDate,
            endDate: dateValue.endDate,
            province: selectedProvince.name,
            district: selectedDistrict.name,
            ward: selectedWards.name,
        };
        const result = await getEvent(searchParams).unwrap();
        if (result) {
            setCheck(true);
        }
    };

    // Handle Search
    const handleSearch = async (e) => {};

    return (
        <>
            {/* Menu */}
            <NavMenu userData={userData} />
            <div className=" xs:mt-[96px] md:mt-[56px]">
                <div className="md:flex">
                    {/* Sidebar left */}
                    <div className="hidden lg:block lg:w-[360px] ">
                        <div className="fixed h-[calc(h-screen_-_56px)] left-0 top-[56px]  shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 w-[360px]">
                            <div className="py-2 border-b border-[#ccc]">
                                <h2 className="text-2xl font-semibold">
                                    Sự kiện
                                </h2>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="my-2"
                            >
                                <div className="py-2">
                                    <Datepicker
                                        primaryColor="blue"
                                        displayFormat="DD/MM/YYYY"
                                        separator="-"
                                        showShortcuts={true}
                                        value={dateValue}
                                        inputClassName={
                                            ' outline-none p-2 py-3 w-full border border-gray-300 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg'
                                        }
                                        onChange={handleDateValueChange}
                                        readOnly={true}
                                    />
                                </div>
                                {/* Filter Event */}
                                <div>
                                    <h3 className="font-semibold text-xl">
                                        Bộ Lọc:
                                    </h3>
                                    <div className="mt-1 mb-1">
                                        <label
                                            className="text-lg"
                                            htmlFor=""
                                        >
                                            Tên sự kiện
                                        </label>
                                        <input
                                            value={eventName}
                                            onChange={(e) =>
                                                setEventName(e.target.value)
                                            }
                                            placeholder="Nhập tên sự kiện"
                                            className="w-full outline-none border border-gray-300 focus:border-blue-500 focus:ring
                                                focus:ring-blue-200 transition-all duration-300 rounded-lg p-2"
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="my-2 text-lg ">
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
                                    <div className="my-2 text-lg">
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
                                    <div className="my-2 text-lg">
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
                                            <option value="">
                                                Chọn Xã/Phường
                                            </option>
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
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handleSearch}
                                        className="my-5 outline-none hover:bg-[#1c5291] bg-[#386fd6] text-white py-4 px-10 text-lg rounded-lg"
                                        type="submit"
                                    >
                                        Tìm Kiếm
                                    </button>
                                </div>
                            </form>
                            <button
                                type="button"
                                className="gradient-text text-[16px] outline-none hover:underline "
                                onClick={() =>
                                    isCheck ? setCheck(!isCheck) : ''
                                }
                            >
                                Những điều cần biết khi đi hiến máu?
                            </button>
                        </div>
                    </div>

                    {/*  Content*/}
                    <div className=" lg:w-[calc(100%_-_360px)] ">
                        {/* When do not Search <Interest />  */}
                        {isCheck ? (
                            <SearchEvent
                                eventData={eventData}
                                userData={userData}
                            />
                        ) : (
                            <Interest onSendData={handleDataFromChild} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
