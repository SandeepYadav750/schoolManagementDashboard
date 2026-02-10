import z from "zod";
import { Day } from "../generated/prisma";
import SubjectForm from "@/components/Forms/SubjectForm";


export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject Name is Required." }).max(255, { message: "Subject Name must be atmost 255 char long." }),
  teachers: z.array(z.string())
});

export type SubjectInputs = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "class Name is Required." }).max(255, { message: "class Name must be atmost 255 char long." }),
  capacity: z.coerce.number().min(1, { message: "Capacity is Required." }),
  gradeId: z.coerce.number().min(1, { message: "Grade is Required." }),
  supervisorId: z.coerce.string().optional(),

});

export type classInputs = z.infer<typeof classSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "lesson Name is Required." }).max(255, { message: "lesson Name must be atmost 255 char long." }),
    day: z.nativeEnum(Day, { message: "Day is Required."}),
  classId: z.coerce.number().min(1, { message: "class is Required." }),
  subjectId: z.coerce.number().min(1, { message: "subject is Required." }),
  teacherId: z.coerce.string().min(1, { message: "teacher is Required." }),
  startTime: z.coerce.date( { message: "Start time is required" }),
  endTime: z.coerce.date( { message: "End time is required" }),

});

export type LessonInputs = z.infer<typeof lessonSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is Required." }).max(255, { message: "Title must be atmost 255 char long." }),
  lessonId: z.coerce.number().min(1, { message: "lesson is Required." }),
  startTime: z.coerce.date( { message: "Start time is required" }),
  endTime: z.coerce.date( { message: "End time is required" }),

});

export type ExamInputs = z.infer<typeof examSchema>;


export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "UserName must be atleast 3 char long." })
    .max(255, { message: "UserName must be atmost 255 char long." }),
    password: z
    .string()
    .min(8, { message: "password must be atleast 8 char long." }).optional().or(z.literal("")),
    name: z
    .string()
    .min(3, { message: "name must be atleast 3 char long." })
    .max(255, { message: "name must be atmost 255 char long." }),
    surname: z
    .string()
    .min(3, { message: "surname must be atleast 3 char long." })
    .max(255, { message: "surname must be atmost 255 char long." }),
    email: z.string().email({ message: "Invalid Email address." }).optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, { message: "Phone No. must be atleast 10 char long." })
    .max(12, { message: "Phone No. must be atmost 12 length." }).optional(),
  address: z
    .string()
    .min(3, { message: "Address must be atleast 3 char long." })
    .max(255, { message: "Address must be atmost 255 char long." }),
    img: z.string().optional(),
  bloodType: z.string().min(1, { message: "BloodType is required." }),
  birthday: z.coerce.date({ message: "Birthday is required." }),
  sex: z.enum(["MALE", "FEMALE"], { message: "sex is required" }),
  subjects: z.array(z.string()).optional(), // stored subject ids as string array
});

export type TeacherInputs = z.infer<typeof teacherSchema>;


export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "UserName must be atleast 3 char long." })
    .max(255, { message: "UserName must be atmost 255 char long." }),
    password: z
    .string()
    .min(8, { message: "password must be atleast 8 char long." }).optional().or(z.literal("")),
    name: z
    .string()
    .min(3, { message: "name must be atleast 3 char long." })
    .max(255, { message: "name must be atmost 255 char long." }),
    surname: z
    .string()
    .min(3, { message: "surname must be atleast 3 char long." })
    .max(255, { message: "surname must be atmost 255 char long." }),
    email: z.string().email({ message: "Invalid Email address." }).optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, { message: "Phone No. must be atleast 10 char long." })
    .max(12, { message: "Phone No. must be atmost 12 length." }).optional(),
  address: z
    .string()
    .min(3, { message: "Address must be atleast 3 char long." })
    .max(255, { message: "Address must be atmost 255 char long." }),
    img: z.string().optional(),
  bloodType: z.string().min(1, { message: "BloodType is required." }),
  birthday: z.coerce.date({ message: "Birthday is required." }),
  sex: z.enum(["MALE", "FEMALE"], { message: "sex is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is Required." }),
  classId: z.coerce.number().min(1, { message: "Class is Required." }),
  parentId: z.string().min(1, { message: "Parent Id is Required." }),
});

export type StudentInputs = z.infer<typeof studentSchema>;