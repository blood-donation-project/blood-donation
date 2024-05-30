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
                    value={selectedProvince.id}
                    onChange={handleProvinceChange}
                    className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                    <option value="">Chọn Tỉnh/Thành Phố</option>
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
                    value={selectedDistrict.district_name}
                    onChange={handleDistrictChange}
                    className=" mt-1 p-2 w-1/2 border rounded-md focus:border-[#0866ff] focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                >
                    <option value="">Chọn Quận/Huyện</option>
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
    );
};

export default FilterEvent;
