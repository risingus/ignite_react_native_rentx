import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { 
  Container 
} from './styles';

interface BackButtonProps extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({color, ...rest}: BackButtonProps) {
  const theme = useTheme();

  const {goBack}: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Container {...rest}>
      <MaterialIcons 
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
      />

    </Container>
  )
}