import { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { label, value, options, ...rest } = props;

  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      <select ref={ref} {...rest} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
export type { SelectProps };
