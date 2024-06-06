import React from 'react';

const Contacts = () => {
    return (
        <div className="contacts p-2 flex-1 overflow-y-scroll cursor-default">
            {/* Replace with contacts data mapping */}
            <div className="flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative">
                <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/med/men/75.jpg"
                        alt=""
                    />
                </div>
                <div className="flex-auto text-lg min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                    <p>Jennie Nichols</p>
                    <div className="flex items-center text-sm text-gray-600">
                        <div className="min-w-0">
                            <p className="truncate text-sm">
                                Absolutely! Let's do it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* More contacts */}
        </div>
    );
};

export default Contacts;
