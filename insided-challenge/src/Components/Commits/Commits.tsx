import { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import { MapToCommitCard } from '../../utils/mapToCommit';
import { ICommit, IOctokitResponse } from '../../Models/commit.model';
import { useCredentials } from '../../Hooks/useCredentials';
import Card from '../Card/Card';
import styles from './Commits.module.scss';


export default function Commits(): JSX.Element {
  const [commits, setCommits] = useState<Array<ICommit> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);
  const { token } = useCredentials();
  const octokit = new Octokit({ auth: token });

  async function getCommits(): Promise<IOctokitResponse> {
    const owner = 'sfaccioli-nl',
      repo = 'insided-challenge';

    return await octokit.request(
      `GET /repos/{owner}/{repo}/commits`, { owner, repo }
    );
  }


  useEffect(() => {
    setLoading(true);
    getCommits()
      .then(response => {
        setCommits(MapToCommitCard(response.data));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      }
      );

  }, [])

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setLoading(true);
        getCommits()
          .then(response => {
            setCommits(MapToCommitCard(response.data));
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          }
          );
        setSeconds(30);
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });


  return (
    <div className={styles.container}>
      <div>
        {`After ${seconds} seconds, the commits will be retrieve again`}
      </div>

      {loading ?
        <>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
        </>
        :
        commits?.map((commit, index) => (
          <Card key={`${index}-card`} commit={commit} />
        ))
      }

    </div>
  )
}