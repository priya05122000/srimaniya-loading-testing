"use client";
import React, { useState, useEffect } from "react";

// --- Input Field ---
const baseInputClass =
  "border-b py-2  px-1 outline-none w-full mb-3";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  className = "",
  id,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const inputId =
    id ||
    (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const showFloating = isFocused || Boolean(value ?? internalValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="relative w-full ">
      {label && (
        <label
          htmlFor={inputId}
          className={`absolute left-0 transition-all duration-200 z-10 pointer-events-none
            ${showFloating
              ? `-top-2 text-base ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              }`
              : `top-3  xl:top-5 ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              } text-base`
            }
          `}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        value={value ?? internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${baseInputClass} ${className} ${label ? "pt-5" : ""
          }`}
        autoComplete={props.autoComplete || "off"}
      />
    </div>
  );
};

// --- Textarea Field ---

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const baseTextAreaClass =
  "bg-transparent py-2 px-1 outline-none text-(--white-custom) resize-none w-full mb-3";

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  className = "",
  id,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const textAreaId =
    id ||
    (label
      ? `textarea-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);
  const showFloating = isFocused || Boolean(value ?? internalValue);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const borderClass = className.includes("text-(--blue)")
    ? "border-blue-custom"
    : "border-white-custom";

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={textAreaId}
          className={`absolute left-0 transition-all duration-200 z-10 pointer-events-none
            ${showFloating
              ? `-top-3 text-base ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              }`
              : `top-3 xl:top-5 ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              } text-base`
            }
          `}
        >
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        {...props}
        value={value ?? internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${baseTextAreaClass} border-b ${borderClass} ${className} ${label ? "pt-5" : ""}`}
        autoComplete={props.autoComplete || "off"}
      />
    </div>
  );
}

// --- Checkbox Field ---
interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  id?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  className = "",
  id,
  ...props
}) => (
  <label className={`flex items-start text-sm   ${className}`}>
    <input
      id={id}
      type="checkbox"
      {...props}
      className="mr-1 my-1 accent-[#ffd700]"
    />
    <span className={`${className.includes("text-(--blue)") ? "text-(--blue)" : "text-(--white-custom)"} leading-snug`}>
      {label}
    </span>
  </label>
);

// --- File Uploader Field ---
interface FileUploaderFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  id?: string;
  multiple?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>; // Add inputRef prop
  resetTrigger?: any; // Add resetTrigger prop
}

const baseFileUploaderClass =
  "bg-transparent border-b py-8 px-1 outline-none w-full mb-3 flex items-center justify-between cursor-pointer";

export const FileUploaderField: React.FC<FileUploaderFieldProps> = ({
  className = "",
  id,
  multiple = false,
  onChange,
  label,
  inputRef, // Destructure inputRef
  resetTrigger, // Destructure resetTrigger
  ...props
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [hasFile, setHasFile] = useState(false); // Track if file is uploaded
  const inputId =
    id ||
    (label
      ? `file-uploader-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);
  const showFloating = isFocused || fileNames.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
      ? Array.from(e.target.files).map((f) => f.name)
      : [];
    setFileNames(files);
    setHasFile(files.length > 0); // Set hasFile true if file uploaded
    onChange?.(e);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    if (resetTrigger) {
      setFileNames([]);
      setHasFile(false);
    }
  }, [resetTrigger]);

  return (
    React.createElement('div', { className: 'relative w-full' },
      label && React.createElement('label', {
        htmlFor: inputId,
        className: `absolute left-0 transition-all duration-200 z-10 pointer-events-none\n          ${showFloating
          ? `-top-3 text-base ${className.includes("text-(--blue)")
            ? "text-(--blue)"
            : "text-(--white-custom)"
          } `
          : `top-3 xl:top-5 ${className.includes("text-(--blue)")
            ? "text-(--blue)"
            : "text-(--white-custom)"
          } text-base`
          }`
      }, label),
      React.createElement('label', {
        htmlFor: inputId,
        className: `${baseFileUploaderClass.replace('py-8', hasFile ? 'py-2' : 'py-8')} ${className} ${label ? "pt-5" : ""}`
      },
        React.createElement('span', {
          className: className.includes("text-(--blue)") ? "text-(--blue)" : "text-(--white-custom) opacity-60"
        },
          fileNames.length
            ? multiple
              ? fileNames.join(", ")
              : fileNames[0]
            : ""
        )
      ),
      React.createElement('input', {
        id: inputId,
        type: 'file',
        multiple: multiple,
        ref: inputRef,
        name: 'resume', // keep name
        // REMOVE required if present in ...props
        ...Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'required')),
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        className: 'hidden'
      })
    )
  );
};

// --- Select Field ---

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  options: { value: string; label: string }[];
}

const baseSelectClass =
  "bg-transparent py-2 xl:py-4 px-1 outline-none text-(--white-custom) w-full mb-3 appearance-none";

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  className = "",
  id,
  value,
  onChange,
  options,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const selectId =
    id ||
    (label ? `select-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const showFloating = isFocused || Boolean(value ?? internalValue);

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const borderClass = className.includes("text-(--blue)")
    ? "border-blue-custom"
    : "border-white-custom";

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={selectId}
          className={`absolute left-0 transition-all duration-200 z-10 pointer-events-none
            ${showFloating
              ? `-top-3 text-base ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              }`
              : `top-3 xl:top-5 ${className.includes("text-(--blue)")
                ? "text-(--blue)"
                : "text-(--white-custom)"
              } text-base`
            }
          `}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        value={value ?? internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${baseSelectClass} border-b ${borderClass} ${className} ${label ? "pt-5" : ""}`}
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-xs text-(--blue)">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
