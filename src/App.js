import React, { useState } from 'react';

function App() {
  const dmPages = [
    '/my-dm-viewer/ZH/page01.jpg',
    '/my-dm-viewer/ZH/page02.jpg',
    '/my-dm-viewer/ZH/page03.jpg',
    '/my-dm-viewer/ZH/page04.jpg',
    '/my-dm-viewer/ZH/page05.jpg',
    '/my-dm-viewer/ZH/page06.jpg',
    '/my-dm-viewer/ZH/page07.jpg',
    '/my-dm-viewer/ZH/page08.jpg',
    '/my-dm-viewer/ZH/page09.jpg',
    '/my-dm-viewer/ZH/page10.jpg',
    '/my-dm-viewer/ZH/page11.jpg',
    '/my-dm-viewer/ZH/page12.jpg',
    '/my-dm-viewer/ZH/page13.jpg',
    '/my-dm-viewer/ZH/page14.jpg',
    '/my-dm-viewer/ZH/page15.jpg',
    '/my-dm-viewer/ZH/page16.jpg',
    '/my-dm-viewer/ZH/page17.jpg',
    '/my-dm-viewer/ZH/page18.jpg',
  ];

  // 以雙頁為單位，左頁索引必為偶數
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // 上一雙頁
  const handlePrev = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 2, 0));
  };

  // 下一雙頁
  const handleNext = () => {
    setCurrentPageIndex((prev) => {
      // 若已到最後一頁，停在最後
      if (prev + 2 >= dmPages.length) return prev;
      return prev + 2;
    });
  };

  // 點擊左頁
  const handleLeftClick = () => {
    if (currentPageIndex > 0) handlePrev();
  };

  // 點擊右頁
  const handleRightClick = () => {
    if (currentPageIndex + 2 < dmPages.length) handleNext();
  };

  // 計算頁碼顯示
  const leftPageNum = currentPageIndex + 1;
  const rightPageNum = currentPageIndex + 2 <= dmPages.length ? currentPageIndex + 2 : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans antialiased text-gray-800">
      {/* 標題區（固定高度） */}
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 text-center w-full">
          線上 DM 展示
        </h1>
      </div>

      {/* 中間雙頁展示區（自適應） */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="flex flex-row bg-white rounded-xl shadow-2xl overflow-hidden"
          style={{
            height: '70vh',
            width: 'calc(70vh * 2)', // 兩張A4直式紙張並排
            maxWidth: '90vw'
          }}
        >
          {/* 左頁 */}
          <div
            className="flex-1 flex items-center justify-center border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition"
            onClick={handleLeftClick}
            style={{ minWidth: 0 }}
          >
            {dmPages[currentPageIndex] && (
              <img
                src={dmPages[currentPageIndex]}
                alt={`DM Page ${leftPageNum}`}
                className="w-full h-full object-contain block"
                draggable="false"
              />
            )}
          </div>

          {/* 右頁 */}
          <div
            className="flex-1 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
            onClick={handleRightClick}
            style={{ minWidth: 0 }}
          >
            {dmPages[currentPageIndex + 1] && (
              <img
                src={dmPages[currentPageIndex + 1]} // 這裡要 +1
                alt={`DM Page ${rightPageNum}`}
                className="w-full h-full object-contain block"
                draggable="false"
              />
            )}
          </div>
        </div>
      </div>

      {/* 下方控制區（固定高度） */}
      <div className="h-20 flex items-center justify-center space-x-8 bg-white shadow-inner">
        <button
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          上一頁
        </button>
        <span className="text-xl font-semibold text-gray-700">
          {rightPageNum
            ? `頁碼 ${leftPageNum}-${rightPageNum} / ${dmPages.length}`
            : `頁碼 ${leftPageNum} / ${dmPages.length}`}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPageIndex + 2 >= dmPages.length}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          下一頁
        </button>
      </div>
    </div>
  );
}

export default App;
