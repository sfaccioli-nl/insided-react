import { ICommit } from '../../Models/commit.model';
import styles from './Card.module.scss';

interface ICardProps {
  commit: ICommit;
}

/**
 * Card component to render every commit
 */
export default function Card({ commit }: ICardProps): JSX.Element {
  /**
   * Function to open the commit
   */
  function handleClick(url: string | undefined) {
    window.open(url);
  }

  return (
    <div className={styles.container} title="Browse the repository at this point in the history" onClick={() => handleClick(commit.url)}>
      <div className={styles.info}>
        <h1>{commit.message.toUpperCase()}</h1>
        <p>{`${commit.timeStamp?.toLocaleString()} by ${commit.author}`}</p>
      </div>
    </div>
  );
}
