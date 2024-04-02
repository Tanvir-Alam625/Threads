/**
 * @description A hook to get the window size
*/


import { useEffect, useState } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Check if window is defined (i.e., running in the browser)
        if (typeof window !== 'undefined') {
            // Set initial window size
            handleResize();

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);

            // Cleanup on unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;
}
