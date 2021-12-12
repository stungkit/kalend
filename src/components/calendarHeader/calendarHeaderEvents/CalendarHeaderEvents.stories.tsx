import { CalendarHeaderEventsProps } from './CalendarHeaderEvents.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import CalendarHeaderEvents from './CalendarHeaderEvents';

export default {
  title: 'Components/CalendarHeader/CalendarHeaderEvents',
  component: CalendarHeaderEvents,
} as Meta;

const Template: Story<CalendarHeaderEventsProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};