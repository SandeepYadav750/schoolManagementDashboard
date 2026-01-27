import z from "zod";
import { Day } from "../generated/prisma";


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
  name: z.string().min(1, { message: "exam Name is Required." }).max(255, { message: "exam Name must be atmost 255 char long." }),
    day: z.nativeEnum(Day, { message: "Day is Required."}),
  classId: z.coerce.number().min(1, { message: "class is Required." }),
  subjectId: z.coerce.number().min(1, { message: "subject is Required." }),
  teacherId: z.coerce.string().min(1, { message: "teacher is Required." }),
   startTime: z.coerce.date( { message: "Start time is required" }),
  endTime: z.coerce.date( { message: "End time is required" }),

});

export type ExamInputs = z.infer<typeof examSchema>;
