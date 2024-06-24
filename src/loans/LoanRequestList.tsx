import { List } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import './LoanList.css';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import LoanRequestItem from './LoanRequestItem';
import { useTranslation } from 'react-i18next';

function LoanRequestList() {
  interface Request {
    type: string | undefined;
    userId: number | undefined;
    bookId: number | undefined;
    requestId: number | undefined;
    loanId: number | undefined;
  }

  const apiClient = useApi();
  const [requests, setRequests] = useState<Request[]>([]);
  const {t} = useTranslation();

  const fetchRequests = async () => {
    try {
      const response = await apiClient.getRequests();
      if (response.success && response.data != null) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [apiClient]);

  return (
    <div>
      <NavBar />
      <div className="LoanList">
        <List>
          <h1 className="Header">{t('loan requests')}</h1>
          {requests?.map((request) => (
            <div key={request.requestId}>
              <LoanRequestItem request={request} onReturn={fetchRequests} />
              <br />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default LoanRequestList;
