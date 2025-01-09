import { useTranslation } from 'react-i18next';
import * as styles from './index.module.scss';
import { defaultLanguage } from '@/shared/constants';

const LanguageSwitch = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  return (
    <button
      className={styles.switcher}
      onClick={() => {
        changeLanguage(language === defaultLanguage ? 'en' : 'ru');
      }}
    >
      {language.split('-')[0]}
    </button>
  );
};

export default LanguageSwitch;
