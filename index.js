import Peer from 'peerjs';
import './DrawingCanvas';
import { Elm } from './Main.elm';

import './index.css';

const pictionaryTelephone = Elm.Main.init({
  node: document.querySelector('main'),
  flags: {
    url: location.origin+location.pathname,
    gameId: (location.search.match(/(?<=gameId=)[^&]*/g) || [])[0]
  }
});

const peer = new Peer();
const connections = [];
function send(action, data) {
  connections.forEach(connection =>
    connection.send({ action, data })
  );
}
function addConnection(connection) {
  connection.on('open', () => {
    connections.push(connection);
  });
  connection.on('data', ({ action, data }) => {
    if (action === 'sendPlayer') {
      pictionaryTelephone.ports.setPlayer.send(data);
    } else if (action === 'sendThread') {
      pictionaryTelephone.ports.setThread.send(data);
    }
  });
  connection.on('close', () => {
    const index = connections.indexOf(connection);
    if (index !== -1) connections.splice(index, 1);
  });
}

peer.on('open', id => {
  pictionaryTelephone.ports.setPeerId.send(id);
});
pictionaryTelephone.ports.connectHost.subscribe(hostId => {
  const host = peer.connect(hostId);
  addConnection(host);
  host.once('open', () => {
    pictionaryTelephone.ports.setPeerId.send(peer.id);
  });
});
pictionaryTelephone.ports.sendPlayer.subscribe(({ index, host, name, peerId }) => {
  send('sendPlayer', { index, host, name, peerId });
});
pictionaryTelephone.ports.sendThread.subscribe(({ id, pairs }) => {
  send('sendThread', { id, pairs });
});

peer.on('connection', connection => {
  if (connection.peer === peer.id) return;
  addConnection(connection);
});
