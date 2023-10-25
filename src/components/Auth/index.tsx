import React from 'react'
import styles from './Auth.module.scss';
import {signInGoogleThunk} from "store/user/userThunks";
import {useAppDispatch} from "store/hooks";
import ContinueWithButton from "components/ui/ContinueWithButton";
import GoogleLogo from "assets/GoogleLogo";

function Auth() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.AuthBoxWrapper}>
      <div className={styles.AuthBox}>
        <div className={styles.AuthBoxItems}>
          <ContinueWithButton
            icon={<GoogleLogo/>}
            text={'Продолжить с помощью Google'}
            onClick={() => dispatch(signInGoogleThunk())}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
