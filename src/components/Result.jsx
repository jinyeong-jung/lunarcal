import React from 'react';
import { BiSolidSquareRounded } from 'react-icons/bi';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const Result = ({ events, icsResult, handleDownload }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-bold text-gray-700">현재 추가한 음력 일정</h4>

        <div className="flex flex-col gap-5">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="flex flex-row gap-3 rounded-xl bg-green-50 p-5">
                <FaRegCalendarCheck className="text-green-500" size={20} />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{event.title}</span>
                    <span className="text-xs text-gray-500">
                      음력 {event.lunarDate.year}년 {event.lunarDate.month}월 {event.lunarDate.day}일
                    </span>
                  </div>

                  <div className="text-sm">
                    {event.startYear}년부터 {event.endYear}년까지 매년 반복
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-gray-50 py-10 text-center text-sm text-gray-500">추가한 일정이 없습니다.</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-bold text-gray-700">캘린더에 보여지는 모습 예시</h4>

        <div className="flex flex-col gap-5">
          {events.length > 0 && icsResult ? (
            <>
              {events.map((event, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-xl bg-gray-50 p-5">
                  <div className="flex items-center gap-5">
                    <BiSolidSquareRounded className="text-green-500" size={20} />
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">{event.title}</div>
                      <div className="text-sm">
                        {event.solarDates[0].solYear}년 {event.solarDates[0].solMonth}월 {event.solarDates[0].solDay}일
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <HiOutlineMenuAlt2 className="text-gray-500" size={20} />
                    <div className="text-sm">
                      🌞 양력 날짜: {event.solarDates[0].solYear}년 {event.solarDates[0].solMonth}월{' '}
                      {event.solarDates[0].solDay}일<br />
                      🌝 음력 날짜: {event.solarDates[0].solYear}년 {event.lunarDate.month}월 {event.lunarDate.day}일
                    </div>
                  </div>
                </div>
              ))}

              <div className="input-example">평달, 윤달 날짜가 모두 있는 경우에는 평달 날짜를 출력합니다.</div>

              <button disabled={!icsResult} onClick={handleDownload} type="button" className="btn w-full">
                ICS 캘린더 다운로드
              </button>
            </>
          ) : (
            <div className="rounded-xl bg-gray-50 py-10 text-center text-sm text-gray-500">
              ICS 파일을 생성해 주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
