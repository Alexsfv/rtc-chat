import React from 'react'
import { Container, Layout } from './AppLayout.styles'


export const AppLayout: React.FC<{}> = ({children}) => {

    return (
        <Container>
            <Layout>
                {children}
            </Layout>
        </Container>
    )
}