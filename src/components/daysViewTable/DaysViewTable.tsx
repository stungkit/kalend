import React, { useContext, useEffect } from 'react';
import { DateTime } from 'luxon';

import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import {
  CalendarEvent,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../common/interface';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';
import { formatTimestampToDate } from '../../utils/common';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import { Context } from '../../context/store';
import { getNewCalendarDays } from '../../utils/getCalendarDays';

const renderOneDay = (
  calendarDays: DateTime[],
  handleNewEventClick: OnNewEventClickFunc,
  events: any,
  handleEventClick: OnEventClickFunc,
  onEventDragFinish?: OnEventDragFinishFunc
) =>
  calendarDays.map((day: DateTime, index: number) => {
    const formattedDayString: string = formatTimestampToDate(day);

    return (
      <DaysViewOneDay
        key={day.toString()}
        day={day}
        index={index}
        data={events ? events[formattedDayString] : []}
        handleNewEventClick={handleNewEventClick}
        handleEventClick={handleEventClick}
        onEventDragFinish={onEventDragFinish}
      />
    );
  });

interface CalendarBodyProps {
  handleNewEventClick: OnNewEventClickFunc;
  handleEventClick: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  events: any;
}
const DaysViewTable = (props: CalendarBodyProps) => {
  const { handleNewEventClick, handleEventClick, onEventDragFinish, events } =
    props;

  const [store] = useContext(Context);
  const { hourHeight, calendarDays, width, height, selectedView } = store;

  const headerEventRowsCount = 0;

  const days: any = renderOneDay(
    calendarDays,
    handleNewEventClick,
    events,
    handleEventClick,
    onEventDragFinish
  );

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    width,
    height: height, //- headerEventRowsCount * 22,
  };

  /**
   * Adjust scroll position for all screens
   * @param currentIndex
   */
  const setCurrentOffset = (): void => {
    const currentElement: any = document.getElementById(`Calend__timetable`);

    // Have to set middle clone for last screen manually to get correct current offset
    const currentOffset: number = currentElement.scrollTop;

    // Need to select with query selector as byId doesn't select clones
    const elements: any = document.querySelectorAll('.calendar-body__wrapper');

    for (const element of elements) {
      element.scrollTop = currentOffset;
    }
  };

  const adjustScrollPosition = () => {
    const currentElement: any = document.getElementById(`Calend__timetable`);

    currentElement.scrollTop = DateTime.now().hour * hourHeight - hourHeight;
  };

  // Debounce scroll function
  // Turn off for desktop layout as there is just one active screen
  // const handleScroll = _.debounce(() => {
  //   if (!isMobile) {
  //     return;
  //   }
  //   setCurrentOffset();
  // }, 50);

  useEffect(() => {
    adjustScrollPosition();
  }, []);

  const onPageChange = async (isGoingForward?: boolean) => {
    await getNewCalendarDays(calendarDays, selectedView, isGoingForward);
  };

  return (
    // <Carousel onPageChange={onPageChange}>
    <div
      style={style}
      className={'Calend__CalendarBody'}
      id={`Calend__timetable`}
      // onScroll={handleScroll}
    >
      <CalendarBodyHours />
      {days}
    </div>
    // </Carousel>
  );
};

export default DaysViewTable;
