import React, { useState, useEffect, useRef } from 'react';

// 主應用程式組件
function App() {
  // DM頁面的圖片URL陣列。請將這些替換為您的實際DM頁面圖片連結。
  // 根據您提供的圖片路徑，專案名稱假設為 'my-dm-viewer'
  const dmPages = [
    '/my-dm-viewer/ZH/page01.jpg', // DM 頁面 1
    '/my-dm-viewer/ZH/page02.jpg', // DM 頁面 2
    '/my-dm-viewer/ZH/page03.jpg', // DM 頁面 3
    '/my-dm-viewer/ZH/page04.jpg', // DM 頁面 4
    '/my-dm-viewer/ZH/page05.jpg', // DM 頁面 5
    '/my-dm-viewer/ZH/page06.jpg', // DM 頁面 6
    '/my-dm-viewer/ZH/page07.jpg', // DM 頁面 7
    '/my-dm-viewer/ZH/page08.jpg', // DM 頁面 8
    '/my-dm-viewer/ZH/page09.jpg', // DM 頁面 9
    '/my-dm-viewer/ZH/page10.jpg', // DM 頁面 10
    '/my-dm-viewer/ZH/page11.jpg', // DM 頁面 11
    '/my-dm-viewer/ZH/page12.jpg', // DM 頁面 12
    '/my-dm-viewer/ZH/page13.jpg', // DM 頁面 13
    '/my-dm-viewer/ZH/page14.jpg', // DM 頁面 14
    '/my-dm-viewer/ZH/page15.jpg', // DM 頁面 15
    '/my-dm-viewer/ZH/page16.jpg', // DM 頁面 16
    '/my-dm-viewer/ZH/page17.jpg', // DM 頁面 17
    '/my-dm-viewer/ZH/page18.jpg', // DM 頁面 18
    // ... 根據您實際的圖片數量繼續添加
  ];

  // 當前頁面索引，預設為1 (索引0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 縮放比例，預設為1 (100%)
  const [zoomLevel, setZoomLevel] = useState(1);
  // 頁面切換方向，用於CSS動畫 (left: 從右往左滑, right: 從左往右滑)
  const [transitionDirection, setTransitionDirection] = useState('');
  // 用於觸控事件的起始X座標
  const touchStartX = useRef(0);
  // DM圖片容器的引用，用於應用縮放和監聽事件
  const dmImageRef = useRef(null);

  // 頁面切換處理函數
  const handlePageChange = (direction) => {
    setTransitionDirection(direction); // 設定切換方向
    setTimeout(() => { // 稍微延遲以讓CSS動畫生效
      setCurrentPageIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (direction === 'next') {
          newIndex = (prevIndex + 1) % dmPages.length; // 循環到下一頁
        } else if (direction === 'prev') {
          newIndex = (prevIndex - 1 + dmPages.length) % dmPages.length; // 循環到上一頁
        }
        setZoomLevel(1); // 切換頁面時重置縮放
        setTransitionDirection(''); // 重置切換方向
        return newIndex;
      });
    }, 100); // 動畫持續時間，需要與CSS中的transition-duration匹配
  };

  // 放大處理函數
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3)); // 最大縮放3倍
  };

  // 縮小處理函數
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5)); // 最小縮放0.5倍
  };

  // 觸控開始處理函數
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // 觸控結束處理函數
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    // 判斷滑動方向和距離以切換頁面
    if (swipeDistance > 50) { // 向右滑動 (上一頁)
      handlePageChange('prev');
    } else if (swipeDistance < -50) { // 向左滑動 (下一頁)
      handlePageChange('next');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans antialiased text-gray-800">
      {/* 標題 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center leading-tight">
        線上 DM 展示
      </h1>

      {/* DM 顯示區域 */}
      {/* 調整 max-w 類別以提供更大的顯示空間 */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex items-center justify-center aspect-[9/16] md:aspect-[3/4]">
        {/* DM 圖片 */}
        <img
          ref={dmImageRef}
          src={dmPages[currentPageIndex]}
          alt={`DM Page ${currentPageIndex + 1}`}
          className={`w-full h-full object-contain transform transition-transform duration-200 ease-in-out ${
            transitionDirection === 'next' ? 'animate-slide-left' :
            transitionDirection === 'prev' ? 'animate-slide-right' : ''
          }`}
          style={{ transform: `scale(${zoomLevel})` }}
          // 添加觸控事件監聽器
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          draggable="false" // 防止圖片被拖曳
        />

        {/* 上一頁按鈕 */}
        {/* 調整按鈕大小和間距 */}
        <button
          onClick={() => handlePageChange('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 w-10 h-10 sm:p-4 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          aria-label="上一頁"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* 下一頁按鈕 */}
        {/* 調整按鈕大小和間距 */}
        <button
          onClick={() => handlePageChange('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 w-10 h-10 sm:p-4 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          aria-label="下一頁"
        >
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* 控制按鈕和頁碼顯示 */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
        {/* 縮放控制 */}
        <div className="flex space-x-3 bg-white p-4 rounded-full shadow-lg"> {/* 增加空間和內距 */}
          <button
            onClick={handleZoomOut}
            className="p-3 w-10 h-10 sm:p-4 sm:w-12 sm:h-12 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            aria-label="縮小"
          >
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
            </svg>
          </button>
          <span className="text-xl font-semibold text-gray-700 flex items-center justify-center min-w-[50px]"> {/* 調整字體大小和最小寬度 */}
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-3 w-10 h-10 sm:p-4 sm:w-12 sm:h-12 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            aria-label="放大"
          >
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>

        {/* 頁碼顯示 */}
        <div className="flex items-center justify-center bg-white p-4 rounded-full shadow-lg text-gray-700 font-semibold text-xl min-w-[140px]"> {/* 調整字體大小和最小寬度 */}
          {`頁面 ${currentPageIndex + 1} / ${dmPages.length}`}
        </div>
      </div>

      {/* Tailwind CSS 動畫定義 */}
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-right {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out forwards;
        }
        .animate-slide-right {
          animation: slide-right 0.3s ease-out forwards;
        }
        /* 確保 Inter 字體被應用 */
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      {/* 導入 Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
}

export default App;
