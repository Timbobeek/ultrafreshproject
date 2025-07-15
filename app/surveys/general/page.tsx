"use client"

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodEnum, ZodNumber } from "zod";
import { WizardProvider } from "@/components/WizardContext";
import { StepGenerator } from "@/components/WizardStepGenerator";
import { WizardStep } from "@/components/WizardStep";
import { useHeader } from "../../context/HeaderContext";
import axios from 'axios';
import { StaticImageData } from "next/image";

import stepOne from '../../../public/generalSurvey/vennegor.jpg';
import stepTwo from '../../../public/generalSurvey/Soccer-Formation~.png';
import stepThree from '../../../public/generalSurvey/ronaldogaucho.jpg';
import stepFour from '../../../public/generalSurvey/Messi-&-Ronaldo.png';
import stepFive from '../../../public/generalSurvey/morecambe.jpg';
import stepSix from '../../../public/generalSurvey/usmnt~.jpg';
import stepSeven from '../../../public/generalSurvey/premCrop2.jpg';
import stepEight from '../../../public/generalSurvey/collection.webp';
import stepNine from '../../../public/generalSurvey/liverpool.avif';
import stepTen from '../../../public/generalSurvey/brazilgermany.jpg';
import stepEleven from '../../../public/generalSurvey/hawklooongCrop.jpg';
import stepTwelve from '../../../public/generalSurvey/urnpublinjury.webp';
import stepThirteen from '../../../public/generalSurvey/kids~.jpg';
import stepFourteen from '../../../public/generalSurvey/son.jpg';
import stepFifteen from '../../../public/generalSurvey/pyramid2.png';
import stepSixteen from '../../../public/generalSurvey/worldcup.webp';
import stepSeventeen from '../../../public/generalSurvey/conference.jpg';
import stepEighteen from '../../../public/generalSurvey/advice.webp';
import stepNineteen from '../../../public/generalSurvey/nike-total-90-laser-i-remake-boots-9.jpg';
import stepTwenty from '../../../public/generalSurvey/brazuca.jpg';
import stepTwentyOne from '../../../public/generalSurvey/jabulani.avif';
import stepTwentyTwo from '../../../public/generalSurvey/klopp.jpg';



const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// WizardData and fullSchema
export type WizardData = {
  name: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  favplayer: string;
  mr: "Messi" | "Ronaldo" | "Like and respect both" | "Dislike both" | "Don't care";
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

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  favplayer: z.string().min(1),
  mr: z.enum(["Messi", "Ronaldo", "Like and respect both", "Dislike both", "Don't care"]),
  favclub: z.string().min(1),
  natteam: z.string().min(1),
  favleague: z.string().min(1),
  favjersey: z.string().min(1),
  favmemspec: z.string().min(1),
  wrsmemspec: z.string().min(1),
  favmemplr: z.string().min(1),
  wrsmemplr: z.string().min(1),
  age: z.coerce.number().min(1),
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
    data.amateur || data.hs || data.acad || data.college || data.semipro || data.pro,
  {
    message: "Select at least one experience level",
    path: ["amateur"],
  }
);

const wizardStepsContent: {
  image: StaticImageData;
  name: keyof WizardData;
  label: string;
  number: number;
  options?: string[];
  type?: "string" | "number" | "radio" | "checkbox";
  checkboxFields?: { name: keyof WizardData; label: string }[];
}[] = [
  { image: stepOne, name: "name", label: "What is your name?", number: 1 },
  {
    image: stepTwo, name: "position",
    label: "Preferred Position",
    number: 2,
    options: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
    type: "radio",
  },
  { image: stepThree, name: "favplayer", label: "Favorite Player", number: 3 },
  {
    image: stepFour, name: "mr",
    label: "Messi or Ronaldo?",
    number: 4,
    options: ["Messi", "Ronaldo", "Like and respect both", "Dislike both", "Don't care"],
    type: "radio",
  },
  { image: stepFive, name: "favclub", label: "Favorite Club?", number: 5 },
  { image: stepSix, name: "natteam", label: "Favorite National Team?", number: 6 },
  { image: stepSeven, name: "favleague", label: "Favorite League?", number: 7 },
  { image: stepEight, name: "favjersey", label: "Favorite Jersey?", number: 8 },
  { image: stepNine, name: "favmemspec", label: "Favorite Memory as a spectator?", number: 9 },
  { image: stepTen, name: "wrsmemspec", label: "Worst Memory as a spectator?", number: 10 },
  { image: stepEleven, name: "favmemplr", label: "Favorite Memory as a player?", number: 11 },
  { image: stepTwelve, name: "wrsmemplr", label: "Worst Memory as a player?", number: 12 },
  { image: stepThirteen, name: "age", label: "When did you start playing?", number: 13 },
  { image: stepFourteen, name: "why", label: "Why did you start playing?", number: 14 },
  {
    image: stepFifteen, name: "amateur",
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
  { image: stepSixteen, name: "achv", label: "Biggest achievement?", number: 16 },
  { image: stepSeventeen, name: "goals", label: "Any futbol-related goals?", number: 17 },
  { image: stepEighteen, name: "advc", label: "Best futbol advice?", number: 18 },
  { image: stepNineteen, name: "clt", label: "Favorite pair of cleats?", number: 19 },
  { image: stepTwenty, name: "ball", label: "Favorite ball?", number: 20 },
  {
    image: stepTwentyOne, name: "jabu",
    label: "Opinion on Jabulani?",
    number: 21,
    options: ["Trash", "Enjoyable", "No idea"],
    type: "radio",
  },
  { image: stepTwentyTwo, name: "love", label: "Best compliment received?", number: 22 },
];

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

  const methods = useForm<WizardData>({
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
    mode: "onChange",
  });

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
        <StepGenerator<WizardData, keyof WizardData>
          image={step.image}
          name={step.name}
          label={step.label}
          number={step.number}
          type={type}
          options={step.options}
          checkboxFields={step.checkboxFields}
          isFinalStep={step.number === wizardStepsContent.length}
          onSubmit={((data, e) => {
            console.log('submitted', data)
            e?.preventDefault();
            axios.post(
              "https://ferrata-crud2.builtwithdark.com/v1/surveys/",
              data,
              {
                headers: { "x-api-key": apiKey },
              }
            );
          })}
        />
      </WizardStep>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mt-10 p-6 border rounded-xl bg-foreground">
        <WizardProvider<WizardData> methods={methods}>
          {stepsContentMapper}
        </WizardProvider>
      </div>
    </div>
  );
}
