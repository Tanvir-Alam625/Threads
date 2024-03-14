import React, { useState, useEffect } from 'react';
import Modal from '../ui/modal';
import PostThread from '../forms/PostThread';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useUserInfo } from '@/hooks/use-userInfo';

type Props = {};

const PostModal = ({ }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true when fetching data
                const user = await useUserInfo();
                setUserInfo(user);
            } catch (error) {
                console.error("Error fetching user information:", error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        fetchData();
    }, []);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                onClick={handleModalOpen}
                className="float-right border w-2/5 border-slate-700/70 rounded-lg cursor-pointer duration-300 ease-in-out transition-colors hover:bg-slate-700/20 py-2 px-3 flex gap-3 items-center"
            >
                <Image src="/assets/create_1.svg" className="backdrop-filter:blur" alt="create-thread" width={16} height={16} />
                <p className="text-xs font-light text-slate-400">Create Thread</p>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <Modal.Content className="w-[calc(100vw-100px)] md:w-[600px] lg:w-[800px]">
                    <h1 className="head-text">Create Thread</h1>
                    {loading ? ( // Display loading indicator when loading is true
                        <p>Loading...</p>
                    ) : (
                        <PostThread userId={userInfo?.userInfo?._id} /> // Render PostThread component when data is loaded
                    )}
                </Modal.Content>
            </Modal>
        </>
    );
};

export default PostModal;
