import {FunctionComponent, useLayoutEffect, useRef, useState} from "react";
import styles from "./Dropdown.module.scss";
import {useOnClickOutside} from "usehooks-ts";
import cx from 'classnames';

const BORDER_RADIUS = 8; // px
const HEADER_DROPDOWN_GAP = 4; // px

interface IProps {
  Trigger: FunctionComponent<{ isDropdownOpened: boolean }>;
  Content: FunctionComponent<{ closeDropdown: () => void }>;
  togglingStrategy?: 'click' | 'hover';
}

function Dropdown({Trigger, Content, togglingStrategy = 'click'}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const refTrigger = useRef<HTMLDivElement | null>(null);
  const refDropdown = useRef<HTMLDivElement | null>(null);
  const refArrowUp = useRef<HTMLDivElement | null>(null);
  const refArrowDown = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const trigger = refTrigger.current;
    const dropdown = refDropdown.current;
    const arrowUp = refArrowUp.current;
    const arrowDown = refArrowDown.current;
    const minArrowOffset = BORDER_RADIUS;

    if (!dropdown || !arrowUp || !arrowDown || !trigger) return;
    resetElementPosition(dropdown);
    hideElement(arrowUp);
    hideElement(arrowDown);

    const orientation = getOrientation();
    const arrowToDisplay = orientation.vertical === 'top' ? arrowUp : arrowDown;

    dropdown.style[orientation.horizontal] = '0';
    dropdown.style[orientation.vertical] = `calc(100% + 8px + ${HEADER_DROPDOWN_GAP}px)`; // 8 - arrow height

    arrowToDisplay.style.display = 'initial';
    const arrowXOffset = getArrowXOffset(arrowToDisplay);
    arrowToDisplay.style[orientation.horizontal] = (
      trigger.getBoundingClientRect().width > dropdown.getBoundingClientRect().width
        ? minArrowOffset
        : arrowXOffset
    ) + 'px';
  }, [refDropdown, isOpen])

  const resetElementPosition = (element: HTMLElement) => {
    element.style.top = 'initial';
    element.style.right = 'initial';
    element.style.bottom = 'initial';
    element.style.left = 'initial';
  }

  const hideElement = (element: HTMLElement) => {
    element.style.display = 'none';
  }

  const getOrientation = (): { horizontal: 'left' | 'right', vertical: 'top' | 'bottom' } => {
    const header = refTrigger.current;
    if (!header) return {
      horizontal: 'left',
      vertical: 'top',
    };
    const elementRect = header.getBoundingClientRect();

    const windowHalfHeight = window.innerHeight / 2;
    const windowHalfWidth = window.innerWidth / 2;

    return {
      horizontal: elementRect.left <= windowHalfWidth ? 'left' : 'right',
      vertical: elementRect.top <= windowHalfHeight ? 'top' : 'bottom',
    }
  }

  const getArrowXOffset = (arrow: HTMLElement) => {
    const headerWidth = refTrigger.current?.getBoundingClientRect()?.width;
    const arrowUpWidth = arrow.getBoundingClientRect()?.width;
    return (headerWidth || 0) / 2 - (arrowUpWidth || 0) / 2;
  }

  const handleClickOutside = () => setIsOpen(false);
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      className={styles.DropdownContainer}
      onMouseEnter={togglingStrategy === 'hover' ? () => setIsOpen(true) : undefined}
      onMouseLeave={togglingStrategy === 'hover' ? () => setIsOpen(false) : undefined}
      ref={ref}
    >
      <div
        style={{height: togglingStrategy === 'hover' ? `calc(100% + ${HEADER_DROPDOWN_GAP}px)` : "initial"}}
        onClick={togglingStrategy === 'click' ? () => setIsOpen(!isOpen) : undefined}
        ref={refTrigger}
      >
        <Trigger isDropdownOpened={isOpen}/>
      </div>
      <div className={cx(styles.Dropdown, {[styles.IsOpen]: isOpen})}
           style={{borderRadius: BORDER_RADIUS}}
           ref={refDropdown}
      >
        <div className={styles.ArrowUp} ref={refArrowUp}/>
        <div className={styles.ArrowDown} ref={refArrowDown}/>
        <Content closeDropdown={() => setIsOpen(false)}/>
      </div>
    </div>
  )
}

export default Dropdown;
