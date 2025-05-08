const Input = ({ type, name, labelText, defaultValue, onChange, required,value, readOnly=false}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required={required || false}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
};
export default Input;
