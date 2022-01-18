import React from 'react';
import { StatusBar } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import { Container } from './styles';


export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation.value,
        }
      ],
    }
  })

  function handleAnimationPosition() {
    animation.value = 100;
  }


  return (
    <Container>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />

    </Container>
  )
}