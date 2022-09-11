import { Accordion } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SectionContainer = styled('section')`
  padding: ${({ theme }) => theme.spacing(7) + ' 0 ' + theme.spacing(7)};
`;

export const Wave = styled('img')`
  height: 100px;
  width: 100%;
  margin-top: -100px;
`;

export const SectionTitle = styled('h2')`
  margin: 0;
  text-align: center;
`;

export const SectionSubTitle = styled('p')`
  position: relative;
  margin: ${({ theme }) => theme.spacing(2) + ' 0 ' + theme.spacing(10)};
  text-align: center;
  &::after {
    content: '';
    position: absolute;
    width: 96px;
    height: 3px;
    bottom: ${({ theme }) => theme.spacing(-5)};
    background-color: ${({ theme }) => theme.palette.grey[300]};
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const AccordionStyled = styled(Accordion)`
  .MuiAccordionSummary-content .MuiTypography-root {
    font-weight: bold;
  }

  .MuiAccordionDetails-root {
    padding-right: ${({ theme }) => theme.spacing(7)};
  }

  .MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  &.MuiAccordion-root {
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    &::before {
      background-color: transparent;
    }
    &,
    &.Mui-expanded {
      margin: -2px 0 0;
    }
  }
`;
