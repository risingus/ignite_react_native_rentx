import React from 'react';
import { About, Brand, CarImage, Container, Details, Name, Period, Price, Rent, Type } from './styles';
import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';
import {CarDTO} from '../../dtos/CarDTO';
import { getAccessoryImg } from '../../utils/getAccessoryIcons';

interface CarProps extends RectButtonProps {
  data: CarDTO;
}

export function Car({
  data: {
    brand, 
    name, 
    period, 
    price,
    thumbnail,
    fuel_type
  },
  ...rest
}: CarProps) {
  const MotorIcon = getAccessoryImg(fuel_type);
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
            <MotorIcon />
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