import categories from "../categories";
interface Pros {
    onSelect: (category: string) => void
}
function ExpenseFilter({onSelect}: Pros) {
  return (
    <select className="form-select" onChange={(event) => onSelect(event.target.value)}>
        <option value=""></option>
        {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
        ))}
    </select>
  )
}

export default ExpenseFilter;