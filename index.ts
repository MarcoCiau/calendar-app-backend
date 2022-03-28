import server from './server/server';

server.init()
    .catch(err => {
        console.log("Init Server Failed!");
    });

