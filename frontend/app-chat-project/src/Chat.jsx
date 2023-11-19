/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Container, Card, Form, Input } from 'semantic-ui-react'

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
        <Container>
            <Card fluid>
                <Card.Content header='Chat en vivo' />
                <Card.Content>
                    Mensajes
                </Card.Content>
                <Card.Content >
                    <Form>
                        <Form.Field>
                            <Input
                                action={{
                                    color: 'teal',
                                    labelPosition: 'right',
                                    icon: 'send',
                                    content: 'Enviar',
                                    onClick: sendMessage
                                }}
                                placeholder='Escribe un mensaje...'
                                onChange={(e) => {
                                    setCurrentMessage(e.target.value);
                                }
                                }
                            />

                        </Form.Field>
                    </Form>
                </Card.Content>
            </Card>


        </Container>
    );
};

export default Chat;