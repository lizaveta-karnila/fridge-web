import React, {useEffect} from 'react';
import Auth from "components/Auth";
import MainComponent from "components/MainComponent";
import {useAppDispatch, useAppSelector} from "store/hooks";
import {userSelector} from "store/user/userSelectors";
import {restoreUserDataThunk} from "store/user/userThunks";

function App() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreUserDataThunk());
  }, [dispatch])

  return (
    user
      ? <MainComponent/>
      : <Auth/>
  );
}

export default App;
