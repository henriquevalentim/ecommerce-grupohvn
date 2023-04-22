import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import Header from '../../../components/Header';
import { GREY_FAINT } from '../../../utils/constants';
import ThankYou from '../../../components/ThankYou';
import StepSelectAddress from '../../../components/StepSelectAddress';
import StepSelectPayment from '../../../components/StepSelectPayment';

const steps = ['Selecione o endereço', 'Informe o metodo de pagamento'];

export default function Payment() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextPage = prevActiveStep + 1;
      if (nextPage === 2) {
        console.log('ultioma pagina');
      }

      return nextPage;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <StepSelectAddress
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 1:
        return (
          <StepSelectPayment
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      default:
        return <ThankYou />;
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: GREY_FAINT,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            minWidth: 800,
            maxHeight: 600,
            marginTop: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {renderStep(activeStep)}
            </CardContent>
          </Box>
        </Card>
      </div>
    </>
  );
}
