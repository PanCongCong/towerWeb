import React, { useState, useEffect } from 'react';
import Logged from './init/afterLogin';

export const AppContext = React.createContext({});

export const AppContextProvider = ({ children }) => {
    // 修改状态
    const setData = (name, data) => {
        setState(prevState => {
            return { ...prevState, [name]: data };
        });
    }
    const addStore = (name, initState) => {
        setState(prevState => ({
            ...prevState, [name]: initState
        }));
    }
    const initAppState = {
        root: {},
        setData,
        addStore
    }

    const [state, setState] = useState(initAppState);

    useEffect(() => {
        Logged().then(initData => {
            setState({
                ...state,
                root: initData
            });
        });
    }, [])

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
} 