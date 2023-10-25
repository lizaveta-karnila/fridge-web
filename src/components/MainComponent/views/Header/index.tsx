import React from "react";
import styles from './Header.module.scss';
import {useAppDispatch, useAppSelector} from "store/hooks";
import {signOutThunk} from "store/user/userThunks";
import {userSelector} from "store/user/userSelectors";
import Dropdown from "components/ui/Dropdown";

function Header() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const userDropdownTrigger = <img
    className={styles.Avatar}
    src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1144/1144709.png'}
    alt={'profile'}
    referrerPolicy="no-referrer"
  />;

  const userDropdownContent = <div className={styles.DropdownList}>
    <div className={styles.ListItem} onClick={() => dispatch(signOutThunk())}>Sign out</div>
  </div>;

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        {
          user && (
            <div className={styles.User}>
              <Dropdown trigger={userDropdownTrigger} content={userDropdownContent}/>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Header;
