import Image from './Image/Image';
import noResult from '../assets/images/no-result.png';

const NoResult = () => {
    return (
        <div className="flex-center h-screen">
            <div className="flex flex-col items-center">
                <Image className={'bg-transparent w-[220px]'} src={noResult} alt={'No result'} />
                <h3 className="text-[18px] font-semibold">Chúng tôi không tìm thấy kết quả nào</h3>
            </div>
        </div>
    );
};

export default NoResult;
