import { Button, TextInput, AppLayout, View, Sidebar } from '@Components';
import { GlobalStyles } from '@Assets';
import React from 'react';

export function App() {
    return (
        <>
            <GlobalStyles />
            <AppLayout>
                <View />
                <Sidebar />
            </AppLayout>
        </>
    );
}
