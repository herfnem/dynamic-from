import { useEffect, useState, type FC } from "react";
import type { DynamicFieldProps, FieldOption } from "./types";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const DynamicField: FC<DynamicFieldProps> = ({ fieldConfig }) => {
  const { name, label, type, placeholder, options, optionsApi, className } =
    fieldConfig;
  const { control } = useFormContext();

  const [dynamicOptions, setDynamicOptions] = useState<FieldOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  useEffect(() => {
    if (type === "select" || type === "radio") {
      if (optionsApi) {
        setIsLoadingOptions(true);
        fetch(optionsApi.url)
          .then((res) => res.json())
          .then((data) => {
            const mappedOptions = data.map((item: any) => ({
              value: item[optionsApi.valueField],
              label: item[optionsApi.labelField],
            }));
            setDynamicOptions(mappedOptions);
          })
          .catch((err) => console.error("Error fetching options:", err))
          .finally(() => setIsLoadingOptions(false));
      } else if (options) {
        setDynamicOptions(options);
      }
    }
  }, [optionsApi, options, type]);

  const renderField = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    switch (type) {
      case "text":
      case "email":
      case "password":
        return (
          <Input
            error={fieldState.error?.message}
            type={type}
            placeholder={placeholder}
            {...field}
            className={className}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            error={fieldState.error?.message}
            {...field}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            value={field.value === undefined ? "" : field.value}
          />
        );
      case "textarea":
        return <Textarea placeholder={placeholder} {...field} />;
      case "select":
        return (
          <Select
            disabled={isLoadingOptions}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dynamicOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onBlur={field.onBlur}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
        );
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {dynamicOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
      default:
        return <Input type="text" placeholder={placeholder} {...field} />;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="grid gap-2">
          {type !== "checkbox" && <Label htmlFor={label}>{label}</Label>}
          {renderField(field, fieldState)}
        </div>
      )}
    />
  );
};
