import { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import { MapToCommitCard } from '../../utils/mapToCommit';
import { ICommit, IOctokitResponse } from '../../Models/commit.model';
import { useCredentials } from '../../Hooks/useCredentials';


export default function Commits(): JSX.Element {
  const [commits, setCommits] = useState<Array<ICommit> | null>(null);
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
    const commits = getCommits()
      .then(response => {
        setCommits(MapToCommitCard(response.data))
      })
      .catch(error => console.log(error)
      );

  }, [])

  return (
    <div>
      <ul>
        {commits?.map((commit, index) => (
          <li key={`${index} - cm`}>
            {`Name: ${commit.author} - Date: ${commit.timeStamp} - Comment: ${commit.message}`}
          </li>
        ))}
      </ul>
    </div>
  )
}