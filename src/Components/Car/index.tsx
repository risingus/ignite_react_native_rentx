import React from 'react';
import { About, Brand, CarImage, Container, Details, Name, Period, Price, Rent, Type } from './styles';
import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';

interface CarDataProps {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  }
  thumbnail: string;
}

interface CarProps extends RectButtonProps {
  data: CarDataProps;
}


export function Car({
  data: {
    brand, 
    name, 
    rent: {
      period, 
      price
    },
    thumbnail
  },
  ...rest
}: CarProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{uri: thumbnail}}
        resizeMode='contain'  
      />

    </Container>
  );
}