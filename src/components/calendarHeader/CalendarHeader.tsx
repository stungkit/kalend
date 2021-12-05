import React, { useContext } from 'react';
import CalendarHeaderDays from './calendarHeaderDays/CalendarHeaderDays';
import CalendarHeaderEvents from './calendarHeaderEvents/CalendarHeaderEvents';
import { Context } from '../../context/store';
import { CALENDAR_VIEW } from '../../common/enums';
import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../common/interface';

interface CalendarHeaderProps {
  handleEventClick: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  events: any;
}
const CalendarHeader = (props: CalendarHeaderProps) => {
  const { handleEventClick, events, onEventDragFinish } = props;

  const [store] = useContext(Context);
  const { isDark, width, selectedView } = store;

  const isDayView: boolean = selectedView === CALENDAR_VIEW.DAY;
  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  return (
    <div
      className={`Calend__CalendarHeader${!isMonthView ? '-tall' : ''}${
        isDayView ? '-day' : ''
      }${isMonthView ? '-small' : ''}${isDark ? '-dark' : ''}`}
    >
      <CalendarHeaderDays width={width} isMonthView={isMonthView} />
      {!isMonthView ? (
        <CalendarHeaderEvents
          handleEventClick={handleEventClick}
          events={events}
          onEventDragFinish={onEventDragFinish}
        />
      ) : null}
    </div>
  );
};

export default CalendarHeader;
