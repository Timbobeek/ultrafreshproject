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
import { ZodEnum } from "zod";

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
  position: "gk" | "df" | "mf" | "fw";
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

type StringOrNumberFieldNames = Extract<
  {
    [K in keyof WizardData]: WizardData[K] extends string | number ? K : never;
  }[keyof WizardData],
  keyof WizardData
>;

type StringFieldNames = Extract<
  {
    [K in keyof WizardData]: WizardData[K] extends string ? K : never;
  }[keyof WizardData],
  keyof WizardData
>;

type StepProps<Name extends StringOrNumberFieldNames> = {
  name: Name;
  label: string;
  number: number;
  options?: string[];
};

type WizardStepContent =
  | { name: keyof WizardData; label: string; number: number }
  | {
      name: keyof WizardData;
      label: string;
      number: number;
      options: string[];
    };

// Step schemas
const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.enum(["gk", "df", "mf", "fw"], {
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

// Wizard Context
const WizardContext = createContext<WizardContextType | undefined>(undefined);

function WizardProvider({ children }: WizardProviderProps) {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      name: "",
      position: "gk",
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

function Step<Name extends StringOrNumberFieldNames>({
  name,
  label,
  number,
}: StepProps<Name>) {
  const { methods, setStep } = useWizard();
  const onSubmit = (data: WizardData, e: any) => {
    e.preventDefault();

    axios
      .post("https://ferrata-crud2.builtwithdark.com/v1/surveys/", data, {
        headers: { "x-api-key": apiKey },
      })
      .then((res) => {
        console.log("sent to space");
      });
  };

  return (
    <Form {...methods}>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-4 flex justify-end">
        {number !== 1 && (
          <Button variant="outline" onClick={() => setStep(number - 2)}>
            Back
          </Button>
        )}
        {number === 22 ? (
          <Button type="button" onClick={methods.handleSubmit(onSubmit)}>
            Submit
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const valid = await methods.trigger([name]);
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

function StepCheckbox() {
  const { methods, setStep } = useWizard();

  return (
    <Form {...methods}>
      <FormField
        name="amateur"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              Amateur
            </label>
          </FormItem>
        )}
      />
      <FormField
        name="hs"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              High School
            </label>
          </FormItem>
        )}
      />
      <FormField
        name="acad"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              Academy
            </label>
          </FormItem>
        )}
      />
      <FormField
        name="college"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              College
            </label>
          </FormItem>
        )}
      />
      <FormField
        name="semipro"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              Semi-Pro
            </label>
          </FormItem>
        )}
      />
      <FormField
        name="pro"
        control={methods.control}
        render={({ field }) => (
          <FormItem>
            <label>
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />{" "}
              Pro
            </label>
          </FormItem>
        )}
      />

      {methods.formState.errors.amateur && (
        <p className="text-red-500 text-sm">
          {methods.formState.errors.amateur.message}
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={() => setStep(13)}>
          Back
        </Button>
        <Button
          onClick={async () => {
            const valid = await methods.trigger([
              "amateur",
              "hs",
              "acad",
              "college",
              "semipro",
              "pro",
            ]);
            if (valid) setStep(15); // assuming next step is 15
          }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}

function StepRadio<Name extends StringFieldNames>({
  name,
  label,
  number,
  options,
}: StepProps<Name>) {
  const { methods, setStep } = useWizard();

  return (
    <Form {...methods}>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="space-y-2">
                {options !== undefined ? (
                  options.map((val) => (
                    <label key={val} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={val}
                        checked={field.value === val}
                        onChange={() => field.onChange(val)}
                      />
                      <span className="capitalize">{val}</span>
                    </label>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={() => setStep(number - 2)}>
          Back
        </Button>
        <Button
          onClick={async () => {
            const valid = await methods.trigger("position");
            if (valid) setStep(number);
          }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
}

export default function WizardPage() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "General Survey",
      subtext: null,
      button: false,
      redirect: "/surveys",
    });
  }, []);

  function StepsGenerator(step: {
    name: keyof WizardData;
    label: string;
    number: number;
    options?: string[];
  }) {
    if (step.number === 15) {
      return (
        <WizardStep stepIndex={14}>
          <StepCheckbox />
        </WizardStep>
      );
    }

    if (
      step.options &&
      Object.prototype.hasOwnProperty.call(baseSchema.shape, step.name)
    ) {
      const fieldSchema =
        baseSchema.shape[step.name as keyof typeof baseSchema.shape];

      if (fieldSchema instanceof ZodEnum) {
        return (
          <WizardStep stepIndex={step.number - 1}>
            <StepRadio
              name={step.name as StringFieldNames}
              label={step.label}
              number={step.number}
              options={step.options}
            />
          </WizardStep>
        );
      }
    }

    return (
      <WizardStep stepIndex={step.number - 1}>
        <Step
          name={step.name as StringOrNumberFieldNames}
          label={step.label}
          number={step.number}
        />
      </WizardStep>
    );
  }

  const wizardStepsContent: readonly WizardStepContent[] = [
    { name: "name", label: "What is your name?", number: 1 },
    {
      name: "position",
      label: "Preferred Position",
      number: 2,
      options: ["gk", "df", "md", "fw"],
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
        "Dont care",
      ],
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
    { name: "amateur", label: "Experience Level", number: 15 },
    { name: "achv", label: "Biggest achivement?", number: 16 },
    { name: "goals", label: "Any futbol-related goals?", number: 17 },
    { name: "advc", label: "Best futbol advice?", number: 18 },
    { name: "clt", label: "Favorite pair of cleats?", number: 19 },
    { name: "ball", label: "Favorite ball?", number: 20 },
    {
      name: "jabu",
      label: "Opinion on Jabulani?",
      number: 21,
      options: ["Trash", "Enjoyable", "No idea"],
    },
    { name: "love", label: "Best compliment received?", number: 22 },
  ] as const satisfies readonly {
    name: Exclude<keyof WizardData, boolean>; // ✅ exclude checkboxes here
    label: string;
    number: number;
    options?: string[];
  }[];

  const stepsContentMapper = wizardStepsContent.map((step) =>
    StepsGenerator(step)
  );

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-foreground">
        <WizardProvider>{stepsContentMapper}</WizardProvider>
      </div>
    </div>
  );
}