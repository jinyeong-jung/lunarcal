import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result';
import Info from './components/Info';

function App() {
  const [icsResult, setIcsResult] = useState('');

  return (
    <div>
      <Header />

      <div className="mx-auto max-w-screen-2xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Form handleIcsResult={(result) => setIcsResult(result)} />
          <Result icsResult={icsResult} />
        </div>

        <Info />
      </div>

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
