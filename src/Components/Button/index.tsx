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
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  loading = false,
  enabled = true,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Container
      loading={loading}
      enabled={enabled}
      color={color}
      {...rest} 
    >

      {
        loading ? (
          <ActivityIndicator color={theme.colors.shape}/>
        )
        : (
          <Title>
            {title}
          </Title>
        )
      }
      
    
    </Container>
  )
}