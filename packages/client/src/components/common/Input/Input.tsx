// src/components/common/Input/Input.tsx
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Input.module.css';

// 1. Unimos as props de 'input' e 'textarea'
//    e adicionamos nossa prop customizada 'as'.
type InputProps = ComponentPropsWithoutRef<'input'> &
  ComponentPropsWithoutRef<'textarea'> & {
    as?: 'input' | 'textarea'; // 'as' decide qual tag renderizar
    label: string;
    icon?: ReactNode;
    onIconClick?: () => void;
  };

export function Input({
  as = 'input', // 2. O padrão é 'input'
  label,
  icon,
  onIconClick,
  ...props // 3. 'props' conterá 'type', 'name', 'value', 'rows', etc.
}: InputProps) {
  let InputElement;
  
  // 4. Classes condicionais
  // Para o wrapper: corrige o alinhamento vertical do ícone
  const wrapperClass = `${styles.inputWrapper} ${
    as === 'textarea' ? styles.textareaWrapper : ''
  }`;
  
  // Para o input: permite estilizar o textarea (ex: altura, resize)
  const inputClass = `${styles.input} ${
    as === 'textarea' ? styles.textarea : ''
  }`;

  // 5. Renderização condicional
  if (as === 'textarea') {
    InputElement = (
      <textarea
        className={inputClass}
        placeholder={label}
        // Removemos 'type' que não existe em textarea
        {...(props as ComponentPropsWithoutRef<'textarea'>)}
        // (props.rows || 3) é um bom padrão, se você não passar
        rows={props.rows || 4} 
      />
    );
  } else {
    InputElement = (
      <input
        className={inputClass}
        placeholder={label}
        {...(props as ComponentPropsWithoutRef<'input'>)}
      />
    );
  }

  return (
    <div className={wrapperClass} style={props.style}>
      {InputElement}
      {icon && (
        <span onClick={onIconClick} className={styles.icon}>
          {icon}
        </span>
      )}
    </div>
  );
}