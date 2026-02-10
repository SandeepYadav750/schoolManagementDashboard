import { prisma } from "@/lib/prisma";
import FormModal from "./FormModal";
import { Console } from "console";
import { getUserRole } from "@/lib/utils";

export type FormsContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "update" | "create" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormsContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;

      case "class":
        const classGrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true,  name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrade };
            break;
        
        case "lesson":
        const lessonClass = await prisma.class.findMany({
          select: { id: true, name: true },
        });
        const lessonTeachers = await prisma.teacher.findMany({
          select: { id: true,  name: true, surname: true },
        });
            const lessonSubject = await prisma.subject.findMany({
          select: { id: true,  name: true },
        });
        relatedData = { teachers: lessonTeachers, classes: lessonClass, subjects: lessonSubject };
        // console.log("relatedData", relatedData);
        break;

      case "exam":

        const examLesson = await prisma.lesson.findMany({
          select: { id: true, name: true},
        });
        relatedData = { lessons: examLesson };
        break;
      
      case "teacher":
        const teacherSubject = await prisma.subject.findMany({
          select: { id: true, name: true},
        });
        relatedData = { subjects: teacherSubject };
        break;
      
      case "student":
        const studentgrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClass = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        const studentParent = await prisma.parent.findMany({
           select: { id: true, name: true, surname: true },
        });

        relatedData = { grades: studentgrade, classes: studentClass, parents: studentParent };
        break;

      default:
        break;
    }
  }

  return (
    <>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </>
  );
};

export default FormContainer;
