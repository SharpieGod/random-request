"use client";
import { type FC, useState, useRef, useEffect } from "react";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { motion } from "framer-motion";

export type SelectElementOption = {
  label: string;
  value: string;
};

export type SelectElementProps = {
  options: SelectElementOption[];
  selected: SelectElementOption | null;
  setSelected: (option: SelectElementOption | null) => void;
  placeholder: string;
  disabled: boolean;
};

const SelectElement: FC<SelectElementProps> = ({
  options,
  selected,
  setSelected,
  placeholder,
  disabled,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, options]);

  return (
    <>
      <div
        className={`border-secondary-800 bg-secondary-950 focus:outline-secondary-400 group relative flex w-full cursor-pointer items-center rounded-lg border p-3 ${disabled && "cursor-not-allowed opacity-50"}`}
        tabIndex={0}
        ref={selectRef}
        onFocus={() => {
          if (disabled) selectRef.current?.blur();
        }}
      >
        <span className="flex-1">
          {selected ? selected.label : placeholder}
        </span>

        <FaChevronDown
          size={12}
          className="text-text-50 transition-transform group-focus-within:rotate-180"
        />

        <div className="border-secondary-800 absolute inset-0 top-[calc(100%_+_0.5rem)] z-50 hidden h-fit max-h-[25rem] w-full flex-col overflow-hidden overflow-y-auto rounded-lg border group-focus-within:flex group-focus:flex">
          {/* <div className="border-secondary-800 bg-secondary-950 flex items-center justify-between border-b px-1 py-2">
            <input
              type="text"
              id="except"
              className="flex-1 bg-transparent p-2 py-1 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch size={20} className="text-text-50 w-8" />
          </div> */}

          {filteredOptions
            .sort((a, b) => a.value.localeCompare(b.value))
            .map((option, i) => (
              <div
                className={`unselectable border-secondary-800 bg-secondary-950 flex cursor-pointer items-center justify-between ${
                  i !== filteredOptions.length - 1 && "border-b"
                } hover:bg-secondary-900 p-3`}
                key={i}
                onClick={() => {
                  setSelected(option);
                  selectRef.current?.blur();
                }}
              >
                <span className="unselectable">{option.label}</span>
                {option.value === selected?.value && (
                  <AiOutlineCheck size={18} />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SelectElement;
