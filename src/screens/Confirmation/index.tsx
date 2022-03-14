import React from 'react';
import {StatusBar, useWindowDimensions} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { Container, Content, Footer, Message, Title } from './styles';
import { ConfirmButton } from '../../Components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}


export function Confirmation() {
  const {width} = useWindowDimensions();
  const {navigate}: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {title, message, nextScreenRoute} = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute);
  }
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
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton 
          title='Ok'
          onPress={handleConfirm}
        />
      </Footer>


    </Container>
  )
}