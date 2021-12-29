import React from 'react';
import { StatusBar } from 'react-native';
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
  About
} from './styles';


export function CarDetails() {
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
       <ImageSlider imagesUrl={['https://images.unsplash.com/photo-1617434108848-6a1e827124ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80']}/>
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>Ferrari</Brand>
            <Name>blabla</Name>
          </Description>
          <Rent>
            <Period>Ao Dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide 
          indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </About>

      </Content>

    </Container>
  )
}