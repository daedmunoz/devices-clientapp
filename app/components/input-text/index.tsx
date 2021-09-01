import { ChangeEvent } from 'react';
import styles from './input-text.module.css';

type Props = {
  id: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  className?: string
  value: string;
};

const InputText = ({ id, onChange, className = '', value }: Props): JSX.Element => {
  return (
    <input
      id={id}
      type="text"
      onChange={onChange}
      value={value}
      className={`${styles.inputText} ${className}`} />
  )
};

export default InputText;
