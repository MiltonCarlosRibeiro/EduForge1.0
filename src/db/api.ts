import { supabase } from './supabase';
import type {
  GradeConfig,
  StudentDB,
  AssignmentDB,
  ExamDB,
  GroupActivity,
  QuizGrade,
  StudentFinalGrade,
} from '@/types/types';

// ==================== Grade Config ====================
export async function getGradeConfig(): Promise<GradeConfig | null> {
  const { data, error } = await supabase
    .from('grade_config')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching grade config:', error);
    return null;
  }
  return data;
}

export async function updateGradeConfig(config: Partial<GradeConfig>): Promise<boolean> {
  const current = await getGradeConfig();
  if (!current) return false;

  const { error } = await supabase
    .from('grade_config')
    .update({ ...config, updated_at: new Date().toISOString() })
    .eq('id', current.id);

  if (error) {
    console.error('Error updating grade config:', error);
    return false;
  }
  return true;
}

// ==================== Students ====================
export async function getAllStudents(): Promise<StudentDB[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getStudentById(id: string): Promise<StudentDB | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }
  return data;
}

export async function createStudent(student: Omit<StudentDB, 'id' | 'created_at' | 'updated_at'>): Promise<StudentDB | null> {
  const { data, error } = await supabase
    .from('students')
    .insert(student)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating student:', error);
    return null;
  }
  return data;
}

export async function updateStudent(id: string, student: Partial<StudentDB>): Promise<boolean> {
  const { error } = await supabase
    .from('students')
    .update({ ...student, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating student:', error);
    return false;
  }
  return true;
}

export async function deleteStudent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting student:', error);
    return false;
  }
  return true;
}

// ==================== Assignments ====================
export async function getAssignmentsByStudent(studentId: string): Promise<AssignmentDB[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function createAssignment(assignment: Omit<AssignmentDB, 'id' | 'created_at' | 'updated_at'>): Promise<AssignmentDB | null> {
  const { data, error } = await supabase
    .from('assignments')
    .insert(assignment)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating assignment:', error);
    return null;
  }
  return data;
}

export async function updateAssignment(id: string, assignment: Partial<AssignmentDB>): Promise<boolean> {
  const { error } = await supabase
    .from('assignments')
    .update({ ...assignment, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating assignment:', error);
    return false;
  }
  return true;
}

export async function deleteAssignment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting assignment:', error);
    return false;
  }
  return true;
}

// ==================== Exams ====================
export async function getExamsByStudent(studentId: string): Promise<ExamDB[]> {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function createExam(exam: Omit<ExamDB, 'id' | 'created_at' | 'updated_at'>): Promise<ExamDB | null> {
  const { data, error } = await supabase
    .from('exams')
    .insert(exam)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating exam:', error);
    return null;
  }
  return data;
}

export async function updateExam(id: string, exam: Partial<ExamDB>): Promise<boolean> {
  const { error } = await supabase
    .from('exams')
    .update({ ...exam, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating exam:', error);
    return false;
  }
  return true;
}

export async function deleteExam(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('exams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting exam:', error);
    return false;
  }
  return true;
}

// ==================== Group Activities ====================
export async function getGroupActivitiesByStudent(studentId: string): Promise<GroupActivity[]> {
  const { data, error } = await supabase
    .from('group_activities')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching group activities:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function createGroupActivity(activity: Omit<GroupActivity, 'id' | 'created_at' | 'updated_at'>): Promise<GroupActivity | null> {
  const { data, error } = await supabase
    .from('group_activities')
    .insert(activity)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating group activity:', error);
    return null;
  }
  return data;
}

export async function updateGroupActivity(id: string, activity: Partial<GroupActivity>): Promise<boolean> {
  const { error } = await supabase
    .from('group_activities')
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating group activity:', error);
    return false;
  }
  return true;
}

export async function deleteGroupActivity(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('group_activities')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting group activity:', error);
    return false;
  }
  return true;
}

// ==================== Quiz Grades ====================
export async function getQuizGradesByStudent(studentId: string): Promise<QuizGrade[]> {
  const { data, error } = await supabase
    .from('quiz_grades')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quiz grades:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function createQuizGrade(quiz: Omit<QuizGrade, 'id' | 'grade' | 'created_at'>): Promise<QuizGrade | null> {
  const { data, error } = await supabase
    .from('quiz_grades')
    .insert(quiz)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating quiz grade:', error);
    return null;
  }
  return data;
}

export async function updateQuizGrade(id: string, quiz: Partial<QuizGrade>): Promise<boolean> {
  const { error } = await supabase
    .from('quiz_grades')
    .update(quiz)
    .eq('id', id);

  if (error) {
    console.error('Error updating quiz grade:', error);
    return false;
  }
  return true;
}

export async function deleteQuizGrade(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('quiz_grades')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting quiz grade:', error);
    return false;
  }
  return true;
}

// ==================== Student Final Grades ====================
export async function getStudentFinalGrade(studentId: string): Promise<StudentFinalGrade | null> {
  const { data, error } = await supabase
    .from('student_final_grades')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching final grade:', error);
    return null;
  }
  return data;
}

export async function getAllStudentFinalGrades(): Promise<StudentFinalGrade[]> {
  const { data, error } = await supabase
    .from('student_final_grades')
    .select('*')
    .order('final_grade', { ascending: false });

  if (error) {
    console.error('Error fetching all final grades:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function upsertStudentFinalGrade(grade: Omit<StudentFinalGrade, 'id' | 'created_at' | 'updated_at'>): Promise<StudentFinalGrade | null> {
  const { data, error } = await supabase
    .from('student_final_grades')
    .upsert(
      { ...grade, updated_at: new Date().toISOString() },
      { onConflict: 'student_id' }
    )
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error upserting final grade:', error);
    return null;
  }
  return data;
}

// ==================== Calculate Final Grade ====================
export async function calculateAndSaveFinalGrade(studentId: string): Promise<StudentFinalGrade | null> {
  const config = await getGradeConfig();
  if (!config) return null;

  const assignments = await getAssignmentsByStudent(studentId);
  const exams = await getExamsByStudent(studentId);
  const groupActivities = await getGroupActivitiesByStudent(studentId);
  const quizzes = await getQuizGradesByStudent(studentId);

  // Calcular médias
  const assignmentsAvg = assignments.length > 0
    ? assignments.reduce((sum, a) => sum + (a.grade * a.weight), 0) / assignments.reduce((sum, a) => sum + a.weight, 0)
    : 0;

  const examsAvg = exams.length > 0
    ? exams.reduce((sum, e) => sum + (e.grade * e.weight), 0) / exams.reduce((sum, e) => sum + e.weight, 0)
    : 0;

  const groupActivitiesAvg = groupActivities.length > 0
    ? groupActivities.reduce((sum, g) => sum + g.grade, 0) / groupActivities.length
    : 0;

  const quizzesAvg = quizzes.length > 0
    ? quizzes.reduce((sum, q) => sum + (q.grade || 0), 0) / quizzes.length
    : 0;

  // Calcular nota final
  const finalGrade = 
    (assignmentsAvg * config.assignments_weight) +
    (examsAvg * config.exams_weight) +
    (groupActivitiesAvg * config.group_activities_weight) +
    (quizzesAvg * config.quizzes_weight);

  // Determinar status
  const status: 'Aprovado' | 'Reprovado' | 'Pendente' = 
    finalGrade >= (config.passing_grade * 10) ? 'Aprovado' : 'Reprovado';

  // Salvar
  return await upsertStudentFinalGrade({
    student_id: studentId,
    assignments_avg: Number(assignmentsAvg.toFixed(2)),
    exams_avg: Number(examsAvg.toFixed(2)),
    group_activities_avg: Number(groupActivitiesAvg.toFixed(2)),
    quizzes_avg: Number(quizzesAvg.toFixed(2)),
    final_grade: Number(finalGrade.toFixed(2)),
    status,
  });
}
