import React, { useEffect } from 'react';
import { AppLayout, View, Sidebar, CallModal } from '@Components';
import { GlobalStyles } from '@Assets';
import { socketService } from 'services';
import { observer } from 'mobx-react-lite'

export const App = observer(() => {

    useEffect(() => {
        socketService.connect()
    }, [])

    return (
        <>
            <GlobalStyles />
            <AppLayout>
                <View />
                <Sidebar />
                <CallModal />
            </AppLayout>
        </>
    );
})
