import { FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const WizardCheckboxInput = () => (
  <FormField
    name={name as unknown as Path<T>}
    control={methods.control}
    render={({ fieldState }) => (
      <FormItem className="w-[900px]">
        <WizardStepImage image={image} />
        <StepNavigation />
        <div className="flex justify-center">
          {checkboxFields?.map((cb) => (
            <FormField
              key={cb.name as string}
              name={cb.name as unknown as Path<T>}
              control={methods.control}
              render={({ field }) => (
                <FormItem className={cn("mx-1 h-12 content-center", textSize)}>
                  <input
                    className="w-4 h-4 mx-1 accent-background"
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
        <p className="min-h-[1.5rem] text-red-500">
          {fieldState.error?.message}
        </p>
      </FormItem>
    )}
  />
);

export default WizardCheckboxInput;
