import React from 'react';
import schedule from '../../assets/img/schedule.png';
import '../event/style.css';
import { Link } from 'react-router-dom';
import ListEvent from './ListEvent';
const SearchEvent = ({ eventData, userData }) => {
    return (
        <div>
            <div className="max-w-7xl h-full m-auto py-4">
                {/* Count Event */}

                <div className="flex flex-none justify-end items-center">
                    <Link to={'/events/manage-events'}>
                        <button className="p-4 bg-green-600 hover:bg-green-500 rounded-lg text-white outline-none">
                            Sự kiện của bạn
                        </button>
                    </Link>
                </div>
                {eventData?.count !== 0 ? (
                    <div>
                        <h1 className="text-2xl text-black">
                            Khám phá sự kiện <br />
                            <span className="text-[16px]">
                                {eventData?.count} Kết Quả
                            </span>
                        </h1>

                        <div className="mt-10">
                            {/* Map */}
                            {eventData?.events?.map((item, index) => (
                                <ListEvent
                                    key={item?._id}
                                    image={item?.image}
                                    avatar={item?.userId?.avatar}
                                    eventName={item?.eventName}
                                    centerName={item?.userId?.username}
                                    street={item?.address?.street}
                                    ward={item?.address?.ward}
                                    district={item?.address?.district}
                                    province={item?.address?.province}
                                    donationTime={item?.donationTime}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    eventId={item?._id}
                                    buttonName={`${
                                        userData?.role === 'Medical facility'
                                            ? 'Xem thêm'
                                            : 'Tham Gia'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className=" overflow-y-hidden">
                        <h1 className="text-2xl px-10 pt-10 text-[#1C5291]">
                            0 Kết quả
                        </h1>
                        <div className="flex justify-center items-center flex-col h-full">
                            <img
                                src={schedule}
                                alt=""
                            />
                            <p className="text-lg text-[#7a7a7a]">
                                Không tìm thấy kết quả nào
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchEvent;
