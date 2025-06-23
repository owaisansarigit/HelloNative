import { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';
const SnackbarContext = createContext();

export const useSnackbar = () => {
    return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showSnackbar = (msg) => {
        setMessage(msg);
        setVisible(true);
    };

    const hideSnackbar = () => {
        setVisible(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            {visible && (
                <Snackbar
                    visible={visible}
                    onDismiss={hideSnackbar}
                    duration={3000} // 3 seconds
                    style={{ backgroundColor: 'green', position: 'absolute', bottom: 50, left: 20, right: 20 }}
                >
                    {message}
                </Snackbar>
            )}
        </SnackbarContext.Provider>
    );
};
