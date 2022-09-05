import { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { contactContext } from '../contexts/ContactsProvider'
import { Contact } from '../types'
function Contacts () {
  const ContactContext = useContext(contactContext)
  return (
    <>
      <ListGroup variant='flush'>
        {ContactContext!.contacts.map((contact:Contact)=> (
          <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Contacts