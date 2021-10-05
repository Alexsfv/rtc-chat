import { AppLayout, View, Sidebar, CallModal } from '@Components';
import { GlobalStyles } from '@Assets';
import React, { useState } from 'react';

export function App() {

    const [showModal, setShowModal] = useState(true)

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
