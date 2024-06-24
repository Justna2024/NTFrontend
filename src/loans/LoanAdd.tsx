import NavBar from '../NavBar/NavBar';
import { useApi } from '../api/ApiProvider';
import { useState } from 'react';
import LoanBookList from './LoanBookList';
import './LoanList.css';
import LoanUserList from './LoanUserList';
import { useTranslation } from 'react-i18next';
function LoanAdd() {
  const apiClient = useApi();
  const {t} = useTranslation();
  
  const [dueDate, setDueDate] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleSave = async () => {
     
    if (!loanDate) {
        alert('Please enter date');
        return;
      }
  
      
    const loanDate1 = new Date(loanDate);
    
    const loanDateTime = loanDate1.getTime();
    
  
    const bookInt = parseInt(selectedBookId || '') || 0
    const userInt = parseInt(selectedUserId || '') || 0
    const data = {
        bookId: bookInt,
        userId: userInt,
        borrowDate: loanDateTime,
        
      };
  
    console.log('data', data);
    
    
    const response = await apiClient.addLoan(data);
  
    if (response.success) {
        alert('Loan added successfully!');
    } else {
        alert('Failed to add loan');
    }
  };

  return (
    <div>
      <NavBar />

      <div className="LoanAdd">
        <div className="flex">
          <LoanBookList selectedBookId={selectedBookId} setSelectedBookId={setSelectedBookId} />
          <LoanUserList selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
          <div className="flex-col">
            

            <h1>{t('loan date')}:</h1>
            <input
            className="button"
              value={loanDate}
              type="date"
              onChange={(e) => setLoanDate(e.target.value)}
            />

            
            <br />
            <button className="button" onClick={handleSave}>{t('save')}</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LoanAdd;
