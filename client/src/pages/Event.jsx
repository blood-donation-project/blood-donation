import React, { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import Interest from '../components/event/Interest';
import Datepicker from 'react-tailwindcss-datepicker';
import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../services/locationServices';
import { toast } from 'react-toastify';
import SearchEvent from '../components/event/SearchEvent';
import ManageEvent from '../components/event/ManageEvent';

const Event = () => {
    const [isHealthAuth, setHealthAuth] = useState(true);
    const [isCheck, setCheck] = useState(true);
    const [dateValue, setDateValue] = useState({
        startDate: null,
        endDate: null,
    });
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

    return (
        <>
            {/* Menu */}
            <NavMenu />
            <div className="mt-[56px]">
                <div className="flex">
                    {/* Sidebar left */}
                    <div className="hidden lg:block lg:w-[360px] ">
                        <div className="fixed h-[calc(h-screen_-_56px)] left-0 top-[56px]  shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 w-[360px]">
                            <div className="py-2 border-b border-[#ccc]">
                                <h2 className="text-[20px] font-bold">
                                    Bạn cần tìm kiếm trong khoảng thời gian nào?
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
                                    {isHealthAuth ? (
                                        <div className="mt-1 mb-1">
                                            <label
                                                className="text-lg"
                                                htmlFor=""
                                            >
                                                Tên sự kiện
                                            </label>
                                            <input
                                                placeholder="Nhập tên sự kiện"
                                                className="w-full outline-none border border-gray-300 focus:border-blue-500 focus:ring
                                                focus:ring-blue-200 transition-all duration-300 rounded-lg p-2"
                                                type="text"
                                                name=""
                                                id=""
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}
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
                                            {provinces?.results?.map(
                                                (province) => (
                                                    <option
                                                        key={
                                                            province.province_id
                                                        }
                                                        value={
                                                            province.province_id
                                                        }
                                                    >
                                                        {province.province_name}
                                                    </option>
                                                )
                                            )}
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
                                            value={
                                                selectedDistrict.district_name
                                            }
                                            onChange={handleDistrictChange}
                                            className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                        >
                                            <option value="">
                                                Chọn Quận/Huyện
                                            </option>
                                            {districts?.results?.map(
                                                (district) => (
                                                    <option
                                                        key={
                                                            district.district_id
                                                        }
                                                        value={
                                                            district.district_id
                                                        }
                                                    >
                                                        {district.district_name}
                                                    </option>
                                                )
                                            )}
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
                                            value={selectedWards?.district_name}
                                            className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                        >
                                            <option value="">
                                                Chọn Xã/Phường
                                            </option>
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
                                <div className="flex items-center justify-center">
                                    <button
                                        className="my-5 outline-none hover:bg-[#1c5291] bg-[#386fd6] text-white py-4 px-10 text-lg rounded-lg"
                                        type="submit"
                                    >
                                        Tìm Kiếm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/*  Content*/}
                    <div className="w-full lg:w-[calc(100%_-_360px)] ">
                        {/* When do not Search <Interest />  */}
                        {isHealthAuth ? (
                            <ManageEvent />
                        ) : isCheck ? (
                            <SearchEvent />
                        ) : (
                            <Interest />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
