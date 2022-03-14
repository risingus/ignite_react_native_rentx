import styled from 'styled-components/native';


interface BulletProps {
  active?: boolean;
}

export const Container = styled.View<BulletProps>`
  width: 6px;
  height: 6px;
  margin: 0 0 0 8px;
  border-radius: 3px;

  background: ${({theme, active}) => 
  active ? theme.colors.title : theme.colors.shape};
`;