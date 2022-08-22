import { Octokit } from '@octokit/core';
import { IOctokitResponse } from '../Models/commit.model';

/**
 * Helper to call the github API to get all commits of a repo
 */
export async function getCommitsHelper(
  token: string | null,
  alternativeOwner?: string | null,
  alternativeRepo?: string | null
): Promise<IOctokitResponse> {
  const octokit = new Octokit({ auth: token });

  const owner = alternativeOwner ? alternativeOwner : 'sfaccioli-nl';
  const repo = alternativeRepo ? alternativeRepo : 'insided-challenge';

  return await octokit.request(`GET /repos/{owner}/{repo}/commits`, { owner, repo });
}
