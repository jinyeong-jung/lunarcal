import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { GrInfo } from 'react-icons/gr';

import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result';
import InfoModal from './components/InfoModal';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(false);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [icsResult, setIcsResult] = useState();

  const download = (value) => {
    const blob = new Blob([value], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lunarcal.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="relative" area-busy={loading ? 'true' : 'false'}>
      <Header />

      {loading && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
          area-hidden={loading ? 'true' : 'false'}
        >
          <LoadingSpinner />
        </div>
      )}

      <div
        className={
          loading
            ? 'pointer-events-none'
            : 'mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16'
        }
      >
        <Form
          setLoading={setLoading}
          handleEvents={(value) => setEvents(value)}
          handleIcsResult={(value) => setIcsResult(value)}
        />
        <Result events={events} icsResult={icsResult} handleDownload={() => download(icsResult)} />
      </div>

      <button
        onClick={() => setIsInfoOpen((prev) => !prev)}
        className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:bg-green-600"
      >
        <GrInfo size={24} />
      </button>

      {isInfoOpen && <InfoModal onClose={() => setIsInfoOpen(false)} />}

      <ToastContainer
        position="bottom-right"
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
