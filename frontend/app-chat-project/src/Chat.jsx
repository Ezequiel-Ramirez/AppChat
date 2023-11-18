/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    
    const sendMessage = async () => {
        if (username !== "" && currentMessage !== "") {
            const messageData = {
                room: room,
                message: currentMessage,
                author: username,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                
            }
            await socket.emit("send_message", messageData);
        }
    }
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        });
    }, [socket]);
    
    
    

    return (
        <div>
            <section className="chat-header">
                <p>Chat en vivo</p>
            </section>
            <section className="chat-messages">
                <section className="chat-footer">
                    <input type="text" placeholder="Escribe un mensaje..."
                        onChange={(e) => {
                            setCurrentMessage(e.target.value);
                        }}
                    />
                    <button
                    onClick={sendMessage}
                    >Enviar ▶</button>
                </section>
            </section>
        </div>
    );
};

export default Chat;