import React, { useEffect } from 'react';
import { format, parse } from 'date-fns';
import ListEvent from '../ListEvent';
import schedule from '../../../assets/img/schedule.png';
import { useGetEventByIdMutation } from '../../../Redux/features/events/eventAPI';
const OrganizeEvent = ({ tab }) => {
    const [getEventById, { data: eventDataById }] = useGetEventByIdMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEventById().unwrap();
            } catch (error) {}
        };
        fetchData();
    }, [getEventById]);

    const filteredData = eventDataById?.events?.filter((item) => {
        const donationTimeDate = parse(
            item?.donationTime,
            'dd/MM/yyyy',
            new Date()
        );
        const todayDate = new Date();
        return donationTimeDate instanceof Date && donationTimeDate < todayDate;
    });
    return (
        <>
            <>
                {tab === 'organize' ? (
                    eventDataById?.count > 0 ? (
                        <div className="mt-5 max-w-7xl m-auto">
                            <h1 className="mb-4 ml-10 font-semibold text-xl">
                                Sự kiện đang tổ chức
                            </h1>
                            <div className="mb-10 w-full">
                                {eventDataById?.events?.map((item, index) => (
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
                                        buttonName={'Xem Chi Tiết'}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 max-w-7xl m-auto">
                            <h1 className="mb-4 ml-10 font-semibold text-xl">
                                Sự kiện bạn tổ chức
                            </h1>
                            <div className=" flex flex-col justify-center items-center my-20">
                                <div>
                                    <img
                                        className="w-40 h-40"
                                        src={schedule}
                                        alt=""
                                    />
                                </div>
                                <h1 className="text-lg text-gray-500">
                                    Không có sự kiện nào
                                </h1>
                            </div>
                        </div>
                    )
                ) : filteredData?.length > 0 ? (
                    <div className="mt-5 max-w-7xl m-auto">
                        <h1 className="mb-4 ml-10 font-semibold text-xl">
                            Sự kiện đã qua
                        </h1>
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
                                    buttonName={'Xem Chi Tiết'}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 max-w-7xl m-auto">
                        <h1 className="mb-4 ml-10 font-semibold text-xl">
                            Sự kiện đã qua
                        </h1>
                        <div className=" flex flex-col justify-center items-center my-20">
                            <div>
                                <img
                                    className="w-40 h-40"
                                    src={schedule}
                                    alt=""
                                />
                            </div>
                            <h1 className="text-lg text-gray-500">
                                Chưa có sự kiện nào
                            </h1>
                        </div>
                    </div>
                )}
            </>
        </>
    );
};

export default OrganizeEvent;
