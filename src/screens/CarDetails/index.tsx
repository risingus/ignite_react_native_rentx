import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { 
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute
 } from '@react-navigation/native';
 import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Accessory } from '../../Components/Accessory';
import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { 
  Brand,
  CarImages,
  Container,
  Description,
  Header,
  Name,
  Period,
  Rent,
  Price,
  Details,
  About,
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../Components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';

interface RouteParams {
  car: CarDTO
}

export function CarDetails() {
  const theme = useTheme();
  const {navigate, goBack}: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {car} = route.params as RouteParams;
  const scrollY = useSharedValue(0);
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [
          0, 200
        ],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value, 
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  function handleConfirmRental() {
    navigate('Scheduling', {
      car
    })
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

      <Animated.View
        style={[headerStyleAnimation, {
          position: 'absolute',
          overflow: 'hidden',
          zIndex: 1,
          backgroundColor: theme.colors.background_secondary
        }]}
      >
        <Header>
          <BackButton
            onPress={handleBack}
          />
        </Header>

        <CarImages>
          <Animated.View
            style={[sliderCarsStyleAnimation]}
          >
              <ImageSlider images={car.photos}/>
          </Animated.View>
        </CarImages>

        </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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

        <About>
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>
        <Button 
          title='Escolher período do aluguel' 
          onPress={handleConfirmRental} 
        />
      </Footer>

    </Container>
  )
}