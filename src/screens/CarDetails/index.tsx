import React from 'react';
import { StatusBar } from 'react-native';
import { 
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute
 } from '@react-navigation/native';
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
  About,
  Accessories,
  Footer
} from './styles';
import { Button } from '../../Components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';

interface RouteParams {
  car: CarDTO
}

export function CarDetails() {
  const {navigate, goBack}: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {car} = route.params as RouteParams;

  function handleConfirmRental() {
    navigate('Scheduling')
  }

  function handleBack() {
    goBack();
  }
  
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

        <About>{car.about}</About>

      </Content>

      <Footer>
        <Button 
          title='Escolher período do aluguel' 
          onPress={handleConfirmRental} 
        />
      </Footer>

    </Container>
  )
}