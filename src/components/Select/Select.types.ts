export interface ISelectOption {
  content: string | number;
  image?: string;
}

export interface SelectProps {
  options: ISelectOption[];
  multiple?: boolean;
  placeholder?: string;
  title?: string;
  hasSearchIcon?: boolean;
  hasCreateOption?: boolean;
  disabled?: boolean;
  onUpdate?: (options: ISelectOption[]) => void;
  width?: number | "max";
  dropDownClassName?: string;
  labelClassName?: string;
}
