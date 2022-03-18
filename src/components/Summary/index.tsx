import { useTransactions } from '../../hooks/TransactionsContext';

import { Container } from "./styles";

import entradaImg from '../../assets/entrada.svg';
import saidaImg from '../../assets/saida.svg';
import totalImg from '../../assets/total.svg';

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <Container>     
      <div className="deposit">
        <header>
          <p>Entradas</p>
          <img src={entradaImg} alt="entrada" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div className="withdraw">
        <header>
          <p>Saídas</p>
          <img src={saidaImg} alt="saídas" />
        </header>
        <strong>          
          {new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }).format(- summary.withdraws)}
        </strong>
      </div>
      <div className="total">
        <header>
          <p className="pTotal">Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}