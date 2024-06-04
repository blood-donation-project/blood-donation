import { useState, useRef, useEffect } from 'react';

import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import { IoMdSearch } from 'react-icons/io';
import UserProfileFriend from '../../components/User/UserFriendProfile';

const FriendsPage = () => {
    const [searchText, setSearchText] = useState('');

    const onSearchChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setSearchText(value);
    };

    return (
        <>
            <NavMenu />
            <div className="mt-[56px]  ">
                <div className="max-w-[1150px] mx-auto  px-4 ">
                    <ProfileOverview />
                </div>
                {/* Body content */}
                <div className="bg-gray-200 pt-4 pb-10 min-h-[calc(100vh_-_636px)] ">
                    <div className="max-w-[1150px] mx-auto md:px-4">
                        <div className="bg-white p-4 md:rounded-lg overflow-hidden">
                            {/*  */}
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-[18px] font-bold">Bạn bè</h3>
                                </div>
                                <div>
                                    <div className=" ml-2 px-2 py-[6px] flex bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                                        <IoMdSearch className="text-[#65676B] text-[20px]" />
                                        <input
                                            className="px-1 text-[14px] bg-transparent outline-none"
                                            placeholder="Tìm kiếm "
                                            value={searchText}
                                            onChange={onSearchChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/*  */}
                            <div className="mt-4">
                                <div className=" xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 ">
                                    {new Array(9).fill(0).map((user, i) => {
                                        return <UserProfileFriend key={i} className="p-2" data={null} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendsPage;
