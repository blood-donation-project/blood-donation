import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiIdentificationCardLight } from 'react-icons/pi';
import { PiBeerBottle, PiVirusFill } from 'react-icons/pi';
import { GiWeightScale, GiDrippingTube } from 'react-icons/gi';
import { BsClipboardHeartFill } from 'react-icons/bs';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { IoArrowBackSharp } from 'react-icons/io5';
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

import imgXMark from '../../assets/img/khongnen.png';
import imgCheck from '../../assets/img/imgcheck.png';
import imgWarning from '../../assets/img/imgwarning.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
const Interest = ({ onSendData }) => {
    const [openNotes, setOpenNote] = useState({});
    const notes = [
        {
            title: 'Ai có thể tham gia hiến máu?',
            content: [
                '- Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người bệnh.',
                '- Cân nặng ít nhất là 42kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.',
                '- Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh lây nhiễm qua đường truyền máu khác.',
                '- Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.',
                '- Có giấy tờ tùy thân.',
            ],
        },
        {
            title: 'Ai là người không nên hiến máu?',
            content: [
                '- Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và các virus lây qua đường truyền máu.',
                '- Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày...',
            ],
        },
        {
            title: 'Máu của tôi sẽ được làm những xét nghiệm gì?',
            content: [
                '- Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai, sốt rét.',
                '- Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.',
            ],
        },
    ];

    const handleNoteClick = (index) => {
        setOpenNote((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleSendData = () => {
        onSendData(true);
    };

    console.log(openNotes);
    return (
        <>
            <button
                onClick={handleSendData}
                className="float-left flex items-center outline-none hover:bg-slate-400 justify-center ml-4 mt-2 w-10 h-10 rounded-full bg-gray-300"
            >
                <IoArrowBackSharp className="w-6 h-6" />
            </button>
            <section className="mt-3  ssm:pb-14 pb-24">
                <div className="max-w-5xl h-[450px] flex flex-col lg:flex-row  my-0 mx-auto ">
                    <div className="bg-event py-4 px-16 lg:-mr-[.5%] text-center lg:text-left w-[100%]">
                        <h2 className="md:text-5xl text-4xl mb-1 text-[#1c5291]">
                            Quyền lợi của người hiến máu
                        </h2>
                        <p className="text-xl">
                            Người hiến máu tình nguyện sẽ được những quyền lợi
                            sau:
                        </p>
                    </div>
                    <div className="bg-[#1c5291] rounded-2xl lg:-ml-[.5%] flex justify-center w-[100%] lg:w-1/2">
                        <Swiper
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className=" text-white text-sm md:text-lg"
                        >
                            <SwiperSlide className="text-center py-4 px-10">
                                <h2 className="text-2xl mb-10">
                                    Được bồi dưỡng trực tiếp
                                </h2>
                                <ul className="text-left">
                                    <li className="mb-2">
                                        - Ăn nhẹ, nước uống tại chỗ: tương đương
                                        30.000 đồng (1 chai trà xanh không độ,
                                        01 hộp chocopie 66gram, 01 hộp bánh
                                        Goute 35,5gram )
                                    </li>
                                    <li className="mb-2">
                                        - Hỗ trợ chi phí đi lại (bằng tiền mặt):
                                        50.000 đồng.
                                    </li>
                                    <li className="mb-2">
                                        - Nhận phần quà tặng giá trị tương
                                        đương:
                                        <ol className="ml-6">
                                            <li>100.000 khi hiến máu 250ml</li>
                                            <li>150.000 khi hiến máu 350ml</li>
                                            <li>180.000 khi hiến máu 450ml</li>
                                        </ol>
                                    </li>
                                </ul>
                            </SwiperSlide>
                            <SwiperSlide className="text-center content-center px-10">
                                <h2 className="text-2xl mb-8">
                                    Được cấp Giấy chứng nhận hiến máu tình
                                    nguyện
                                </h2>
                                <ol className="text-left ">
                                    <li className="mb-2">
                                        1. Giấy chứng nhận được trao cho người
                                        hiến máu sau mỗi lần hiến máu tình
                                        nguyện
                                    </li>
                                    <li className="mb-2">
                                        2. Có giá trị để được truyền máu miễn
                                        phí bằng số lượng máu đã hiến, khi bản
                                        thân người hiến có nhu câu sử dụng máu
                                        tại tất cả các cở sở y tế công lập trên
                                        toàn quốc
                                    </li>
                                    <li className="mb-2">
                                        3. Người hiến máu cần xuất trình Giấy
                                        chứng nhận để làm cơ sở cho các cơ sở y
                                        tế thực hiện việc truyền máu miễn phí
                                    </li>
                                    <li>
                                        4. Cơ sở y tế có trách nhiệm ký, đóng
                                        dấu, xác nhận số lượng máu đã truyền
                                        miễn phí cho người hiến máu vào giấy
                                        chứng nhận
                                    </li>
                                </ol>
                            </SwiperSlide>
                            <SwiperSlide className="text-center content-center px-10">
                                <h2 className="text-2xl mb-8">
                                    Được tư vấn về sức khỏe
                                </h2>
                                <ol className="text-left">
                                    <li className="mb-2">
                                        - Được giải thích về quy trình hiến máu
                                        và các tai biến có thể sảy ra trong và
                                        sau khi hiến máu
                                    </li>
                                    <li className="mb-2">
                                        - Được cung cấp thông tin về dấu hiệu,
                                        triệu chứng do nhiễm vi rút viêm gan,
                                        HIV và một số bệnh lây qua đường truyền
                                        máu, tình dục khác...
                                    </li>
                                    <li className="mb-2">
                                        - Được xét nghiệm sàng lọc một số vi rút
                                        lây qua đường truyền máu, tình dục (HIV,
                                        Giang mai, viêm gan,...) sau khi hiến
                                        máu.
                                    </li>
                                    <li>
                                        - Được tư vấn hướng dẫn cách chăm sóc
                                        sức khỏe, tư vấn về kết quả bất thường
                                        sau khi hiến máu
                                    </li>
                                    <li>
                                        - Được bảo mật về kết quả khám lâm sàng,
                                        kết quả xét nghiệm
                                    </li>
                                </ol>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="py-14 bg-[#1c5291] ">
                <div className="max-w-5xl my-0 mx-auto grid grid-cols-3 gap-3 ">
                    <div className="bg-standard rounded-lg p-4 text-[#1c5291] text-4xl font-semibold text-right">
                        Tiêu chuẩn tham gia hiến máu
                    </div>
                    <div className="grid grid-row-2 gap-3 ">
                        <div className="bg-white rounded-lg p-4">
                            <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                                <PiIdentificationCardLight className="h-11 w-11 text-white" />
                            </span>
                            <p className="text-lg">
                                Mang theo chứng minh nhân dân/ hộ chiếu
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                                <PiBeerBottle className="h-11 w-11 text-white" />
                            </span>
                            <p className="text-lg">
                                Không nghiện ma túy, rượu bia và các chất kích
                                thích
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <PiVirusFill className="h-11 w-11 text-white" />
                        </span>
                        <p className="text-lg">
                            Không mắc hoặc không có các hành vi nguy cơ lây
                            nhiễm HIV, không nhiễm viêm gan B, viêm gan C, và
                            các virus lây qua đường truyền máu
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <GiWeightScale className="h-11 w-11 text-white" />
                        </span>
                        <p className="text-lg">
                            Cân nặng: Nam ≥ 45 kg Nữ ≥ 42 kg
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <BsClipboardHeartFill className="h-9 w-10 text-white" />
                        </span>
                        <p className="text-lg">
                            Không mắc các bệnh mãn tính hoặc cấp tính về tim
                            mạch, huyết áp, hô hấp, dạ dày…
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <BsClipboardHeartFill className="h-9 w-10 text-white" />
                        </span>
                        <p className="text-lg">
                            Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến
                            từ 350ml trở lên).
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                width="64"
                                height="64"
                            >
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="30"
                                    fill="#ff4d4d"
                                />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dy=".3em"
                                    fontSize="24"
                                    fontWeight="bold"
                                    fill="white"
                                >
                                    18+
                                </text>
                            </svg>
                        </span>
                        <p className="text-lg">
                            Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <RiCalendarScheduleLine className="h-9 w-10 text-white" />
                        </span>
                        <p className="text-lg">
                            Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần
                            đối với cả Nam và Nữ
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <span className="flex w-12 h-12 mb-3 rounded-lg items-center justify-center bg-[#386fd6]">
                            <GiDrippingTube className="h-9 w-10 text-white" />
                        </span>
                        <p className="text-lg">
                            Kết quả test nhanh âm tính với kháng nguyên bề mặt
                            của siêu vi B
                        </p>
                    </div>
                </div>
            </section>
            {/* NOTE */}
            <section className="py-7 bg-[#f8fbfd]">
                <div className="max-w-4xl my-0 mx-auto">
                    <div>
                        <h2 className="text-5xl text-center text-[#1c5291] mb-6 font-medium">
                            Lưu ý quan trọng
                        </h2>
                    </div>
                    <ul>
                        {notes.map((note, index) => (
                            <li
                                key={index}
                                onClick={() => handleNoteClick(index)}
                                className="mb-4 py-5 px-8 border border-[#bbd7fd] rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-medium text-[#386fd6]">
                                        {note.title}
                                    </p>
                                    {openNotes[index] ? (
                                        <MdOutlineKeyboardArrowUp className="w-7 h-7" />
                                    ) : (
                                        <MdOutlineKeyboardArrowDown className="w-7 h-7" />
                                    )}
                                </div>
                                <ul
                                    className={`${
                                        openNotes[index]
                                            ? 'max-h-64 block'
                                            : 'max-h-0 hidden'
                                    } animationNote`}
                                >
                                    {note.content.map((item, i) => (
                                        <li
                                            key={i}
                                            className="my-2 text-lg"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {/* Recommend */}
            <section className="py-14 pb-20 mb-10 bg-[#1c5291]">
                <div className="max-w-5xl my-0 mx-auto">
                    <div className="relative h-[470px]">
                        <div className="absolute top-0 left-0 w-1/2">
                            <p className="text-[#f7c41c] text-5xl font-medium">
                                Những lời khuyên trước và sau khi hiến máu
                            </p>
                        </div>
                        <div className="w-1/2 absolute top-0 left-[calc(50%_+_8px)] bg-white p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    className="w-14 h-14 mr-2"
                                    src={imgXMark}
                                    alt=""
                                />
                                <p className="text-[#ed2e2e] font-semibold text-3xl">
                                    Không nên:
                                </p>
                            </div>
                            <ul className="text-xl">
                                <li className="mb-2">
                                    - Uống sữa, rượu bia trước khi hiến máu.
                                </li>
                                <li>
                                    - Lái xe đi xa, khuân vác, làm việc nặng
                                    hoặc luyện tập thể thao gắng sức trong ngày
                                    lấy máu.
                                </li>
                            </ul>
                        </div>
                        <div className="w-[calc(50%_-_8px)] absolute top-32 left-0 bg-white p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    className="w-14 h-14 mr-2"
                                    src={imgCheck}
                                    alt=""
                                />
                                <p className="text-[#00b8cc] font-semibold text-3xl">
                                    Nên:
                                </p>
                            </div>
                            <ul className="text-xl">
                                <li className="mb-2">
                                    - Ăn nhẹ và uống nhiều nước (300-500ml)
                                    trước khi hiến máu.
                                </li>
                                <li>
                                    - Đè chặt miếng bông gòn cầm máu nơi kim
                                    chích 10 phút, giữ băng keo cá nhân trong
                                    4-6 giờ.
                                </li>
                                <li>
                                    - Nằm và ngồi nghỉ tại chỗ 10 phút sau khi
                                    hiến máu.
                                </li>
                                <li>
                                    - Nằm nghỉ đầu thấp, kê chân cao nếu thấy
                                    chóng mặt, mệt, buồn nôn.
                                </li>
                                <li>
                                    - Chườm lạnh (túi chườm chuyên dụng hoặc cho
                                    đá vào khăn) chườm vết chích nếu bị sưng,
                                    bầm tím.
                                </li>
                            </ul>
                        </div>
                        <div className="w-1/2 absolute top-56 left-[calc(50%_+_8px)] bg-white p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <img
                                    className="w-14 h-14 mr-2"
                                    src={imgWarning}
                                    alt=""
                                />
                                <p className="text-[#ff8127] font-semibold text-3xl">
                                    Lưu ý:
                                </p>
                            </div>
                            <ul className="text-xl">
                                <li className="mb-2">
                                    - Nếu phát hiện chảy máu tại chỗ chích:{' '}
                                    <br />
                                </li>
                                <li>
                                    Giơ tay cao. <br />
                                    Lấy tay kia ấn nhẹ vào miếng bông hoặc băng
                                    dính. <br />
                                    Liên hệ nhân viên y tế để được hỗ trợ khi
                                    cần thiết.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className='flex justify-center items-center mb-10'>
                <iframe
                    width="1080"
                    height="460"
                    src="https://www.youtube.com/embed/FOBRikvafwI?si=vSIwIOHclE3QR9Cd"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </section>
        </>
    );
};

export default Interest;
