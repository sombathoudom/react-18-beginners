import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseFilter from "./components/expense/ExpenseFilter";
import ExpenseForm from "./components/expense/ExpenseForm";
import categories from "./components/categories";
function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expense, setExpense] = useState([
    {
      id: 1,
      title: "Car",
      amount: 100,
      category: "Car",
    },
    {
      id: 2,
      title: "House",
      amount: 200,
      category: "House",
    },
    {
      id: 3,
      title: "Food",
      amount: 300,
      category: "Food",
    },
  ]);

  const invisibleFilter = selectedCategory ? expense.filter((item) => item.category === selectedCategory) : expense

  return (
    <div className="container">
      <div className="mb-5">
        <ExpenseForm onSubmit={(data) => setExpense([...expense, {...data, id:expense.length + 1}])}/>
      </div>
      <div className="mt-3 mb-3">
      <ExpenseFilter onSelect={(category) => setSelectedCategory(category)}/>
      </div>
      <ExpenseList expense={invisibleFilter} onDelete={(id) => setExpense(expense.filter((item) => item.id !== id))} />
    </div>
  );
}

export default App;
