import React from 'react';
import { FiSearch } from "react-icons/fi";

const Searchbox = () => {
    return (
        <div className="search-box p-4 flex-none">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                    <label>
                        <input
                            className="rounded-full text-lg py-2 pr-6 pl-10 w-full border border-gray-400 focus:outline-none  focus:shadow-md transition duration-300 ease-in"
                            type="text"
                            placeholder="Tìm kiếm..."
                        />
                        <span className="absolute  top-0 left-0 mt-[13px] ml-4 inline-block">
                            <FiSearch />
                        </span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Searchbox;
