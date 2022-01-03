import React from 'react';
import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallackHandler
} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ptBr } from './localeConfig';


LocaleConfig.locales['pt-br'] = ptBr;

LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({
  markedDates,
  onDayPress
}: CalendarProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      firstDay={1}
      minDate={`${new Date()}`}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
      renderArrow={(direction) => 
        <Feather 
          size={24}
          color={theme.colors.text}
          name={direction === 'right' ? 'chevron-right' : 'chevron-left'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomColor: theme.colors.text_detail,
        borderBottomWidth: .4,
        paddingBottom: 10,
        marginBottom: 10,

      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontSize: RFValue(20),
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary_600,
        textDayHeaderFontSize: 10,
        textDayFontSize: RFValue(13),
        weekVerticalMargin: RFValue(2), 
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
    />
  )
}


export {
  Calendar,
  MarkedDateProps,
  DayProps
}