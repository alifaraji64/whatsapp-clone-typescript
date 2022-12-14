
import { createContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import io from 'socket.io-client'
import { SocketContextInterface } from '../types'
export const socketContext = createContext<SocketContextInterface|null>(null)

const SocketProvider = ({ id,children }:{id:string, children:React.ReactNode}) => {
  const [socket, setSocket] = useState()
  useEffect(() => {
    const newSocket:any = io('', { query: { id }, transports: ['websocket'], forceNew: true, secure:true })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  console.log(socket);
  return (
    <socketContext.Provider value={{socket}}>{children}</socketContext.Provider>
  )
}

export default SocketProvider
