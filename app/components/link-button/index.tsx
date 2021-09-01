import Link from 'next/link';
import styles from './link-button.module.css';

type Props = {
  id: string;
  href: string;
  children: React.ReactNode;
  className?: string
  title?: string;
};

const LinkButton = ({ id, href, children, className = '', title = '' }: Props): JSX.Element => {
  return (
    <Link
      href={href}
      passHref>
      <a id={id} className={`${styles.linkButton} ${className}`} title={title}>{children}</a>
    </Link>
  )
};

export default LinkButton;
