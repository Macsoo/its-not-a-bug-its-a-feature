'use client';
import React, {FC, KeyboardEventHandler, useContext, useEffect, useRef, useState} from 'react'
import "@/app/globals.css";
import Image from "next/image";
import {SessionContext} from "@/components/sessionContext";
import {getAllMessagesFromUser, sendMessage} from "@/server/chatRepository";
import {NIL as NIL_UUID} from 'uuid';
import {useServerAction} from "@/utils";

interface PopChatProps {
    user_id: string;
}

type Messages = {
    id: number;
    message: string;
    fromUser: string;
    createdAt: Date;
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
    const [messages, setMessages] = useState<Messages[]>([]);
    const session = useContext(SessionContext);
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
        // TODO: bugfix the main page scrolling down issue
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const toggle = () => {
        setChatOpen(!chatOpen);
        // TODO: check autofocus and send with enter
        chatOpen ? textRef.current?.focus() : textRef.current?.blur();
    }

    useEffect(() => {
        startUpdateTimer(chatOpen ? 3 : 10);
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
            sendMessage(user_id, NIL_UUID, textRef.current.value);
            textRef.current.value = '';
            updateChat();
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
                            <div ref={messagesEndRef}/>
                        </div>
                    </div>
                    <div className={"footer"}>
                        <input type="text" ref={textRef}/>
                        <button onClick={handleSend} onKeyDown={enterPress}>
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
            {params.messagesToShow.map((msg, i) => {
                const date = new Date(msg.createdAt);
                const formattedDate = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear().toString().slice(2)} - ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

                return (
                    <p key={i} className={msg.fromUser === NIL_UUID ? "right" : "left"}>
                        <span>{msg.message} <p>{formattedDate}</p></span>
                    </p>
                );
            })}
        </>
    );
}
