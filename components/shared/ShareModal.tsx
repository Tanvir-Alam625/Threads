"use client"
/**
 * @name ShareModal
 * @description A modal to share the post
 * @param {string} postId - The post id
 * @param {string} postContent - The post content
 * @param {string[]} postTags - The post tags
 * @returns {JSX.Element} - React component
 * 
*/
import { useEffect, useRef, useState } from "react";
import { PiShareFatFill } from "react-icons/pi"
import Modal from "../ui/modal";
import Image from "next/image";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ToolTip from "../ui/ToolTip";
type Props = {
    postId: string,
    postContent: string,
    postTags: string[],
}


const ShareModal = ({ postId, postContent, postTags }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        let timer = setTimeout(() => setIsCopied(false), 3000)
        return () => clearTimeout(timer)
    }, [isCopied])

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsCopied(false);
    };

    const handleCopyBtn = async () => {
        if (inputRef.current) {
            try {
                inputRef.current.select();
                await navigator.clipboard.writeText(inputRef.current.value);
                setIsCopied(true)
            } catch (error) {
                console.error('Failed to copy text to clipboard:', error);
            }
        }
    }

    const tagsString = postTags.map((tag: string) => `#${tag}`).join(' ');
    const postURL = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/thread/${postId}`;

    const shareData = {
        url: postURL,
        hashtag: tagsString,
        title: postContent
    }
    return (
        <div>

            <ToolTip content="Share">
                <button onClick={handleModalOpen}> <PiShareFatFill className="text-base-regular text-gray-1" /></button>
            </ToolTip>

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <Modal.Content className="flex flex-col gap-6 w-[calc(100vw-100px)] md:w-[600px] p-6">
                    <h1 className="text-xl font-medium text-light-1">Share the post</h1>

                    <div className="overflow-auto flex gap-4 items-center">
                        <FacebookShareButton {...shareData} title="Facebook">
                            <Image src="/assets/facebook-logo.png" height={40} width={40} alt="facebook" />
                        </FacebookShareButton>
                        <TwitterShareButton {...shareData} title="Twitter">
                            <Image src="/assets/twitter-logo.png" height={40} width={40} alt="Twitter" />
                        </TwitterShareButton>
                        <LinkedinShareButton {...shareData} title="LinkedIn">
                            <Image src="/assets/linkedin-logo.png" height={40} width={40} alt="LinkedIn" />
                        </LinkedinShareButton>
                        <PinterestShareButton {...shareData} media="" title="Pinterest">
                            <Image src="/assets/pinterest-log.png" height={40} width={40} alt="Pinterest" />
                        </PinterestShareButton>
                        <WhatsappShareButton {...shareData} title="Whatsapp">
                            <Image src="/assets/whatsapp-logo.png" height={40} width={40} alt="Whatsapp" />
                        </WhatsappShareButton>
                        <EmailShareButton {...shareData} title="Mail">
                            <Image src="/assets/mail-logo.png" height={40} width={40} alt="Mail" />
                        </EmailShareButton>
                        <TelegramShareButton {...shareData} title="Telegram">
                            <Image src="/assets/telegram-logo.png" height={40} width={40} alt="Telegram" />
                        </TelegramShareButton>
                        <TumblrShareButton {...shareData} title="Tumblr">
                            <Image src="/assets/tumblr-logo.png" height={40} width={40} alt="Tumblr" />
                        </TumblrShareButton>
                    </div>
                    <div className="w-full relative overflow-hidden">
                        <Input readOnly ref={inputRef} value={postURL} className='account-form_input px-6 py-8  no-focus' />
                        <div className=" blur-card-bg absolute right-1 top-1 bottom-1 flex pl-4 py-2 pr-2 border border-slate-700/20 rounded-md justify-center items-center">
                            <Button onClick={handleCopyBtn} className=" rounded-md bg-primary-500 hover:bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full">{isCopied ? "Copied" : "Copy"}</Button>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
}
export default ShareModal;