import React, { useState, useContext, useRef, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { conversationContext } from '../contexts/ConversationProvider'
import { Message } from '../types'
type AppProps = {
    id: string;
};
const OpenConversation = ({ id }:AppProps) => {
  const ConversationContext = useContext(conversationContext)
  const [text, setText] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    ConversationContext!.sendMessage({
      recipients:
        ConversationContext!.conversations[
          ConversationContext!.selectedConversationIndex
        ].recipients,
      text,
      id
    })
    lastMessageRef.current!.scrollIntoView({ smooth: true, block:'start' } as ScrollIntoViewOptions)
    setText('')
  }
  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto' style={{ maxHeight:'100%'}}>
        <div className='px-3 d-flex flex-column align-items-start justify-content-end overflow-y-scroll'>
          {ConversationContext!.messages.map((message:any, index:number)=>{
            const lastMessage = (ConversationContext!.messages.length-1) === index;
            return (
              <div key={index} ref={ lastMessage?lastMessageRef:null } className={ `my-1 d-flex flex-column ${message.fromMe ? 'align-self-end':''} ${lastMessage ? 'mb-5':''}` }>
                <div className={ `rounded p-2 ${message.fromMe?'bg-primary text-white':'border'}` }>{ message.text }</div>
                <div className={ `text-muted small ${message.fromMe?'text-right':''}` }>{ message.senderName }</div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit} className=''>
        <Form.Group>
          <InputGroup className='m-2'>
            <Form.Control
              as='textarea'
              type='text'
              required
              value={text}
              onChange={ e => setText( e.target.value) }
              style={ { height: '75px', resize: 'none' } }
            />
            <Button type='submit'>Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default OpenConversation