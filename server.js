
var express = require('express');
var port = process.env.PORT || 8080;
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors:{
        origin:'*'
    }
});

app.use(express.static(__dirname + '/public'));
app.use(express.static('dist', options))

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

http.listen(port, function(){
    console.log('Express server listening on port ' + port);
});


