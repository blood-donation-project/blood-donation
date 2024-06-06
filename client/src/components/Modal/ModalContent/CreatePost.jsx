import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TiWorld } from 'react-icons/ti';
import { IoMdImages } from 'react-icons/io';
import { MdInsertEmoticon } from 'react-icons/md';
import { FaArrowLeftLong } from 'react-icons/fa6';
import TextareaAutosize from 'react-textarea-autosize';

const CreatePost = ({ hideModal }) => {
    const [postContent, setPostContent] = useState({
        textContent: '',
        images: [],
        feeling: '',
    });
    const [imageURls, setImageURLs] = useState([]);

    useEffect(() => {
        if (postContent.images.length > 0) {
            const tempArrayUrls = [];
            postContent.images.forEach((image) => {
                const url = URL.createObjectURL(image);
                tempArrayUrls.push(url);
            });
            setImageURLs(tempArrayUrls);
        }
    }, [postContent.images]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setPostContent((prev) => {
            return {
                ...prev,
                images: files,
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
        setImageURLs([]);
    };

    const handleSubmit = () => {
        // Có API xử lí sau
    };

    return (
        <div className=" z-[9] xs:h-screen xs:w-full md:w-[500px]  md:max-h-[calc(100vh_-_60px)] h-fit  bg-white md:rounded-[10px] md:shadow md:shadow-black  relative">
            <div className=" w-full h-full rounded-[10px]">
                {/* Header */}

                {/* Header PC & Tablet */}
                <div className=" xs:hidden md:block rounded-t-[10px] h-[44px] text-center  border-b boder-b-[#ccc]   bg-white ">
                    <h3 className="font-bold text-[20px]">Tạo bài viết</h3>
                    <div
                        className="w-8 h-8 bg-[#e1e2e4] rounded-[50%] flex-center cursor-pointer absolute right-2 top-2"
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
                        <img
                            className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                            src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYAisZLnEBYIbvQ0jsOhqDgm9L3T8fQEcoRhlX3QTql_rA&oe=664ADFAB    "
                            alt="avatar"
                        />
                    </div>
                    <div className="ml-2">
                        <p className="text-[14px] font-semibold leading-[14px]">Hoàng Xuân Việt</p>
                        <div className="bg-[#e4e6eb] px-2 rounded-md mt-1 flex items-center">
                            <TiWorld />
                            <span className="text-[12px] font-semibold">Bài viết của bạn sẽ đăng công khai</span>
                        </div>
                    </div>
                </div>

                <div className=" py-1  max-h-[calc(100vh_-_212px)] overflow-y-auto ">
                    <div className="  ">
                        <TextareaAutosize
                            value={postContent.textContent}
                            className="w-full bg-transparent px-2 py-1 outline-none resize-none text-[14px]"
                            placeholder="Việt ơi, bạn đang nghĩ gì thế?"
                            onChange={onChangeTextContent}
                        />
                        {/* Image preview */}
                        {imageURls.length > 0 && (
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
                        )}
                    </div>
                </div>
                <div className=" xs:absolute xs:bottom-0 xs:left-0 xs:right-0 rounded-b-[10px] h-[120px] text-center border-t boder-t-[#ababab]  bg-white py-2 px-2">
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
                                        multiple
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
                        <button
                            className="w-full py-2 rounded-[10px] flex-center bg-red-500 hover:bg-red-600  text-white font-semibold text-[17px]"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
