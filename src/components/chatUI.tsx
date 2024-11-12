'use client';
import React, {FC, useRef, useState} from 'react'
import "@/app/globals.css";

interface PopChatProps {
    messages: string[];
    getMessage: (message: string) => void;
}

const PopChat: FC<PopChatProps> = ({ messages, getMessage }) => {
    // Define style objects for chat box visibility
    const hide = { display: 'none' };
    const show = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        width: '100%',
        height: '500px',
        borderRadius: '25px',
        background: '#eee',
    };

    // Set up references and state with types
    const textRef = useRef<HTMLInputElement | null>(null);
    const [chatOpen, setChatOpen] = useState<boolean>(false);

    // Toggle chat open state
    const toggle = () => setChatOpen(!chatOpen);

    // Handle send button click
    const handleSend = () => {
        if (textRef.current) {
            getMessage(textRef.current.value);
            textRef.current.value = ''; // Clear input after sending
        }
    };

    return (
        <div id="chatCon">
            <div className={"chatBox"} style={chatOpen ? show : hide}>
                <div className={"header"}>Chat with me</div>
                <div className={"msgArea"}>
                    {messages.map((msg, i) => (
                        <p key={i} className={i % 2 ? "right" : "left"}>
                            <span>{msg}</span>
                        </p>
                    ))}
                </div>
                <div className={"footer"}>
                    <input type="text" ref={textRef} />
                    <button onClick={handleSend}>
                        Küldés
                    </button>
                </div>
            </div>
            <div className={"pop"}>
                <p>
                    <img
                        onClick={toggle}
                        src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
                        alt="Chat Icon"
                    />
                </p>
            </div>
        </div>
    );
};

export default PopChat;