import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import { useTheme } from 'styled-components';
import {Ionicons} from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { StatusBar, BackHandler } from 'react-native';
import Logo from '../../assets/logo.svg';
import { Car } from '../../Components/Car';
import { 
  useNavigation,
  NavigationProp,
  ParamListBase
} from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../Components/Load';
import { LoadAnimation } from '../../Components/LoadAnimation';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


export function Home() {
  const theme = useTheme();
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any) {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
  
  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', {car});
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      
      <Header>
        <HeaderContent>

          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          {
           !loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
           ) 
          }
         

        </HeaderContent>
       
      </Header>

      {
        loading ?  <LoadAnimation /> : (

          <CarList 
            data={cars}
            renderItem={({item}) => (
            <Car 
              data={item} 
              onPress={() => handleCarDetails(item)}
            />
            )}
            keyExtractor={item => item.id}
          />
        )
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={{
              backgroundColor: theme.colors.main,
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.background_secondary}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
   
    </Container>
  )
}