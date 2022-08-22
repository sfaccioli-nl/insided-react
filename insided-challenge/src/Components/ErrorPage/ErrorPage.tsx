import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

interface IErrorPageProps {
  text: string;
  useErrorColor: boolean;
  navigateLink?: INavigateLink;
}

interface INavigateLink {
  text: string;
  to: string;
}

/**
 * Error page component
 */
export default function ErrorPage(props: IErrorPageProps): JSX.Element {
  return (
    <div>
      <h1 className={props.useErrorColor ? styles.error : ''}>{props.text}</h1>
      {props.navigateLink && <Link to={props.navigateLink.to}>{props.navigateLink.text}</Link>}
    </div>
  );
}
