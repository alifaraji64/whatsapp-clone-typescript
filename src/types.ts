interface Contact{
    id:string;
    name:string
}

interface ContactContextInterface {
    contacts: any; createContact: (id: string, name: string) => void; findName: (id: string,sender:any) => any;
}

interface Conversation{
    recipients: [];
    messages: string[]
}

interface ConversationContextInterface {
    conversations: any;
    createConversation: (recipients: any) => void;
    selectedConversationIndex: number;
    setSelectedConversationIndex: React.Dispatch<React.SetStateAction<number>>;
    sendMessage: ({ recipients, text, id }: { recipients: []; text: string; id: string; }) => void;
    messages: []
}

interface Message{
    text: string,
    sender: string
}

interface SocketContextInterface {
    socket:any
}

export type {Contact, ContactContextInterface, Conversation, ConversationContextInterface, Message, SocketContextInterface}