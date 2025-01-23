// DOM Elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

// Variables
let localStream;
let peerConnection;
const signalingServer = new WebSocket('wss://your-signaling-server.com'); // Replace with your signaling server URL
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }, // Use Google's STUN server
  ],
};

// Get User Media
async function startLocalStream() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

// Create RTCPeerConnection
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  // Add local stream tracks to the peer connection
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  // Handle remote stream
  peerConnection.ontrack = event => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
  };

  // Handle ICE candidates
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      signalingServer.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
    }
  };
}

// Handle Signaling Messages
signalingServer.onmessage = async message => {
  const data = JSON.parse(message.data);

  switch (data.type) {
    case 'offer':
      createPeerConnection();
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      signalingServer.send(JSON.stringify({ type: 'answer', answer }));
      break;

    case 'answer':
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      break;

    case 'ice-candidate':
      if (data.candidate) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
      break;

    default:
      console.error('Unknown signaling message type:', data.type);
  }
};

// Start Call
startCallButton.addEventListener('click', async () => {
  createPeerConnection();

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  signalingServer.send(JSON.stringify({ type: 'offer', offer }));
});

// End Call
endCallButton.addEventListener('click', () => {
  peerConnection.close();
  peerConnection = null;
  signalingServer.send(JSON.stringify({ type: 'end-call' }));
  remoteVideo.srcObject = null;
});
