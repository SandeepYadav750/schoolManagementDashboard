"use server";

import { revalidatePath } from "next/cache";
import {
  AssignmentInputs,
  classInputs,
  ExamInputs,
  LessonInputs,
  StudentInputs,
  SubjectInputs,
  TeacherInputs,
} from "./formValidationSchema";
import { prisma } from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { normalizeOptional } from "./utils";
import { getUserRole } from "@/lib/utils";

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
    const { role, userId } = await getUserRole();

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { id: data.lessonId, teacherId: userId! as string },
      });
      if (!teacherLesson) {
        return { success: false, error: true };
      }

      await prisma.exam.create({
        data: {
          ...data,
          lessonId: data.lessonId,
        },
      });
    }

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
  const { role, userId } = await getUserRole();

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { id: data.lessonId, teacherId: userId! as string },
      });
      if (!teacherLesson) {
        return { success: false, error: true };
      }

      await prisma.exam.update({
        where: { id: data.id },
        data: {
          ...data,
          lessonId: data.lessonId,
        },
      });
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating exam:", err);
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
    const { role, userId } = await getUserRole();
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher"
          ? { lesson: { teacherId: userId! as string } }
          : {}),
      },
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting exam:", err);
    return { success: false, error: true };
  }
};

// -------------------------------------------------------------------------------

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentInputs
) => {
  try {
    const { role, userId } = await getUserRole();

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { id: data.lessonId, teacherId: userId! as string },
      });
      if (!teacherLesson) {
        return { success: false, error: true };
      }

      await prisma.assignment.create({
        data: {
          ...data,
          lessonId: teacherLesson.id,
        },
      });
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Error creating assignment:", err);
    return { success: false, error: true };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentInputs
) => {
  try {
  const { role, userId } = await getUserRole();

    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: { id: data.lessonId, teacherId: userId! as string },
      });
      if (!teacherLesson) {
        return { success: false, error: true };
      }

      await prisma.assignment.update({
        where: { id: data.id },
        data: {
          ...data,
          lessonId: data.lessonId,
        },
      });
    }

    return { success: true, error: false };
  } catch (err) {
    console.error("Error updating assignment:", err);
    return { success: false, error: true };
  }
};
export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;
  try {
    const { role, userId } = await getUserRole();
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher"
          ? { lesson: { teacherId: userId! as string } }
          : {}),
      },
    });
    // revalidatePath("/list/classs");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting assignment:", err);
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
    // 1️⃣ Normalize fields
    const email = normalizeOptional(data.email);
    const phone = normalizeOptional(data.phone);

    const uniqueFields: Array<{
      field: "email" | "phone";
      value: string | null;
    }> = [
      { field: "email", value: email },
      { field: "phone", value: phone },
    ];

    for (const { field, value } of uniqueFields) {
      if (!value) continue;

      const existing = await prisma.student.findFirst({
        where: {
          [field]: value,
          NOT: { id: data.id },
        },
      });

      if (existing) {
        return {
          success: false,
          error: `${field} already used by another Teacher`,
        };
      }
    }

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
        email,
        phone,
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
    // 1️⃣ Normalize fields
    const email = normalizeOptional(data.email);
    const phone = normalizeOptional(data.phone);

    const uniqueFields: Array<{
      field: "email" | "phone";
      value: string | null;
    }> = [
      { field: "email", value: email },
      { field: "phone", value: phone },
    ];

    for (const { field, value } of uniqueFields) {
      if (!value) continue;

      const existing = await prisma.student.findFirst({
        where: {
          [field]: value,
          NOT: { id: data.id },
        },
      });

      if (existing) {
        return {
          success: false,
          error: `${field} already used by another Teacher`,
        };
      }
    }

    // 1️⃣ Create Clerk user
    const client = await clerkClient(); // ✅ IMPORTANT

    if (!data.id) {
      return { success: false, error: true };
    }

    const password =
      typeof data.password === "string" && data.password.trim().length > 0
        ? data.password
        : undefined;

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
        email,
        phone,
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

// -------------------------------------------------------------------------------

export const createStudent = async (
  currentState: CurrentState,
  data: StudentInputs
) => {
  //   console.log("Creating class with data:", data.name);
  try {
    const classItems = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItems && classItems.capacity === classItems._count.students) {
      return { success: false, error: true };
    }

    // 1️⃣ Normalize fields
    const email = normalizeOptional(data.email);
    const phone = normalizeOptional(data.phone);

    const uniqueFields: Array<{
      field: "email" | "phone";
      value: string | null;
    }> = [
      { field: "email", value: email },
      { field: "phone", value: phone },
    ];

    for (const { field, value } of uniqueFields) {
      if (!value) continue;

      const existing = await prisma.student.findFirst({
        where: {
          [field]: value,
          NOT: { id: data.id },
        },
      });

      if (existing) {
        return {
          success: false,
          error: `${field} already used by another student`,
        };
      }
    }

    // 1️⃣ Create Clerk user
    const client = await clerkClient(); // ✅ IMPORTANT

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {
        role: "student",
      },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        name: data.name,
        surname: data.surname,
        username: data.username,
        img: data.img,
        email,
        phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err: any) {
    console.log("err creating student:", err);
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

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentInputs
) => {
  //   console.log("Creating class with data:", data.name);

  try {
    // 1️⃣ Create Clerk user
    const client = await clerkClient(); // ✅ IMPORTANT

    if (!data.id) {
      return { success: false, error: true };
    }

    // 1️⃣ Normalize fields
    const email = normalizeOptional(data.email);
    const phone = normalizeOptional(data.phone);

    const uniqueFields: Array<{
      field: "email" | "phone";
      value: string | null;
    }> = [
      { field: "email", value: email },
      { field: "phone", value: phone },
    ];

    for (const { field, value } of uniqueFields) {
      if (!value) continue;

      const existing = await prisma.student.findFirst({
        where: {
          [field]: value,
          NOT: { id: data.id },
        },
      });

      if (existing) {
        return {
          success: false,
          error: `${field} already used by another student`,
        };
      }
    }

    const password =
      typeof data.password === "string" && data.password.trim().length > 0
        ? data.password
        : undefined;

    await client.users.updateUser(data.id, {
      username: data.username,
      ...(password && { password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: { id: data.id },
      data: {
        // ...(data.password !== "" && { password: data.password }), // Only update password if it's provided
        name: data.name,
        surname: data.surname,
        username: data.username,
        img: data.img,
        email,
        phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err: any) {
    console.log("err creating student:", err);
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

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  //   console.log("Creating class with data:", data.name);
  const id = data.get("id") as string;

  try {
    const client = await clerkClient();

    // 1️⃣ Delete user from Clerk
    await client.users.deleteUser(id);

    // 2️⃣ Delete student from Prisma
    await prisma.student.delete({
      where: { id },
    });
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log("err deleting student:", err);
    return { success: false, error: true };
  }
};
