import { useState } from 'react';

export default function useEncontrarDirista() {
    const [podeContratar, setPodeContratar] = useState(false);

    return {
        podeContratar,
        setPodeContratar,
    };
}
