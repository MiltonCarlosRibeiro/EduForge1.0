import { studentStorage } from '@/lib/localStorage';
import { createStudent, getAllStudents } from '@/db/api';
import type { Student } from '@/types/types';
import type { StudentDB } from '@/types/types';

/**
 * Sincroniza alunos do localStorage com Supabase
 * Retorna lista unificada de alunos
 */
export async function syncStudentsToSupabase(): Promise<StudentDB[]> {
  try {
    // Buscar alunos do localStorage
    const localStudents: Student[] = studentStorage.load();
    
    // Buscar alunos do Supabase
    const supabaseStudents = await getAllStudents();
    
    // Se não há alunos no localStorage, retornar apenas do Supabase
    if (localStudents.length === 0) {
      return supabaseStudents;
    }
    
    // Criar um mapa de alunos do Supabase por nome (para evitar duplicatas)
    const supabaseStudentsMap = new Map(
      supabaseStudents.map(s => [s.name.toLowerCase().trim(), s])
    );
    
    // Sincronizar alunos do localStorage que não existem no Supabase
    const studentsToSync: StudentDB[] = [];
    
    for (const localStudent of localStudents) {
      const normalizedName = localStudent.name.toLowerCase().trim();
      
      // Se o aluno não existe no Supabase, adicionar
      if (!supabaseStudentsMap.has(normalizedName)) {
        const newStudent = await createStudent({
          name: localStudent.name,
          email: undefined,
          registration_number: undefined,
          phone: undefined,
        });
        
        if (newStudent) {
          studentsToSync.push(newStudent);
          supabaseStudentsMap.set(normalizedName, newStudent);
        }
      }
    }
    
    // Retornar lista completa de alunos do Supabase
    return Array.from(supabaseStudentsMap.values());
  } catch (error) {
    console.error('Erro ao sincronizar alunos:', error);
    
    // Em caso de erro, retornar alunos do localStorage convertidos
    const localStudents: Student[] = studentStorage.load();
    return localStudents.map((s, index) => ({
      id: `local-${index}`,
      name: s.name,
      email: undefined,
      registration_number: undefined,
      phone: undefined,
    }));
  }
}

/**
 * Busca alunos de forma híbrida (localStorage + Supabase)
 */
export async function getStudentsHybrid(): Promise<StudentDB[]> {
  try {
    // Tentar buscar do Supabase primeiro
    const supabaseStudents = await getAllStudents();
    
    // Se há alunos no Supabase, retornar
    if (supabaseStudents.length > 0) {
      return supabaseStudents;
    }
    
    // Se não há alunos no Supabase, sincronizar do localStorage
    return await syncStudentsToSupabase();
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    
    // Fallback: retornar do localStorage
    const localStudents: Student[] = studentStorage.load();
    return localStudents.map((s, index) => ({
      id: `local-${index}`,
      name: s.name,
      email: undefined,
      registration_number: undefined,
      phone: undefined,
    }));
  }
}

/**
 * Verifica se um aluno existe no Supabase pelo nome
 */
export async function findStudentByName(name: string): Promise<StudentDB | null> {
  const students = await getAllStudents();
  const normalizedName = name.toLowerCase().trim();
  return students.find(s => s.name.toLowerCase().trim() === normalizedName) || null;
}

/**
 * Cria ou retorna aluno existente
 */
export async function getOrCreateStudent(name: string): Promise<StudentDB | null> {
  // Verificar se já existe
  let student = await findStudentByName(name);
  
  if (student) {
    return student;
  }
  
  // Criar novo aluno
  student = await createStudent({
    name,
    email: undefined,
    registration_number: undefined,
    phone: undefined,
  });
  
  return student;
}
