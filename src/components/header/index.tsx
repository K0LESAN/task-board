import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import searchIcon from '@/assets/icons/search.svg';
import { useDebounce } from '@/hooks/debounce';
import * as styles from './index.module.scss';

interface Props {
  setSearchText: Dispatch<SetStateAction<string>>;
}

const Header = ({ setSearchText: setSearchTextToParent }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const { t } = useTranslation();

  useEffect(() => {
    setSearchTextToParent(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('yourTasks')}</h1>
      <label className={styles.search} htmlFor='search'>
        <img
          className={styles.search__icon}
          src={searchIcon}
          alt={t('searchIconAlt')}
        />
        <input
          className={styles.search__field}
          id='search'
          value={searchText}
          autoComplete='off'
          type='text'
          placeholder={t('search')}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value.trimStart());
          }}
        />
      </label>
    </header>
  );
};

export default Header;
