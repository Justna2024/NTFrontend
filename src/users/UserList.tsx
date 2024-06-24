import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';


import NavBar from '../NavBar/NavBar';
import './Users.css';
import { useApi } from '../api/ApiProvider';
import { User } from '../entities/user';
import UserItem from './UserItem';
import { useTranslation } from 'react-i18next';

function UserList() {
  const apiClient = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const {t} = useTranslation();

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [apiClient]);

  return (
    <div>
      <NavBar />
      <div className="Users-list">
        <List>
          <h1 className="Header">{t('users')}</h1>
          {users.map((user) => (
            <UserItem key={user.userId} user={user} onUpdate={fetchUsers} />
          ))}
        </List>
      </div>
    </div>
  );
}

export default UserList;
