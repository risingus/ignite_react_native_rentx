import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { Car } from '../../Components/Car';

const data = [
  {
    brand: 'audi', 
    name: 'rs5 coupé', 
    rent: {
      period: 'ao dia', 
      price: 120
    },
    thumbnail: 'https://images.unsplash.com/photo-1612468008274-9445bd56161e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80',
  }
]


export function Home() {
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
        data={data}
        renderItem={({item}) => <Car data={data[0]} />}
        keyExtractor={item => String(item)}
      />

    </Container>
  )
}