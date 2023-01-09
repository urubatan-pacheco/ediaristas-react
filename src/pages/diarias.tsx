import React from 'react';
import { GetStaticProps } from 'next';

// import { Component } from '@styles/pages/diarias.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Diarias',
        },
    };
};

const Diarias: React.FC = () => {
    return (
        <div>
            <div>Diarias</div>
        </div>
    );
};

export default Diarias;