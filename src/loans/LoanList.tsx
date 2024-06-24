import { List } from '@mui/material';
import LoanItem from './LoanItem';
import { Loan } from '../entities/loan';

import NavBarUser from '../NavBar/NavBarUser';
import './LoanList.css';
import { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { LoanPresented} from './jsonTransform';
import { Book } from '../entities/book';
import { useTranslation } from 'react-i18next';
function LoanList() {
  const apiClient = useApi();
  const {t} = useTranslation();
  const [loans, setLoans] = useState<LoanPresented[]>([]);

//using useeffect to fetch loans from api -  https://legacy.reactjs.org/docs/hooks-effect.html
// using it twice here so that we can get the book title
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await apiClient.getLoansByUser();
        if (response.success && response.data != null) {

          
          const jsonLoans = response.data


          setLoans(jsonLoans);
          console.log('GGGGG', loans)
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };
    fetchLoans();
  }, [apiClient]);



    return (
      <div>
        <NavBarUser />
        <div className="LoanList" >
          <List>
            <h1 className="Header">{t('your loans')}</h1>
            {/* goes over every loan and book and creates a LoanItem with them */}
            {loans.map((loan) => 
               <LoanItem key={loan.loanId} loan={loan}  />)

            }
          </List>
        </div>
      </div>
    );
  }

export default LoanList;
