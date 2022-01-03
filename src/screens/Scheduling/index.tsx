import React, {useState} from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { StatusBar } from 'react-native';
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
import { Calendar, DayProps } from '../../Components/Calendar';


export function Scheduling() {
  const theme = useTheme()
  const {navigate, goBack}: NavigationProp<ParamListBase> = useNavigation();
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)

  function handleConfirmRental() {
    navigate('SchedulingDetails')
  }

  function handleBack() {
    goBack()
  }

  function handleDateChange(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = 
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
          onPress={handleBack}
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
            <DateValue selected>18/06/2021</DateValue>
          </DateInfo>

        <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>19/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

      </Header>

      <Content>
        <Calendar 
          markedDates={}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
        title="Confirmar"
        onPress={handleConfirmRental}  
      />
      </Footer>

    </Container>
  )
}