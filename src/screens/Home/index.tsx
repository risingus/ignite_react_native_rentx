import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { Car } from '../../Components/Car';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const data = 
  {
    brand: 'audi', 
    name: 'rs5 coupé', 
    rent: {
      period: 'ao dia', 
      price: 120
    },
    thumbnail: 'https://www.downloadclipart.net/large/audi.png',
  }



export function Home() {
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();
  
  function handleCarDetails() {
    navigate('CarDetails');
  }
  
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
            Total de 12 carros
          </TotalCars>

        </HeaderContent>
       
      </Header>

      <CarList 
        data={[1,2,3,4,5,6,7]}
        renderItem={({item}) => (
        <Car 
          data={data} 
          onPress={handleCarDetails}
        />
        )}
        keyExtractor={item => String(item)}
      />

    </Container>
  )
}