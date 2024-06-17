import { useEffect, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TiWorld } from 'react-icons/ti';
import { IoMdImages } from 'react-icons/io';
import { MdInsertEmoticon } from 'react-icons/md';
import { FaArrowLeftLong } from 'react-icons/fa6';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from 'react-redux';

import { useCreatePostMutation } from '../../../Redux/features/post/postAPI';
import Avatar from '../../Image/Avatar';
import Image from '../../Image/Image';
import { FaSpinner } from 'react-icons/fa';
import getLastName from '../../../utils/getLastName';

const CreatePost = ({ hideModal }) => {
    const inputRef = useRef();
    const [postContent, setPostContent] = useState({
        textContent: '',
        image: null,
        feeling: '',
    });
    const [imageURl, setImageURL] = useState('');

    const [createPost, { isLoading }] = useCreatePostMutation();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (postContent.image) {
            setImageURL(URL.createObjectURL(postContent.image));
        }
    }, [postContent.image]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostContent((prev) => {
            return {
                ...prev,
                image: file,
            };
        });
    };

    const onChangeTextContent = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setPostContent((prev) => {
            return {
                ...prev,
                textContent: value,
            };
        });
    };

    const clearImage = () => {
        setPostContent((prev) => {
            return {
                ...prev,
                images: [],
            };
        });
        setImageURL('');
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('content', postContent.textContent);
        formData.append('feeling', postContent.feeling);
        formData.append('image', postContent.image);
        createPost(formData)
            .unwrap()
            .then(() => {
                hideModal();
            });
    };
    return (
        <div className=" z-[9] xs:h-screen xs:w-full md:w-[500px]  md:max-h-[calc(100vh_-_60px)] h-fit  bg-white md:rounded-[10px] md:shadow-md md:shadow-[rgba(0,0,0,0.5)] relative">
            <div className=" w-full h-full rounded-[10px]">
                {/* Header */}

                {/* Header PC & Tablet */}
                <div className=" xs:hidden md:flex justify-center items-center rounded-t-[10px] h-[44px] text-center  border-b boder-b-[#ccc]   bg-white ">
                    <h3 className="font-bold text-[20px]">Tạo bài viết</h3>
                    <div
                        className="w-8 h-8 bg-[#e1e2e4] rounded-[50%] flex-center cursor-pointer absolute right-2 top-2 hover:bg-[#d2d2d2]"
                        onClick={hideModal}
                    >
                        <IoMdClose />
                    </div>
                </div>

                {/* Header mobile */}
                <div className="md:hidden flex items-center rounded-t-[10px] h-[44px]  border-b boder-b-[#ccc]   bg-white ">
                    <div className="w-[44px] h-full hover:bg-[#e1e2e4]  flex-center cursor-pointer" onClick={hideModal}>
                        <FaArrowLeftLong />
                    </div>
                    <h3 className="font-semibold text-[18px]">Tạo bài viết</h3>
                </div>

                {/* Content */}
                <div className="flex items-center w-full bg-white   pl-2 py-1.5 rounded-md" to="/">
                    <div>
                        <Avatar className="w-9 h-9 rounded-[50%] border border-[#ccc]" src={user.avatar} alt="avatar" />
                    </div>
                    <div className="ml-2">
                        <p className="text-[14px] font-semibold leading-[14px]">{user.username}</p>
                        <div className="bg-[#e4e6eb] px-1 rounded-md mt-1 flex items-center text-[#65676B]">
                            <TiWorld />
                            <span className="text-[12px] font-semibold ml-1 ">Bài viết của bạn sẽ đăng công khai</span>
                        </div>
                    </div>
                </div>

                <div className=" py-1  max-h-[calc(100vh_-_212px)] overflow-y-auto ">
                    <div className="  ">
                        <TextareaAutosize
                            ref={inputRef}
                            value={postContent.textContent}
                            className="w-full bg-transparent px-2 py-1 outline-none resize-none text-[14px]"
                            placeholder={getLastName(user.username) + ' ơi, bạn đang nghĩ gì thế?'}
                            onChange={onChangeTextContent}
                        />
                        {/* Images preview */}
                        {imageURl && (
                            <div className="px-2 pt-2 relative">
                                <div
                                    className="w-7 h-7 bg-white rounded-[50%] flex-center cursor-pointer absolute right-6 top-6"
                                    onClick={clearImage}
                                >
                                    <IoMdClose className="text-[18px]" />
                                </div>
                                <div className="border border-[#ccc] rounded-lg px-2 py-3 ">
                                    <Image className="w-full" src={imageURl} alt="Img preview" />;
                                </div>
                            </div>
                        )}
                        {/* {imageURls.length > 0 && (
                            <div className="px-2 pt-2 relative">
                                <div
                                    className="w-7 h-7 bg-white rounded-[50%] flex-center cursor-pointer absolute right-6 top-6"
                                    onClick={clearImage}
                                >
                                    <IoMdClose className="text-[18px]" />
                                </div>
                                <div className="border border-[#ccc] rounded-lg px-2 py-3 ">
                                    {imageURls.map((imgURL) => {
                                        return <img className="w-full" src={imgURL} alt="Img preview" />;
                                    })}
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>

                <div className=" xs:absolute xs:bottom-0 xs:left-0 xs:right-0 rounded-b-[10px] h-[120px] border-t boder-t-[#ababab]  bg-white py-2 px-2">
                    <div className="border border-[#ccc] rounded-[8px] px-2 py-3">
                        <div className="flex items-center">
                            <span className="text-[14px] font-semibold">Thêm vào bài viết của bạn</span>
                            <div className="flex ml-4">
                                <label
                                    className="relative mr-2 cursor-pointer text-[18px] text-green-500 p-1 rounded-[50%] hover:bg-[#ebedf0]"
                                    htmlFor="image"
                                >
                                    <IoMdImages />
                                    <input
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        className=" opacity-0 w-[0.1px] h-[0.1px] absolute"
                                        id="image"
                                        onChange={handleImageChange}
                                    />
                                </label>
                                <div className="mr-2 cursor-pointer text-[18px] text-orange-500 p-1 rounded-[50%] hover:bg-[#ebedf0]">
                                    <MdInsertEmoticon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        {isLoading ? (
                            <button className="w-full disabled: py-2 rounded-[10px] flex-center bg-[#a0bef6] cursor-default  text-white font-semibold text-[17px]">
                                <div className="spinner">
                                    <FaSpinner />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="w-full py-2 rounded-[10px] flex-center bg-[#386fd6] hover:bg-[#1c5291]  text-white font-semibold text-[17px]"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Đăng
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
