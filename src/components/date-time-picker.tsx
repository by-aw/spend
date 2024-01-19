import {
  ArrowCounterClockwise,
  CaretRight,
  CaretUp,
} from "@phosphor-icons/react";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import IncrementalInput from "./incremental-input";
import { Button } from "./ui/button";


type DateTimePickerProps = {
  trigger: ReactNode;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  onChange: (value: string) => void;
};

type DateTimeParts = {
  month: string;
  day: string;
  year: string;
  hour: string;
  minute: string;
  ampm: string;
};

type DateTimeKeys = keyof DateTimeParts;

export const useCustomDateTimePicker = (
  dateTime: string,
  setDateTime: Dispatch<SetStateAction<string>>
) => {
  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  const getDateTimeParts = (): DateTimeParts => {
    const dateObj = new Date(dateTime);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    const hour = dateObj.getHours().toString().padStart(2, "0");
    const minute = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = Number(hour) >= 12 ? "PM" : "AM";

    return { month, day, year, hour, minute, ampm };
  };

  const setValue = (key: DateTimeKeys, value: string) => {
    setDateTime((prevDateTime) => {
      const parts = getDateTimeParts();
      parts[key] = value;

      // Format the updated parts back into a string
      const updatedDateTime = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;

      if (Date.parse(updatedDateTime)) {
        // Valid date, update the state
        return updatedDateTime;
      } else {
        // Invalid date, keep the previous valid date
        console.log("Invalid date. Keeping previous value:", prevDateTime);
        return prevDateTime;
      }
    });
  };

  return {
    month: getDateTimeParts().month,
    day: getDateTimeParts().day,
    year: getDateTimeParts().year,
    hour: getDateTimeParts().hour,
    minute: getDateTimeParts().minute,
    ampm: getDateTimeParts().ampm,
    setValue,
  };
};

function DateTimePicker({
  trigger,
  time,
  setTime,
  onChange,
}: DateTimePickerProps) {
  const { month, day, year, hour, minute, ampm, setValue } =
    useCustomDateTimePicker(time, setTime);
  const [dateExpanded, setDateExpanded] = useState(true);
  const [timeExpanded, setTimeExpanded] = useState(false);
  const values = { year, month, day, hour, minute, ampm };
  const dateSection = { month, day, year };
  const timeSection = { hour, minute };

  const [inputChanges, setInputChanges] = useState<{ [key: string]: string }>(
    {}
  );

  const handleInputChange = (key: DateTimeKeys, inputValue: string) => {
    // Store the changes locally
    setInputChanges((prevChanges) => ({ ...prevChanges, [key]: inputValue }));
  };

  const handleInputBlur = () => {
    // Update the hook values onBlur
    Object.keys(inputChanges).forEach((key) => {
      setValue(
        key as DateTimeKeys,
        inputChanges[key].toString().padStart(2, "0")
      );
    });

    // Clear the local changes
    setInputChanges({});
  };

  const handleIncrement = (key: DateTimeKeys, amount?: number) => {
    const currentValue = Number(values[key]);
    setValue(key, (currentValue + (amount ?? 1)).toString().padStart(2, "0"));
  };

  const handleDecrement = (key: DateTimeKeys, amount?: number) => {
    const currentValue = Number(values[key]);
    setValue(key, (currentValue - (amount ?? 1)).toString().padStart(2, "0"));
  };

  useEffect(() => {
    setTime(time);
  }, [time]);

  const handleTriggerClick = () => {
    setInputChanges({});
  };

  return (
    <>
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            onChange(`${year}-${month}-${day}T${hour}:${minute}`);
          }
        }}
      >
        <PopoverTrigger onClick={handleTriggerClick}>{trigger}</PopoverTrigger>
        <PopoverContent
          className="rounded-[16px] p-4 gap-4 flex flex-col w-min shadow-lg bg-background/80 backdrop-blur-lg outline outline-border min-w-52"
          side="bottom"
          align="end"
        >
          <PopoverArrow
            style={{ marginTop: "-1px" }}
            stroke="hsl(var(--border))"
            fill="hsl(var(--background))"
            opacity={0.8}
            width={20}
            height={10}
            className=""
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Date</p>
              <div className="flex items-center gap-2">
                <Button className="w-8 h-8" variant="ghost" size="icon">
                  <ArrowCounterClockwise size={28} />
                </Button>
                <Button
                  onClick={() => {
                    setTimeExpanded((c) => !c);
                    setDateExpanded((c) => !c);
                  }}
                  className="w-8 h-8"
                  variant="ghost"
                  size="icon"
                >
                  {dateExpanded ? (
                    <CaretUp size={28} />
                  ) : (
                    <CaretRight size={28} />
                  )}
                </Button>
              </div>
            </div>

            {dateExpanded && (
              <div className="flex gap-4">
                {Object.keys(dateSection).map((key) => (
                  <IncrementalInput
                    key={key}
                    value={
                      Object.keys(inputChanges).length <= 0
                        ? values[key as DateTimeKeys]
                        : inputChanges[key]
                    }
                    onIncrement={() => handleIncrement(key as DateTimeKeys)}
                    onDecrement={() => handleDecrement(key as DateTimeKeys)}
                    onChange={(inputValue) =>
                      handleInputChange(
                        key as DateTimeKeys,
                        inputValue.currentTarget.value
                      )
                    }
                    onBlur={handleInputBlur}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Time</p>
              <div className="flex items-center gap-2">
                <Button className="w-8 h-8" variant="ghost" size="icon">
                  <ArrowCounterClockwise size={28} />
                </Button>
                <Button
                  onClick={() => {
                    setTimeExpanded((c) => !c);
                    setDateExpanded((c) => !c);
                  }}
                  className="w-8 h-8"
                  variant="ghost"
                  size="icon"
                >
                  {timeExpanded ? (
                    <CaretUp size={28} />
                  ) : (
                    <CaretRight size={28} />
                  )}
                </Button>
              </div>
            </div>
            {timeExpanded && (
              <div className="flex gap-4">
                {Object.keys(timeSection).map((key) => (
                  <IncrementalInput
                    key={key}
                    value={
                      Object.keys(inputChanges).length <= 0
                        ? values[key as DateTimeKeys]
                        : inputChanges[key]
                    }
                    onIncrement={() => handleIncrement(key as DateTimeKeys)}
                    onDecrement={() => handleDecrement(key as DateTimeKeys)}
                    onChange={(inputValue) =>
                      handleInputChange(
                        key as DateTimeKeys,
                        inputValue.currentTarget.value
                      )
                    }
                    onBlur={handleInputBlur}
                  />
                ))}
                <IncrementalInput
                  key={"ampm"}
                  value={
                    Object.keys(inputChanges).length <= 0
                      ? Number(hour) >= 12
                        ? "PM"
                        : "AM"
                      : inputChanges["ampm"]
                  }
                  onIncrement={() => handleIncrement("hour", 12)}
                  onDecrement={() => handleDecrement("hour", 12)}
                  onChange={(inputValue) =>
                    handleInputChange("ampm", inputValue.currentTarget.value)
                  }
                  onBlur={handleInputBlur}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DateTimePicker;
