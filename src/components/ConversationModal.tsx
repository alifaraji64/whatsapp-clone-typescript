import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { contactContext } from '../contexts/ContactsProvider'
import { conversationContext } from '../contexts/ConversationProvider'
import { Contact } from '../types'
const ConversationModal = () => {
  const ContactContext = useContext(contactContext)
  const ConversationContext = useContext(conversationContext)
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const handleCheckboxChange = (id:string)=>{
    setSelectedContactIds((prevSelectedContactIds:any)=>{
        if(prevSelectedContactIds.includes(id)){
            console.log('includes');
            return prevSelectedContactIds.filter((prevId:string)=>{
                return prevId!==id;
            })
        }
        else{
            return [...prevSelectedContactIds, id]
        }
    })
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    ConversationContext!.createConversation(selectedContactIds)
    e.preventDefault();
  }
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {ContactContext!.contacts.map((contact:Contact)=>(
            <Form.Group key={contact.id}>
                <Form.Check
                type='checkbox'
                label={contact.name}
                //@ts-ignore
                value={selectedContactIds.includes(contact.id)}
                onChange={()=>handleCheckboxChange(contact.id)}
                ></Form.Check>
            </Form.Group>
          ))}
          <Button type='submit' className='mt-3'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default ConversationModal