// src/components/common/InfoBlock/InfoBlock.tsx
import React from 'react';
import styles from './InfoBlock.module.css';

type InfoBlockProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export function InfoBlock({ label, value, icon }: InfoBlockProps) {
  return (
    <div className={styles.infoBlock}>
    {icon?
        <div className={styles.infoHeader}>
            <span className={styles.infoIcon}>{icon}</span>
            <span className={styles.infoLabel}>{label}</span>
        </div> :
        <span className={styles.infoLabel}>{label}</span>
    }
    <span className={styles.infoValue}>{value}</span>
  </div>
  );
}