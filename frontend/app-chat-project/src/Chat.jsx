/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Container, Card, Form, Input, Message } from 'semantic-ui-react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (username !== "" && currentMessage !== "") {
            const messageData = {
                room: room,
                message: currentMessage,
                author: username,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

            }
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        const messageHandler = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", messageHandler);
        return () => socket.off("receive_message", messageHandler);
    }, [socket]);

    return (
        <Container>
            <Card fluid>
                <Card.Content header={`Chat en vivo - Sala: ${room}`} />
                <ScrollToBottom className="messages">
                    <Card.Content style={{ minHeight: '400px', padding: '5px' }}>
                        {
                            messageList.map((val, key) => {
                                return (
                                    <Message
                                        key={key}
                                        style={{ textAlign: val.author === username ? 'right' : 'left' }}
                                        success={val.author === username ? true : false}
                                        info={val.author === username ? false : true}
                                    >
                                        <Message.Header>{val.message}</Message.Header>
                                        <p>{val.author} - {val.time}</p>
                                    </Message>
                                );
                            })
                        }
                    </Card.Content>
                </ScrollToBottom>
                <Card.Content extra >
                    <Form>
                        <Form.Field>
                            <div className="ui action input">
                                <Input
                                    type="text"
                                    placeholder='Escribe un mensaje...'
                                    value={currentMessage}
                                    onChange={(e) => {
                                        setCurrentMessage(e.target.value);
                                    }
                                    }
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage();
                                        }
                                    }}
                                />
                                <button type="button" className="ui teal icon right labeled button" onClick={sendMessage}>
                                    <i aria-hidden="true" className="send icon"></i>
                                    Enviar
                                </button>
                            </div>
                        </Form.Field>
                    </Form>
                </Card.Content>
            </Card>


        </Container>
    );
};

export default Chat;