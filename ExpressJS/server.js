const app = require('express')();
const http = require('http').Server(app);

const Primus = require('primus')
const primus = new Primus(http)

const PrimusCtrl = require('./primus')
const primusIntnce = new PrimusCtrl(primus)
primusIntnce.init()

http.listen(4004, ()=>{
  console.log('listening on *:4004');
});

// Routes for private chat(peer to peer)
app.get('/chat', (req, res)=>{
    res.sendFile('chat.html', {root: './public'});
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});
