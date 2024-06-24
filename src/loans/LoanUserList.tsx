import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';

import { Book } from '../entities/book';
import NavBar from '../NavBar/NavBar';

import { useApi } from '../api/ApiProvider';
import LoanSelectBook from './LoanSelectBook';
import { User } from '../entities/user';
import LoanSelectUser from './LoanSelectUser';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';


interface LoanUserListProps {
  selectedUserId: string | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

//using useeffect to fetch loans from api -  https://legacy.reactjs.org/docs/hooks-effect.html
function LoanUserList({ selectedUserId, setSelectedUserId }: LoanUserListProps) {
  const apiClient = useApi();
  const {t} = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.getUsers();
        if (response.success) {
          setUsers(response.data);
        } 
      } catch (error) {
        console.error('Error fetching books:', error);
      } 
    };

    fetchUsers();
  }, [apiClient]);

  
  return (
    <div>
      <h1 className="">{t('select user')}</h1>
      <div className="BookList">
        <List>
          
          {users.map((user) => (
            <LoanSelectUser key={user.userId} user={user} isSelected={user.userId.toString() === selectedUserId}
            onSelect={() => setSelectedUserId(user.userId.toString())} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default LoanUserList;
