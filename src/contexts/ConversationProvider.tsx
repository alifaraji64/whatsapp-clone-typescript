import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { contactContext } from './ContactsProvider'
import { socketContext } from './SocketProvider'
import { Conversation, ConversationContextInterface, Message } from '../types';
export const conversationContext = createContext({} as ConversationContextInterface)
const ConversationsProvider = ({ id,children }: { id:string,children: React.ReactNode }) => {
    const idRef = useRef('')
    const ContactContext = useContext(contactContext)
    const SocketContext = useContext(socketContext)
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(-1)
    const createConversation = (recipients: string[]) => {
        setConversations((prevConversations: Conversation[]) => {
            return [
                ...prevConversations,
                {
                    recipients,
                    messages: []
                }
            ] as Conversation[]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }: { recipients: [], text: string, sender: string }) => {
        setConversations((prevConversations: Conversation[]) => {
            const newMessage = { text, sender }
            //create an array base on prevConversations
            const newConversations = prevConversations.map((conversation: Conversation) => {
                if (arrEquality(conversation.recipients, recipients)) {
                    //we have the conversation, add the messages
                    console.log(newMessage)
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                //if we don't have the conversation, we gonna return the same item
                return conversation
            })
            return newConversations
        })
    }, [setConversations])
    useEffect(() => {
        console.log('use effect');
        if (!SocketContext!.socket) return;
        SocketContext!.socket.on('recieve-message', addMessageToConversation)
        return () => {
            console.log('closed');
            SocketContext!.socket.off('recieve-message')
        }

    }, [SocketContext!.socket, addMessageToConversation]);


    const sendMessage = ({ recipients, text, id }: { recipients: [], text: string, id: string }) => {
        SocketContext!.socket.emit('send-message', { recipients, text })
        addMessageToConversation({ recipients, text, sender: id })
    }

    const messages =
        selectedConversationIndex !== -1 &&
        conversations[selectedConversationIndex].messages.map((message: Message) => {
            return {
                ...message,
                senderName:
                    message.sender == id ? 'You' : ContactContext!.findName(message.sender,id),
                fromMe: message.sender === id
            }
        })
    const value: ConversationContextInterface = {
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
        sendMessage,
        messages
    }
    return (
        <conversationContext.Provider
            value={value}
        >
            {children}
        </conversationContext.Provider>
    )
}

export default ConversationsProvider

const arrEquality = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false
    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}