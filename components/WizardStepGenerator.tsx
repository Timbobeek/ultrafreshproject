import { Form } from "@/components/ui/form";
import { useWizard } from "./WizardContext";
import { FieldValues } from "react-hook-form";
import React from "react";
import { Path } from "react-hook-form";
import { StaticImageData } from "next/image";
import WizardRadioInput from "./WizardRadioInput";
import WizardCheckboxInput from "./WizardCheckboxInput";
import WizardTextInput from "./WizardTextInput";

type CheckboxField<T extends FieldValues> = {
  name: keyof T;
  label: string;
};

export type StepGeneratorProps<T extends FieldValues, Name extends keyof T> = {
  image: StaticImageData;
  name: Name;
  label: string;
  number: number;
  textSize: string;
  type: "string" | "number" | "radio" | "checkbox";
  options?: string[];
  checkboxFields?: CheckboxField<T>[];
  isFinalStep?: boolean;
  onSubmit?: (data: T, e?: React.BaseSyntheticEvent) => void;
  isFirstStep?: boolean;
};

// export function StepGenerator<T extends FieldValues, Name extends keyof T>({
//   name,
//   image,
//   label,
//   number,
//   textSize,
//   type,
//   options,
//   checkboxFields,
//   isFinalStep = false,
//   onSubmit,
// }: StepGeneratorProps<T, Name>) {
//   const { methods, setStep } = useWizard<T>();

//   const goBack = () => setStep(number - 2);

//   const isCheckboxStep = type === "checkbox";
//   const fieldsToTrigger: Path<T>[] = isCheckboxStep
//     ? checkboxFields?.map((cb) => cb.name as unknown as Path<T>) ?? []
//     : [name as unknown as Path<T>];

//   const renderInput = () => {
//     switch (type) {
//       case "radio":
//         return (
//           <FormField
//             name={name as unknown as Path<T>}
//             control={methods.control}
//             render={({ field }) => (
//               <FormItem className="w-[900px]">
//                 <div className="relative h-[500px] overflow-hidden">
//                   <Image
//                     src={image}
//                     alt="some image"
//                     fill
//                     className="object-cover object-top"
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <div className="flex items-center">
//                     {number === 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background invisible pointer-events-none"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft />
//                       </Button>
//                     )}
//                     {number !== 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft className="w-12 h-12" />
//                       </Button>
//                     )}
//                     <FormLabel className="!text-medium text-black my-2">
//                       {label}
//                     </FormLabel>
//                     {isFinalStep ? (
//                       <Button
//                         variant="submit"
//                         type="submit"
//                         onClick={methods.handleSubmit((data, e) => {
//                           onSubmit?.(data, e);
//                         })}
//                       >
//                         <Rocket />
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={async () => {
//                           const valid = await methods.trigger(fieldsToTrigger);
//                           if (valid) setStep(number);
//                         }}
//                       >
//                         <ChevronRight className="w-12 h-12" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//                 <FormControl>
//                   <div className={cn("h-12 content-center text-2xl", textSize)}>
//                     {options?.map((val) => (
//                       <label
//                         key={val}
//                         className=" text-black accent-background mx-1"
//                       >
//                         <input
//                           className="w-8 h-8"
//                           type="radio"
//                           value={val}
//                           checked={field.value === val}
//                           onChange={() => field.onChange(val)}
//                         />
//                         <span className="capitalize ml-1">{val}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         );

//       case "checkbox":
//         return (
//           <FormField
//             name={name as unknown as Path<T>}
//             control={methods.control}
//             render={({ fieldState }) => (
//               <FormItem className="w-[900px]">
//                 <div className="relative h-[500px] overflow-hidden">
//                   <Image
//                     src={image}
//                     alt="some image"
//                     fill
//                     className="object-cover object-top"
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <div className="flex items-center">
//                     {number === 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background invisible pointer-events-none"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft />
//                       </Button>
//                     )}
//                     {number !== 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft className="w-12 h-12" />
//                       </Button>
//                     )}
//                     <FormLabel className="!text-medium text-black my-2">
//                       {label}
//                     </FormLabel>
//                     {isFinalStep ? (
//                       <Button
//                         variant="submit"
//                         type="submit"
//                         onClick={methods.handleSubmit((data, e) => {
//                           onSubmit?.(data, e);
//                         })}
//                       >
//                         <Rocket />
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={async () => {
//                           const valid = await methods.trigger(fieldsToTrigger);
//                           if (valid) setStep(number);
//                         }}
//                       >
//                         <ChevronRight className="w-12 h-12" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex justify-center">
//                   {checkboxFields?.map((cb) => (
//                     <FormField
//                       key={cb.name as string}
//                       name={cb.name as unknown as Path<T>}
//                       control={methods.control}
//                       render={({ field }) => (
//                         <FormItem
//                           className={cn("mx-1 h-12 content-center", textSize)}
//                         >
//                           <input
//                             className="w-4 h-4 mx-1 accent-background"
//                             type="checkbox"
//                             name={field.name}
//                             ref={field.ref}
//                             checked={field.value}
//                             onChange={(e) => {
//                               field.onChange(e);
//                               methods.trigger(fieldsToTrigger);
//                             }}
//                             onBlur={field.onBlur}
//                           />
//                           <label htmlFor={field.name}>{cb.label}</label>
//                         </FormItem>
//                       )}
//                     />
//                   ))}
//                 </div>

//                 <p className="min-h-[1.5rem] text-red-500">
//                   {fieldState.error?.message}
//                 </p>
//               </FormItem>
//             )}
//           />
//         );

//       default:
//         return (
//           <FormField
//             name={name as unknown as Path<T>}
//             control={methods.control}
//             render={({ field }) => (
//               <FormItem className="w-[900px]">
//                 <div className="relative h-[500px] overflow-hidden">
//                   <Image
//                     src={image}
//                     alt="some image"
//                     fill
//                     className="object-cover object-top"
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <div className="flex items-center">
//                     {number === 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background invisible pointer-events-none"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft />
//                       </Button>
//                     )}
//                     {number !== 1 && (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={goBack}
//                       >
//                         <ChevronLeft className="w-12 h-12" />
//                       </Button>
//                     )}
//                     <FormLabel className="!text-medium text-black my-2">
//                       {label}
//                     </FormLabel>
//                     {isFinalStep ? (
//                       <Button
//                         variant="submit"
//                         type="submit"
//                         onClick={methods.handleSubmit((data, e) => {
//                           onSubmit?.(data, e);
//                         })}
//                       >
//                         <Rocket />
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="pagination"
//                         className="text-black hover:text-background"
//                         onClick={async () => {
//                           const valid = await methods.trigger(fieldsToTrigger);
//                           if (valid) setStep(number);
//                         }}
//                       >
//                         <ChevronRight className="w-12 h-12" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>

//                 <FormControl>
//                   <Input
//                     className="placeholder-green-600 no-spinner"
//                     placeholder="Type here..."
//                     {...field}
//                     type={type === "number" ? "number" : "text"}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         );
//     }
//   };

//   return (
//     <Form {...methods}>
//       {renderInput()}
//     </Form>
//   );
// }

// current issue with llm refactored code ---> onClick doesnt react on first click

export function StepGenerator<T extends FieldValues, Name extends keyof T>({
  name,
  image,
  label,
  number,
  textSize,
  type,
  options,
  checkboxFields,
  isFinalStep,
  onSubmit,
  isFirstStep, //should come from each page.tsx?
}: StepGeneratorProps<T, Name>) {
  const { methods, setStep } = useWizard<T>();
  const goBack = () => setStep(number - 2);
  const isCheckboxStep = type === "checkbox";
  const fieldsToTrigger: Path<T>[] = isCheckboxStep
    ? checkboxFields?.map((cb) => cb.name as unknown as Path<T>) ?? []
    : [name as unknown as Path<T>];

  // const StepImage = () => (
  //   <div className="relative h-[500px] overflow-hidden">
  //     <Image
  //       src={image}
  //       alt="step image"
  //       fill
  //       className="object-cover object-top"
  //     />
  //   </div>
  // );

  // const StepNavigation = () => (
  //   <div className="flex justify-center">
  //     <div className="flex items-center">
  //       <Button
  //         variant="pagination"
  //         className={cn(
  //           "text-black hover:text-background",
  //           number === 1 && "invisible pointer-events-none"
  //         )}
  //         onClick={goBack}
  //       >
  //         <ChevronLeft className="w-12 h-12" />
  //       </Button>
  //       <FormLabel className="!text-medium text-black my-2">{label}</FormLabel>
  //       {isFinalStep ? (
  //         <Button
  //           variant="submit"
  //           type="submit"
  //           onClick={methods.handleSubmit((data, e) => onSubmit?.(data, e))}
  //         >
  //           <Rocket />
  //         </Button>
  //       ) : (
  //         <Button
  //           variant="pagination"
  //           className="text-black hover:text-background"
  //           onClick={async () => {
  //             console.log("next");
  //             const valid = await methods.trigger(fieldsToTrigger);
  //             console.log(valid);
  //             if (valid) setStep(number);
  //           }}
  //         >
  //           <ChevronRight className="w-12 h-12" />
  //         </Button>
  //       )}
  //     </div>
  //   </div>
  // );

  // const renderRadioInput = () => (
  //   <FormField
  //     name={name as unknown as Path<T>}
  //     control={methods.control}
  //     render={({ field }) => (
  //       <FormItem className="w-[900px]">
  //         <WizardStepImage image={image} />
  //         <WizardStepNavigation
  //           label={label}
  //           isFirstStep={number === 1}
  //           isFinalStep={isFinalStep}
  //           onBack={goBack}
  //           onNext={async () => {
  //             const valid = await methods.trigger(fieldsToTrigger);

  //             if (valid) setStep(number);
  //           }}
  //           onSubmit={() => {
  //             methods.handleSubmit((data, e) => onSubmit?.(data, e));
  //           }}
  //         />
  //         <FormControl>
  //           <div className={cn("h-12 content-center text-2xl", textSize)}>
  //             {options?.map((val) => (
  //               <label key={val} className="text-black accent-background mx-1">
  //                 <input
  //                   className="w-8 h-8"
  //                   type="radio"
  //                   value={val}
  //                   checked={field.value === val}
  //                   onChange={() => field.onChange(val)}
  //                 />
  //                 <span className="capitalize ml-1">{val}</span>
  //               </label>
  //             ))}
  //           </div>
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );

  // const renderCheckboxInput = () => (
  //   <FormField
  //     name={name as unknown as Path<T>}
  //     control={methods.control}
  //     render={({ fieldState }) => (
  //       <FormItem className="w-[900px]">
  //         <WizardStepImage image={image} />
  //         <WizardStepNavigation
  //           label={label}
  //           isFirstStep={number === 1}
  //           isFinalStep={isFinalStep}
  //           onBack={goBack}
  //           onNext={async () => {
  //             const valid = await methods.trigger(fieldsToTrigger);
  //             if (valid) setStep(number);
  //           }}
  //           onSubmit={() => {
  //             methods.handleSubmit((data, e) => onSubmit?.(data, e));
  //           }}
  //         />
  //         <div className="flex justify-center">
  //           {checkboxFields?.map((cb) => (
  //             <FormField
  //               key={cb.name as string}
  //               name={cb.name as unknown as Path<T>}
  //               control={methods.control}
  //               render={({ field }) => (
  //                 <FormItem
  //                   className={cn("mx-1 h-12 content-center", textSize)}
  //                 >
  //                   <input
  //                     className="w-4 h-4 mx-1 accent-background"
  //                     type="checkbox"
  //                     name={field.name}
  //                     ref={field.ref}
  //                     checked={field.value}
  //                     onChange={(e) => {
  //                       field.onChange(e);
  //                       methods.trigger(fieldsToTrigger);
  //                     }}
  //                     onBlur={field.onBlur}
  //                   />
  //                   <label htmlFor={field.name}>{cb.label}</label>
  //                 </FormItem>
  //               )}
  //             />
  //           ))}
  //         </div>
  //         <p className="min-h-[1.5rem] text-red-500">
  //           {fieldState.error?.message}
  //         </p>
  //       </FormItem>
  //     )}
  //   />
  // );

  // const renderTextOrNumberInput = () => (
  //   <FormField
  //     name={name as unknown as Path<T>}
  //     control={methods.control}
  //     render={({ field }) => (
  //       <FormItem className="w-[900px]">
  //         <WizardStepImage image={image} />
  //         <WizardStepNavigation
  //           label={label}
  //           isFirstStep={number === 1}
  //           isFinalStep={isFinalStep}
  //           onBack={goBack}
  //           onNext={async () => {
  //             const valid = await methods.trigger(fieldsToTrigger);

  //             if (valid) setStep(number);
  //           }}
  //           onSubmit={() => {
  //             methods.handleSubmit((data, e) => onSubmit?.(data, e));
  //           }}
  //         />
  //         <FormControl>
  //           <Input
  //             className="placeholder-green-600 no-spinner"
  //             placeholder="Type here..."
  //             {...field}
  //             type={type === "number" ? "number" : "text"}
  //           />
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );

  const renderInput = () => {
    switch (type) {
      case "radio":
        return (
          <WizardRadioInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={goBack}
            onNext={async () => {
              const valid = await methods.trigger(fieldsToTrigger);
              if (valid) setStep(number);
            }}
            onSubmit={() => {
              methods.handleSubmit((data, e) => onSubmit?.(data, e));
            }}
            textSize={textSize}
            options={options}
          />
        );
      case "checkbox":
        return (
          <WizardCheckboxInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={goBack}
            onNext={async () => {
              const valid = await methods.trigger(fieldsToTrigger);
              if (valid) setStep(number);
            }}
            onSubmit={() => {
              methods.handleSubmit((data, e) => onSubmit?.(data, e));
            }}
            textSize={textSize}
            checkboxFields={checkboxFields}
            fieldsToTrigger={fieldsToTrigger}
          />
        );
      default:
        return (
          <WizardTextInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={goBack}
            onNext={async () => {
              const valid = await methods.trigger(fieldsToTrigger);
              if (valid) setStep(number);
            }}
            onSubmit={() => {
              methods.handleSubmit((data, e) => onSubmit?.(data, e));
            }}
            type={type}
          />
        );
    }
  };

  return <Form {...methods}>{renderInput()}</Form>;
}
