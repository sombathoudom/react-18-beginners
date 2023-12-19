import {z} from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import categories from "../categories";
import { useEffect } from 'react';


//do the validate using Zod
const schema = z.object({
  title: z.string().min(3, {message: 'Title must be at least 3 characters long'}).max(50),
  amount: z.number({invalid_type_error: 'Amount is required'}).min(0.01).max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({message: 'Category is required'}),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void

}
function ExpenseForm({onSubmit}: Props) {
  const {register, handleSubmit,reset, formState: {errors}, setFocus} = useForm<ExpenseFormData>({resolver: zodResolver(schema)});

  //after rendered
  useEffect(() => {
    setFocus('title');
  }, [])
  return (
   <form onSubmit={handleSubmit((data) => {
      onSubmit(data);
      reset();
   })}>
      <div className="mb-3">
        
        <label htmlFor="title" className="form-label">Title</label>
        <input {...register('title')} id="title" type="text" className={`form-control ${errors.title && 'is-invalid'}`} aria-describedby="titleFeedBack"/>
        {errors.title && <div id="titleFeedBack" className="invalid-feedback">
           {errors.title.message}
          </div>
        }
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input {...register('amount', {valueAsNumber: true})} id="amount" type="number" className={`form-control ${errors.title && 'is-invalid'}`} />
          {errors.amount && <div id="titleFeedBack" className="invalid-feedback">
           {errors.amount.message}
          </div>}

      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select id="category" className="form-select" {...register('category')}>
          {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
          ))}
        </select>
        {errors.category && <p className='text-danger'>{errors.category.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
   </form>
  )
}

export default ExpenseForm