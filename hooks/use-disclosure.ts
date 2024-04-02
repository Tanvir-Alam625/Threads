'use client';
/**
 * @description A hook to manage the state of a disclosure component
*/
import { useCallback, useState } from 'react';

export const useDisclosure = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((state) => !state), []);

    return { isOpen, open, close, toggle };
};
