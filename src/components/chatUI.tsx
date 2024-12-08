'use client';
import React, {FC, KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import "@/app/globals.css";
import Image from "next/image";
import {getAllMessagesFromUser, sendMessage} from "@/server/chatRepository";
import {NIL as NIL_UUID} from 'uuid';
import {useServerAction} from "@/utils";

interface PopChatProps {
    user_id: string;
    pops: boolean;
    contact: string;
    is_admin: boolean;
}

type Messages = {
    id: number;
    message: string;
    fromUser: string;
    createdAt: Date;
}

export const PopChat: FC<PopChatProps> = ({user_id, pops, contact, is_admin}) => {
    const hide = {display: 'none'};
    const show = {
        padding: '0.625rem',
        width: '33.333333%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '460px',
        borderRadius: '25px',
        background: '#eee',

    };
    const textRef = useRef<HTMLInputElement | null>(null);
    const [chatOpen, setChatOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Messages[]>([]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const enterPress: KeyboardEventHandler = (e) => {
        if (e.key === "Enter" && chatOpen) {
            handleSend();
            console.log('sent via enter');
        }
    };
    useServerAction(async () => {
        setMessages(await getAllMessagesFromUser(user_id));
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const toggle = () => {
        setChatOpen(!chatOpen);
        chatOpen ? textRef.current?.focus() : textRef.current?.blur();
    }

    useEffect(() => {
        startUpdateTimer(chatOpen ? 3 : 10);
        if (chatOpen)
            scrollToBottom();
    }, [chatOpen]);


    function startUpdateTimer(time: number) {
        setInterval(async () => {
            await updateChat();
        }, time * 1000);
    }

    async function updateChat(): Promise<void> {
        // const newMessages: Messages[] = await getUnseenMessagesFromUser(user_id);
        // const oldMessages = messages;
        // let changed = false;
        // newMessages.forEach(message => {
        //     seenMessage(message.id);
        //     if (!oldMessages.map(x => x.id).includes(message.id)) {
        //         console.log("Old messages" + oldMessages);
        //         console.log("New message coming in" + message)
        //         oldMessages.push(message);
        //         changed = true;
        //     }
        // });
        // if (changed) {
        //     setMessages(oldMessages);
        // }
        setMessages(await getAllMessagesFromUser(user_id));
    }

    const handleSend = () => {
        if (textRef.current) {
            if (textRef.current.value === '') return;
            sendMessage(is_admin ? NIL_UUID : user_id, is_admin ? user_id : NIL_UUID, textRef.current.value);
            textRef.current.value = '';
            updateChat();
        }
    };

    return (
        <div id="chatCon" className={`${!pops ? "chatBoxNonPop" : ""}`}>
            <div id={`${!pops ? "adminChat" : ""}`} className={"chatBox"} style={chatOpen ? show : hide}>
                <div className={"header"}>{contact}
                </div>
                <div className={`msg-area`}>
                    <Messages messagesToShow={messages}></Messages>
                    <div ref={messagesEndRef}/>
                </div>
                <div className={"footer"}>
                        <textarea
                            id={"chatInput"}
                            ref={textRef as React.RefObject<HTMLTextAreaElement>}
                            rows={4}
                            placeholder="Írj egy üzenetet..."
                        />
                    <button onClick={handleSend} onKeyDown={enterPress}>
                        Küldés
                    </button>
                </div>
            </div>
            {pops && (<div className={"pop relative"}>
                <Image
                    id={`chatIcon`}
                    onClick={toggle}
                    src="/chat-icon.jpg"
                    alt="Chat Icon"
                    fill
                />
            </div>)}
        </div>
    );
};

function Messages(params: { messagesToShow: Messages[] }) {
    return (
        <>
            {params.messagesToShow.map((msg, i) => {
                const date = new Date(msg.createdAt);
                const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear().toString().slice(2)} - ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

                //TODO: fix css class on messages
                return (
                    <p key={i} className={msg.fromUser === NIL_UUID ? "right" : "left"}>
                        <span>{msg.message} <p>{formattedDate}</p></span>
                    </p>
                );
            })}
        </>
    );
}
