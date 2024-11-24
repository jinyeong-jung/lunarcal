import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const InfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div className="scrollbar-hide relative h-5/6 max-h-screen w-11/12 max-w-screen-lg overflow-y-auto rounded-2xl bg-white px-14 py-20 shadow-lg">
        <button onClick={onClose} className="absolute right-8 top-8 text-gray-500">
          <MdOutlineClose size={25} />
        </button>

        <h1 className="mb-20 text-center text-3xl font-bold">구글 캘린더 ICS 파일 연동하기</h1>

        <div className="space-y-10">
          <div className="flex flex-col items-center gap-4 text-center text-lg">
            <img src="/images/info_1.png" alt="info" className="w-2/3 rounded-2xl" />
            <p>
              1. 구글 캘린더의 '설정'에서 '새 캘린더 만들기'를 선택해 캘린더를 생성합니다.
              <br />
              (필수는 아니지만 관리를 위해 캘린더를 새로 추가하기를 권장합니다.)
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center text-lg">
            <img src="/images/info_2.png" alt="info" className="w-2/3 rounded-2xl" />
            <p>
              2. '설정'에서 '가져오기'를 클릭 후, Lunarcal에서 만든 ics 파일을 가져옵니다.
              <br />
              새로 만든 캘린더를 선택한 뒤 '가져오기'를 클릭합니다.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center text-lg">
            <img src="/images/info_3.png" alt="info" className="w-2/3 rounded-2xl" />
            <p>3. ics 파일에 생성한 일정의 개수와 일치하는지 확인합니다.</p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center text-lg">
            <img src="/images/info_4.png" alt="info" className="w-2/3 rounded-2xl" />
            <p>4. 구글 캘린더 메인으로 돌아가 조금 전에 추가한 캘린더를 선택하면 끝!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
