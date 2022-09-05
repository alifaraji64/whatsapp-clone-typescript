import { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Contacts from './Contacts';
import Conversations from './Conversations';
import ContactModal from './ContactModal';
import ConversationModal from './ConversationModal';
type AppProps = {
    id: string;
};
function Sidebar ({ id }:AppProps) {
  const CONVERSATION_KEY = 'conversations'
  const CONTACT_KEY = 'contacts'

  const [activeKey, setActiveKey] = useState<any>(CONVERSATION_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div style={{ width: '300px' }} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs'>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className=' flex-grow-1'
        style={{maxHeight:'90vh',height:'90vh',borderRight:'1px solid gray'}}>
            <Tab.Pane eventKey={CONVERSATION_KEY}>
                <Conversations></Conversations>
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACT_KEY}>
               <Contacts></Contacts>
            </Tab.Pane>
        </Tab.Content>
        <div className='text-muted p-2 border-top'>Your Id: {id}</div>
        {activeKey===CONVERSATION_KEY?
        <Button className='rounded-0' onClick={()=>setModalOpen(true)}>Conversations</Button>
        :<Button className='rounded-0' onClick={()=>setModalOpen(true)}>Contacts</Button>}
      </Tab.Container>
      <Modal show={modalOpen} onHide={()=>setModalOpen(false)}>
      {activeKey===CONVERSATION_KEY?<ConversationModal/>:<ContactModal setModalOpen={setModalOpen}/>}
      </Modal>
    </div>
  )
}

export default Sidebar