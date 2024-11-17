'use client';
import React, {FC, useContext, useRef, useState} from 'react'
import "@/app/globals.css";
import {SessionContext} from "@/components/sessionContext";
import Image from "next/image";

interface PopChatProps {
    messages: string[];
    getMessage: (message: string) => void;
    user_id: string;
}

export const PopChat: FC<PopChatProps> = ({messages, getMessage, user_id}: PopChatProps) => {
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

    const session = useContext(SessionContext);

    const toggle = () => {
        setChatOpen(!chatOpen);
    }

    const handleSend = () => {
        if (textRef.current) {
            getMessage(textRef.current.value);
            textRef.current.value = ''; // Clear input after sending
        }
    };

    return (
        <>
            <div id="chatCon">
                <div className={"chatBox"} style={chatOpen ? show : hide}>
                    <div className={"header"}>{session.isUser() ? "Admin" : "Chats"}</div>
                    <div className={`h-full bg-[#e4e4e4] rounded-lg mt-3 mb-3`}>
                        {(<div className={`msg-area`}>
                            <Messages messages={messages} user_id={user_id}></Messages>
                        </div>)}
                        {session.isAdmin() &&
                            (<div className={`user-area`}>
                                <div className={`user`}>User1</div>
                                <div className={`user`}>User2</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                                <div className={`user`}>User3</div>
                            </div>
                        )}
                    </div>
                    <div className={"footer"}>
                        <input type="text" ref={textRef}/>
                        <button onClick={handleSend}>
                            Küldés
                        </button>
                    </div>
                </div>
                <div className={"pop"}>
                    <p>
                        <Image
                            onClick={toggle}
                            src="/chat_img.jpg"
                            alt="Chat Icon"
                            width={20}
                            height={20}
                        />
                    </p>
                </div>
            </div>
        </>
    );
};

const Messages = ({messages, user_id}: { messages: string[], user_id: string }) => {
    //get messages by user_id

    //user_id added to msg just to use the variable so IDEA doesn't cry >:c
    return (
        <>
            {messages.map((msg, i) => (
                <p key={i} className={i % 2 ? "right" : "left"}>
                    <span>{msg} {user_id}</span>
                </p>
            ))}
        </>
    )
}