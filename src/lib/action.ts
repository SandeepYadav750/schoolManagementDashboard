"use server";

import { revalidatePath } from "next/cache";
import {
  classInputs,
  LessonInputs,
  SubjectInputs,
} from "./formValidationSchema";
import { prisma } from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectInputs
) => {
  //   console.log("Creating Subject with data:", data.name);

  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log("err creating subject:", err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectInputs
) => {
  //   console.log("Creating Subject with data:", data.name);

  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log("err updating subject:", err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating Subject with data:", data.name);
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting subject:", err);
    return { success: false, error: true };
  }
};

// -------------------------------------------------------------------------------

export const createclass = async (
  currentState: CurrentState,
  data: classInputs
) => {
  //   console.log("Creating class with data:", data.name);

  try {
    await prisma.class.create({
      data,
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err creating class:", err);
    return { success: false, error: true };
  }
};

export const updateclass = async (
  currentState: CurrentState,
  data: classInputs
) => {
  //   console.log("Creating class with data:", data.name);

  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err updating class:", err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting class:", err);
    return { success: false, error: true };
  }
};

// -------------------------------------------------------------------------------

export const createLesson = async (
  currentState: CurrentState,
  data: LessonInputs
) => {
  try {
    await prisma.lesson.create({
      data,
      //   data: {
      //     name: data.name,
      //     day: data.day,
      //     classId: data.classId,
      //     subjectId: data.subjectId,
      //     teacherId: data.teacherId,

      //     // ✅ FIXED
      //     startTime: data.startTime,
      //     endTime: data.endTime,
      //   },
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating lesson:", err);
    return { success: false, error: true };
  }
};

export const updateLesson = async (
  currentState: CurrentState,
  data: LessonInputs
) => {
  try {
    await prisma.lesson.update({
      where: { id: data.id },
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating lesson:", err);
    return { success: false, error: true };
  }
};
export const deleteLesson = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;
  try {
    await prisma.lesson.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting class:", err);
    return { success: false, error: true };
  }
};