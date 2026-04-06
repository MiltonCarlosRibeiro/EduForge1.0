import type { ReactNode } from 'react';
import Home from './pages/Home';
import PDFViewerPage from './pages/PDFViewerPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import SyllabusPage from './pages/SyllabusPage';
import QuestionsPage from './pages/QuestionsPage';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import ResumePage from './pages/ResumePage';
import { GradesPage } from './pages/GradesPage';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Início',
    path: '/',
    element: <Home />,
    public: true,
  },
  {
    name: 'Visualizador de PDF',
    path: '/pdf',
    element: <PDFViewerPage />,
    public: true,
  },
  {
    name: 'Acervo de Vídeos',
    path: '/videos',
    element: <VideoGalleryPage />,
    public: true,
  },
  {
    name: 'Ementa',
    path: '/ementa',
    element: <SyllabusPage />,
    public: true,
  },
  {
    name: 'Questões',
    path: '/questoes',
    element: <QuestionsPage />,
    public: true,
  },
  {
    name: 'Gestão de Alunos',
    path: '/alunos',
    element: <StudentsPage />,
    public: true,
  },
  {
    name: 'Gestão de Notas',
    path: '/notas',
    element: <GradesPage />,
    public: true,
  },
  {
    name: 'Lista de Chamadas',
    path: '/chamadas',
    element: <AttendancePage />,
    public: true,
  },
  {
    name: 'Currículo',
    path: '/curriculo',
    element: <ResumePage />,
    public: true,
  },
];

export default routes;
