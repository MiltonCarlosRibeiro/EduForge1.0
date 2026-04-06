// Tipos para a aplicação EduForge

export interface Student {
  id: string;
  name: string;
  column: string; // ex: "1 direita"
  desk: string; // ex: "carteira 1"
  assignments: Assignment[];
  exams: Exam[];
  presentedGroupWork: boolean;
  absent: boolean;
  notes: string;
}

export interface Assignment {
  id: string;
  name: string;
  completed: boolean;
}

export interface Exam {
  id: string;
  name: string;
  grade: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // formato dd/mm/aa
  studentAttendance: StudentAttendance[];
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  present: boolean;
}

export interface Question {
  id: string;
  question: string;
  alternatives: Alternative[];
  correctAnswerIndex: number;
  showingAnswer: boolean;
}

export interface Alternative {
  id: string;
  text: string;
}

export interface SyllabusTopic {
  id: string;
  text: string;
  completed: boolean;
}

export interface Syllabus {
  topics: SyllabusTopic[];
}

export interface Resume {
  personalData: PersonalData;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: Language[];
  customSections: CustomSection[];
}

export interface PersonalData {
  name: string;
  age: number;
  maritalStatus: string;
  title: string;
  email: string;
  linkedin: string;
  location: string;
  photo: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

// Tipos para sistema de notas
export interface GradeConfig {
  id: string;
  passing_grade: number;
  assignments_weight: number;
  exams_weight: number;
  group_activities_weight: number;
  quizzes_weight: number;
  created_at?: string;
  updated_at?: string;
}

export interface StudentDB {
  id: string;
  name: string;
  email?: string;
  registration_number?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AssignmentDB {
  id: string;
  student_id: string;
  title: string;
  grade: number;
  weight: number;
  delivered: boolean;
  delivery_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExamDB {
  id: string;
  student_id: string;
  title: string;
  grade: number;
  weight: number;
  exam_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GroupActivity {
  id: string;
  student_id: string;
  title: string;
  grade: number;
  created_at?: string;
  updated_at?: string;
}

export interface QuizGrade {
  id: string;
  student_id: string;
  quiz_title: string;
  correct_answers: number;
  total_questions: number;
  grade?: number;
  created_at?: string;
}

export interface StudentFinalGrade {
  id: string;
  student_id: string;
  assignments_avg: number;
  exams_avg: number;
  group_activities_avg: number;
  quizzes_avg: number;
  final_grade: number;
  status: 'Aprovado' | 'Reprovado' | 'Pendente';
  created_at?: string;
  updated_at?: string;
}
