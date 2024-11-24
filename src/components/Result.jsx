import React from 'react';
import DownloadButton from './DownloadButton';

const Result = ({ icsResult }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-bold text-gray-700">캘린더에 보여질 내용</h4>
      <div className="rounded-xl bg-gray-50 p-5">{JSON.stringify(icsResult, null, 2)}</div>
      <div className="input-example">평달, 윤달 날짜가 모두 있는 경우에는 평달 날짜를 출력합니다.</div>

      <DownloadButton icsResult={icsResult} />
    </div>
  );
};

export default Result;
