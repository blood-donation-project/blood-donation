import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { useUpdateUserByEKYCMutation } from '../../Redux/features/user/userAPI';
const EKYC = ({ isOpen, onClose }) => {
    const [updateByEKYC] = useUpdateUserByEKYCMutation();
    const [data, setData] = useState(null);
    const containerRef = useRef(null);
    useEffect(() => {
        if (!isOpen) return;
        let vnpt_ekyc_sdk = document.createElement('script');
        vnpt_ekyc_sdk.id = 'vnpt_ekyc_sdk';
        vnpt_ekyc_sdk.src = '/ekyc-web-sdk-2.1.4.6-stable.js';
        vnpt_ekyc_sdk.async = true;
        vnpt_ekyc_sdk.defe = true;
        document.head.appendChild(vnpt_ekyc_sdk);

        let vnpt_ekyc_styles = document.createElement('link');
        vnpt_ekyc_styles.id = 'vnpt_ekyc_styles';
        vnpt_ekyc_styles.rel = 'stylesheet';
        vnpt_ekyc_styles.href = '/ekyc-web-sdk-2.1.4.6-stable.css'; //or version higher;
        vnpt_ekyc_styles.async = true;
        vnpt_ekyc_styles.defe = true;
        document.head.appendChild(vnpt_ekyc_styles);
        const VNPT_CDN = 'https://ekyc-web.vnpt.vn';

        vnpt_ekyc_sdk.onload = async function () {
            var initObj = {
                VERSION: '2.1.4.6', //or version higher,
                BASE_CDN: VNPT_CDN,
                BACKEND_URL: 'https://api.idg.vnpt.vn/',
                TOKEN_KEY:
                    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALy4iS2+gCYMU0IatknKygcXyVAMIg+fkGzkd1s4D4uBtwEoktworCkAfm5nUcRW5yslaRsVZeEiu3ABCrHdfXECAwEAAQ==',
                TOKEN_ID: '1c40a792-a15a-3ce0-e063-62199f0accb2',
                AUTHORIZION:
                    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ZjE1MWMwYS0zODRlLTExZWYtYmExYy0wN2U2NDUyNWI0NjQiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoicXVhbmd2YW4xNC4xMC4yMDAzQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJuYW1lIjoicXVhbmd2YW4xNC4xMC4yMDAzQGdtYWlsLmNvbSIsImV4cCI6MTcyMjUwMTYwNCwidXVpZF9hY2NvdW50IjoiOWYxNTFjMGEtMzg0ZS0xMWVmLWJhMWMtMDdlNjQ1MjViNDY0IiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJqdGkiOiI5ZjJiZGE3MC05OTViLTQyMTMtOTJkOS01MGFmYjRlZTQxOWUiLCJjbGllbnRfaWQiOiJjbGllbnRhcHAifQ.p9J5Q3qiQjiRvl5mABEi68MAsHnJa2qRGT_LB-vPydLhZTzeBVOALAnJ-IurqNXVfFmSL0EsG6PuNRDCDX5wzJMSRRWaGz-PK5vnYLg5LrYIg0K5H8YTCHE18gRlnI4aGp8mFc-M4AEsUKPk9o-2Bw7HTrUN1ntnnfV3hAGAeu8ji5XLiH9wBSu96NM4Pn4VnGJR6kFN3zFF-uKcqfWPXzNN3WCniwoFfne8C3ybk_hZAAG05ugseeys69QnNKRwq27O963Q8tASkqLf5QfBgSPu_fAXS19lZF2JkpdSRkc0tlyOVfXaomUT3cF4elO0WFovFUONXCcx7dqTenWw8w',
                PARRENT_ID: 'ekyc_sdk_intergrated',
                FLOW_TYPE: 'DOCUMENT', // DOCUMENT, FACE
                SHOW_HELP: true,
                SHOW_TRADEMARK: false,
                CHECK_LIVENESS_CARD: true,
                CHECK_LIVENESS_FACE: true,
                CHECK_MASKED_FACE: true,
                COMPARE_FACE: true,
                LANGUAGE: 'vi',
                LIST_ITEM: [-1, 9],
                TYPE_DOCUMENT: 99,
                USE_WEBCAM: true,
                USE_UPLOAD: true,
                ADVANCE_LIVENESS_FACE: true,
                ASYNC_LOAD_AI: true,
                LIST_CHOOSE_STYLE: {
                    text_color: 'white',
                    item_active_color: '#18D696',
                    background_icon: '#18D696',
                    id_icon: VNPT_CDN + '/images/si/id_card.svg',
                    passport_icon: VNPT_CDN + '/images/si/passport.svg',
                    drivecard_icon: VNPT_CDN + '/images/si/drivecard.svg',
                    army_id_icon: VNPT_CDN + '/images/si/other_doc.svg',
                    id_chip_icon: VNPT_CDN + '/images/si/id_chip.svg',
                    start_button_background: '#18D696',
                    start_button_color: '#111127',
                },
                CAPTURE_IMAGE_STYLE: {
                    big_title_color: 'white',
                    description1_color: 'white',
                    capture_btn_background: '#18D696',
                    capture_btn_color: '#000000',
                    capture_btn_icon: VNPT_CDN + '/images/hdbank2/capture.svg',
                    tutorial_btn_icon: VNPT_CDN + '/images/hdbank/help.gif',
                    upload_btn_background: 'white',
                    upload_btn_color: '#000000',
                    upload_btn_boder: '2px solid #18d696',
                    upload_btn_icon: VNPT_CDN + '/images/altiss/upload.svg',
                    recapture_btn_background: '#18D696',
                    recapture_btn_color: '#fff',
                    recapture_btn_border: '2px solid #18D696',
                    recapture_btn_icon: VNPT_CDN + '/images/hdbank2/capture.svg',
                    nextstep_btn_background: '#18D696',
                    nextstep_btn_color: 'black',
                    nextstep_btn_icon: VNPT_CDN + '/images/hdbank2/next_icon.svg',
                    capture_and_upload_wrapper_bg: 'rgba(23, 24, 28, 0.7);',
                    capture_and_upload_wrapper_bg_img: VNPT_CDN + '/altiss/bg-img.svg',
                },
                MODAL_DOC_STYLE: {
                    touch_icon: VNPT_CDN + '/altiss/touch_cmt.svg',
                    close_icon: VNPT_CDN + '/altiss/close_icon.svg',
                    notice1_icon: VNPT_CDN + '/altiss/cmt_notice1.svg',
                    notice2_icon: VNPT_CDN + '/altiss/cmt_notice2.svg',
                    notice3_icon: VNPT_CDN + '/altiss/cmt_notice3.svg',
                },
                MODAL_FACE_STYLE: {
                    face_icon: VNPT_CDN + '/altiss/face_icon.svg',
                    close_icon: VNPT_CDN + '/altiss/close_icon.svg',
                    notice1_icon: VNPT_CDN + '/altiss/cmt_notice1.svg',
                    notice2_icon: VNPT_CDN + '/altiss/cmt_notice2.svg',
                    notice3_icon: VNPT_CDN + '/altiss/cmt_notice3.svg',
                },
                OTHER_CONFIG: {
                    loading_icon: VNPT_CDN + '/images/hdbank2/loading.gif',
                    loading_styles: 'background-color: #000000; opacity: 0.7',
                    oval_web: VNPT_CDN + '/animation/web_oval.json',
                    oval_mobile: VNPT_CDN + '/kbsv/mobile_border.json',
                    notice_ani: VNPT_CDN + '/animation/caution.json',
                    oval_title_color: 'white',
                    description_oval_content: 'Vui lòng tháo kính để xác thực chính xác hơn!',
                    description_oval: 'text-align: center; color: white; font-weight: bold',
                    video_tutorial_oval: VNPT_CDN + '/animation/video_tutorial_oval_dark.mp4',
                },
            };
            window.ekycsdk.init(
                initObj,
                (res) => {
                    //do some thing

                    console.log('resssss1', res);
                },
                call_after_end_flow,
            );

            function call_after_end_flow(data) {
                console.log('data', data);
                var vnpt_ekyc = document.getElementById('vnpt_ekyc');
                vnpt_ekyc.parentNode.removeChild(vnpt_ekyc);
                window.ekycsdk.init(
                    {
                        ...initObj,
                        FLOW_TYPE: 'FACE',
                        TYPE_DOCUMENT: data.type_document,
                        client_session: data.client_session,
                    },
                    (res2) => {
                        let merged = { ...data, ...res2 };
                        console.log('merged', merged);
                        setData(merged);
                        window.ekycsdk.viewResult(data.type_document, merged);
                    },
                );
            }
            return () => {
                if (window.ekycsdk) {
                    // 1. Hủy quy trình eKYC (nếu đang chạy)
                    window.ekycsdk.cancel();
                    window.ekycsdk.stop();
                    // 2. Xóa các phần tử DOM của eKYC
                    const vnptEkycElement = containerRef.current.querySelector('#vnpt_ekyc');
                    if (vnptEkycElement) {
                        vnptEkycElement.parentNode.removeChild(vnptEkycElement);
                    }

                    // 3. Loại bỏ event listeners
                    window.removeEventListener('ekycResult', (event) => {
                        setData(event.detail);
                    });
                }
            };
        };
    }, [isOpen]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data?.ocr?.statusCode !== 200) {
                    const checkValid = data?.ocr?.errors;
                    for (let i = 0; i < checkValid?.length; i++) {
                        toast.error('Thất bại! ' + checkValid?.[i]);
                    }
                }
                if (
                    data?.compare?.statusCode === 200 &&
                    data?.liveness_card_back?.statusCode === 200 &&
                    data?.liveness_card_front?.statusCode === 200 &&
                    data?.ocr?.statusCode === 200
                ) {
                    const identification = data?.ocr?.object?.id;
                    await updateByEKYC(identification).unwrap();
                    toast.success('Cập nhật dữ liệu thành công!');
                }
            } catch (error) {
                console.log(error);
                if (error?.data?.message === 'Identification exist') {
                    toast.error('Căn cước công dẫn đã tồn tại');
                }
                toast.error('Thất bại! Vui lòng kiểm tra lại!');
            }
        };
        fetchData();
    }, [data, updateByEKYC]);

    const handleClosePopup = () => {
        onClose();
    };

    console.log('rs component: ', data);
    if (!isOpen) return null;
    return (
        <div className=" h-full ">
            <div className=" lg:h-full overflow-y-auto relative" id="ekyc_sdk_intergrated">
                <div onClick={handleClosePopup} className="absolute rounded-md top-2 right-2">
                    <HiOutlineXMark className="w-6 h-6 cursor-pointer text-white" />
                </div>
            </div>
        </div>
    );
};

export default EKYC;
