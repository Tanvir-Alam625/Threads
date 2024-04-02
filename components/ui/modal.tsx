/**
 * @name Modal
 * @description A modal component
 * @param {React.ReactNode} children - The children
 * @param {string} className - The class name
 * @param {boolean} isOpen - The open status
 * @param {() => void} onClose - The close function
 * @returns {JSX.Element} - React component
*/
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, HTMLAttributes, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Modal = ({
    children,
    className,
    isOpen,
    onClose,
}: ModalProps) => {


    const handleOnClose = useCallback(() => {
        onClose();
    }, [onClose]);
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-auto" onClose={handleOnClose}>
                    <div className={twMerge('flex min-h-screen justify-center text-center px-4 py-10')}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-slate-950 bg-opacity-50" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={twMerge(
                                    'group relative text-light-1 flex  transform flex-col self-center rounded-md blur-card-bg border border-slate-700/40 text-left shadow-xl transition-all',

                                    className
                                )}
                            >
                                {children}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute right-2 top-2 rounded-primary p-2 text-sm text-gray-1 outline-none transition-colors duration-150 hover:text-slate-700 focus:outline-none dark:text-slate-400 dark:hover:text-slate-300"
                                >
                                    &#10005;
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
export type ContentProps = {
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Content: React.FunctionComponent<ContentProps> = ({ children, className, ...rest }) => {
    return (
        <div className={twMerge('flex-grow overflow-auto px-6 py-4', className)} {...rest}>
            {children}
        </div>
    );
};



Modal.Content = Content;
export default Modal;
