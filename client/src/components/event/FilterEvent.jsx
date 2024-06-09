import React, { useEffect, useState } from 'react';
import {
    getDistrictsByProvinceId,
    getProvinces,
    getWardsByDistrictId,
} from '../../services/locationServices';

const FilterEvent = () => {
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

        const province = provinces?.data?.find((p) => p?.id === provinceId);
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
        const district = districts?.data?.find((d) => d?.id === districtId);
        setSelectedDistrict({
            id: districtId,
            name: district ? district?.name : '',
        });
        // Reset wards when district changes
        setWards([]);
    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const ward = wards?.data?.find((w) => w.id === wardId);
        setSelectedWards({ id: wardId, name: ward ? ward.name : '' });
    };
    return (
        <div>
            <h3 className="font-semibold text-xl">Bộ Lọc:</h3>
            <div className="my-2 text-lg">
                <label
                    className="mr-2"
                    htmlFor="provinces"
                >
                    Tỉnh/ Thành Phố:
                </label>
                <select
                    name="provinces"
                    id="provices"
                    value={selectedProvince.full_name}
                    onChange={handleProvinceChange}
                    className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                    <option value="">Chọn Tỉnh/Thành Phố</option>
                    {provinces?.data?.map((province) => (
                        <option
                            key={province.id}
                            value={province.id}
                        >
                            {province.full_name}
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
                    value={selectedDistrict.full_name}
                    onChange={handleDistrictChange}
                    className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts?.data?.map((district) => (
                        <option
                            key={district.id}
                            value={district.id}
                        >
                            {district.full_name}
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
                    value={selectedWards?.full_name}
                    className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                    <option value="">Chọn Xã/Phường</option>
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
    );
};

export default FilterEvent;
