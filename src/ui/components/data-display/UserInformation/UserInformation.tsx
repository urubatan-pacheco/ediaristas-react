import React, { PropsWithChildren } from 'react';
import { SystemProps } from '@mui/system';

import {
  UserInformationContainer,
  UserName,
  UserDescription,
  AvatarStyled,
  RatingStyled,
} from './UserInformation.style';

export interface UserInformationProps {
  name: string;
  picture: string;
  rating: number;
  description?: string;
  isRating?: boolean;
  sx?: SystemProps;
}

const UserInformation: React.FC<PropsWithChildren<UserInformationProps>> = (
  props
) => {
  // <AvatarStyled src={props.picture}>{props.name[0]}</AvatarStyled>
  return (
    <UserInformationContainer sx={props.sx} isRating={props.isRating}>
      <AvatarStyled src={props.picture}></AvatarStyled>
      <RatingStyled value={props.rating} readOnly />
      <UserName>{props.name}</UserName>
      <UserDescription>{props.description}</UserDescription>
    </UserInformationContainer>
  );
};

export default UserInformation;
