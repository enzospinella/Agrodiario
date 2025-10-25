// src/components/common/Input/Input.tsx
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Input.module.css';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
  icon?: ReactNode;
  onIconClick?: () => void;
};

export function Input({ label, icon, onIconClick, ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} placeholder={label} {...props} />
      {icon && (
        <span onClick={onIconClick} className={styles.icon}>
          {icon}
        </span>
      )}
    </div>
  );
}