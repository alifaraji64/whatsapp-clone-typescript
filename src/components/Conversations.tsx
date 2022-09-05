import { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { conversationContext } from '../contexts/ConversationProvider'
import { contactContext } from '../contexts/ContactsProvider'
import { Conversation } from '../types'
function Conversations () {
  const ConversationContext = useContext(conversationContext)
  const ContactContext = useContext(contactContext)
  return (
    <>
      <ListGroup variant='flush'>
        {ConversationContext!.conversations.map((conversation:Conversation,index:number) =>(
        <ListGroup.Item
        key={index}
        action
        active={index === ConversationContext!.selectedConversationIndex}
        onClick={()=> ConversationContext!.setSelectedConversationIndex(index)}
        >
          {conversation.recipients.map(recipientId => (
            ContactContext!.findName(recipientId,'hkjhk')
          )).join(', ')}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Conversations