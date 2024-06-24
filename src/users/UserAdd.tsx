import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import { useState } from 'react';

import './Users.css';
import { useTranslation } from 'react-i18next';

function UserAdd() {
  const apiClient = useApi();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const {t} = useTranslation();

  const handleSave = async () => {
    const dateOfBirth1 = new Date(dateOfBirth);
    const dateOfBirthTime = dateOfBirth1.getTime();

    const data = {
      username,
      password,
      role: "ROLE_READER",
      email,
      firstName,
      lastName,
      isStudent,
      dateOfBirth: dateOfBirthTime,
    };
    console.log(data);

    const response = await apiClient.addUser(data);

    if (response.success) {
      alert('User added successfully!');
    } else {
      alert('Failed to add user');
    }
  };

  return (
    <div>
      <NavBar />

      <div className="Home">
        <h1>{t('add user')}:</h1>

        <div className="container">
          <div className="flex-col">
            <h2>Email:</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <h2>{t('username')}:</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <h2>{t('password')}:</h2>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        
          <div className="flex-col">
            <h2>{t('first name')}:</h2>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <h2>{t('last name')}:</h2>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <h2>{t('date of birth')}:</h2>
            <input
              value={dateOfBirth}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="flex-col">
            <h2>{t('role')}:</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ROLE_READER">ROLE_READER</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </select>
            <div className="flex">
              <h2>Student:</h2>
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
              />
            </div>
            <button onClick={handleSave}>{t('save')}</button>
          </div>

          
        </div>
        
      </div>
    </div>
  );
}

export default UserAdd;
