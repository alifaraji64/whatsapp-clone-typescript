
import { createContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import io from 'socket.io-client'
import { SocketContextInterface } from '../types'
export const socketContext = createContext<SocketContextInterface|null>(null)

const SocketProvider = ({ id,children }:{id:string, children:React.ReactNode}) => {
  const [socket, setSocket] = useState()
  useEffect(() => {
<<<<<<< HEAD
    const newSocket:any = io('https://bright-pike-blazer.cyclic.app:8080/', { query: { id } })
=======
    const newSocket:any = io('https://bright-pike-blazer.cyclic.app:8000/', { query: { id } })
>>>>>>> 12b47fe5ec49bfb2ce16b09637d7ba7da6f92f19
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  console.log(socket);
  return (
    <socketContext.Provider value={{socket}}>{children}</socketContext.Provider>
  )
}

export default SocketProvider
