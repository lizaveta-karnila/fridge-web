import React from "react";
import styles from './Header.module.scss';
import {useAppDispatch, useAppSelector} from "store/hooks";
import {signOutThunk} from "store/user/userThunks";
import {userSelector} from "store/user/userSelectors";
import Dropdown from "components/ui/Dropdown";
import i18n from "i18next";
import {LANGUAGES} from "constants/languages";
import {useTranslation} from "react-i18next";
import {LOCAL_STORAGE_KEYS} from "constants/localStorageKeys";
import LanguageIcon from "assets/LanguageIcon";
import cx from "classnames";
import CheckmarkIcon from "assets/CheckmarkIcon";
import ArrowDownIcon from "assets/ArrowDownIcon";

function Header() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  const onChangeLang = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.language, langCode);
  };

  const LanguageDropdownTrigger = (props: { isDropdownOpened: boolean }) => (
    <div className={styles.LanguageDropdownTrigger}>
      <div className={styles.LanguageIcon}><LanguageIcon/></div>
      {i18n.language.toUpperCase()}
      <div className={cx(styles.ArrowIcon, {[styles.Rotate180]: props.isDropdownOpened})}>{<ArrowDownIcon/>}</div>
    </div>
  );

  const LanguageDropdownContent = (props: { closeDropdown: () => void }) => (
    <div className={styles.LanguageDropdownList}>
      {LANGUAGES
        .map((lang) => {
          const isSelected = lang.code === i18n.language;
          return (
            <div
              className={cx(styles.LanguageDropdownListItem, {[styles.Selected]: isSelected})}
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code);
                props.closeDropdown();
              }}
            >
              <div className={styles.CheckmarkIconWrapper}>{isSelected && <CheckmarkIcon color="#FF4269"/>}</div>
              {lang.label}
            </div>
          )
        })
      }
    </div>
  );

  const UserDropdownTrigger = () => (
    <img
      className={styles.Avatar}
      src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png'}
      alt={'profile'}
      referrerPolicy="no-referrer"
    />
  );

  const UserDropdownContent = () => (
    <div className={styles.DropdownList}>
      <div className={styles.ListItem} onClick={() => dispatch(signOutThunk())}>{t("auth.signOut")}</div>
    </div>
  );

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.LanguageDropdown}>
          <Dropdown Trigger={LanguageDropdownTrigger} Content={LanguageDropdownContent}/>
        </div>

        {
          user && (
            <div className={styles.User}>
              <Dropdown Trigger={UserDropdownTrigger} Content={UserDropdownContent}/>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Header;
