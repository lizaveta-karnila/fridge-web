import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import styles from './QuantityInput.module.scss';
import {ITranslatable, TUnitType} from "store/types";
import {getCapacity, getUnitTranslatedQuantity, getUnitTranslation} from "utils/unitHelpers";
import cx from "classnames";
import ArrowUpIcon from "assets/ArrowUpIcon";
import ArrowDownIcon from "assets/ArrowDownIcon";

interface IProps {
  standardQuantity: number,
  unitType: TUnitType,
  currentQuantity: number,
  changeQuantity: (newQuantity: number) => void,
  language: keyof ITranslatable,
}

function QuantityInput({standardQuantity, unitType, currentQuantity, changeQuantity, language}: IProps) {
  const [displayedQuantity, setDisplayedQuantity] = useState<string>(currentQuantity.toString());
  const [unitsCapacity, setUnitsCapacity] = useState<number>(getCapacity(unitType, currentQuantity));

  const isArrowUpDisabled = currentQuantity >= standardQuantity * 100;
  const isArrowDownDisabled = currentQuantity <= standardQuantity;

  const transformDisplayedQuantity = useCallback(() => {
    setUnitsCapacity(getCapacity(unitType, currentQuantity));
    setDisplayedQuantity(getUnitTranslatedQuantity(unitType, currentQuantity).toString());
  }, [currentQuantity, unitType]);

  useEffect(() => {
    transformDisplayedQuantity();
  }, [currentQuantity, transformDisplayedQuantity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value;
    if (/^\d*\.?\d*$/g.test(e.target.value)) {
      setDisplayedQuantity(newQuantity);
      if (newQuantity.slice(-1) !== ".") {
        const quantityConvertedToSmallestCapacity = unitsCapacity * Number(newQuantity);
        changeQuantity(quantityConvertedToSmallestCapacity);
      }
    }
  };

  const handleArrowUpClick = () => {
    changeQuantity(currentQuantity + standardQuantity);
    transformDisplayedQuantity();
  };

  const handleArrowDownClick = () => {
    changeQuantity(currentQuantity - standardQuantity);
    transformDisplayedQuantity();
  };

  return (
    <div className={styles.InputUnitContainer}>
      <div className={styles.QuantityInputContainer}>
        <div
          className={cx(styles.ArrowIcon, {[styles.ArrowIconDisabled]: isArrowUpDisabled})}
          onClick={handleArrowUpClick}
        >
          <ArrowUpIcon color={isArrowUpDisabled ? "lightgray" : "black"}/>
        </div>
        <input
          className={styles.QuantityInput}
          size={displayedQuantity.toString().length || 1}
          value={displayedQuantity}
          onChange={(e) => handleInputChange(e)}
          maxLength={7}
        />
        <div
          className={cx(styles.ArrowIcon, {[styles.ArrowIconDisabled]: isArrowDownDisabled})}
          onClick={handleArrowDownClick}
        >
          <ArrowDownIcon color={isArrowDownDisabled ? "lightgray" : "black"}/>
        </div>
      </div>
      <div className={styles.ItemQuantityUnit}>{getUnitTranslation(unitType, currentQuantity, language)}</div>
    </div>
  );
}

export default QuantityInput;
