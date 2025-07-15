import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWizard } from "./WizardContext";
import { FieldValues } from "react-hook-form";
import React from "react";
import { Path } from "react-hook-form";

type CheckboxField<T extends FieldValues> = {
  name: keyof T;
  label: string;
};

export type StepGeneratorProps<T extends FieldValues, Name extends keyof T> = {
  name: Name;
  label: string;
  number: number;
  type: "string" | "number" | "radio" | "checkbox";
  options?: string[];
  checkboxFields?: CheckboxField<T>[];
  isFinalStep?: boolean;
  onSubmit?: (data: T, e?: React.BaseSyntheticEvent) => void;
};

export function StepGenerator<T extends FieldValues, Name extends keyof T>({
  name,
  label,
  number,
  type,
  options,
  checkboxFields,
  isFinalStep = false,
  onSubmit,
}: StepGeneratorProps<T, Name>) {
  const { methods, setStep } = useWizard<T>();

  const goBack = () => setStep(number - 2);

  const isCheckboxStep = type === "checkbox";
  const fieldsToTrigger: Path<T>[] = isCheckboxStep
  ? checkboxFields?.map((cb) => cb.name as unknown as Path<T>) ?? []
  : [name as unknown as Path<T>];



  const renderInput = () => {
    switch (type) {
      case "radio":
        return (
          <FormField
          name={name as unknown as Path<T>}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-medium">{label}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {options?.map((val) => (
                      <label key={val} className="space-x-2 text-background accent-background">
                        <input
                          type="radio"
                          value={val}
                          checked={field.value === val}
                          onChange={() => field.onChange(val)}
                        />
                        <span className="capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormField
          name={name as unknown as Path<T>}
            control={methods.control}
            render={({ fieldState }) => (
              <FormItem>
                <FormLabel className="!text-medium">{label}</FormLabel>
                <div className="space-y-2">
                  {checkboxFields?.map((cb) => (
                    <FormField
                      key={cb.name as string}
                      name={cb.name as unknown as Path<T>}
                      control={methods.control}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name={field.name}
                            ref={field.ref}
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              methods.trigger(fieldsToTrigger);
                            }}
                            onBlur={field.onBlur}
                          />
                          <label htmlFor={field.name}>{cb.label}</label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                {fieldState.error && (
                  <p className=" text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
          name={name as unknown as Path<T>}
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-medium text-background">{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={type === "number" ? "number" : "text"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <Form {...methods}>
      {renderInput()}
      <div className="mt-4 flex justify-end space-x-2">
        {number !== 1 && (
          <Button variant="outline" onClick={goBack}>
            Back
          </Button>
        )}
        {isFinalStep ? (
         <Button
         type="submit"
         onClick={methods.handleSubmit((data, e) => {
           onSubmit?.(data, e);
         })}
       >
         Submit
       </Button>
       
        
        ) : (
          <Button
            type="button"
            onClick={async () => {
              const valid = await methods.trigger(fieldsToTrigger);
              if (valid) setStep(number);
            }}
          >
            Next
          </Button>
        )}
      </div>
    </Form>
  );
}
