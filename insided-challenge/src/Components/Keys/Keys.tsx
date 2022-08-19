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
    e.preventDefault()
    setToken(privateKey);
  }


  return (
    <div className={styles.container}>
      <div className={styles.keysContainer}>
        <form onSubmit={handleSubmit}>

          <label htmlFor="inp" className={styles.inp}>
            <input value={privateKey} onChange={handleChange} type="text" id="inp" placeholder="&nbsp;" />
            <span className={styles.label}>Private Key</span>
            <span className={styles.focusBg}></span>
          </label>

          <button type='submit'>Search commits</button>
        </form>
      </div>

    </div>
  )
}