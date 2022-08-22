import { useCallback, useEffect, useState } from 'react';
import { MapToCommit } from '../../utils/mapToCommit';
import { ICommit } from '../../Models/commit.model';
import { useCredentials } from '../../Hooks/useCredentials';
import Card from '../Card/Card';
import styles from './Commits.module.scss';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../Loader/Loader';
import { getCommitsHelper } from '../../Helper/commits.helper';
import { routes } from '../Routes/routes';

/**
 * Component that renders the commits list
 */
export default function Commits(): JSX.Element {
  const [commits, setCommits] = useState<Array<ICommit> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);
  const { token } = useCredentials();

  const getCommits = useCallback(() => {
    setLoading(true);

    getCommitsHelper(token)
      .then(response => {
        setCommits(MapToCommit(response.data));
        setLoading(false);
        setSeconds(30);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    setLoading(true);
    getCommits();
  }, [getCommits]);

  useEffect(() => {
    if (token) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          getCommits();
          setSeconds(30);
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div className={styles.container}>
      {token && commits && commits?.length > 0 ? (
        <>
          <div className={styles.countDown}>
            <p>{`After ${seconds} seconds, the commits will be retrieve again`}</p>
            {loading ? (
              <Loader />
            ) : (
              <button onClick={() => getCommits()} className={styles.btn}>
                Refresh
              </button>
            )}
          </div>
          {commits?.map((commit, index) => (
            <Card key={`${index}-card`} commit={commit} />
          ))}
        </>
      ) : (
        <ErrorPage
          text="No commits to display"
          useErrorColor={false}
          navigateLink={{
            text: 'Try introducing another private key or repository',
            to: routes['home'].path
          }}
        />
      )}
    </div>
  );
}
