import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { Container, Content, Footer, Message, Title } from './styles';
import { ConfirmButton } from '../../Components/ConfirmButton';


export function SchedulingComplete() {
  const {width} = useWindowDimensions();
  return (
    <Container>
      <StatusBar 
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <LogoSvg 
        width={width}
      />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro Alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionário da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='Ok'/>
      </Footer>


    </Container>
  )
}