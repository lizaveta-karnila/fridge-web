import styles from './Search.module.scss';
import React, {useState} from "react";
import cx from "classnames";
import SearchIcon from "assets/SearchIcon";
import {useTranslation} from "react-i18next";
import {useHotkeys} from "react-hotkeys-hook";

interface IProps {
  onSearchClickHandler: () => void;
}

function SearchButton({onSearchClickHandler}: IProps) {
  const [isSearchBordered, setIsSearchBordered] = useState(false);
  const {t} = useTranslation();

  const onCtrlKPressHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    onSearchClickHandler();
  };

  useHotkeys('mod+k', onCtrlKPressHandler); // mod - listens for ctrl on Windows/Linux and cmd on macOS

  return (
    <button
      className={cx(styles.Search, {[styles.SearchBordered]: isSearchBordered})}
      onMouseDown={() => setIsSearchBordered(true)}
      onMouseUp={() => setIsSearchBordered(false)}
      onClick={onSearchClickHandler}
    >
      <div className={styles.SearchIconTextContainer}>
        <div className={styles.SearchIcon}><SearchIcon color="#9A9496"/></div>
        <div className={styles.SearchText}>{t("search")}</div>
      </div>
      <div className={styles.Shortcut}>
        <div className={styles.ShortcutSubItem}>Ctrl</div>
        <div className={styles.ShortcutSubItem}>K</div>
      </div>
    </button>
  );
}

export default SearchButton;
