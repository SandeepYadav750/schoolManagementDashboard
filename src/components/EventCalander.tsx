"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EvenetCalander = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  // useEffect(() => {
  //   if (value instanceof Date) {
  //     router.push(`?data=${value.toLocaleDateString("en-US")}`);
  //   }
  //   // if (value instanceof Date) {
  //   //   const formattedDate = value.toISOString().split("T")[0]; // YYYY-MM-DD
  //   //   router.push(`?date=${formattedDate}`);
  //   // } else {
  //   //   router.push(`/admin`);
  //   // }
  // }, [value, router]);

  useEffect(() => {
    if (value instanceof Date) {
      const formattedDate = value.toLocaleDateString("en-CA"); // YYYY-MM-DD
      router.push(`?date=${formattedDate}`);
    }
  }, [value, router]);

  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
};

export default EvenetCalander;
