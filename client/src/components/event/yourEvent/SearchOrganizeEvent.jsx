import React from 'react';
import { parse } from 'date-fns';
import moment from 'moment';
import ListEvent from '../ListEvent';
import schedule from '../../../assets/img/schedule.png';
const SearchOrganizeEvent = ({ eventDataById, title, tab, role }) => {
    const filteredData = eventDataById?.events?.filter((item) => {
        const donationTimeDate = moment(item?.donationTime).format('YYYY/MM/DD');
        const todayDate = moment().format('YYYY/MM/DD');
        return donationTimeDate < todayDate;
    });
    console.log(filteredData);
    const filterData = eventDataById?.events?.filter((item) => {
        const donationTimeDate = moment(item?.donationTime).format('YYYY/MM/DD');
        const todayDate = moment().format('YYYY/MM/DD');
        return donationTimeDate >= todayDate;
    });
    console.log(filteredData);
    return (
        <>
            <div className="max-w-7xl m-auto">
                <h1 className="text-3xl font-bold">Kết quả tìm kiếm:</h1>
            </div>
            {eventDataById?.count > 0 ? (
                <div className="mt-5 max-w-7xl m-auto">
                    <h1 className="mb-4 ml-10 font-semibold text-xl">{title}</h1>
                    <div className="mb-10 w-full">
                        {filterData?.map((item, index) => (
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
                                joiner={filteredData?.length}
                                buttonName={'Xem Chi Tiết'}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-5 max-w-7xl m-auto">
                    <h1 className="mb-4 ml-10 font-semibold text-xl">{title}</h1>
                    <div className=" flex flex-col justify-center items-center my-20">
                        <div>
                            <img className="w-40 h-40" src={schedule} alt="" />
                        </div>
                        <h1 className="text-lg text-gray-500">Không có sự kiện nào</h1>
                    </div>
                </div>
            )}
            {filteredData?.length > 0 ? (
                <div className="mt-5 max-w-7xl m-auto">
                    <h1 className="mb-4 ml-10 font-semibold text-xl">Sự kiện đã qua</h1>
                    <div className="mb-10 w-full">
                        {filteredData?.map((item, index) => (
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
                                joiner={filteredData?.length}
                                buttonName={'Xem Chi Tiết'}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-5 max-w-7xl m-auto">
                    <h1 className="mb-4 ml-10 font-semibold text-xl">Sự kiện đã qua</h1>
                    <div className=" flex flex-col justify-center items-center my-20">
                        <div>
                            <img className="w-40 h-40" src={schedule} alt="" />
                        </div>
                        <h1 className="text-lg text-gray-500">Chưa có sự kiện nào</h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchOrganizeEvent;
