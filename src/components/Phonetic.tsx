"use client";

import React from "react";
import { vowels, consonants } from "@/lib/phonetic.json";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

type DataType = Record<
  string,
  { symbol: string; example: string; phonetic: string }[]
>;

function RenderList(data: DataType) {
  const handleCopy = (symbol: string) => {
    const success = () => {
      toast.success("Copy successfully!", {
        description: "It has been successfully copied to the clipboard.",
      });
    };

    const fail = (error: unknown) => {
      toast.error("Copy failed!", {
        description: (error as { message: string }).message,
      });
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(symbol).then(success, fail);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = symbol;
      textarea.style.position = "fixed"; // 避免滚动到页面底部
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        success();
      } catch (err) {
        fail(err);
      }
      document.body.removeChild(textarea);
    }
  };
  return Object.keys(data).map((key) => {
    const value = data[key];
    return (
      <div key={key} className="mb-4">
        <div className="capitalize text-blue-300">{key}</div>
        {value.map(({ symbol, example, phonetic }) => {
          return (
            <div
              key={symbol}
              className="float-left text-lg cursor-pointer"
              onClick={handleCopy.bind(null, symbol)}
            >
              <span key={symbol} className="font-bold">
                {symbol}
              </span>
              <span className="ml-2 mr-4">
                [{example} {phonetic}]
              </span>
            </div>
          );
        })}
        <div className="clear-left" />
      </div>
    );
  });
}

export default function Phonetic() {
  return (
    <Tabs defaultValue="vowels">
      <TabsList className="mx-auto w-full md:w-[40%]">
        <TabsTrigger value="vowels">Vowels</TabsTrigger>
        <TabsTrigger value="consonants">Consonants</TabsTrigger>
      </TabsList>
      <TabsContent value="vowels">
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">vowels</CardTitle>
            <CardDescription>
              <p>
                Vowels are speech sounds produced without any significant
                obstruction of airflow in the vocal tract.
              </p>
              <p>
                In English, the vowels are represented by the letters A, E, I,
                O, U, and sometimes Y (which can function as both a vowel and a
                consonant).
              </p>
            </CardDescription>
          </CardHeader>
          {vowels && <CardContent>{RenderList(vowels)}</CardContent>}
        </Card>
      </TabsContent>
      <TabsContent value="consonants">
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">consonants</CardTitle>
            <CardDescription>
              <p>
                Consonants are speech sounds produced by obstructing or
                restricting airflow in the vocal tract using the lips, teeth,
                tongue, or palate.
              </p>
              <p>
                Unlike vowels, consonants usually cannot form syllables on their
                own (except for syllabic consonants like /l/ in bottle or /n/ in
                button).
              </p>
            </CardDescription>
          </CardHeader>
          {consonants && <CardContent>{RenderList(consonants)}</CardContent>}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
