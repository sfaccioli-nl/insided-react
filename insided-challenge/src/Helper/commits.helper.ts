import { Octokit } from '@octokit/core';
import { IOctokitResponse } from '../Models/commit.model';

export async function getCommitsHelper(token: string | null): Promise<IOctokitResponse> {
  const octokit = new Octokit({ auth: token });
  const owner = 'sfaccioli-nl',
    repo = 'insided-challenge';

  return await octokit.request(`GET /repos/{owner}/{repo}/commits`, { owner, repo });
}
