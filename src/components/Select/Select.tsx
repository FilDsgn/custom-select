import { FC, useEffect, useRef, useState } from "react";
import "./Select.scss";

import block from "bem-cn-lite";
import { ISelectOption, SelectProps } from "./Select.types";
const b = block("select");

const Select: FC<SelectProps> = ({
  multiple,
  options: optionProps,
  placeholder = "",
  title = "",
  hasSearchIcon,
  hasCreateOption,
  disabled,
  onUpdate,
  width,
  dropDownClassName,
  labelClassName,
}) => {
  const [options, setOptions] = useState<ISelectOption[]>(optionProps);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onUpdate && onUpdate(selectedOptions);
  }, [selectedOptions]);

  // Закрыть dropdown при клике вне компонента
  useEffect(() => {
    const onClick = (e: any) => {
      const onOutsideClick = () => {
        if (!multiple) {
          selectedOptions.length > 0
            ? setInputValue(selectedOptions[0].content.toString())
            : setInputValue("");
        }
        setIsActive(false);
      };

      componentRef.current?.contains(e.target) || onOutsideClick();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [inputValue, options]);

  const filteredOptions = options.filter((option: ISelectOption) =>
    option.content
      .toString()
      .toLowerCase()
      .includes(inputValue.toLowerCase().trim())
  );

  const getMultiplyInputSize = () => {
    if (inputValue.length) {
      return inputValue.length;
    } else if (!inputValue.length && selectedOptions.length) {
      return 1;
    } else {
      return;
    }
  };

  const multiplySize = getMultiplyInputSize();

  const handleAddButton = () => {
    const newOption = { content: inputValue };
    setOptions([newOption, ...options]);
    if (multiple) {
      setSelectedOptions([...selectedOptions, newOption]);
    } else {
      setSelectedOptions([newOption]);
      setInputValue(newOption.content);
    }
    setIsActive(false);
  };

  return (
    <div
      className={`${b()} ${disabled ? b("type_disabled") : ""}`}
      ref={componentRef}
      style={{ width: `${width !== "max" ? width + "px" : ""}` }}
    >
      {title && <h3 className={b("title")}>{title}</h3>}
      <form
        onClick={() => {
          !disabled && inputRef.current?.focus();
        }}
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={`${b("form")} ${disabled ? b("form_disabled") : ""}`}
      >
        {multiple && (
          <ul className={b("selected-list")}>
            {selectedOptions.map((option: ISelectOption, i) => (
              <li
                className={`${b("selected-item")} ${
                  labelClassName ? labelClassName : ""
                }`}
                key={i}
              >
                {option.image && (
                  <img
                    src={option.image}
                    className={b("selected-item-image")}
                  />
                )}
                <p className={b("selected-item-text")}>{option.content}</p>
                <div
                  className={b("selected-item-button")}
                  onClick={() => {
                    setSelectedOptions(
                      selectedOptions.filter((i: ISelectOption) => i !== option)
                    );
                    setIsActive(true);
                  }}
                ></div>
              </li>
            ))}
            {hasSearchIcon && !selectedOptions.length && (
              <div className={b("search-icon")}></div>
            )}
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsActive(true);
              }}
              onFocus={() => {
                setIsActive(true);
              }}
              onClick={() => {
                setIsActive(true);
              }}
              type="text"
              placeholder={selectedOptions.length ? "" : placeholder}
              className={b("input")}
              ref={inputRef}
              size={multiplySize}
              disabled={disabled}
            />
          </ul>
        )}
        {!multiple && (
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsActive(true);
            }}
            onFocus={() => {
              !isActive && setInputValue("");
              setIsActive(true);
            }}
            onClick={() => {
              setIsActive(true);
            }}
            type="text"
            placeholder={
              selectedOptions.length
                ? selectedOptions[0].content.toString()
                : placeholder
            }
            className={b("input")}
            ref={inputRef}
            disabled={disabled}
          />
        )}
        <div
          className={`${b("button")} ${isActive ? b("button_active") : ""}`}
        ></div>
      </form>
      {isActive && (
        <div
          className={`${b("options-container")} ${
            dropDownClassName ? dropDownClassName : ""
          }`}
        >
          <ul className={b("options-list")}>
            {filteredOptions.length
              ? filteredOptions.map((option: ISelectOption, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (multiple) {
                        !selectedOptions.includes(option)
                          ? setSelectedOptions([...selectedOptions, option])
                          : setSelectedOptions(
                              selectedOptions.filter(
                                (i: ISelectOption) => i !== option
                              )
                            );
                      } else {
                        setSelectedOptions([option]);
                        setInputValue(option.content.toString());
                        inputRef.current?.blur();
                        setIsActive(false);
                      }
                    }}
                    className={b("options-item")}
                  >
                    <p>{option.content}</p>
                    {multiple && selectedOptions.includes(option) && (
                      <div className={b("options-item-icon")}></div>
                    )}
                  </li>
                ))
              : !hasCreateOption && (
                  <span className={b("options-list-message")}>
                    Ничего не найдено
                  </span>
                )}
          </ul>
          {hasCreateOption && inputValue && (
            <button onClick={handleAddButton} className={b("add-button")}>
              <div className={b("add-button-icon")}></div>
              <span>{`Создать "${inputValue}"`}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
