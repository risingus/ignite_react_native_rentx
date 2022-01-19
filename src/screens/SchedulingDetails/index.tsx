import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';
import { Alert, StatusBar } from 'react-native';
import { api } from '../../services/api';
import {getAccessoryImg} from '../../utils/getAccessoryIcons';
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
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod {
  start: string;
  end: string;
}
interface Params {
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const {navigate, goBack}: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {car, dates} = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirm() {
    setLoading(true)
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)
    const unavailableDates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    await api.post('schedules_byuser', {
      car,
      user_id: 1,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailableDates
    })
    .then(() => navigate('SchedulingComplete'))
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento')
    })
  }

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton
          onPress={handleBack}
        />
      </Header>

      <CarImages>
       <ImageSlider imagesUrl={car.photos}/>
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>


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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

       <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                name={accessory.name}
                key={accessory.type}
                icon={getAccessoryImg(accessory.type)} 
              />
            ))
          }
        </Accessories>

        
      </Content>

      <Footer>
        <Button
          color={theme.colors.success}
          title='Alugar agora' 
          onPress={handleConfirm}
          enabled={!loading}
          loading={loading}
        />
      </Footer>

    </Container>
  )
}