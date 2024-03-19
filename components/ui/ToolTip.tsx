'use client';
import React from 'react';
import Tippy from "@tippyjs/react";

import { twMerge } from 'tailwind-merge';

// Define the Props type
type Props = {
    content: string | React.ReactNode,
    arrow?: boolean,
    placement?: 'top' | 'left' | 'right' | 'left-end' | 'top-start',
    children: React.ReactNode,
    animation?: 'fade' | 'shift-away' | 'scale' | 'shift-toward' | 'scale-subtle' | 'scale-extreme',
    theme?: 'light' | 'translucent' | 'material' | 'light-border',
    delay?: number,
    disabled?: boolean,
    duration?: [number, number],
    className?: string,
} & React.ComponentProps<typeof Tippy>

// Define the Tippy component
const ToolTip = ({
    delay = 0,
    content,
    animation = 'shift-toward',
    theme = 'translucent',
    placement = 'top',
    disabled = false,
    children,
    arrow = false,
    className = '',
    duration = [275, 250],
    ...rest
}: Props) => {
    return (
        <Tippy
            animation={animation}
            duration={duration}
            moveTransition='transform 0.3s ease'
            theme={theme}
            arrow={arrow}
            disabled={disabled}
            delay={delay}
            className={twMerge('tippy', className)}
            content={content}
            placement={placement}
            {...rest}
        >
            {children}
        </Tippy>
    );
};

export default ToolTip;
