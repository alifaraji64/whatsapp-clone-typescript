import { useContext } from 'react'
import { conversationContext } from '../contexts/ConversationProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './SideBar'
type AppProps = {
    id: string;
};
function Dashboard ({ id } : AppProps) {
  const ConversationContext = useContext(conversationContext)
  return (
    <div style={{ maxHeight: '100vh', display: 'flex' ,overflowX: 'hidden'}}>
      <Sidebar id={id} />
      {ConversationContext!.selectedConversationIndex > -1 && (
        <OpenConversation id={id} />
      )}
    </div>
  )
}

export default Dashboard