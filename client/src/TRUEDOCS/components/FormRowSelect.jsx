const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText !== 'Job Status' ? labelText || name : ""}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
