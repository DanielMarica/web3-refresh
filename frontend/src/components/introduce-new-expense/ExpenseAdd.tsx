import { useForm } from 'react-hook-form';
import type { Expense } from '../../types/Expense';
import './ExpenseAdd.css';

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

// Define the shape of our form data
type FormData = {
  description: string;
  payer: string;
  amount: string;
  date: string;
};

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
  register,          // Function to register inputs
  handleSubmit,      // Wrapper for form submission
  formState: { errors }, // Validation errors
  reset,             // Function to clear form
} = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: data.description,
      payer: data.payer,
      amount: parseFloat(data.amount),
      date: data.date || new Date().toISOString(),
    };

    addExpense(newExpense);
    reset(); // Clear form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add New Expense</h3>

      <div>
        <label>
          Description:
          <input
            type="text"
            //spread synthax
            {...register('description', { required: true })}
            placeholder="Enter description"
          />
          {errors.description && <span className="error">Description is required</span>}
        </label>
      </div>

      <div>
        <label>
          Payer:
          <select {...register('payer', { required: true })}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
          {errors.payer && <span className="error">Payer is required</span>}
        </label>
      </div>

      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            {...register('amount', { required: true })}
            placeholder="Enter amount"
          />
          {errors.amount && <span className="error">Amount is required</span>}
        </label>
      </div>

      <div>
        <label>
          Date:
          <input type="date" {...register('date')} />
        </label>
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
}







// import { useState } from 'react';
// import type { Expense } from '../../types/Expense';
// import './ExpenseAdd.css';
// interface ExpenseAddProps {
//   addExpense: (expense: Expense) => void;
// }


// // useState is a React Hook that lets you add state (memory) to your component.
// // What is "state"?
// // State = data that can change over time and causes the component to re-render when it changes.

// export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
//   const [description, setDescription] = useState('');
//   const [payer, setPayer] = useState('Alice');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');


//   const handleSubmit = (e: React.FormEvent) => {
//     //e Event object with info about what happened
//     //e.preventDefault()Stop default behavior (page reload)
//     e.preventDefault();
    
//     // Create expense object
//     const newExpense: Expense = {
//       id: Date.now().toString(), // Temporary, backend will replace with real ID
//       description,
//       payer,
//       amount: parseFloat(amount),
//       date: date || new Date().toISOString(),
//     };

//     // Call parent function
//     addExpense(newExpense);

//     // Clear form
//     setDescription('');
//     setPayer('Alice');
//     setAmount('');
//     setDate('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add New Expense</h3>
      
//       <div>
//         <label>
//           Description:
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter description"
//             required
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Payer:
//           <select value={payer} onChange={(e) => setPayer(e.target.value)}>
//             <option value="Alice">Alice</option>
//             <option value="Bob">Bob</option>
//           </select>
//         </label>
//       </div>

//       <div>
//         <label>
//           Amount:
//           <input
//             type="number"
//             step="0.01"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             required
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Date:
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </label>
//       </div>

//       <button type="submit">Add Expense</button>
//     </form>
//   );
// }