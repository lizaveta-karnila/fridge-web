import React from 'react'
import styles from './Auth.module.scss';
import {signInGoogleThunk} from "store/user/userThunks";
import {useAppDispatch} from "store/hooks";
import ContinueWithButton from "components/ui/ContinueWithButton";
import GoogleLogo from "assets/GoogleLogo";
import {useTranslation} from "react-i18next";

function Auth() {
  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  return (
    <div className={styles.AuthBoxWrapper}>
      <div className={styles.AuthBox}>
        <div className={styles.AuthBoxItems}>
          <ContinueWithButton
            icon={<GoogleLogo/>}
            text={t("auth.continueWithGoogle")}
            onClick={() => dispatch(signInGoogleThunk())}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
