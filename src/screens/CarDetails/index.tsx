import React from 'react';
import { StatusBar } from 'react-native';
import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
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
       <ImageSlider imagesUrl={['https://www.downloadclipart.net/large/audi.png']}/>
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>Rs5 Coupé</Name>
          </Description>
          <Rent>
            <Period>Ao Dia</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide 
          indultado na praça Real Maestranza de Sevilla.
          É um belíssimo carro para quem gosta de acelerar.
        </About>

      </Content>

      <Footer>
        <Button title='Confirmar' />
      </Footer>

    </Container>
  )
}