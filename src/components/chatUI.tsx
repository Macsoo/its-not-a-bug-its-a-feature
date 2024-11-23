'use client';
import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import "@/app/globals.css";
import Image from "next/image";
import {SessionContext} from "@/components/sessionContext";
import {getAllMessagesFromUser, getUnseenMessagesFromUser, seenMessage, sendMessage} from "@/server/chatRepository";
import {NIL as NIL_UUID} from 'uuid';
import {useServerAction} from "@/utils";

interface PopChatProps {
    user_id: string;
}

type Messages = {
    id: number;
    message: string;
    fromUser: string;
}

export const PopChat: FC<PopChatProps> = ({user_id}: PopChatProps) => {
    const hide = {display: 'none'};
    const show = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        width: '100%',
        height: '500px',
        maxHeight: '500px',
        borderRadius: '25px',
        background: '#eee',
    };
    const textRef = useRef<HTMLInputElement | null>(null);
    const [chatOpen, setChatOpen] = useState<boolean>(false);
    const [isFirstTimeOpen, setIsFirstTimeOpen] = useState<boolean>(true)
    const [messages, setMessages] = useState<Messages[]>([]);
    const session = useContext(SessionContext);

    useServerAction(async () => {
        setMessages(await getAllMessagesFromUser(user_id));
    })

    const toggle = () => {
        setChatOpen(!chatOpen);
    }

    useEffect(() => {
        if (!isFirstTimeOpen) return;
        setIsFirstTimeOpen(false);
        startTimer();
    }, [chatOpen]);


    function startTimer() {
        setInterval(async () => {
            await updateChat();
        }, 3000);
    }

    async function updateChat(): Promise<void> {
        const newMessages: Messages[] = await getUnseenMessagesFromUser(user_id);
        const oldMessages = messages;
        newMessages.forEach(message => {
            seenMessage(message.id);
            oldMessages.push(message);
        });
        setMessages(oldMessages);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const handleSend = () => {
        if (textRef.current) {
            if (textRef.current.value === '') return;
            sendMessage(user_id, NIL_UUID, textRef.current.value);
            textRef.current.value = '';

        }
    };

    return (
        <>
            <div id="chatCon">
                <div className={"chatBox"} style={chatOpen ? show : hide}>
                    <div className={"header"}>{session.isUser() ? "Admin" : "Chats"}</div>
                    <div className={`h-full bg-[#e4e4e4] rounded-lg mt-3 mb-3`}>
                        <div className={`msg-area`}>
                            <Messages messagesToShow={messages}></Messages>
                        </div>
                    </div>
                    <div className={"footer"}>
                        <input type="text" ref={textRef}/>
                        <button onClick={handleSend}>
                            Küldés
                        </button>
                    </div>
                </div>
                {(<div className={"pop"}>
                    <p>
                        <Image
                            onClick={toggle}
                            src="/theDog.jpg"
                            alt="Chat Icon"
                            width={20}
                            height={20}
                        />
                    </p>
                </div>)}
            </div>
        </>
    );
};

function Messages(params: { messagesToShow: Messages[] }) {
    return (
        <>
            {params.messagesToShow.map((msg, i) => (
                <p key={i} className={msg.fromUser === NIL_UUID ? "right" : "left"}>
                    <span>{msg.message}</span>
                </p>
            ))}
        </>
    )
}