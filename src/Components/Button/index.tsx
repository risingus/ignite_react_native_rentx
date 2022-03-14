import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
  Container,
  Title
} from './styles';

interface ButtonProps extends RectButtonProps{
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean; 
}

export function Button({
  title,
  color,
  loading = false,
  light = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Container
      loading={loading}
      color={color}
      {...rest} 
    >

      {
        loading ? (
          <ActivityIndicator color={theme.colors.shape}/>
        )
        : (
          <Title light={light}>
            {title}
          </Title>
        )
      }
      
    
    </Container>
  )
}