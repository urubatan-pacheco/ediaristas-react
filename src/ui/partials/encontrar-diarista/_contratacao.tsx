import { Paper } from '@mui/material';
import useContratacao from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import React, { PropsWithChildren } from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { UserFormContainer } from 'ui/components/inputs/UserForms/UserForms';
import { PageFormContainer } from 'ui/components/inputs/UserForms/UserForms.style';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';

// import { Component } from './_contratacao.styled';

const Contratacao: React.FC<PropsWithChildren> = () => {
    const isMobile = useIsMobile(),
        { step, breadCrumbItems } = useContratacao();
    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                selected={breadCrumbItems[step - 1]}
                items={breadCrumbItems}
            />
            {step === 1 && (
                <PageTitle title={'Nos conte um pouco sobre o serviço'} />
            )}
            <UserFormContainer>
                <PageFormContainer fullWidth={step === 4}>
                    <Paper sx={{ p: 4 }}>fsafsafs</Paper>
                    <SideInformation
                        title={'Detalhes'}
                        items={[
                            {
                                title: 'Tipo',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                            {
                                title: 'Tamanho',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                            {
                                title: 'Data',
                                description: [''],
                                icon: 'twf-check-circle',
                            },
                        ]}
                        footer={{
                            text: 'R$80,00',
                            icon: 'twf-credit-card',
                        }}
                    />
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;
