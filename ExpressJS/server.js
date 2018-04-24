const app = require('express')();
const http = require('http').Server(app);

const Primus = require('primus')
const primus = new Primus(http)

const PrimusCntrl = require('./primus')
const primusIntnce = new PrimusCntrl(primus)
primusIntnce.init()

http.listen(3000, ()=>{
  console.log('listening on *:3000');
});

// Routes for private chat(peer to peer)
app.get('/chat', (req, res)=>{
    res.sendFile('chat.html', {root: './public'});
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});
