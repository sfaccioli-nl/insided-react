import styles from './Keys.module.scss';
import { useCredentials } from '../../Hooks/useCredentials';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Keys(): JSX.Element {
  const { setToken } = useCredentials();
  const [privateKey, setPrivateKey] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPrivateKey(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setToken(privateKey);
  }


  return (
    <div className={styles.keysContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="private-key">Private Key</label>
        <input id="private-key" value={privateKey} onChange={handleChange} type="text" />

        <button type='submit' className={styles.btn}>Search commits</button>
      </form>
    </div>
  )
}