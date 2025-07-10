"use client";

import { useState, createContext, useContext } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ReactNode } from "react";
import { useEffect } from "react";
import { useHeader } from "@/app/context/HeaderContext";
import axios from "axios";
import { ZodEnum, ZodNumber } from "zod";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface WizardProviderProps {
  children: ReactNode;
}

type WizardStepProps = {
  stepIndex: number;
  children: ReactNode;
};

type WizardData = {
  name: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  favplayer: string;
  mr:
    | "Messi"
    | "Ronaldo"
    | "Like and respect both"
    | "Dislike both"
    | "Don't care";
  favclub: string;
  natteam: string;
  favleague: string;
  favjersey: string;
  favmemspec: string;
  wrsmemspec: string;
  favmemplr: string;
  wrsmemplr: string;
  age: number;
  why: string;
  amateur?: boolean;
  hs?: boolean;
  acad?: boolean;
  college?: boolean;
  semipro?: boolean;
  pro?: boolean;
  achv: string;
  goals: string;
  advc: string;
  clt: string;
  ball: string;
  jabu: "Trash" | "Enjoyable" | "No idea";
  love: string;
  userId: string;
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

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"], {
    errorMap: () => ({ message: "Select a role" }),
  }),
  favplayer: z.string().min(1),
  mr: z.enum([
    "Messi",
    "Ronaldo",
    "Like and respect both",
    "Dislike both",
    "Don't care",
  ]),
  favclub: z.string().min(1),
  natteam: z.string().min(1),
  favleague: z.string().min(1),
  favjersey: z.string().min(1),
  favmemspec: z.string().min(1),
  wrsmemspec: z.string().min(1),
  favmemplr: z.string().min(1),
  wrsmemplr: z.string().min(1),
  age: z.coerce.number(),
  why: z.string().min(1),
  amateur: z.boolean().optional(),
  hs: z.boolean().optional(),
  acad: z.boolean().optional(),
  college: z.boolean().optional(),
  semipro: z.boolean().optional(),
  pro: z.boolean().optional(),
  achv: z.string().min(1),
  goals: z.string().min(1),
  advc: z.string().min(1),
  clt: z.string().min(1),
  ball: z.string().min(1),
  jabu: z.enum(["Trash", "Enjoyable", "No idea"]),
  love: z.string().min(1),
  userId: z.string().min(1),
});

const fullSchema = baseSchema.refine(
  (data) =>
    data.amateur ||
    data.hs ||
    data.acad ||
    data.college ||
    data.semipro ||
    data.pro,
  {
    message: "Select at least one experience level",
    path: ["amateur"],
  }
);

const WizardContext = createContext<WizardContextType | undefined>(undefined);

function WizardProvider({ children }: WizardProviderProps) {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      name: "",
      position: "Goalkeeper",
      favplayer: "",
      mr: "Messi",
      favclub: "",
      natteam: "",
      favleague: "",
      favjersey: "",
      favmemspec: "",
      wrsmemspec: "",
      favmemplr: "",
      wrsmemplr: "",
      age: undefined,
      why: "",
      amateur: false,
      hs: false,
      acad: false,
      college: false,
      semipro: false,
      pro: false,
      achv: "",
      goals: "",
      advc: "",
      clt: "",
      ball: "",
      jabu: "Trash",
      love: "",
      userId: "hjkfhjsdhfjkhdsjfhjh",
    },
    mode: "onTouched",
  });

  return (
    <WizardContext.Provider value={{ step, setStep, methods }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </WizardContext.Provider>
  );
}

function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}

function WizardStep({ stepIndex, children }: WizardStepProps) {
  const { step } = useWizard();
  return step === stepIndex ? <>{children}</> : null;
}

export function StepGenerator<Name extends keyof WizardData>({
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
            name="amateur"
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
                              methods.trigger("amateur");
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
        {number === 22 ? (
          <Button
            type="button"
            onClick={methods.handleSubmit((data, e) => {
              // e?.preventDefault();
              // axios.post(
              //   "https://ferrata-crud2.builtwithdark.com/v1/surveys/",
              //   data,
              //   {
              //     headers: { "x-api-key": apiKey },
              //   }
              // );
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

export default function GeneralSurveyPage() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "General Survey",
      subtext: null,
      button: false,
      redirect: "/surveys",
    });
  }, []);

  const wizardStepsContent: {
    name: keyof WizardData;
    label: string;
    number: number;
    options?: string[];
    type?: "string" | "number" | "radio" | "checkbox";
    checkboxFields?: { name: keyof WizardData; label: string }[];
  }[] = [
    { name: "name", label: "What is your name?", number: 1 },
    {
      name: "position",
      label: "Preferred Position",
      number: 2,
      options: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
      type: "radio",
    },
    { name: "favplayer", label: "Favorite Player", number: 3 },
    {
      name: "mr",
      label: "Messi or Ronaldo?",
      number: 4,
      options: [
        "Messi",
        "Ronaldo",
        "Like and respect both",
        "Dislike both",
        "Don't care",
      ],
      type: "radio",
    },
    { name: "favclub", label: "Favorite Club?", number: 5 },
    { name: "natteam", label: "Favorite National Team?", number: 6 },
    { name: "favleague", label: "Favorite League?", number: 7 },
    { name: "favjersey", label: "Favorite Jersey?", number: 8 },
    { name: "favmemspec", label: "Favorite Memory as a spectator?", number: 9 },
    { name: "wrsmemspec", label: "Worst Memory as a spectator?", number: 10 },
    { name: "favmemplr", label: "Favorite Memory as a player?", number: 11 },
    { name: "wrsmemplr", label: "Worst Memory as a player?", number: 12 },
    { name: "age", label: "When did you start playing?", number: 13 },
    { name: "why", label: "Why did you start playing?", number: 14 },
    {
      name: "amateur",
      label: "Experience Level",
      number: 15,
      type: "checkbox",
      checkboxFields: [
        { name: "amateur", label: "Amateur" },
        { name: "hs", label: "High School" },
        { name: "acad", label: "Academy" },
        { name: "college", label: "College" },
        { name: "semipro", label: "Semi-Pro" },
        { name: "pro", label: "Pro" },
      ],
    },
    { name: "achv", label: "Biggest achievement?", number: 16 },
    { name: "goals", label: "Any futbol-related goals?", number: 17 },
    { name: "advc", label: "Best futbol advice?", number: 18 },
    { name: "clt", label: "Favorite pair of cleats?", number: 19 },
    { name: "ball", label: "Favorite ball?", number: 20 },
    {
      name: "jabu",
      label: "Opinion on Jabulani?",
      number: 21,
      options: ["Trash", "Enjoyable", "No idea"],
      type: "radio",
    },
    { name: "love", label: "Best compliment received?", number: 22 },
  ];

  const stepsContentMapper = wizardStepsContent.map((step) => {
    const fieldSchema =
      baseSchema.shape[step.name as keyof typeof baseSchema.shape];

    let type: "string" | "number" | "radio" | "checkbox" = "string";

    if (step.type) {
      type = step.type;
    } else if (step.options && fieldSchema instanceof ZodEnum) {
      type = "radio";
    } else if (fieldSchema instanceof ZodNumber) {
      type = "number";
    }

    return (
      <WizardStep key={step.number} stepIndex={step.number - 1}>
        <StepGenerator
          name={step.name}
          label={step.label}
          number={step.number}
          type={type}
          options={step.options}
          checkboxFields={step.checkboxFields}
        />
      </WizardStep>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-Midfielder mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-foreground">
        <WizardProvider>{stepsContentMapper}</WizardProvider>
      </div>
    </div>
  );
}
