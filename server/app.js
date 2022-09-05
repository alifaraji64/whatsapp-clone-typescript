const io = require('socket.io')(8000,{
    cors:{
      origin:'*'
    }
  })
  io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
      console.log(recipients);
      recipients.forEach(recipient => {
        const newRecipients = recipients.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('recieve-message',{
          recipients: newRecipients, sender: id, text
        })
      })
    })
  })