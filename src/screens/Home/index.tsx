import React, {useEffect, useState} from 'react';
import {api} from '../../services/api';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { Car } from '../../Components/Car';
import { 
  useNavigation,
  NavigationProp,
  ParamListBase
} from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../Components/Load';


export function Home() {
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  
  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', {car});
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
          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>

        </HeaderContent>
       
      </Header>

      {
        loading ?  <Load /> : (

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
    </Container>
  )
}