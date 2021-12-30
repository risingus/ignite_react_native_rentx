import React from 'react';
import { 
  Calendar as CustomCalendar,
  LocaleConfig
} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';


LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ],
  dayNamesShort: [
    'DOM',
    'SEG',
    'TER',
    'QUA',
    'QUI',
    'SEX',
    'SÁB'
  ],
  today: 'Hoje'
}

LocaleConfig.defaultLocale = 'pt-br'


export function Calendar() {
  const theme = useTheme();
  return (
    <CustomCalendar
      firstDay={1}
      minDate={`${new Date()}`}
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