"use client";

import { useDisclosure } from '@/hooks/use-disclosure';
import { CSSUnit } from '@/constants';
import React, { createContext, useContext } from 'react';
import { LayerProps, TriggerProps, useLayer, Arrow, ArrowProps } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';

type DropdownContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    renderLayer: (children: React.ReactNode) => React.ReactNode;
    triggerProps: TriggerProps;
    layerProps: LayerProps;
    arrowProps: ArrowProps;
    showArrow?: boolean;
};

const DropDownContext = createContext<DropdownContextType | undefined>(undefined);

type DropdownProps = {
    placement?: PlacementType;
    children: React.ReactNode;
    className?: string;
    showArrow?: boolean;
};

const Dropdown = ({ placement = 'bottom-end', children, className, showArrow = false }: DropdownProps) => {
    const { isOpen, open, close, toggle } = useDisclosure();

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close, // close the menu when the user clicks outside
        onDisappear: close, // close the menu when the menu gets scrolled out of sight
        overflowContainer: true, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: placement, // we prefer to place the menu "top-end"
        triggerOffset: 12, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
        arrowOffset: 16, // let the arrow have some room to breath also
    });

    return (
        <DropDownContext.Provider
            value={{
                isOpen,
                open,
                toggle,
                close,
                renderLayer,
                triggerProps,
                layerProps,
                arrowProps,
                showArrow,
            }}
        >
            <div className={twMerge('relative', className)}>{children}</div>
        </DropDownContext.Provider>
    );
};

// Dropdown context
const useDropdownContext = () => {
    const context = useContext(DropDownContext);
    if (context === undefined) {
        throw new Error('Must be used in a Dropdown component');
    }
    return context;
};

// Dropdown Trigger
type DropdownTriggerProps = {
    children: React.ReactNode;
    className?: string;
};
const Trigger = ({ children, className }: DropdownTriggerProps) => {
    const { toggle, triggerProps } = useDropdownContext();

    return (
        <>
            <div role={'button'} {...triggerProps} className={className} onClick={toggle}>
                {children}
            </div>
        </>
    );
};

// Dropdown Content
type DropdownContentProps = {
    children: React.ReactNode;
    width?: CSSUnit;
    className?: string;
};

const Content = ({ width = '180px', className, children }: DropdownContentProps) => {
    const { isOpen, renderLayer, layerProps, arrowProps, showArrow } = useDropdownContext();

    return (
        <>
            {renderLayer(
                isOpen && (
                    <div
                        {...layerProps}
                        style={{ ...layerProps.style, width }}
                        className={twMerge(
                            'relative z-20 animate-fade-in-up rounded-md border bg-dark-2 border-slate-700 shadow-lg dark:border-dark-800  ',
                            className
                        )}
                    >
                        <div className='overflow-hidden'>
                            {children}
                        </div>
                        {showArrow && (
                            <Arrow
                                {...arrowProps}
                                borderWidth={1}
                                backgroundColor={colors.slate['800']}
                                borderColor={colors.slate['700']}
                            />
                        )}
                    </div>
                )
            )}
        </>
    );
};

// Dropdown Link
type DropdownLinkProps = {
    children: React.ReactNode;
    href: string;
    method?: string;
    className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const DropdownLink = ({ href, children, className }: DropdownLinkProps) => {
    const { close } = useDropdownContext();

    return (
        <Link
            href={href}
            className={twMerge(
                'flex w-full items-center px-4 py-2 text-left text-sm leading-5 text-white transition duration-150 ease-in-out first:rounded-t-md last:rounded-b-md hover:bg-dark-4 focus:outline-none',
                className
            )}
            onClick={() => close()}
        >
            {children}
        </Link>
    );
};

type DropdownItemProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const DropdownItem = ({ children, className, onClick }: DropdownItemProps) => {
    const { close } = useDropdownContext();

    const handleClick = () => {
        onClick?.();
        close();
    };

    return (
        <div
            className={twMerge(
                'flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm leading-5 text-white transition duration-150 ease-in-out first:rounded-t-md last:rounded-b-md hover:bg-dark-4 focus:outline-none',
                className
            )}
            role="button"
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

type DropdownArrowProps = {
    className?: string;
} & ArrowProps;

const DropdownArrow = ({ className, ...rest }: DropdownArrowProps) => {
    const { arrowProps } = useDropdownContext();
    return <Arrow {...arrowProps} className={className} {...rest} />;
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Item = DropdownItem;
Dropdown.Arrow = DropdownArrow;

export default Dropdown;
