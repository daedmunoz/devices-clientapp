import { ChangeEvent } from 'react';
import styles from './select.module.css';

type Props = {
  id: string;
  onChange?(e: ChangeEvent<HTMLSelectElement>): void;
  children: React.ReactNode;
  className?: string
  value: string | string[];
  multiple?: boolean;
};

const Select = ({ id, onChange, children, className = '', value, multiple = false }: Props): JSX.Element => {
  return (
    <select      
      id={id}
      multiple={multiple}
      onChange={onChange}
      value={value}
      className={`${styles.select} ${className}`}>{children}</select>
  )
};

export default Select;
