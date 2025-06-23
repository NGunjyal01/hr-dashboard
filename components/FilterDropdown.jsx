'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ title, options, selected, onChange }) => {
  const handleToggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer bg-white dark:bg-gray-800">
          {title}
          {selected.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs">
              {selected.length}
            </span>
          )}
          <ChevronDown className="ml-2 w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800">
        <div className="p-2">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={`${title}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
                className={'cursor-pointer'}
              />
              <label
                htmlFor={`${title}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
