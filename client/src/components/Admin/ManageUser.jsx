import { Popconfirm, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline, IoFilter } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { CiUnlock } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';
import { useGetAllUserMutation, useLockorUnlockUserMutation } from '../../Redux/features/user/userAPI';
import Menu from './Menu';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';
import { toast } from 'react-toastify';
const ManageUser = () => {
    const [tokenRefreshed, setTokenRefreshed] = useState(false); // State để theo dõi việc làm mới token
    useAutoRefreshToken('/api/user/get-user-by-months', setTokenRefreshed); // Truyền setTokenRefreshed vào useAutoRefreshToken

    const [getAllUsers, { data: userData }] = useGetAllUserMutation();
    const [handleLockUser] = useLockorUnlockUserMutation();
    const [input, setInput] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isOpenFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const formData = {
                searchTerm: input,
                role: selectedRoles,
                block: isBlocked,
            };
            const fetchData = async () => {
                try {
                    await getAllUsers(formData).unwrap();
                } catch (error) {
                    console.log(error);
                    if (error?.data?.message === 'You are not Admin') {
                        toast.error('Bạn không có quyền truy cập trang này!');
                        navigate('/');
                    }
                }
            };
            fetchData();
        }
    }, [getAllUsers, tokenRefreshed, input, selectedRoles, isBlocked]);

    // Tìm kiếm
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            searchTerm: input,
            role: selectedRoles,
            block: isBlocked,
        };
        try {
            await getAllUsers(formData).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(role) ? prevRoles.filter((r) => r !== role) : [...prevRoles, role],
        );
    };

    const handleBlockChange = (e) => {
        setIsBlocked(e.target.checked);
    };
    const handleCheckboxChange = (e) => {
        if (e.target.id === 'isBlock') {
            setIsBlocked(e.target.checked);
        } else {
            handleRoleChange(e);
        }
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        const formData = {
            searchTerm: input,
            role: selectedRoles,
            block: isBlocked,
        };
        try {
            await getAllUsers(formData).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUser = async () => {
        try {
            await handleLockUser(userId).unwrap();
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen">
            <Menu activeComponent={'user'} />

            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Quản lý người dùng</h1>
                </div>
                <div className="p-4 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl w-full p-4 shadow-sm">
                        <div>
                            <div className="  ">
                                <div className="bg-gray-100 flex items-center rounded-xl border-2">
                                    <IoSearchOutline className="ml-3 mr-1 w-5 h-5" />
                                    <input
                                        className="w-[90%] bg-gray-100 rounded-xl p-1 outline-none"
                                        placeholder="Tìm kiếm người dùng"
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSubmit(e);
                                        }}
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                            {/* Filter Users */}
                            <div>
                                <div
                                    onClick={() => setOpenFilter(!isOpenFilter)}
                                    className="my-4 flex w-fit items-center gap-1 hover:underline hover:text-blue-500 text-sm ml-2 text-blue-400 cursor-pointer transition-all duration-300"
                                >
                                    <IoFilter />
                                    <p>Lọc người dùng</p>
                                </div>
                                <div className={`${isOpenFilter ? '' : 'hidden'} mb-2`}>
                                    <ul className="flex gap-2">
                                        <li className="w-fit">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="nguoihienmau"
                                                value={'Người hiến máu'}
                                                className="hidden peer"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRoles.includes('Người hiến máu')}
                                            />
                                            <label
                                                htmlFor="nguoihienmau"
                                                className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                Người hiến máu
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="nguoicanmau"
                                                value={'Người cần máu'}
                                                className="hidden peer"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRoles.includes('Người cần máu')}
                                            />
                                            <label
                                                htmlFor="nguoicanmau"
                                                className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                Người cần máu
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                name=""
                                                value={'Cơ sở y tế'}
                                                id="cosoyte"
                                                className="hidden peer"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRoles.includes('Cơ sở y tế')}
                                            />
                                            <label
                                                htmlFor="cosoyte"
                                                className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                Cơ sở y tế
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                id="isBlock"
                                                className="hidden peer"
                                                onChange={handleBlockChange}
                                                checked={isBlocked}
                                            />
                                            <label
                                                htmlFor="isBlock"
                                                className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                Đã khóa
                                            </label>
                                        </li>
                                    </ul>
                                    <button
                                        onClick={handleFilter}
                                        className="my-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                                    >
                                        Xác Nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{ overflowX: 'auto', overflowY: 'auto' }} className="w-full h-[500px]">
                            <table className="border w-full ">
                                <tr className="sticky -top-1 bg-white shadow-sm">
                                    <td className="w-[35%] text-start py-2 font-medium">
                                        <span className="ml-5">Tên Người Dùng ({userData?.length})</span>
                                    </td>
                                    <td className="w-[25%] text-start ml-5 ">
                                        <span className="ml-5">Vai trò</span>
                                    </td>
                                    <td className="w-[40%] ">Tình trạng tài khoản</td>
                                </tr>
                                {/* Map here */}
                                {userData?.map((item, index) => (
                                    <tr key={index} className="border content-center">
                                        <td className="py-3 ">
                                            <Link to={`/user/${item?._id}`} className="gap-2 flex items-center ml-5 ">
                                                <img className="w-10 h-10 rounded-full" src={item?.avatar} alt="" />
                                                <p className="hover:underline">{item?.username}</p>
                                            </Link>
                                        </td>
                                        <td className="text-start text-gray-600">
                                            <p className="ml-5">{item?.role}</p>
                                        </td>
                                        <td className="text-center content-center ">
                                            <div className="flex justify-between items-center ">
                                                {item?.block === false ? (
                                                    <p className="p-1 px-3 w-fit bg-[#ccebc5] text-gray-800 rounded-xl">
                                                        Hoạt động
                                                    </p>
                                                ) : (
                                                    <p className="p-1 px-3 w-fit bg-[#ffc2c2] text-gray-800 rounded-xl">
                                                        Đã khóa
                                                    </p>
                                                )}

                                                <Popconfirm
                                                    title={`${item?.block ? 'Mở khóa tài khoản' : 'Khóa tài Khoản'}`}
                                                    description={`${
                                                        item?.block
                                                            ? 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
                                                            : 'Bạn có chắc chắn muốn khóa tài khoản này không?'
                                                    }`}
                                                    onConfirm={handleUser}
                                                    okText="Có"
                                                    cancelText="Không"
                                                >
                                                    <div
                                                        onClick={() => setUserId(item?._id)}
                                                        className="p-2 mr-10 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full"
                                                    >
                                                        {item?.block === false ? (
                                                            <CiUnlock className="w-6 h-6" />
                                                        ) : (
                                                            <CiLock className="w-6 h-6" />
                                                        )}
                                                    </div>
                                                </Popconfirm>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
