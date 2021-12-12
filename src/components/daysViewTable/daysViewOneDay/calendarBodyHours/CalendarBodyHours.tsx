import {
  CALENDAR_OFFSET_LEFT,
  hoursArrayString,
} from '../../../../common/constants';
import { Context } from '../../../../context/store';
import { parseCssDark } from '../../../../utils/common';
import { useContext } from 'react';

const renderHours = (width: number, hourHeight: number, isDark: boolean) =>
  hoursArrayString.map((hour: any) =>
    hour === '00' || hour === '24' ? (
      <div
        key={hour}
        className={'Kalend__CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      />
    ) : (
      <div
        key={hour}
        className={'Kalend__CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      >
        <p
          className={parseCssDark(
            'Kalend__text Kalend__CalendarBodyHours__text',
            isDark
          )}
        >
          {hour}
        </p>
        <div
          className={parseCssDark(
            'Kalend__text Kalend__CalendarBodyHours__line',
            isDark
          )}
          style={{ width: width - CALENDAR_OFFSET_LEFT }}
        />
      </div>
    )
  );

const CalendarBodyHours = () => {
  const [store] = useContext(Context);
  const { width, height, hourHeight, isDark } = store;

  const hours: any = renderHours(width, hourHeight, isDark);

  return (
    <div className={'Kalend__CalendarBodyHours__wrapper'} style={{ height }}>
      {hours}
    </div>
  );
};

export default CalendarBodyHours;
