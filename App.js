import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'

import store from './src/store'
import { bootstrap } from './src/bootstrap'
import AppNavigation from './src/navigation/AppNavigation'

export default function App() {
    const [ready, setReady] = useState(false)
    if (!ready) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => setReady(true)}
                onError={() => console.log('error')}
            />
        )
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}
