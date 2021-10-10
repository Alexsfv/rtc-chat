
const serversConfig: RTCConfiguration = {
    iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
}

export class RTCService {

    static setUpPeers(localStream: MediaStream) {
        const localPeerConnection = new RTCPeerConnection(serversConfig)
        localPeerConnection.addEventListener('addstream', handleAddStream)
        localPeerConnection.addEventListener('icecandidate', handleConnection)
        localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange)

        localStream.getTracks().forEach(t => localPeerConnection.addTrack(t, localStream))

        localPeerConnection.createOffer()

        function handleAddStream() {
            console.log(333);
        }

        function handleConnection() {
            console.log(111);
        }

        function handleConnectionChange() {
            console.log(222);
        }
    }
}
