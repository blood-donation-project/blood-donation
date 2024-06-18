import { Steps } from 'antd';
import React, { useState } from 'react';
import { AiOutlineFileDone, AiOutlineFileText } from 'react-icons/ai';
import { useJoinEventMutation } from '../../Redux/features/events/eventAPI';
import { useParams } from 'react-router-dom';
const JoinEvent = ({ onClose }) => {
    const [joinEvent] = useJoinEventMutation();
    const params = useParams();
    const [formData, setFormData] = useState({
        question1: '',
        question2: '',
        question2Other: '',
        question3: '',
        question3Other: '',
    });

    const handleOptionChange = (question, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [question]: value,
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Xử lý gửi dữ liệu
            console.log(formData);
            console.log(params);
            await joinEvent(params.id).unwrap();
            
        } catch (error) {}
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-4 shadow-lg">
                <div className="bg-blue-700 text-white p-4 rounded-t-lg">
                    <div className="">
                        <button
                            onClick={onClose}
                            className="text-white float-left"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <h2 className="text-lg text-center font-semibold">
                            Tham gia hiến máu
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <Steps
                            current={1}
                            size="default"
                            className=" my-5  text- content-center"
                            items={[
                                {
                                    className: 'text-white',
                                    title: 'Khảo sát',
                                    icon: (
                                        <AiOutlineFileText className="text-white" />
                                    ),
                                },
                                {
                                    title: 'Kết quả',
                                    icon: (
                                        <AiOutlineFileDone className="text-white" />
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <p className="mt-2">Phiếu tham gia hiến máu</p>
                </div>
                <form className="p-4">
                    <h3 className="text-lg font-semibold">
                        Phiếu tham gia hiến máu
                    </h3>
                    <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow">
                        <p className="font-semibold">
                            1. Anh/chị đã từng hiến máu chưa?
                        </p>
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="question1"
                                    value="Có"
                                    className="form-radio"
                                    checked={formData.question1 === 'Có'}
                                    onChange={() =>
                                        handleOptionChange('question1', 'Có')
                                    }
                                />
                                <span className="ml-2">Có</span>
                            </label>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="question1"
                                    value="Không"
                                    className="form-radio"
                                    checked={formData.question1 === 'Không'}
                                    onChange={() =>
                                        handleOptionChange('question1', 'Không')
                                    }
                                />
                                <span className="ml-2">Không</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow">
                        <p className="font-semibold">
                            2. Hiện tại, anh/chị có bị các bệnh: viêm khớp, dạ
                            dày, viêm gan/vàng da, bệnh tim, huyết áp thấp/cao,
                            hen, ho kéo dài, bệnh máu, lao?
                        </p>
                        <div className="mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="question2"
                                    value="Có"
                                    className="form-radio"
                                    checked={formData.question2 === 'Có'}
                                    onChange={() =>
                                        handleOptionChange('question2', 'Có')
                                    }
                                />
                                <span className="ml-2">Có</span>
                            </label>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="question2"
                                    value="Không"
                                    className="form-radio"
                                    checked={formData.question2 === 'Không'}
                                    onChange={() =>
                                        handleOptionChange('question2', 'Không')
                                    }
                                />
                                <span className="ml-2">Không</span>
                            </label>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="question2"
                                    value="Bệnh khác"
                                    className="form-radio"
                                    checked={formData.question2 === 'Bệnh khác'}
                                    onChange={() =>
                                        handleOptionChange(
                                            'question2',
                                            'Bệnh khác'
                                        )
                                    }
                                />
                                <span className="ml-2">Bệnh khác</span>
                            </label>
                            {formData.question2 === 'Bệnh khác' && (
                                <input
                                    type="text"
                                    name="question2Other"
                                    placeholder="Nhập lý do"
                                    className="mt-2 p-2 border rounded w-full"
                                    value={formData.question2Other}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg w-full"
                    >
                        Tiếp theo
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinEvent;
