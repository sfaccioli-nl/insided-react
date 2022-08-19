export interface IOctokitCommits {
  url: string;
  sha: string;
  node_id: string;
  html_url?: string;
  comments_url: string;
  commit: ICommitOctokit;
  author: IOctokitPersonExtended | null;
  parents: IParents[];
  commiter?: IOctokitPersonExtended | null;
}

export interface IOctokitResponse {
  data: IOctokitCommits[];
  status: number;
  url: string;
  headers: any;
}


export interface ICommit {
  author?: string;
  message: string;
  timeStamp?: string;
}

export interface ICommitOctokit {
  url: string;
  author?: IOctokitPerson | null;
  commiter?: IOctokitPerson;
  message: string;
  tree: ITree;
  verification?: IVerification;
  comment_count: number;
}

export interface IOctokitPerson {
  name?: string;
  email?: string;
  date?: string
}

interface IOctokitPersonExtended {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string | null;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  recieved_events_url?: string | null;
  type: string;
  site_admin: boolean;
  starred_at?: string;
}

interface IParents {
  sha: string;
  url: string;
  html_url?: string;
}


interface ITree {
  url: string;
  sha: string;
}

interface IVerification {
  verified: boolean;
  reason: string;
  signature: string | null;
  payload: string | null;
}
