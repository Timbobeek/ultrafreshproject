"use client";

import SingleAccordion from "@/components/SingleAccordion";
import { useEffect, useState, useRef } from "react";
import { useHeader } from "@/context/HeaderContext";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type LabelKey =
  | "name"
  | "position"
  | "favplayer"
  | "mr"
  | "favclub"
  | "natteam"
  | "favleague"
  | "favjersey"
  | "favmemspec"
  | "wrsmemspec"
  | "favmemplr"
  | "wrsmemplr"
  | "age"
  | "why"
  | "levels"
  | "achv"
  | "goals"
  | "advc"
  | "clt"
  | "ball"
  | "jabu"
  | "love";

type LabelEntry = {
  text: string;
  key: LabelKey;
};

type ResultsData = {
  [K in LabelKey]?: string;
} & {
  amateur?: boolean;
  hs?: boolean;
  acad?: boolean;
  college?: boolean;
  semipro?: boolean;
  pro?: boolean;
};

type MemberAnswer = {
  label: string;
  data?: string;
};

type MemberResult = {
  name: string;
  answers: MemberAnswer[];
};

function label(text: string, key: LabelKey): LabelEntry {
  return { text, key };
}

const orderedKeys: LabelEntry[] = [
  label("name", "name"),
  label("Favorite position", "position"),
  label("Favorite player", "favplayer"),
  label("Messi or Ronaldo", "mr"),
  label("Favorite club", "favclub"),
  label("Favorite national team", "natteam"),
  label("Favorite league", "favleague"),
  label("Favorite jersey I own", "favjersey"),
  label("Favorite memory as a spectator", "favmemspec"),
  label("Worst memory as a spectator", "wrsmemspec"),
  label("Favorite memory as a player", "favmemplr"),
  label("Worst memory as a player", "wrsmemplr"),
  label("I started playing at", "age"),
  label("I started playing because", "why"),
  label("Levels I played at", "levels"),
  label("My biggest achievement is", "achv"),
  label("My futbol-related goal is", "goals"),
  label("Best futbol advice I have received", "advc"),
  label("Favorite pair of cleats", "clt"),
  label("Favorite ball", "ball"),
  label("Jabulani is", "jabu"),
  label("Best compliment I received", "love"),
];

function getLevels(results: ResultsData): string {
  const levelKeys = [
    "amateur",
    "hs",
    "acad",
    "college",
    "semipro",
    "pro",
  ] as const;
  const levelNames: Record<(typeof levelKeys)[number], string> = {
    amateur: "Amateur",
    hs: "High School",
    acad: "Academy",
    college: "College",
    semipro: "Semi-Pro",
    pro: "Pro",
  };
  const foundLevels = levelKeys.filter((level) => results[level]);
  return foundLevels.map((level) => levelNames[level]).join(", ");
}

export default function ResultsPage() {
  const [, setHeader] = useHeader();
  const [data, setData] = useState<MemberResult[]>([]);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [data]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const buffer = 2;
    setAtTop(scrollTop === 0);
    setAtBottom(scrollTop + clientHeight >= scrollHeight - buffer);
  };

  useEffect(() => {
    setHeader({
      title: "Results",
      subtext: null,
      button: false,
      redirect: "/surveys",
    });
  }, []);

  useEffect(() => {
    axios({
      url: `https://ferrata-crud2.builtwithdark.com/v1/surveys/`,
      method: "get",
      headers: {
        "x-api-key": `${apiKey}`,
      },
    })
      .then((res) => {
        const list: ResultsData[] = Object.values(res.data);
        const result: MemberResult[] = list.map((row) => {
          const member: MemberResult = {
            name: row["name"] ?? "Unknown",
            answers: [],
          };

          orderedKeys.forEach((label) => {
            const value =
              label.key === "levels" ? getLevels(row) : row[label.key];

            member.answers.push({ label: label.text, data: value });
          });

          return member;
        });

        setData(result);
      })
      .catch((err) => {
        console.error(err?.message ?? "Error fetching data");
      });
  }, []);

  return (
    <div className="relative h-[420px] sm:h-[550px] overflow-hidden flex flex-col">
      {/* Top gradient */}
      <div
        className={`pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-t from-transparent to-black transition-opacity duration-300 ${
          atTop ? "opacity-0" : "opacity-100"
        }`}
      />

      <main
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-none"
        onScroll={handleScroll}
      >
        {data.map((member, i) => (
          <SingleAccordion
            key={i}
            title={member.name}
            content={member.answers.map(
              (person) =>
                person.label !== "name" && (
                  <div
                    key={person.label}
                    className="flex justify-center flex-col md:flex-row items-center md:items-normal my-2 md:my-0"
                  >
                    <p className="text-background mx-2">{person.label}</p>
                    <p className=" text-foreground ">{person.data}</p>
                  </div>
                )
            )}
          />
        ))}
      </main>

      {/* Bottom gradient */}
      {isOverflowing && (
        <div
          className={`pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
            atBottom ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
}
