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
        textColor: getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
      },
      grid: {
        vertLines: { color: `rgb(var(--text)/0.1)` },
        horzLines: { color: `rgb(var(--text)/0.1)` },
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
