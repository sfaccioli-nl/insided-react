import { ICommit, IOctokitCommits, IOctokitResponse } from '../Models/commit.model'



export function MapToCommitCard(commits: Array<IOctokitCommits> | null): Array<ICommit> | null {
  return commits ? commits.map(element => ({
    author: element.commit.author?.name,
    message: element.commit.message,
    timeStamp: element.commit.author?.date
  }))
    : null
}