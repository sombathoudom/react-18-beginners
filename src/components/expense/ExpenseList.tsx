
interface Expense {
    id: number
    title: string
    amount: number
    category: string
}
interface Pros {
    expense: Expense[]
    onDelete: (id: number) => void
}
function ExpenseList({expense, onDelete}: Pros) {
    if (expense.length === 0) {
        return 
    }
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Categroy</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {expense.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => onDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${expense.reduce((total, item) => total + item.amount, 0)}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default ExpenseList