import { AppLayout, View, Sidebar, CallModal } from '@Components';
import { GlobalStyles } from '@Assets';
import React, { useEffect, useState } from 'react';
import { SocketService } from 'services';

export function App() {

    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        SocketService.connect()
    }, [])

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
}
