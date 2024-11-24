import React from 'react';

const Result = ({ icsResult, handleDownload }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-bold text-gray-700">캘린더에 보여질 내용</h4>
      <div className="rounded-xl bg-gray-50 p-5">{JSON.stringify(icsResult, null, 2)}</div>
      <div className="input-example">평달, 윤달 날짜가 모두 있는 경우에는 평달 날짜를 출력합니다.</div>

      <button disabled={!icsResult} onClick={handleDownload} type="button" className="btn w-56">
        ICS 캘린더 다운로드
      </button>
    </div>
  );
};

export default Result;
