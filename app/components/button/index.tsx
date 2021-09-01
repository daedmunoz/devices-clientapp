import styles from './button.module.css';

type Props = {
  id: string;
  type?: 'button' | 'submit';
  onClick?(): void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string
  title?: string;
};

const Button = ({ id, type = 'button', onClick, children, disabled, className = '', title = '' }: Props): JSX.Element => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      title={title}
    >{children}</button>
  )
};

export default Button;
