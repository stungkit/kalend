import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { parseCssDark } from '../../utils/common';
import { useContext, useEffect, useState } from 'react';

const CurrentHourLine = () => {
  const [store] = useContext(Context);
  const { config, colors } = store;

  const [currentTime, setCurrentTime] = useState(DateTime.now());

  const wrapperStyle: any = {
    top:
      currentTime.hour * config.hourHeight +
      (currentTime.minute / 60) * config.hourHeight,
  };

  useEffect(() => {
    // 2 minutes interval
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={wrapperStyle} className={'Kalend__CurrentHourLine'}>
      <div
        className={parseCssDark(
          'Kalend__CurrentHourLine__circle',
          store.isDark
        )}
        style={{
          background: store.isDark
            ? colors.dark.primaryColor
            : colors.light.primaryColor,
        }}
      />
      <div
        style={{
          background: store.isDark
            ? colors.dark.primaryColor
            : colors.light.primaryColor,
        }}
        className={parseCssDark('Kalend__CurrentHourLine__line', store.isDark)}
      />
    </div>
  );
};

export default CurrentHourLine;
