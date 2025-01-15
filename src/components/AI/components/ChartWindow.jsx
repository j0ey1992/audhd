import React, { useRef, useState, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import styles from '../AI.module.css';

const ChartWindow = ({ data, onClose }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    let chart = null;

    const initChart = () => {
      if (!chartContainerRef.current || !data) return;

      // Ensure container has minimum dimensions
      const containerWidth = Math.max(chartContainerRef.current.clientWidth, 300);
      const containerHeight = Math.max(chartContainerRef.current.clientHeight, 400);
      
      chart = createChart(chartContainerRef.current, {
        width: containerWidth,
        height: containerHeight,
        layout: {
          background: { color: `rgb(var(--surface))` },
          textColor: getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
        },
        grid: {
          vertLines: { color: `rgb(var(--text)/0.1)` },
          horzLines: { color: `rgb(var(--text)/0.1)` },
        },
        handleScroll: {
          mouseWheel: true,
          touch: true,
        },
        handleScale: {
          mouseWheel: true,
          pinch: true,
        },
      });

      const lineSeries = chart.addLineSeries({
        color: `rgb(var(--primary))`,
        lineWidth: 2,
      });

      lineSeries.setData(
        data.map((point) => ({
          time: point.time / 1000,
          value: point.value,
        }))
      );

      chartRef.current = chart;
    };

    // Wait for next frame to ensure container is properly sized
    requestAnimationFrame(initChart);

    const handleResize = () => {
      if (!chartContainerRef.current || !chartRef.current) return;

      const containerWidth = Math.max(chartContainerRef.current.clientWidth, 300);
      const containerHeight = Math.max(chartContainerRef.current.clientHeight, 400);
      
      chartRef.current.applyOptions({
        width: containerWidth,
        height: containerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, isFullscreen]); // Re-init chart when fullscreen changes

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`${styles['chart-window']} ${isFullscreen ? styles['fullscreen'] : ''}`}
    >
      <div className={styles['chart-window-header']}>
        <div className={styles['chart-window-title']}>
          Price Chart
        </div>
        <div className={styles['chart-window-controls']}>
          {!isMobile && (
            <button 
              className={`${styles['chart-window-button']} ${styles['fullscreen-toggle']}`}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <>
                  <span>Exit Fullscreen</span>
                  <span>⊖</span>
                </>
              ) : (
                <>
                  <span>Fullscreen</span>
                  <span>⊕</span>
                </>
              )}
            </button>
          )}
          <button 
            className={styles['chart-window-button']} 
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        className={styles['chart-container']}
      />
    </div>
  );
};

export default ChartWindow;
