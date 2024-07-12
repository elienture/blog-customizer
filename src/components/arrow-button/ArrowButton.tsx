import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */

export type OnClick = () => void;

export type ArrowButtonProps = {
 sideState: boolean;
 clickOpen: OnClick;
};

export const ArrowButton = ({sideState, clickOpen}: ArrowButtonProps) => {

 return (
  /* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
  <div
   role='button'
   aria-label='Открыть/Закрыть форму параметров статьи'
   tabIndex={0}
   onClick={clickOpen}
   className={clsx(styles.container, sideState ? styles.container_open : '')}>
   <img src={arrow} alt='иконка стрелочки' className={clsx(sideState ? styles.arrow_open : styles.arrow)} />
  </div>
 );
};



