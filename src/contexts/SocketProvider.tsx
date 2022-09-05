
import { createContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import io from 'socket.io-client'
import { SocketContextInterface } from '../types'
export const socketContext = createContext<SocketContextInterface|null>(null)

const SocketProvider = ({ children }:{children:React.ReactNode}) => {
  const [socket, setSocket] = useState()
  const [id, setId] = useLocalStorage('id','')
  useEffect(() => {
    const newSocket:any = io('http://localhost:8000', { query: { id } })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  console.log(socket);
  return (
    <socketContext.Provider value={{socket}}>{children}</socketContext.Provider>
  )
}

export default SocketProvider