import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase/config'

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, uid, photoURL, email } = user;
                setUser({ displayName, uid, photoURL, email })
                history.push('/');
                return;
            }
            history.push('/login')
        })
        //clean function
        return () => {
            unsubcribed();
        }
    }, [history])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;