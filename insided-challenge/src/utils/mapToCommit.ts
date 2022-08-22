import { ICommit, IOctokitCommits } from '../Models/commit.model';

/**
 * Mapper to transform the api response in ICommit form
 */
export function MapToCommit(commits: Array<IOctokitCommits> | null): Array<ICommit> | null {
  return commits
    ? commits.map(element => ({
        author: element.commit.author?.name,
        message: element.commit.message,
        timeStamp: new Date(element.commit.author?.date ?? '')
      }))
    : null;
}
