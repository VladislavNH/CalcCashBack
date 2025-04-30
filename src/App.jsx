import React, { useState, useMemo, useEffect } from 'react';
import styles from './App.module.css';
import { ACCOUNT_LEVELS, getAvailableCategories, calculateCashback, findCategoryByMcc } from './utils/cashback';
import { CategoriesSelector }    from './components/CategoriesSelector';
import { PurchaseForm }          from './components/PurchaseForm';
import { CashbackStats }         from './components/CashbackStats';
import { MccSearch }             from './components/MccSearch';

export default function App() {
  const [level, setLevel]= useState(ACCOUNT_LEVELS.BASIC);
  const [chosen, setChosen]= useState([]);
  const [state, setState]= useState({ byCategory: {}, total: 0 });
  const [amount, setAmount]= useState('');
  const [cat, setCat]= useState('');
  const [showModal, setModal]= useState(false);
  const [cashRes, setCashRes]= useState(0);

  const categories = useMemo(() => getAvailableCategories(level), [level]);


  useEffect(() => {
    setChosen([]);
    setState({ byCategory: {}, total: 0 });
    setCat(categories[0]?.id || '');
  }, [categories]);

  const handleToggle = (id) =>
    setChosen(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4
          ? [...prev, id]
          : prev
    );

  const handleMccFound = (mcc) => {
    if (level === ACCOUNT_LEVELS.BASIC) {
      alert('Перейдите на Расширенный или Максимальный уровень счета для MCC-поиска');
      return;
    }
    const found = findCategoryByMcc(mcc, categories);
    if (!found) {
      alert(`MCC ${mcc} не найден`);
      return;
    }
    if (!chosen.includes(found.id) && chosen.length < 4) {
      setChosen(prev => [...prev, found.id]);
    }
    setCat(found.id);
  };

  const handleCalculate = () => {
    const category = categories.find(c => c.id === cat);
    if (!category) {
      alert('Выберите категорию');
      return;
    }
    const { cashback, newState } = calculateCashback(+amount, category, state);
    setState(newState);
    setCashRes(cashback);
    setModal(true);
  };

  return (
    <div className={styles.appWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Калькулятор кешбэка</h1>

        <div className={styles.row}>
          <label>Уровень счёта</label>
          <select value={level} onChange={e => setLevel(e.target.value)}>
            <option value="basic">Базовый</option>
            <option value="extended">Расширенный</option>
            <option value="max">Максимальный</option>
          </select>
        </div>

        {level !== ACCOUNT_LEVELS.BASIC && (
          <CategoriesSelector
            categories={categories}
            chosen={chosen}
            onToggle={handleToggle}
          />
        )}

        <MccSearch onFound={handleMccFound} />

        <PurchaseForm
          amount={amount}
          cat={cat}
          options={categories.filter(c => c.id === 'ALL_1' || chosen.includes(c.id))}
          onAmountChange={setAmount}
          onCategoryChange={setCat}
          onCalculate={handleCalculate}
        />

        <CashbackStats
          byCategory={state.byCategory}
          total={state.total}
          categories={categories}
        />
      </div>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>Кешбэк</h3>
            <p style={{ fontSize: '2rem', color: 'var(--accent)' }}>
              +{cashRes} ₽
            </p>
            <button
              className={styles.button}
              onClick={() => setModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
