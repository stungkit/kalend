import { CALENDAR_VIEW } from '../../../../common/enums';
import { CalendarHeaderWeekDaysProps } from './CalendarHeaderWeekDays.props';
import { Context } from '../../../../context/store';
import { DateTime } from 'luxon';
import { daysText } from '../../../../utils/calendarDays';
import { useContext } from 'react';
import DayOfWeekText from '../../../dayOfWeekText/DayOfWeekText';

/**
 * Render text representation of days
 *
 * @param props
 * @constructor
 */
const CalendarHeaderWeekDays = (props: CalendarHeaderWeekDaysProps) => {
  const { daysNum, days } = props;

  const [store] = useContext(Context);
  const { width, selectedView } = store;

  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  const colWidth: number = width / daysNum;

  const renderDaysText = () => {
    const dayTextColumnWidth: any = {
      width: colWidth,
    };

    if (isMonthView) {
      return daysText.map((day: string) => (
        <div
          key={day}
          className={'Kalend__CalendarHeaderWeekDays__col'}
          style={dayTextColumnWidth}
        >
          <p className={'Kalend__text Kalend__CalendarHeaderWeekDays__text'}>
            {day}
          </p>
        </div>
      ));
    }

    return days.map((calendarDay: DateTime) => (
      <DayOfWeekText
        key={calendarDay.toString()}
        day={calendarDay}
        width={colWidth}
      />
    ));
  };
  const namesForDays: any = renderDaysText();

  return (
    <div className={'Kalend__CalendarHeaderWeekDays__wrapper'}>
      <div className={'Kalend__CalendarHeaderWeekDays__container'}>
        {namesForDays}
      </div>
    </div>
  );
};

export default CalendarHeaderWeekDays;
