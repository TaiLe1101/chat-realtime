import { createContext, useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const { user } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: user.uid,
    };
  }, [user.uid]);

  const rooms = useFireStore('rooms', roomsCondition);

  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

  const usersCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFireStore('users', usersCondition);
  return (
    <AppContext.Provider
      value={{
        members,
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
