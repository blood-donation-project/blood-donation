import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

const MobileSearch = ({ hideModal }) => {
    const [searchText, setSearchText] = useState('');
    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setSearchText(value);
    };

    const searchInputKeyDown = (e) => {
        if ((e.key === 'Enter' || e.keyCode === 13) && searchText.length > 0) {
            window.location.href = `/search/all?q=${searchText}`;
        }
    };

    return (
        <div className=" z-[9] w-full h-full bg-white relative">
            {/* Header */}
            <div className=" h-[44px] text-center  border-b boder-b-[#ccc]  items-center bg-white flex ">
                <div className="w-[44px] h-full flex-center cursor-pointer hover:bg-[#ebedf0]" onClick={hideModal}>
                    <FaArrowLeftLong />
                </div>
                <div className="px-2 py-2 flex-grow">
                    <div className="   px-2 py-1  bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                        {' '}
                        <input
                            className="px-1 text-[14px] w-full bg-transparent outline-none "
                            placeholder="Tìm kiếm trên ..."
                            value={searchText}
                            onChange={searchInputChange}
                            onKeyDown={searchInputKeyDown}
                        />
                    </div>
                </div>
                <div>
                    <Link
                        className={`px-2 py-2 flex-center  ${searchText.length === 0 ? ' pointer-events-none text-[#65676B] cursor-default  ' : '  cursor-pointer hover:bg-[#ebedf0]'}`}
                        to={'/search/all?q=21'}
                        onClick={(e) => {
                            if (searchText.length === 0) e.preventDefault();
                        }}
                    >
                        <IoSearchSharp />
                    </Link>
                </div>
            </div>
            {/* Content */}
            <div className=" overflow-y-auto w-full h-full rounded-[10px]">
                <div>
                    {/* Map search result here (max 7-8 result) */}
                    {searchText && (
                        <Link
                            className="flex p-1.5 hover:bg-[#ebedf0] items-center  "
                            to={`/search/all?q=${searchText}`}
                        >
                            <div className="w-9 h-9 flex-center rounded-[50%] bg-[#ebedf0]">
                                <IoMdSearch className="text-[#65676B] text-[20px]" />
                            </div>
                            <div className="ml-2">
                                <p className="text-[14px] leading-[14px]">{searchText}</p>
                            </div>
                        </Link>
                    )}
                    <Link className="flex p-1.5 hover:bg-[#ebedf0]  rounded-md " to={'/'}>
                        <div>
                            <img
                                className="w-9 h-9 rounded-[50%]"
                                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                alt="avatar"
                            />
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] leading-[14px]">Hoa Nguyen</p>
                            <span className="text-[12px]">Bạn bè</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
