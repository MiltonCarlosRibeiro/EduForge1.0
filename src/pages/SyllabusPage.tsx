import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { syllabusStorage } from '@/lib/localStorage';
import { Syllabus, SyllabusTopic } from '@/types/types';
import { toast } from 'sonner';

const SyllabusPage: React.FC = () => {
  const [syllabus, setSyllabus] = React.useState<Syllabus>({ topics: [] });
  const [newTopicText, setNewTopicText] = React.useState('');

  React.useEffect(() => {
    const loadedSyllabus = syllabusStorage.load();
    setSyllabus(loadedSyllabus);
  }, []);

  const saveSyllabus = (updatedSyllabus: Syllabus) => {
    setSyllabus(updatedSyllabus);
    syllabusStorage.save(updatedSyllabus);
    toast.success('Ementa salva com sucesso');
  };

  const handleAddTopic = () => {
    if (!newTopicText.trim()) {
      toast.error('Digite um tópico antes de adicionar');
      return;
    }

    const newTopic: SyllabusTopic = {
      id: Date.now().toString(),
      text: newTopicText.trim(),
      completed: false,
    };

    const updatedSyllabus = {
      topics: [...syllabus.topics, newTopic],
    };

    saveSyllabus(updatedSyllabus);
    setNewTopicText('');
  };

  const handleToggleCompleted = (topicId: string) => {
    const updatedSyllabus = {
      topics: syllabus.topics.map((topic) =>
        topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
      ),
    };
    saveSyllabus(updatedSyllabus);
  };

  const handleRemoveTopic = (topicId: string) => {
    const updatedSyllabus = {
      topics: syllabus.topics.filter((topic) => topic.id !== topicId),
    };
    saveSyllabus(updatedSyllabus);
    toast.success('Tópico removido');
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Ementa</h1>
            <p className="text-muted-foreground">
              Gerencie os tópicos da ementa da instituição. Clique em um tópico para
              marcá-lo como concluído.
            </p>
          </div>

          {/* Adicionar novo tópico */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="newTopic">Adicionar Novo Tópico</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="newTopic"
                      placeholder="Digite o tópico da ementa..."
                      value={newTopicText}
                      onChange={(e) => setNewTopicText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTopic();
                        }
                      }}
                    />
                    <Button onClick={handleAddTopic}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de tópicos */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg mb-6">Tópicos da Ementa</h3>
              {syllabus.topics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Nenhum tópico adicionado ainda.</p>
                  <p className="text-sm mt-2">
                    Adicione tópicos usando o formulário acima.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {syllabus.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center gap-3 p-4 rounded-md bg-accent hover:bg-accent/80 transition-colors group"
                    >
                      <button
                        onClick={() => handleToggleCompleted(topic.id)}
                        className="flex-1 text-left"
                      >
                        <span
                          className={`text-base ${
                            topic.completed
                              ? 'line-through text-muted-foreground'
                              : 'text-foreground'
                          }`}
                        >
                          {topic.text}
                        </span>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTopic(topic.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SyllabusPage;
