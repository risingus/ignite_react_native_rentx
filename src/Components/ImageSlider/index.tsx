import React from 'react';
import { 
  CarImage,
  CarImageWrapper,
  Container,
  ImageIndex,
  ImagesIndexes 
} from './style';

interface ImageSliderProps {
  imagesUrl: string[];
}

export function ImageSlider({imagesUrl}: ImageSliderProps) {
  return (
    <Container>

      <ImagesIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImagesIndexes>

      <CarImageWrapper>
        <CarImage 
          source={{uri: imagesUrl[0]}}
          resizeMode='contain'
        />
      </CarImageWrapper>

    </Container>
  
  )
}