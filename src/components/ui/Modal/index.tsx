import styles from './Modal.module.scss';
import {PropsWithChildren, useEffect, useRef} from "react";
import cx from "classnames";
import CrossIcon from "assets/CrossIcon";
import {useOnClickOutside} from "usehooks-ts";

export enum MODAL_SIZE_CLASS {
  l = "Large",
}

interface IProps {
  isOpened: boolean;
  onClose: () => void;
  size?: MODAL_SIZE_CLASS;
}

function Modal({isOpened, onClose, size = MODAL_SIZE_CLASS.l, children}: PropsWithChildren<IProps>) {
  const ref = useRef(null);
  useOnClickOutside(ref, onClose);

  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'unset';
    document.body.style.paddingRight = isOpened ? '15px' : 'unset';
  }, [isOpened]);

  return (
    <div className={cx(styles.Overlay, {[styles.IsOpened]: isOpened})}>
      <div className={cx(styles.Modal, styles[size])} ref={ref}>
        <div className={styles.CloseButtonWrapper}>
          <div className={styles.CloseButton} onClick={onClose}>
            <CrossIcon color="#FFA2B5"/>
          </div>
        </div>
        <div className={styles.ModalContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
