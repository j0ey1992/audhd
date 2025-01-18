import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const chart = createChart(chartRef.current, {
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

    lineSeries.setData(
      data.map((point) => ({
        time: point.time / 1000,
        value: point.value,
      }))
    );

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
      chart.remove();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: 280 }} />;
};

export default ChartComponent;
