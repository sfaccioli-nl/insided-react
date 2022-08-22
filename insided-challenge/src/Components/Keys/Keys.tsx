import styles from './Keys.module.scss';
import { useCredentials } from '../../Hooks/useCredentials';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../Routes/routes';

export default function Keys(): JSX.Element {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [navigation, setNavigation] = useState<boolean>(false);
  const { token, setToken } = useCredentials();
  const navigate = useNavigate();

  const { path } = routes['commits'];

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPrivateKey(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setToken(privateKey);
    setNavigation(true);
  }

  useEffect(() => {
    if (navigation && token) {
      navigate(path);
    }
  }, [navigation, navigate, path, token]);

  return (
    <div className={styles.keysContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="private-key">Private Key</label>
        <input id="private-key" value={privateKey} onChange={handleChange} type="text" data-testid="private-key" />

        <button type="submit" data-testid="submit-button" className={styles.btn}>
          Search commits
        </button>
      </form>
    </div>
  );
}
