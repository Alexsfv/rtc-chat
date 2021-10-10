import { AppLayout, View, Sidebar, CallModal } from '@Components';
import { GlobalStyles } from '@Assets';
import React, { useEffect, useState } from 'react';
import { rtcService, socketService } from 'services';
import { rootState } from 'store';
import { observer } from 'mobx-react-lite'

export const App = observer(() => {

    const [showModal, setShowModal] = useState(false)
    const media = rootState.media

    useEffect(() => {
        socketService.connect()
    }, [])

    useEffect(() => {
        if (media.localStream) {
            rtcService.setUpPeers(media.localStream)
        }
    }, [media.localStream])

    return (
        <>
            <GlobalStyles />
            <AppLayout>
                <View />
                <Sidebar />
                {showModal && (
                    <CallModal
                        title="Somebody is calling"
                        description="It's waiting for your answer. This is a video call."
                        onAccept={() => { }}
                        onReject={() => { }}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AppLayout>
        </>
    );
})
