import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { createEvent, createEvents } from "ics";

import Header from "./components/Header";

const openApiUrl = import.meta.env.VITE_OPENAPI_URL;
const serviceKey = import.meta.env.VITE_OPENAPI_SERVICE_KEY;

function App() {
  const today = new Date();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !year || !month || !day) {
        toast.error("모든 데이터를 입력해주세요");
        return;
      }

      const response = await axios.get(
        `${openApiUrl}?lunYear=${year}&lunMonth=${month}&lunDay=${day}&ServiceKey=${serviceKey}`
      );

      if (response.status !== 200) {
        toast.error("양력 데이터를 찾을 수 없습니다");
        return;
      }

      const solarDates = response.data.response.body.items.item;
      const { solYear, solMonth, solDay } = solarDates;

      const numYear = parseInt(solYear);
      const numMonth = parseInt(solMonth);
      const numDay = parseInt(solDay);

      generateICS(numYear, numMonth, numDay);
    } catch (error) {
      console.error(error);
    }
  };

  const generateICS = (solYear, solMonth, solDay) => {
    const event = {
      start: [solYear, solMonth, solDay],
      title,
    };

    createEvent(event, (error, value) => {
      if (error) {
        console.error(error);
        toast.error("ICS 파일을 생성할 수 없습니다");
        return;
      }

      console.log(value);
    });
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="이벤트 제목"
        />
        <input
          type="number"
          className="input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="년"
        />
        <input
          type="number"
          className="input"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="월"
        />
        <input
          type="number"
          className="input"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="일"
        />

        <button type="submit" className="btn">
          캘린더 생성하기
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
