import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { FaPen, FaSpinner } from 'react-icons/fa';

import Select from 'react-select';
import { FaArrowLeftLong } from 'react-icons/fa6';

import Image from '../../Image/Image';
import Avatar from '../../Image/Avatar';

import { getDistrictsByProvinceId, getProvinces, getWardsByDistrictId } from '../../../services/locationServices';
import axios from 'axios';
import { useUpdateUserMutation } from '../../../Redux/features/user/userAPI';
import { useAutoRefreshToken } from '../../../hooks/useAutoRefreshToken';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Switch } from 'antd';

const UpdateProfile = ({ accountId, hideModal, isShowing }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const [updateUser] = useUpdateUserMutation();
    const [status, setStatus] = useState(user?.status);
    const [loading, setLoading] = useState(false);
    const [avatarURL, setAvatarURL] = useState('');
    const [backgroundImageURL, setBackgroundImageURL] = useState('');
    const [selectedValue, setSelectedValue] = useState({
        province: null,
        district: null,
        wards: null,
    });
    useAutoRefreshToken('/home/');

    console.log(user);

    const [profileData, setProfileData] = useState({
        fullName: '',
        identification: '',
        avatar: null,
        backgroundImage: null,
        address: {
            province: '', // Store the selected province object
            district: '', // Store the selected district object
            ward: '', // Store the selected ward object
        },
        street: '',
        phone: '',
        bloodType: '',
        role: '',
    });

    useEffect(() => {
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            fullName: user?.username,
            identification: user?.identification,
            avatar: user?.avatar,
            backgroundImage: user?.backgroundImage,
            address: {
                province: user?.address?.province, // Store the selected province object
                district: user?.address?.district, // Store the selected district object
                ward: user?.ward, // Store the selected ward object
            },
            street: user?.address?.street,
            phone: user?.phoneNumber,
            bloodType: user?.bloodGroup,
            role: user?.role,
        }));
    }, [user]);

    const [options, setOptions] = useState({
        province: undefined,
        district: undefined,
        wards: undefined,
    });

    const [submitError, setSubmitError] = useState({
        status: false,
        message: '',
    });

    useEffect(() => {
        getProvinces()
            .then((res) => {
                const formatOptions = res?.data?.map((el) => {
                    return {
                        ...el,
                        value: el?.id,
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
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (selectedValue.province) {
            getDistrictsByProvinceId(selectedValue.province.id)
                .then((res) => {
                    const formatOptions = res?.data?.map((el) => {
                        return {
                            ...el,
                            value: el?.id,
                            label: el?.full_name,
                        };
                    });
                    setOptions((prev) => {
                        return {
                            ...prev,
                            district: formatOptions,
                        };
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [selectedValue.province]);

    useEffect(() => {
        if (selectedValue.district) {
            getWardsByDistrictId(selectedValue.district.id)
                .then((res) => {
                    const formatOptions = res?.data?.map((el) => {
                        return {
                            ...el,
                            value: el?.id,
                            label: el?.full_name,
                        };
                    });
                    setOptions((prev) => {
                        return {
                            ...prev,
                            wards: formatOptions,
                        };
                    });
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    }, [selectedValue.district]);
    useEffect(() => {
        // Kiểm tra xem selectedValue đã có đầy đủ thông tin hay chưa

        if (selectedValue.province || selectedValue.district || selectedValue.wards) {
            setProfileData((prev) => ({
                ...prev,
                address: {
                    province: selectedValue.province,
                    district: selectedValue.district,
                    ward: selectedValue.wards,
                },
            }));
        }
    }, [selectedValue]);

    const changeProvince = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                province: selectValue,
                district: '',
            };
        });
    };

    const changeDistrict = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                district: selectValue,
                wards: '',
            };
        });
    };

    const changeWards = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                wards: selectValue,
            };
        });
    };

    const handleAvatarChange = (e) => {
        if (e.target.files) {
            const imageFile = e.target.files[0];
            setAvatarURL(URL.createObjectURL(imageFile));
            setProfileData((prev) => ({ ...prev, avatar: imageFile }));
        }
    };
    const handleBackgroundChange = (e) => {
        if (e.target.files) {
            const imageFile = e.target.files[0];
            setBackgroundImageURL(URL.createObjectURL(imageFile));
            setProfileData((prev) => ({ ...prev, backgroundImage: imageFile }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeStatus = (checked) => {
        setStatus(checked);
    };

    const clearForm = () => {
        reset();
    };
    console.log(status);
    const handleSubmitForm = async (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', profileData.avatar);
        formData.append('backgroundImage', profileData.backgroundImage);
        let avatarUrl;
        let backgroundUrl;
        try {
            const response = await axios.post('http://localhost:3001/news/upload-images', formData);
            avatarUrl = response.data.images.avatar;
            backgroundUrl = response.data.images.backgroundImage;
            console.log(avatarURL);
            console.log(backgroundUrl);
        } catch (error) {}
        const updateUserr = {
            username: profileData.fullName,
            identification: profileData.identification,
            avatar: avatarUrl,
            backgroundImage: backgroundUrl,
            street: profileData.street,
            province: profileData.address?.province?.full_name,
            district: profileData.address?.district?.full_name,
            ward: profileData.address?.ward?.full_name,
            phoneNumber: profileData.phone,
            bloodGroup: profileData.bloodType,
            role: profileData.role,
            status: status,
        };
        try {
            await updateUser(updateUserr).unwrap();
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" z-[999999] xs:w-full md:w-[700px] xs:h-screen md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow-lg md:shadow-[rgba(0,0,0,0.4)]   relative">
            <ToastContainer
                className={'z-[999999]'}
                position="top-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                        <h3 className="text-[18px] font-semibold">Chỉnh sửa trang cá nhân</h3>
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
                <div className="px-4 h-[calc(100%_-_50px)] overflow-y-scroll">
                    <form className="w-full mx-[auto]" onSubmit={handleSubmit(handleSubmitForm)}>
                        {/* Avatar */}
                        <div className="w-full mb-3 py-2">
                            <h3 className="text-[18px] font-semibold">Ảnh đại diện</h3>
                            <div className="py-[10px]  flex-center">
                                <div className="relative">
                                    <label htmlFor="avatar" className=" cursor-pointer contents">
                                        <Avatar
                                            className="w-[120px] h-[120px] rounded-[50%] object-cover"
                                            src={avatarURL || user?.avatar}
                                            alt=""
                                        />
                                    </label>
                                    <input
                                        id="avatar"
                                        className="block w-[1px] h-[1px] invisible absolute z-[-1]"
                                        type="file"
                                        {...register('image')}
                                        accept="image/jpg, imgage/png"
                                        onInput={handleAvatarChange}
                                        onChange={handleAvatarChange}
                                    />
                                    <label
                                        htmlFor="avatar"
                                        className="bg-white text-[#323232] absolute text-[18px] bottom-[10px] right-[6px] w-[30px] h-[30px] bg-bgr-white-color flex-center border-[1.5px] cursor-pointer border-[#ccc] rounded-[50%]"
                                    >
                                        <FaPen />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Background image */}
                        <div className="w-full mb-3 py-2">
                            <h3 className="text-[18px] font-semibold">Ảnh bìa</h3>
                            <div className="py-[10px]  flex-center">
                                <div className="relative w-[70%] h-[150px] ">
                                    <label htmlFor="backgroundImage" className=" cursor-pointer contents">
                                        <Image
                                            className="w-full h-full object-cover"
                                            src={backgroundImageURL || user?.backgroundImage}
                                            alt=""
                                        />
                                    </label>
                                    <input
                                        id="backgroundImage"
                                        className="block w-[1px] h-[1px] invisible absolute z-[-1]"
                                        type="file"
                                        {...register('backgroundImage')}
                                        accept="image/jpg, imgage/png"
                                        onInput={handleBackgroundChange}
                                    />
                                    <label
                                        htmlFor="backgroundImage"
                                        className="bg-white text-[#323232] absolute text-[18px] bottom-[10px] right-[6px] w-[30px] h-[30px] bg-bgr-white-color flex-center border-[1.5px] cursor-pointer border-[#ccc] rounded-[50%]"
                                    >
                                        <FaPen />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Full name */}
                        <div className="md:flex-row xs:flex-col w-full flex justify-between mb-3">
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Họ và Tên </label>
                                <input
                                    className={`block outline-none border-b ${
                                        errors.fullName ? 'border-bottom-error' : 'border-[#ccc]'
                                    }  w-full py-[2px] mt-[2px]`}
                                    type="text"
                                    {...register('fullName', {
                                        minLength: 1,
                                    })}
                                    onChange={handleInputChange}
                                    defaultValue={user?.username}
                                    placeholder="Nhập họ và tên"
                                />
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Căn cước công dân </label>
                                <input
                                    className={`block outline-none border-b ${
                                        errors.identification ? 'border-bottom-error' : 'border-[#ccc]'
                                    }  w-full py-[2px] mt-[2px]`}
                                    type="text"
                                    {...register('identification', {
                                        minLength: 1,
                                        pattern: /^[0-9]{9}$|^[0-9]{12}$/,
                                    })}
                                    onChange={handleInputChange}
                                    defaultValue={user?.identification}
                                    placeholder="Nhập căn cước công dân"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="md:flex-row xs:flex-col w-full flex justify-between mb-3">
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0 ">
                                <label htmlFor="">Số điện thoại </label>
                                <input
                                    className={`block outline-none border-b ${
                                        errors.phone ? 'border-bottom-error' : 'border-[#ccc]'
                                    }  w-full py-[2px] mt-[2px]`}
                                    type="text"
                                    {...register('phone', {
                                        pattern: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
                                    })}
                                    onChange={handleInputChange}
                                    defaultValue={user?.phoneNumber}
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <div className="">
                                    <span className="text-[17px]">Địa chỉ</span>
                                    <div className="w-full border-b border-b-[#ccc] ">
                                        <input
                                            className={
                                                'w-full outline-none py-1 ' + `${errors.street ? 'border-error' : ''}`
                                            }
                                            type="text"
                                            {...register('street', {})}
                                            placeholder="Số nhà, đường, v.v*"
                                            defaultValue={user?.address?.street}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="w-full ">
                            <div className="xs:flex-col md:flex-row flex justify-between">
                                <div className="mb-3">
                                    <span>Tỉnh/Thành phố</span>
                                    <Select
                                        onChange={changeProvince}
                                        options={options.province}
                                        value={selectedValue.province || user?.address?.province}
                                        placeholder={user?.address?.province || 'Chọn Tỉnh/Thành Phố'}
                                        isDisabled={options.province ? false : true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <span>Quận/Huyện</span>
                                    <Select
                                        options={options.district}
                                        onChange={changeDistrict}
                                        value={selectedValue.district || user?.address?.district}
                                        placeholder={user?.address?.district || 'Chọn Quận/Huyện'}
                                        isDisabled={options.district ? false : true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <span>Xã/Phường</span>
                                    <Select
                                        onChange={changeWards}
                                        options={options.wards}
                                        value={selectedValue.wards || user?.address?.ward}
                                        placeholder={user?.address?.ward || 'Chọn Xã/Phường'}
                                        isDisabled={options.wards ? false : true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/*Blood type*/}

                        <div
                            className={`${user?.role === 'admin' || user?.role === 'Cơ sở y tế' ? 'hidden' : 'md:flex-row xs:flex-col flex '}   w-full justify-between mb-3`}
                        >
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Vai trò </label>
                                <select
                                    className="block w-full outline-none border border-[#ccc] py-[2px] mt-[2px]"
                                    {...register('role')}
                                    defaultValue={user?.role}
                                    disabled={user?.role === 'Cơ sở y tế'}
                                    onChange={handleInputChange}
                                >
                                    <option value={user?.role}>{user?.role}</option>
                                    <option defaultChecked={true} value="Người hiến máu">
                                        Người hiến máu
                                    </option>
                                    <option value="Người cần máu">Người cần máu</option>
                                </select>
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Nhóm máu </label>
                                <select
                                    className="block w-full outline-none border border-[#ccc] py-[2px] mt-[2px]"
                                    {...register('bloodType')}
                                    defaultValue={profileData.bloodType}
                                    disabled={user?.role === 'Cơ sở y tế'}
                                    onChange={handleInputChange}
                                >
                                    {user?.bloodGroup ? (
                                        <option value={user?.bloodGroup}>{user?.bloodGroup}</option>
                                    ) : (
                                        <option value="Null">Không xác định</option>
                                    )}

                                    <option defaultChecked={true} value="A+">
                                        A+
                                    </option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <p>Sẵn sàng hiến máu</p>
                            <Switch onChange={handleChangeStatus} defaultChecked={status} />
                        </div>
                        <div className="w-full ">
                            <div className="w-full flex justify-end px-4 py-5">
                                <button className="ml-4 w-[117px] py-1 bg-red-500 rounded text-white" type="submit">
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
