import {ReactNode} from "react";
import styles from "./ContinueWithButton.module.scss";

interface IProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

function ContinueWithButton({icon, text, onClick}: IProps) {
  return (
    <button className={styles.ContinueWithButton} onClick={onClick}>
      <div className={styles.ContinueWithButtonContent}>
        <div className={styles.Icon}>{icon}</div>
        <div className={styles.Text}>{text}</div>
      </div>
    </button>
  )
}

export default ContinueWithButton;
