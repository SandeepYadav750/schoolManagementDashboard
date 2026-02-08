"use server";

import { revalidatePath } from "next/cache";
import {
  classInputs,
  ExamInputs,
  LessonInputs,
  SubjectInputs,
  TeacherInputs,
} from "./formValidationSchema";
import { prisma } from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

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
    console.log("err deleting lesson:", err);
    return { success: false, error: true };
  }
};

// -------------------------------------------------------------------------------

export const createExam = async (
  currentState: CurrentState,
  data: ExamInputs
) => {
  try {
    // const { id, ...createData } = data;
    await prisma.exam.create({
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating exam:", err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamInputs
) => {
  try {
    await prisma.exam.update({
      where: { id: data.id },
      data,
    });

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating exam:", err);
    return { success: false, error: true };
  }
};
export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;
  try {
    await prisma.exam.delete({
      where: { id: parseInt(id) },
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting exam:", err);
    return { success: false, error: true };
  }
};

// -------------------------------------------------------------------------------

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  //   console.log("Creating class with data:", data.name);
  try {
    // 1️⃣ Create Clerk user
    const client = await clerkClient(); // ✅ IMPORTANT

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "teacher",
      },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        name: data.name,
        surname: data.surname,
        username: data.username,
        img: data.img,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        subjects: {
          connect: data.subjects?.map((subjectId) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err: any) {
    console.log("err creating teacher:", err);
    // ✅ Clerk specific error handling
    if (err?.clerkError && err?.errors?.length) {
      return {
        success: false,
        error: err.errors[0].longMessage || err.errors[0].message,
      };
    }
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherInputs
) => {
  //   console.log("Creating class with data:", data.name);

  try {
    // 1️⃣ Create Clerk user
    const client = await clerkClient(); // ✅ IMPORTANT

    if (!data.id) {
      return { success: false, error: true };
    }

    const password = typeof data.password === "string" && data.password.trim().length > 0 ? data.password : undefined;
    
    await client.users.updateUser(data.id, {
      username: data.username,
       ...(password && { password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        // ...(data.password !== "" && { password: data.password }), // Only update password if it's provided
        name: data.name,
        surname: data.surname,
        username: data.username,
        img: data.img,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        subjects: {
          set: data.subjects?.map((subjectId) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err: any) {
    console.log("err creating teacher:", err);
    // ✅ Clerk specific error handling
    if (err?.clerkError && err?.errors?.length) {
      return {
        success: false,
        error: err.errors[0].longMessage || err.errors[0].message,
      };
    }
    // fallback
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;

    try {
    const client = await clerkClient();

    // 1️⃣ Delete user from Clerk
    await client.users.deleteUser(id);

    // 2️⃣ Delete teacher from Prisma
    await prisma.teacher.delete({
      where: { id },
    });
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting teacher:", err);
    return { success: false, error: true };
  }
};
