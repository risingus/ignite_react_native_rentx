import React, {useRef, useState} from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';
import { 
  CarImage,
  CarImageWrapper,
  Container,
  ImagesIndexes 
} from './style';

interface Photos {
	id: string;
	photo: string;
}

interface ImageSliderProps {
  images: Photos[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({images}: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);


  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index)
  })

  return (
    <Container>

      <ImagesIndexes>
        {
          images.map((_, index) => (
            <Bullet 
              key={String(index)} 
              active={index === imageIndex} 
            />
          ))
        }
      </ImagesIndexes>
        <FlatList 
          data={images}
          keyExtractor={key => key.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage 
                source={{uri: item.photo}}
                resizeMode='contain'
              />
            </CarImageWrapper>
          )}
        />
    </Container>
  )
}

