import { IoMdClose } from 'react-icons/io';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { resetSurroundingUsersData } from '../../../Redux/features/search/searchSlice';
import { useEffect, useState } from 'react';
import { getProvinces } from '../../../services/locationServices';
import { useSearchSurroundingUsersMutation } from '../../../Redux/features/search/searchAPI';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const UserRoundingFilter = ({ hideModal, isShowing, setPagination }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = useState({
        province: user?.address?.province || 'Thành phố Hà Nội',
        bloodGroup: user?.bloodGroup || '',
    });

    const [options, setOptions] = useState({
        province: '',
        bloodGroup: [
            {
                value: '',
                label: 'Tất cả',
            },
            {
                value: 'O-',
                label: 'O-',
            },
            {
                value: 'O+',
                label: 'O+',
            },
            {
                value: 'A-',
                label: 'A-',
            },
            {
                value: 'A+',
                label: 'A+',
            },
            {
                value: 'B-',
                label: 'B-',
            },
            {
                value: 'B+',
                label: 'B+',
            },
            {
                value: 'AB+',
                label: 'AB+',
            },
            {
                value: 'AB-',
                label: 'AB-',
            },
        ],
    });

    const [searchSurroundingUsers] = useSearchSurroundingUsersMutation();

    const fetchSurroundingUsers = () => {
        searchSurroundingUsers({
            province: selectedValue.province,
            bloodGroup: encodeURIComponent(selectedValue.bloodGroup),
            limit: 15,
            page: 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
                hideModal();
            })
            .catch(() => {
                hideModal();
            });
    };

    useEffect(() => {
        getProvinces()
            .then((res) => {
                const formatOptions = res?.data?.map((el) => {
                    return {
                        ...el,
                        value: el?.full_name,
                        label: el?.full_name,
                    };
                });
                setOptions((prev) => {
                    return {
                        ...prev,
                        province: formatOptions,
                    };
                });
            })
            .catch((err) => {
                // console.log(err);
            });
    }, []);

    const changeProvince = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                province: selectValue.value,
            };
        });
    };

    const changeBloodGroup = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                bloodGroup: selectValue.value,
            };
        });
    };

    const handleSearch = () => {
        dispatch(resetSurroundingUsersData());
        fetchSurroundingUsers();
    };

    return (
        <div className=" z-[999999] xs:w-full md:w-[700px] xs:h-screen md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow-lg md:shadow-[rgba(0,0,0,0.4)]   relative">
            <div className={`box-zoom-in   h-[100%]  `}>
                <div className="  md:flex-center xs:flex   h-[50px] border-b border-b-[#ccc]">
                    <span
                        className="w-[50px] h-[50px] md:hidden flex-center text-[18px]     hover:bg-[#f1f5f9] cursor-pointer"
                        onClick={hideModal}
                    >
                        <i>
                            <FaArrowLeftLong />
                        </i>
                    </span>
                    <div className="flex items-center md:justify-center md:w-full">
                        <h3 className="text-[18px] font-semibold">Bộ lọc</h3>
                    </div>
                    <span
                        className="w-[36px] xs:hidden md:flex text-[18px] h-[36px] flex-center absolute right-4 top-2 rounded-[50%] bg-[#f1f5f9] cursor-pointer"
                        onClick={hideModal}
                    >
                        <i>
                            <IoMdClose />
                        </i>
                    </span>
                </div>
                <div className="p-2 h-[calc(100%_-_50px)] overflow-y-scroll">
                    <div>
                        {' '}
                        <div>
                            <h3>Thành phố/Tỉnh thành</h3>
                        </div>
                        <Select
                            className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1"
                            onChange={changeProvince}
                            options={options.province}
                            value={selectedValue.province || user?.address?.province}
                            placeholder={selectedValue.province || user?.address?.province}
                            isDisabled={options.province ? false : true}
                        />
                    </div>

                    <div>
                        {' '}
                        <div>
                            <h3>Nhóm máu</h3>
                        </div>
                        <Select
                            className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-1"
                            onChange={changeBloodGroup}
                            options={options.bloodGroup}
                            value={selectedValue.bloodGroup || ''}
                            placeholder={selectedValue.bloodGroup || 'Tất cả'}
                            isDisabled={options.province ? false : true}
                        />
                    </div>
                    <div className="flex-center mt-3">
                        {' '}
                        <button
                            className="px-3 py-1.5 bg-[#386fd6] rounded hover:bg-[#1c5291] text-white w-full"
                            onClick={handleSearch}
                            type="button"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRoundingFilter;
