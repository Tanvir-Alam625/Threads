'use client';
import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import Image from "next/image";
import Logo from "../../public/icon-512x512.png";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"
import { MdInstallDesktop } from "react-icons/md";
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>;
    prompt(): Promise<void>;
}

const Downloader = ({ isButtonShow = false }: { isButtonShow?: boolean }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [modalShown, setModalShown] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        const hasModalShownBefore = localStorage.getItem('modalShown');
        if (!hasModalShownBefore && !deferredPrompt) {
            setModalShown(true);
        }
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt instanceof Event) {
            (deferredPrompt as BeforeInstallPromptEvent).prompt();
            (deferredPrompt as BeforeInstallPromptEvent).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    toast.success('Installed!');
                } else {
                    console.log('User dismissed the install prompt');
                }
                handleCloseModal()
                setDeferredPrompt(null);
            });
        }
    };

    const handleCloseModal = () => {
        setModalShown(false);
        localStorage.setItem('modalShown', 'true');
    };

    return (
        <>
            {
                isButtonShow && deferredPrompt ? (<div onClick={handleInstallClick} title="Install" className="cursor-pointer p-3  border duration-300 ease-in-out transition-colors hover:bg-slate-700  border-slate-700/60 rounded-lg">
                    <MdInstallDesktop size={16} color="#8B9AAF" />
                </div>) : null
            }
            <Modal isOpen={modalShown} onClose={handleCloseModal}>
                <Modal.Content className="w-[300px] md:w-[500px]">
                    <div className="p-4 flex flex-col gap-3 justify-center items-center">
                        <Image src={Logo} alt="logo" width={100} height={100} loading="lazy" />
                        <p className="text-center text-lg font-semibold">
                            Welcome to Threads App
                        </p>
                        <p className="text-center text-small-regular text-light-2">
                            Get the best experience by installing Threads App on your device.
                        </p>
                        <div className="flex gap-3 mt-3">
                            <Button className=" bg-primary-500/90 duration-300 transition-colors ease-in-out hover:bg-primary-500 text-small-regular outline-none focus:outline-none" onClick={handleInstallClick}>
                                Install Now
                            </Button>
                            <Button className="blur-card-bg text-small-regular" onClick={handleCloseModal}>Later</Button>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default Downloader;
