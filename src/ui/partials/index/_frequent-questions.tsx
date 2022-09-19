import { useState } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Container,
} from '@mui/material';
import {
  SectionContainer,
  SectionSubTitle,
  SectionTitle,
  Wave,
  AccordionStyled,
} from './_frequent-questions.styled';

const questionsList = [
  {
    question: 'Dúvida 1',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dignissimos delectus odit adipisci debitis ratione accusamus iusto iste commodi doloremque totam beatae tenetur, ex sint! Iure laboriosam hic necessitatibus ex?',
  },
  {
    question: 'Dúvida 2',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dignissimos delectus odit adipisci debitis ratione accusamus iusto iste commodi doloremque totam beatae tenetur, ex sint! Iure laboriosam hic necessitatibus ex?',
  },
  {
    question: 'Dúvida 3',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dignissimos delectus odit adipisci debitis ratione accusamus iusto iste commodi doloremque totam beatae tenetur, ex sint! Iure laboriosam hic necessitatibus ex?',
  },
  {
    question: 'Dúvida 4',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dignissimos delectus odit adipisci debitis ratione accusamus iusto iste commodi doloremque totam beatae tenetur, ex sint! Iure laboriosam hic necessitatibus ex?',
  },
];

const FrequentQuestions = () => {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  function isOpen(accordionNumber: number): boolean {
    return accordionNumber == activeAccordion;
  }

  function changeOpenAcoordion(accordionNumber: number) {
    setActiveAccordion(isOpen(accordionNumber) ? -1 : accordionNumber);
  }

  function getIcon(accordionNumber: number) {
    return isOpen(accordionNumber) ? 'twf-minus' : 'twf-plus';
  }

  return (
    <SectionContainer>
      <Wave src='/img/home/waves.svg' />

      <Container>
        <SectionTitle>Ainda está com dúvidas</SectionTitle>
        <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>
        {questionsList.map((question, index) => (
          <AccordionStyled
            key={index}
            expanded={isOpen(index)}
            onChange={() => changeOpenAcoordion(index)}
          >
            <AccordionSummary expandIcon={<i className={getIcon(index)} />}>
              <Typography color={'primary'}>{question.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>{question.answer}</AccordionDetails>
          </AccordionStyled>
        ))}
      </Container>
    </SectionContainer>
  );
};

export default FrequentQuestions;
