"use client"
import { useState } from "react";
import { PiShareFatFill } from "react-icons/pi"
import Modal from "../ui/modal";

const ShareModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>

            <button onClick={handleModalOpen}> <PiShareFatFill className="text-base-regular text-gray-1" /></button>

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                {/* Content inside the modal */}
                <Modal.Content>
                    <h1>Modal Title</h1>
                    <p>This is the modal content.</p>
                </Modal.Content>
            </Modal>
        </div>
    );
}
export default ShareModal;