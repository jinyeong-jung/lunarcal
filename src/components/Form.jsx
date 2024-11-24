import axios from 'axios';
import { createEvents } from 'ics';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { toast } from 'react-toastify';

const openApiUrl = import.meta.env.VITE_OPENAPI_URL;
const serviceKey = import.meta.env.VITE_OPENAPI_SERVICE_KEY;

const Form = ({ handleIcsResult }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [repNum, setRepNum] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !year || !month || !day || !startYear || !repNum) {
      return toast.error('모든 항목을 입력해주세요');
    }

    try {
      const solarDates = await fetchSolarDates(month.padStart(2, '0'), day.padStart(2, '0'));
      generateICS(solarDates);
    } catch (error) {
      console.error('Error fetching solar date:', error);
      toast.error('데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const fetchSolarDates = async (lunarMonth, lunarDay) => {
    const repYears = Array.from({ length: repNum }, (_, i) => startYear + i);
    const solarDates = [];

    for (const repYear of repYears) {
      try {
        const response = await axios.get(
          `${openApiUrl}?lunYear=${repYear}&lunMonth=${lunarMonth}&lunDay=${lunarDay}&ServiceKey=${serviceKey}`
        );

        if (response.status === 200 && response.data?.response?.body?.items?.item) {
          const solDate = Array.isArray(response.data.response.body.items.item)
            ? response.data.response.body.items.item[0]
            : response.data.response.body.items.item;

          const { solYear, solMonth, solDay } = solDate;

          solarDates.push({ solYear: parseInt(solYear), solMonth: parseInt(solMonth), solDay: parseInt(solDay) });
        } else {
          toast.error(`${repYear}년의 양력 날짜를 찾을 수 없습니다.`);
        }
      } catch (error) {
        console.error(`${repYear}년 데이터 요청 중 오류가 발생했습니다:`, error);
        toast.error('데이터를 불러오는 중 문제가 발생했습니다.');
      }
    }

    return solarDates;
  };

  const generateICS = (solarDates) => {
    const events = solarDates.map(({ solYear, solMonth, solDay }) => ({
      start: [solYear, solMonth, solDay],
      title,
      description: `양력 날짜: ${solYear}년 ${solMonth}월 ${solDay}일\n 음력 날짜: ${solYear}년 ${month}월 ${day}일`,
      uid: `lunarcal-${solYear}${solYear}${solDay}@example.com`
    }));

    createEvents(events, (error, value) => {
      if (error) {
        console.error(error);
        toast.error('ICS 파일을 생성할 수 없습니다');
        return;
      }

      if (typeof value !== 'string') {
        toast.error('잘못된 데이터 형식입니다.');
        return;
      }

      handleIcsResult(value);
    });
  };

  return (
    <div>
      <h4 className="text-xl font-bold text-gray-700">음력 일정</h4>
      <div className="mb-5 mt-2 text-sm font-normal text-green-400">
        음력 일정을 입력후 ICS 파일을 생성하고, ICS 캘린더를 다운로드하세요!
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <div className="input-label">일정 제목</div>
          <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="input-example">예시: 엄마 생신, 결혼기념일</div>
        </div>

        <div>
          <div className="input-label">음력 날짜</div>
          <div className="flex items-center gap-2">
            <input type="number" className="input" value={year} onChange={(e) => setYear(e.target.value)} />
            <span className="text-sm text-gray-500">년</span>

            <input type="number" className="input" value={month} onChange={(e) => setMonth(e.target.value)} />
            <span className="text-sm text-gray-500">월</span>

            <input type="number" className="input" value={day} onChange={(e) => setDay(e.target.value)} />
            <span className="text-sm text-gray-500">일</span>
          </div>
          <div className="input-example">예시: {new Date().getFullYear()}년 01월 01일</div>
        </div>

        <div>
          <div className="input-label">반복 횟수</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="input w-36"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
            <div className="text-sm text-gray-500">년부터</div>

            <div className="relative w-36">
              <select
                className="input w-full appearance-none"
                value={repNum}
                onChange={(e) => setRepNum(e.target.value)}
              >
                {Array.from({ length: 30 }, (_, i) => i).map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                <IoIosArrowDown size={14} />
              </span>
            </div>
            <span className="text-sm text-gray-500">회</span>
          </div>
          <div className="input-example">예시: {new Date().getFullYear()}년부터 5회 반복</div>
        </div>

        <button type="submit" className="btn mt-8 w-56 bg-gray-500">
          ICS 파일 생성하기
        </button>
      </form>
    </div>
  );
};

export default Form;
