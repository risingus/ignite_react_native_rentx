import React from 'react';
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
import { Calendar } from '../../Components/Calendar';


export function Scheduling() {
  const theme = useTheme()
  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle={'light-content'}
          translucent
          backgroundColor="transparent"
        />
        
        <BackButton 
          onPress={() => {}}
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
        <Calendar />
      </Content>

      <Footer>
        <Button title="confirmar"/>
      </Footer>

    </Container>
  )
}