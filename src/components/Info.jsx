import React from 'react';

const Info = () => {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
      <div>
        <img src="/images/info_1.png" alt="info" className="w-full" />
        <div>
          1. 구글 캘린더의 '설정'에서 '새 캘린더 만들기'를 선택해 캘린더를 생성합니다.
          <br />
          (필수는 아니지만 관리를 위해 캘린더를 새로 추가하기를 권장합니다.)
        </div>
      </div>

      <div className="mt-10">
        <img src="/images/info_2.png" alt="info" className="w-full" />
        <div>
          2. '설정'에서 '가져오기'를 클릭 후, Lunarcal에서 만든 ics 파일을 가져옵니다.
          <br />
          새로 만든 캘린더를 선택한 뒤 '가져오기'를 클릭합니다.
        </div>
      </div>

      <div className="mt-10">
        <img src="/images/info_3.png" alt="info" className="w-full" />
        <div>3. ics 파일에 생성한 일정의 개수와 일치하는지 확인합니다.</div>
      </div>

      <div className="mt-10">
        <img src="/images/info_4.png" alt="info" className="w-full" />
        <div>4. 구글 캘린더 메인으로 돌아가 조금 전에 추가한 캘린더를 선택하면 끝!</div>
      </div>
    </div>
  );
};

export default Info;
