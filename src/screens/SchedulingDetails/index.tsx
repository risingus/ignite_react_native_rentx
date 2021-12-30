import React from 'react';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import { Accessory } from '../../Components/Accessory';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { 
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Header,
  Name,
  Period,
  Rent,
  Price,
  Details,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';
import { Button } from '../../Components/Button';


export function SchedulingDetails() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton
          onPress={() => {}}
        />
      </Header>

      <CarImages>
       <ImageSlider imagesUrl={['https://www.downloadclipart.net/large/audi.png']}/>
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>Rs5 Coupé</Name>
          </Description>
          <Rent>
            <Period>Ao Dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>30/12/2021</DateValue>
          </DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>01/01/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title='Confirmar' />
      </Footer>

    </Container>
  )
}