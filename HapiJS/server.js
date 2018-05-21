'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:4004
});

const Primus = require('primus')
const primus = new Primus(server.listener)

const PrimusCtrl = require('./primus')
const primusIntnce = new PrimusCtrl(primus)
primusIntnce.init()

// Start the server
const start = async ()=> {

    try {
        await server.register(require('inert'));

        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};
start();

// ROUTES
server.route({
    method:'GET',
    path:'/chat',
    handler: (request, h) => {
        return h.file('./public/chat.html')
    }
});
server.route({
    method:'GET',
    path:'/group',
    handler:function(request, h) {
        return h.file('./public/group.html')
    }
});