import { ICommit, IOctokitCommits } from '../Models/commit.model';

/**
 * Mapper to transform the api response in ICommit form
 */
export function MapToCommit(commits: Array<IOctokitCommits> | null): Array<ICommit> | null {
  return commits
    ? commits.map(element => ({
        message: element.commit.message,
        author: element.commit.author?.name,
        timeStamp: new Date(element.commit.author?.date ?? ''),
        url: element.html_url
      }))
    : null;
}
