"use client";

import SingleAccordion from "@/components/SingleAccordion";
import { useEffect, useState } from "react";
import { useHeader } from "@/context/HeaderContext";
import axios from "axios";
import { ArrowBigRight } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

function label(text, key) {
  return { text, key };
}

const orderedKeys = [
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
  label("Levels I played at", "levels"), //["amateur","hs","acad", "college", "semipro",'pro'),
  label("My biggest achievement is", "achv"),
  label("My futbol-related goal is", "goals"),
  label("Best futbol advice I have received", "advc"),
  label("Favorite pair of cleats", "clt"),
  label("Favorite ball", "ball"),
  label("Jabulani is", "jabu"),
  label("Best compliment I received", "love"),
];

function getLevels(row) {
  const levelKeys = ["amateur", "hs", "acad", "college", "semipro", "pro"];
  const levelNames = {
    amateur: "Amateur",
    hs: "High School",
    acad: "Academy",
    college: "College",
    semipro: "Semi-Pro",
    pro: "Pro",
  };
  const foundLevels = levelKeys.filter((level) => row[level]);
  return foundLevels.map((level) => levelNames[level] ?? "").join(", ");
}

export default function ResultsPage() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Results",
      subtext: null,
      button: false,
      redirect: "/surveys",
    });
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      url: `https://ferrata-crud2.builtwithdark.com/v1/surveys/`,
      method: "get",
      headers: {
        "x-api-key": `${apiKey}`,
      },
    })
      .then((res) => {
        const list = Object.values(res.data);
        const result = list.map((row) => {
          const member = {
            name: row["name"],
            answers: [],
          };

          orderedKeys.forEach((label) => {
            const data =
              label.key === "levels" ? getLevels(row) : row[label.key];

            member.answers.push({ label: label.text, data });
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
    <>
      {data.map((member) =>
        SingleAccordion({
          title: member.name,
          content: member.answers.map((person) =>
            person.label !== "name" ? (
              <div className="flex justify-center">
                <p className=" text-background">{person.label}</p>
                <ArrowBigRight className="text-background" />
                <p className=" text-foreground">{person.data}</p>
              </div>
            ) : (
              <></>
            )
          ),
        })
      )}
    </>
  );
}
