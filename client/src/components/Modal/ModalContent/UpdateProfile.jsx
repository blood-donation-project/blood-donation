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

const UpdateProfile = ({ accountId, hideModal, isShowing }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});
    const [loading, setLoading] = useState(false);
    const [avatarURL, setAvatarURL] = useState('');
    const [backgroundImageURL, setBackgroundImageURL] = useState('');
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        avatar: null,
        backgroundImage: null,
        birth: '',
        gender: '',
        address: '',
        phone: '',
        bloodType: '',
        role: '',
    });

    const [options, setOptions] = useState({
        province: undefined,
        district: undefined,
        wards: undefined,
    });
    const [selectedValue, setSelectedValue] = useState({
        province: null,
        district: null,
        wards: null,
    });

    const [submitError, setSubmitError] = useState({
        status: false,
        message: '',
    });

    useEffect(() => {
        getProvinces()
            .then((res) => {
                const formatOptions = res.map((el) => {
                    return {
                        ...el,
                        value: el.name,
                        label: el.name,
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
            getDistrictsByProvinceId(selectedValue.province.idProvince)
                .then((res) => {
                    const formatOptions = res.map((el) => {
                        return {
                            ...el,
                            value: el.name,
                            label: el.name,
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
            getWardsByDistrictId(selectedValue.district.idDistrict)
                .then((res) => {
                    const formatOptions = res.map((el) => {
                        return {
                            ...el,
                            value: el.name,
                            label: el.name,
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
                    console.log(err);
                });
        }
    }, [selectedValue.district]);

    const changeProvince = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                province: selectValue,
            };
        });
    };

    const changeDistrict = (selectValue) => {
        setSelectedValue((prev) => {
            return {
                ...prev,
                district: selectValue,
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
        }
        clearSubmitError();
    };

    const handleBackgroundChange = (e) => {
        if (e.target.files) {
            const imageFile = e.target.files[0];
            setBackgroundImageURL(URL.createObjectURL(imageFile));
        }
        clearSubmitError();
    };

    const clearForm = () => {
        reset();
    };

    const clearSubmitError = () => {
        setSubmitError((prev) => {
            return {
                ...prev,
                status: false,
                message: '',
            };
        });
    };

    const handleSubmitForm = (data) => {
        // console.log(data);
    };

    return (
        <div className=" z-[9] xs:w-full md:w-[700px] xs:h-screen md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow-lg md:shadow-[rgba(0,0,0,0.4)]   relative">
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
                                            src={avatarURL}
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
                                        <Image className="w-full h-full object-cover" src={backgroundImageURL} alt="" />
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
                                <label htmlFor="">Họ </label>
                                <input
                                    className={`block outline-none border-b ${
                                        errors.firstName ? 'border-bottom-error' : 'border-[#ccc]'
                                    }  w-full py-[2px] mt-[2px]`}
                                    type="text"
                                    {...register('firstName', { required: true, minLength: 1 })}
                                    defaultValue={profileData.firstName}
                                    onInput={clearSubmitError}
                                    placeholder="Nhập họ"
                                />
                                {errors.firstName && (
                                    <span className="text-red-500 text-[14px]">Họ không được để trống</span>
                                )}
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Tên </label>
                                <input
                                    className={`block outline-none border-b ${
                                        errors.lastName ? 'border-bottom-error' : 'border-[#ccc]'
                                    }  w-full py-[2px] mt-[2px]`}
                                    type="text"
                                    {...register('lastName', { required: true, minLength: 1 })}
                                    onInput={clearSubmitError}
                                    defaultValue={profileData.lastName}
                                    placeholder="Nhập tên"
                                />
                                {errors.lastName && (
                                    <span className="text-red-500 text-[14px]">Tên không được để trống</span>
                                )}
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
                                    {...register('phone', { required: true, pattern: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/ })}
                                    defaultValue={profileData.phone}
                                    onInput={clearSubmitError}
                                    placeholder="Nhập số điện thoại"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-[14px]">Số điện thoại không hợp lệ !</span>
                                )}
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <div className="">
                                    <span className="text-[17px]">Địa chỉ</span>
                                    <div className="w-full border-b border-b-[#ccc] ">
                                        <input
                                            className={
                                                'w-full outline-none py-1 ' + `${errors.address ? 'border-error' : ''}`
                                            }
                                            type="text"
                                            {...register('address', { required: true })}
                                            placeholder="Số nhà, đường, v.v*"
                                        />
                                    </div>
                                    {errors.address && (
                                        <span className="text-red-500 text-[14px]">Không được để trống</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="w-full ">
                            <div className="xs:flex-col md:flex-row flex justify-between">
                                <div className="mb-3">
                                    <span>Tỉnh/Thành phố</span>
                                    <Select
                                        value={selectedValue.province}
                                        onChange={changeProvince}
                                        options={options.province}
                                        placeholder="Chọn tỉnh thành"
                                        isDisabled={options.province ? false : true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <span>Quận/Huyện</span>
                                    <Select
                                        value={selectedValue.district}
                                        onChange={changeDistrict}
                                        options={options.district}
                                        placeholder="Chọn quận huyện"
                                        isDisabled={options.district ? false : true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <span>Xã/Phường</span>
                                    <Select
                                        value={selectedValue.wards}
                                        onChange={changeWards}
                                        options={options.wards}
                                        placeholder="Chọn xã phường"
                                        isDisabled={options.wards ? false : true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/*Blood type*/}
                        <div className="md:flex-row xs:flex-col  w-full flex justify-between mb-3">
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Vai trò </label>
                                <select
                                    className="block w-full outline-none border border-[#ccc] py-[2px] mt-[2px]"
                                    {...register('role')}
                                    defaultValue={profileData.role}
                                    onInput={clearSubmitError}
                                >
                                    <option defaultChecked={true} value="R2">
                                        Người hiến máu
                                    </option>
                                    <option value="R3">Người nhận máu</option>
                                </select>
                            </div>
                            <div className="xs:w-full md:w-[45%] xs:mt-2 md:mt-0">
                                <label htmlFor="">Nhóm máu </label>
                                <select
                                    className="block w-full outline-none border border-[#ccc] py-[2px] mt-[2px]"
                                    {...register('bloodType')}
                                    defaultValue={profileData.bloodType}
                                    onInput={clearSubmitError}
                                >
                                    <option value="Null">Không xác định</option>
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

                        {submitError.status && <span className="text-red-color">{submitError.message}</span>}
                        <div className="w-full ">
                            <div className="w-full flex justify-end px-4 py-5">
                                <button
                                    className=" px-7 py-1 border border-[#ccc] hover:bg-[#d2d2d2] rounded bgr-hover-color"
                                    type="button"
                                    onClick={clearForm}
                                >
                                    Xóa bỏ
                                </button>
                                {loading ? (
                                    <button
                                        className="ml-4 w-[117px] py-1  rounded text-white bg-[#386fd6] flex-center"
                                        type="submit"
                                        disabled
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="spinner flex">
                                            <FaSpinner />
                                        </i>
                                    </button>
                                ) : (
                                    <button
                                        className="ml-4 w-[117px] py-1 bg-[#386fd6] hover:bg-[#1c5291] rounded text-white"
                                        type="submit"
                                        disabled={submitError.status}
                                    >
                                        Chỉnh sửa
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
