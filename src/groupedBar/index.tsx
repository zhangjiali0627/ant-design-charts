import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { GroupedBar as G2plotGroupedBar, GroupedBarConfig as G2plotProps } from '@antv/g2plot';
import useChart from '../hooks/useChart';
import { ErrorBoundary } from '../base';

export interface GroupedBarConfig extends G2plotProps {
  chartRef?: React.MutableRefObject<G2plotGroupedBar | undefined>;
  style?: React.CSSProperties;
  className?: string;
}

const GroupedBarChart = forwardRef((props: GroupedBarConfig, ref) => {
  const { chartRef, style = {}, className, ...rest } = props;

  const { chart, container } = useChart<G2plotGroupedBar, GroupedBarConfig>(G2plotGroupedBar, rest);

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart.current;
    }
  }, [chart.current]);
  useImperativeHandle(ref, () => ({
    getChart: () => chart.current,
  }));
  return (
    <ErrorBoundary>
      <div className={className} style={style} ref={container} />
    </ErrorBoundary>
  );
});

GroupedBarChart.defaultProps = G2plotGroupedBar.getDefaultOptions();

export default GroupedBarChart;
