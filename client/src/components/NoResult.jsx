import Image from './Image/Image';
import noResult from '../assets/images/no-result.png';

const NoResult = () => {
    return (
        <div className="flex-center h-screen">
            <div className="flex flex-col items-center">
                <Image className={'bg-transparent w-[220px]'} src={noResult} alt={'No result'} />
                <h3 className="text-[18px] font-semibold">Chúng tôi không tìm thấy kết quả nào</h3>
                <span className="text-[#65676B] text-[15px]">
                    Đảm bảo tất cả các từ đều đúng chính tả hoặc thử từ khóa khác.
                </span>
            </div>
        </div>
    );
};

export default NoResult;
