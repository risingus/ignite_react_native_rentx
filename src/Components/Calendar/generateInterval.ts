import {eachDayOfInterval, format} from 'date-fns';
import {
  MarkedDateProps,
  DayProps
} from '.'
import theme from '../../styles/theme';
import { getPlatformDate } from '../../utils/getPlatformDate';



export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  })
}


