'use client';

import { Calendar01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !Number.isNaN(date.getTime());
}

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  'aria-invalid'?: boolean;
  label?: string;
}

export function DateInput({
  value: propValue,
  onChange,
  onBlur,
  'aria-invalid': ariaInvalid,
  label = 'Date'
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    propValue ? new Date(propValue.split('/').reverse().join('-')) : new Date()
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(propValue || formatDate(date));

  React.useEffect(() => {
    if (propValue !== undefined) {
      const parsedDate = propValue
        ? new Date(propValue.split('/').reverse().join('-'))
        : undefined;
      setDate(parsedDate);
      setMonth(parsedDate);
      setValue(propValue);
    }
  }, [propValue]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setMonth(newDate);
    const formatted = formatDate(newDate);
    setValue(formatted);
    onChange?.(formatted);
  };

  return (
    <div className="flex flex-col gap-3" aria-invalid={ariaInvalid}>
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          className="bg-background pr-10"
          onBlur={onBlur}
          onChange={(e) => {
            const inputValue = e.target.value;
            handleValueChange(inputValue);
            const date = new Date(inputValue.split('/').reverse().join('-'));
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                id="date-picker"
                variant="ghost"
                className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
              >
                <HugeiconsIcon icon={Calendar01FreeIcons} />
                <span className="sr-only">Select date</span>
              </Button>
            }
          />
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                handleDateChange(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
