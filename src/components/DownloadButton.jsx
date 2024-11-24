import React from 'react';

const DownloadButton = (icsResult) => {
  const handleDownload = () => {
    const blob = new Blob([icsResult], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lunarcal.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button onClick={handleDownload} type="button" className="btn w-56">
      ICS 캘린더 다운로드
    </button>
  );
};

export default DownloadButton;
