import styles from './Keys.module.scss';
import { useCredentials } from '../../Hooks/useCredentials';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { routes } from '../Routes/routes';

/**
 * Component that renders the input for the private key
 */
export default function Keys(): JSX.Element {
  const { token, setToken } = useCredentials();
  const [privateKey, setPrivateKey] = useState<string>(() => (token ? token : ''));
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [navigation, setNavigation] = useState<boolean>(false);
  const [useDifferentRepo, setUseDifferentRepo] = useState<boolean>(false);
  const navigate = useNavigate();

  const { path } = routes['commits'];

  /**
   * Handles the form submit and redirect
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setToken(privateKey);
    setNavigation(true);
  }

  useEffect(() => {
    if (navigation && token) {
      navigate({
        pathname: path,
        search: createSearchParams({
          owner: owner,
          repo: repo
        }).toString()
      });
    }
  }, [navigation, navigate, path, token, owner, repo]);

  return (
    <div className={styles.keysContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {useDifferentRepo && (
          <>
            <h3>It must be a public repo</h3>

            <label htmlFor="owner">Owner</label>
            <input
              id="owner"
              value={owner}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)}
              type="text"
              data-testid="owner"
              required
            />

            <label htmlFor="repo">Repo</label>
            <input
              id="repo"
              value={repo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRepo(e.target.value)}
              type="text"
              data-testid="repo"
              required
            />
          </>
        )}

        <label htmlFor="private-key">Private Key</label>
        <input
          id="private-key"
          value={privateKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrivateKey(e.target.value)}
          type="text"
          data-testid="private-key"
          required
        />

        <div>
          <input
            className={styles.test}
            id="use-different-repo"
            type="checkbox"
            checked={useDifferentRepo}
            onChange={() => setUseDifferentRepo(!useDifferentRepo)}
          />
          <label htmlFor="use-different-repo" id="label" className={styles.test}>
            Use another repo
          </label>
        </div>

        <button type="submit" data-testid="submit-button" className={styles.btn}>
          Search commits
        </button>
      </form>
    </div>
  );
}
