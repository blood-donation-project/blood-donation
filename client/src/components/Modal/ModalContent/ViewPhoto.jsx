import Image from '../../Image/Image';
import { IoClose } from 'react-icons/io5';

const ViewPhoto = ({ srcImage, hideModal }) => {
    return (
        <div className=" z-[9] w-[90%] py-4  max-h-[calc(100vh_-_60px)] h-full  relative flex-center">
            <div
                className="fixed right-6 top-5 w-9 h-9 flex-center cursor-pointer text-white text-[20px] rounded-[50%] hover:bg-[rgba(0,0,0,0.6)] bg-[rgba(0,0,0,0.5)]"
                onClick={hideModal}
            >
                <IoClose />
            </div>
            <div className="w-full h-full flex-center">
                <Image className={' object-cover h-full  '} src={srcImage} alt={'avatar'} />
            </div>
        </div>
    );
};

export default ViewPhoto;
