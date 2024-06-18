import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong, FaSpinner } from 'react-icons/fa6';

import { IoSearchSharp } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useSearchUsersMutation } from '../../../Redux/features/search/searchAPI';
import useDebounce from '../../../hooks/useDebounce';
import UserSearch from '../../User/UserSearch';
import { setUsersSearch } from '../../../Redux/features/search/searchSlice';

const MobileSearch = ({ hideModal }) => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');

    const { usersData } = useSelector((state) => state.search);
    const [searchUsers, { isLoading }] = useSearchUsersMutation();

    const debounce = useDebounce(searchText, 500);
    useEffect(() => {
        if (!debounce) {
            return;
        }
        searchUsers({ q: debounce, limit: 5, page: 1 }).unwrap();
    }, [debounce]);

    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) dispatch(setUsersSearch({ data: [] }));

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
                    <div className="grid p-2">
                        {searchText && (
                            <Link
                                className="flex p-1.5 hover:bg-[#ebedf0] items-center  rounded-md "
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
                        {isLoading ? (
                            <div className="w-full py-2 flex-center ">
                                <div className="spinner text-[#65676B]">
                                    <FaSpinner />
                                </div>
                            </div>
                        ) : (
                            usersData.map((user, index) => {
                                return <UserSearch key={index} userData={user} />;
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
