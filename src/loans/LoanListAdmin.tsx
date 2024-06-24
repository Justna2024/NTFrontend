import { List } from '@mui/material';
import LoanItemAdmin from './LoanItemAdmin';
import { Loan } from '../entities/loan';

import NavBar from '../NavBar/NavBar';
import './LoanList.css';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { LoanPresented} from './jsonTransform';
import { Book } from '../entities/book';
import { useTranslation } from 'react-i18next';
function LoanListAdmin() {
  const apiClient = useApi();
  const [loans, setLoans] = useState<LoanPresented[]>([]);
  const {t} = useTranslation();
  const fetchLoans = async () => {
    try {
      const response = await apiClient.getLoans();
      if (response.success && response.data != null) {
        let jsonLoans = response.data;

        // Sort loans: first by returnDate (nulls first), then by dueDate ascending
        jsonLoans.sort((a, b) => {
          // Sort by returnDate (nulls first)
          if (a.returnDate === null && b.returnDate !== null) return -1;
          if (a.returnDate !== null && b.returnDate === null) return 1;

          // Sort by dueDate ascending
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

        setLoans(jsonLoans);
        console.log('Sorted Loans:', jsonLoans);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };
  useEffect(() => {
    

    fetchLoans();
  }, [apiClient]);

  console.log('Loans State:', loans);

  return (
    <div>
      <NavBar />
      <div className="LoanList">
        <List>
          <h1 className="Header">{t('loans')}</h1>
          {loans.map((loan) => (
            <><LoanItemAdmin key={loan.loanId} loan={loan} onReturn={fetchLoans} /><br /></>
          ))}
        </List>
      </div>
    </div>
  );
}

export default LoanListAdmin;
