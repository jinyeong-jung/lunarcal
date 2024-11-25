import axios from 'axios';
import { createEvents } from 'ics';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const openApiUrl = import.meta.env.VITE_OPENAPI_URL;
const serviceKey = import.meta.env.VITE_OPENAPI_SERVICE_KEY;

const Form = ({ setLoading, handleEvents, handleIcsResult }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(new Date().getFullYear() + 5);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      handleEvents(events);
    }
  }, [events]);

  const resetForm = () => {
    setTitle('');
    setYear('');
    setMonth('');
    setDay('');
    setStartYear(new Date().getFullYear());
    setEndYear(new Date().getFullYear() + 5);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!title || !year || !month || !day || !startYear || !endYear) {
      return toast.error('모든 항목을 입력해주세요');
    }

    if (startYear > endYear) {
      return toast.error('반복 연도를 올바르게 입력해주세요');
    }

    if (endYear > 2050) {
      return toast.error('2050년 이하의 연도를 입력해주세요');
    }

    setLoading(true);
    try {
      const solarDates = await fetchSolarDates(month.padStart(2, '0'), day.padStart(2, '0'));

      setEvents((prevEvents) => [
        ...prevEvents,
        {
          title,
          solarDates,
          lunarDate: {
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day)
          },
          startYear,
          endYear
        }
      ]);

      toast.success(`${title} 일정을 추가했습니다.`);
      resetForm();
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('일정을 추가하는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSolarDates = async (lunarMonth, lunarDay) => {
    const solarDates = [];
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    for (const currentYear of years) {
      try {
        const response = await axios.get(
          `${openApiUrl}?lunYear=${currentYear}&lunMonth=${lunarMonth}&lunDay=${lunarDay}&ServiceKey=${serviceKey}`
        );

        const items = response.data?.response?.body?.items?.item;

        if (response.status === 200 && items) {
          const { solYear, solMonth, solDay } = Array.isArray(items) ? items[0] : items;
          solarDates.push({ solYear: Number(solYear), solMonth: Number(solMonth), solDay: Number(solDay) });
        } else {
          toast.error(`${currentYear}년의 양력 날짜를 찾을 수 없습니다.`);
        }
      } catch (error) {
        console.error(`오류 발생 (${currentYear}년):`, error);
        toast.error(`${currentYear}년 데이터를 가져오는 중 문제가 발생했습니다.`);
      }
    }

    return solarDates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!events || events.length === 0) {
      return toast.error('일정을 추가해주세요.');
    }

    try {
      const icsResult = generateICS();
      handleIcsResult(icsResult);
    } catch (error) {
      console.error('Error fetching solar date:', error);
      toast.error('데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const generateICS = () => {
    setLoading(true);
    try {
      const icsEvents = events.flatMap(({ title, solarDates, lunarDate: { month, day } }) =>
        solarDates.map(({ solYear, solMonth, solDay }) => ({
          start: [solYear, solMonth, solDay],
          title,
          description: `🌞 양력 날짜: ${solYear}년 ${solMonth}월 ${solDay}일\n🌝 음력 날짜: ${solYear}년 ${month}월 ${day}일`,
          uid: `lunarcal-${solYear}${solYear}${solDay}@lunarcal.com`
        }))
      );

      return createEvents(icsEvents, (error, value) => {
        if (error) {
          console.error('ICS 파일 생성 오류:', error);
          toast.error('ICS 파일 생성 중 문제가 발생했습니다.');
          return null;
        }

        if (!value || typeof value !== 'string') {
          toast.error('ICS 파일 데이터 형식이 올바르지 않습니다.');
          return null;
        }

        return value;
      });
    } catch (error) {
      console.error('generateICS 실행 중 오류:', error);
      toast.error('ICS 파일 생성 중 문제가 발생했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold text-gray-700">음력 일정</h4>
      <div className="mb-5 mt-2 flex flex-col gap-2 text-sm font-normal text-gray-400">
        {Array.from(
          [
            '음력 일정(날짜, 일정 제목, 반복 연도)을 작성하세요.',
            '새로운 일정을 추가하려면 "일정 추가하기" 버튼을 클릭하세요. (기존에 작성한 일정은 "현재 추가한 음력 일정"에 반영됩니다)',
            '일정을 원하는 만큼 추가했다면 ICS 파일을 생성하세요.',
            'ICS 캘린더를 다운로드하세요!',
            'ICS 캘린더를 구글에 연동하는 방법은 우측 하단의 인포 버튼을 클릭하세요.'
          ],
          (v, i) => (
            <div className="flex items-start gap-2" key={i}>
              <span>{i + 1}.</span>
              <span>{v}</span>
            </div>
          )
        )}
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
          <div className="input-label">반복 연도</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="input max-w-36"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
            <div className="whitespace-nowrap text-sm text-gray-500">년부터</div>

            <input
              type="number"
              className="input max-w-36"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
            <div className="whitespace-nowrap text-sm text-gray-500">년까지</div>
          </div>
          <div className="input-example leading-relaxed">
            <span className="font-semibold text-green-500">최대 2050년까지만 입력하실 수 있습니다.</span>
            <br />
            예시: {new Date().getFullYear() >= 2050 ? 2050 : new Date().getFullYear()}년부터{' '}
            {new Date().getFullYear() + 5 >= 2050 ? 2050 : new Date().getFullYear() + 5}년까지 매년 반복
          </div>
        </div>

        <div className="mt-3 flex justify-around gap-5">
          <button type="button" className="btn w-full bg-slate-400" onClick={handleAddEvent}>
            일정 추가하기
          </button>
          <button type="submit" className="btn w-full bg-gray-400">
            ICS 파일 생성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
