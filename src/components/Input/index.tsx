import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

interface InputProps {
  name: string,
  type: string,
  label?: string,
  value?: any,
}

export const Input = ({ name, type, label, value, ...rest }: InputProps) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  /**
   * If you add a value to the input, it will be considered the default
   * This is useful when you have a `<input type="hidden" />`
   *
   * You can also remove it and use the `initialData` or set dynamically.
   */
  const defaultInputValue = value || defaultValue

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>

      <input
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type={type || 'text'}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}
