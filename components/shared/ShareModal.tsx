"use client"
import { useState } from "react";
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
    postId: string,
    postContent: string,
    postTags: string[],
}


const ShareModal = ({ postId, postContent, postTags }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const tagsString = postTags.map((tag: string) => `#${tag}`).join(' ');
    const postURL = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/thread/${postId}`;

    const shareData = {
        url: postURL,
        hashtag: tagsString,
        title: postContent
    }



    return (
        <div>

            <button onClick={handleModalOpen}> <PiShareFatFill className="text-base-regular text-gray-1" /></button>

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <Modal.Content className="flex flex-col gap-4 w-[300px] md:w-[600px] p-6">
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
                    <div className="w-full">
                        <Input value={postURL} className='account-form_input  no-focus' />
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
}
export default ShareModal;