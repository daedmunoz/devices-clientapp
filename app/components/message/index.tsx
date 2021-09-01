import styles from './message.module.css';

type MessageType = 'success' | 'error' | 'warning';
const typeStyles: { [key in MessageType]: string } = {
  error: styles.error,
  success: styles.success,
  warning: styles.warning,
};

type Props = {
  id: string;
  type?: MessageType;
  children: React.ReactNode;
  className?: string
};
const Message = ({ id, type = 'success', children, className = '' }: Props): JSX.Element => {
  return (
    <p
      id={id}
      className={`${styles.message} ${typeStyles[type]} ${className}`}>{children}</p>
  )
};

export default Message;
