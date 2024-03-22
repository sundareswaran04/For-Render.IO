
const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const path = require('path');
const io = require('socket.io')(http);
const fs = require('fs');
const server = require('https');


const server = https.createServer({
    key: fs.readFileSync('path/to/your/privatekey.pem'),
    cert: fs.readFileSync('path/to/your/certificate.pem')
}, app)



app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
})
io.on('connection', socket => {
// console.log('user connected');
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    })

socket.on('joinRoom', (name) => {
   io.emit('join',name);
   io.emit('exit',name)

    socket.on('message',(msg,id)=>{
        const date = new Date();
const time = date.getHours()+':'+date.getMinutes();
        // console.log(msg,id);
        io.emit('server',msg,id,name,time);
    })

});
socket.on('exit',(name)=>{
   io.emit('exited',name)
})
})


http.listen(PORT, () => {
    console.log(`app is linstening in ${PORT}`)
})

