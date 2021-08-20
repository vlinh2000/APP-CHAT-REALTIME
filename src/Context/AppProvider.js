import React from 'react';
import { AuthContext } from './AuthProvider';
import useFirebase from '../hooks/useFirebase';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const { user: { uid } } = React.useContext(AuthContext);
    const [selectedRoomId, setSelectedRoomId] = React.useState('')
    const [isVisibleAddRoomModal, setIsVisibleAddRoomModal] = React.useState(false)
    const [isVisibleAddUsersModal, setIsVisibleAddUsersModal] = React.useState(false)

    const condition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirebase('rooms', condition);

    const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId), [selectedRoomId, rooms]);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom?.members
        }
    }, [selectedRoom]);

    const members = useFirebase('users', usersCondition);

    return (
        <AppContext.Provider value={{ members, selectedRoom, isVisibleAddUsersModal, setIsVisibleAddUsersModal, rooms, selectedRoomId, setSelectedRoomId, isVisibleAddRoomModal, setIsVisibleAddRoomModal }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;