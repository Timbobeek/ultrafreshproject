"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

interface WizardProviderProps { //generic for all wizards
  children: ReactNode;
}

type WizardStepProps = { //generic for all wizards
  stepIndex: number;
  children: ReactNode;
};

type WizardContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  methods: UseFormReturn<WizardData>;
};

type StepGeneratorProps<Name extends keyof WizardData> = {
   name: Name;
   label: string;
   number: number;
   type: "string" | "number" | "radio" | "checkbox";
   options?: string[];
   checkboxFields?: { name: keyof WizardData; label: string }[];
 };

 const WizardContext = createContext<WizardContextType | undefined>(undefined);

 function useWizard() {
   const ctx = useContext(WizardContext);
   if (!ctx) throw new Error("useWizard must be used within WizardProvider");
   return ctx;
 }

export function StepGenerator<Name extends keyof WizardData>({ //WizardData will come from each unique page.tsx
   name,
   label,
   number,
   type,
   options,
   checkboxFields,
 }: StepGeneratorProps<Name>) {
   const { methods, setStep } = useWizard();
 
   const goBack = () => setStep(number - 2);
 
   const renderInput = () => {
     switch (type) {
       case "radio":
         return (
           <FormField
             name={name}
             control={methods.control}
             render={({ field }) => (
               <FormItem>
                 <FormLabel className="text-black">{label}</FormLabel>
                 <FormControl>
                   <div className="space-y-2">
                     {options?.map((val) => (
                       <label key={val} className="flex items-center space-x-2">
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
               name={name}
               control={methods.control}
               render={({ fieldState }) => (
                 <FormItem>
                   <FormLabel className="text-black">{label}</FormLabel>
                   <div className="space-y-2">
                     {checkboxFields?.map((cb) => (
                       <FormField
                         key={cb.name}
                         name={cb.name}
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
                     <p className="text-sm text-red-500">
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
             name={name}
             control={methods.control}
             render={({ field }) => (
               <FormItem>
                 <FormLabel className="text-black">{label}</FormLabel>
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
 
   const isCheckboxStep = type === "checkbox";
   const fieldsToTrigger = isCheckboxStep
     ? checkboxFields?.map((cb) => cb.name) ?? []
     : [name];
 
   return (
     <Form {...methods}>
       {renderInput()}
 
       <div className="mt-4 flex justify-end space-x-2">
         {number !== 1 && (
           <Button variant="outline" onClick={goBack}>
             Back
           </Button>
         )}
         {number === 22 ? ( // 22 should be wizardStepsContent.length, so its dynamic
           <Button
             type="button"
             onClick={methods.handleSubmit((data, e) => {
               e?.preventDefault();
               axios.post(
                 "https://ferrata-crud2.builtwithdark.com/v1/surveys/",
                 data,
                 {
                   headers: { "x-api-key": apiKey },
                 }
               );
               console.log("submitted", data);
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