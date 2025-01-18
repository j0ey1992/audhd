import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Validate data
    if (!data || !Array.isArray(data) || data.length === 0 || !chartRef.current) {
      console.warn('Invalid or empty chart data');
      return;
    }

    // Validate data structure
    if (!data.every(point => point && typeof point.time === 'number' && typeof point.value === 'number')) {
      console.error('Invalid data point structure');
      return;
    }

    let chart;
    try {
      chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 280,
        layout: {
          background: { color: 'transparent' },
          textColor: '#ffffff',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        timeScale: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      });

      const lineSeries = chart.addLineSeries({
        color: '#3772FF',
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        priceLineVisible: false,
      });

      // Sort data by time in ascending order and convert to seconds
      const sortedData = data
        .map((point) => ({
          time: point.time / 1000, // Convert milliseconds to seconds
          value: point.value,
        }))
        .sort((a, b) => a.time - b.time); // Sort by time ascending

      lineSeries.setData(sortedData);

      const handleResize = () => {
        if (chartRef.current) {
          chart.applyOptions({
            width: chartRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chart) {
          chart.remove();
        }
      };
    } catch (error) {
      console.error('Error creating chart:', error);
      return () => {}; // Return empty cleanup function if chart creation fails
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: 280 }} />;
};

export default ChartComponent;
