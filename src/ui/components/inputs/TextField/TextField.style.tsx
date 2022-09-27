import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
// import { TextFieldProps } from './TextField';

export const TextFieldStyled = styled(TextField)<TextFieldProps>`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.grey[50]};
  }
  .MuiOutlinedInput-notchedOutLine {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;
