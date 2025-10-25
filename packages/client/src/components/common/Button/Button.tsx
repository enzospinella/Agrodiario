// src/components/common/Button/Button.tsx
import { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

// Usamos ComponentPropsWithoutRef para pegar todas as props de um <button>
type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}