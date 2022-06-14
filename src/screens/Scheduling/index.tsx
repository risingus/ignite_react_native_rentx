import React, {useState} from 'react';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import {format} from 'date-fns'
import { BackButton } from '../../Components/BackButton';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { 
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title
} from './styles';
import { Button } from '../../Components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { 
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps
} from '../../Components/Calendar';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriodProps {
  start: string;
  end: string;
}
interface Params {
  car: CarDTO
}


export function Scheduling() {
  const theme = useTheme()
  const {navigate, goBack}: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)


  function handleConfirmRental() {
    navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleDateChange(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle={'light-content'}
          translucent
          backgroundColor="transparent"
        />
        
        <BackButton 
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue 
              selected={!!rentalPeriod.start}
            >
              {rentalPeriod.start}
            </DateValue>
          </DateInfo>

        <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue 
              selected={!!rentalPeriod.end}
            >
              {rentalPeriod.end}
            </DateValue>
          </DateInfo>
        </RentalPeriod>

      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleDateChange}
        />
      </Content>

      <Footer>
        <Button 
        title="Confirmar"
        enabled={!!rentalPeriod.start}
        onPress={handleConfirmRental}  
      />
      </Footer>

    </Container>
  )
}