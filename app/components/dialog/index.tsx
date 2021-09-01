import Button from '../button';
import styles from './dialog.module.css';

type Props = {
  children: React.ReactNode;
  title: string;
  onAccept(): void;
  onCancel(): void;
  acceptDisabled?: boolean;
  cancelDisabled?: boolean;
};

const Dialog = ({ children, title, onAccept, onCancel, acceptDisabled = false, cancelDisabled = false }: Props): JSX.Element => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.actions}>
          <Button id="acceptDialogBtn" onClick={onAccept} disabled={acceptDisabled} title="Accept">Accept</Button>
          <Button id="cancelDialogBtn"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={cancelDisabled}
            title="Cancel">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
