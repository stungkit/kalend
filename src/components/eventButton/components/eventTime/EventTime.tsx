import { useContext } from 'react';

import { CalendarEvent, Config } from '../../../../common/interface';
import { Context, Store } from '../../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE, TIME_FORMAT } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';
import { parseToDateTime } from '../../../../utils/dateTimeParser';

const TIME_FORMAT_PATTERN = 'HH:mm';
const TIME_H_12_FORMAT_PATTERN = 'hh:mm a';

const parseTimeFormat = (day: DateTime, timeFormat: TIME_FORMAT): string => {
  if (timeFormat === TIME_FORMAT.H_24) {
    return day.toFormat(TIME_FORMAT_PATTERN);
  } else {
    return day.toFormat(TIME_H_12_FORMAT_PATTERN);
  }
};

const formatEventTimeV2 = (
  event: CalendarEvent,
  timeFormat: TIME_FORMAT,
  timezone?: string
): { start: string; end: string } => {
  const { startAt, endAt, timezoneStartAt } = event;

  const startAtDateTime: DateTime = parseToDateTime(
    startAt,
    timezoneStartAt,
    timezone
  );
  const endAtDateTime: DateTime = parseToDateTime(
    endAt,
    timezoneStartAt,
    timezone
  );

  return {
    start: parseTimeFormat(startAtDateTime, timeFormat),
    end: parseTimeFormat(endAtDateTime, timeFormat),
  };
};

interface EventTimeProps {
  isDark: boolean;
  event: CalendarEvent;
  type: EVENT_TYPE;
}

const normalTime = (
  timeFormat: TIME_FORMAT,
  event: CalendarEvent,
  timezone: string,
  type: EVENT_TYPE,
  isDark: boolean
) => {
  const timeV2: any = formatEventTimeV2(event, timeFormat, timezone);

  return timeFormat === TIME_FORMAT.H_12 ? (
    <p
      className={`Kalend__text ${parseCssDark(
        'Kalend__Event__time',
        isDark
      )} Kalend__Event__time__type-${type}`}
    >
      {timeV2.start}
      <br />
      {timeV2.end}
    </p>
  ) : (
    <p
      className={`Kalend__text ${parseCssDark(
        'Kalend__Event__time',
        isDark
      )} Kalend__Event__time__type-${type}`}
    >
      {timeV2.start} - {timeV2.end}
    </p>
  );
};

const EventTime = (props: EventTimeProps) => {
  const { isDark, event, type } = props;

  const [store] = useContext(Context);
  const { config } = store as Store;
  const { timezone, timeFormat } = config as Config;

  return type === EVENT_TYPE.AGENDA && event.allDay ? (
    <>
      <p
        className={`Kalend__text ${parseCssDark(
          'Kalend__Event__time',
          isDark
        )} Kalend__Event__time__type-${type}`}
      >
        All day
      </p>
      <p
        style={{
          color: 'transparent',
          padding: 0,
          margin: 0,
          fontSize: '0.8em',
        }}
      >
        123 12
      </p>
    </>
  ) : (
    normalTime(timeFormat, event, timezone, type, isDark)
  );
};

export default EventTime;
