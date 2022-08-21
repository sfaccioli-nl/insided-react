import { ICommit } from '../../Models/commit.model';
import styles from './Card.module.scss';

interface ICardProps {
  commit: ICommit;
}

export default function Card({ commit }: ICardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h1>{commit.message.toUpperCase()}</h1>
      <p>{`${commit.timeStamp?.toLocaleString()} by ${commit.author}`}</p>
    </div>
  );
}
