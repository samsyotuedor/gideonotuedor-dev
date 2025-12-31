import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  FolderOpen, 
  FileText, 
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Image,
  Link,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  technologies: string[];
  features: string[];
  image_url: string;
  demo_url: string;
  github_url: string;
  gradient: string;
  display_order: number;
}

interface ResumeFile {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [resume, setResume] = useState<ResumeFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    type: 'Personal Project',
    technologies: '',
    features: '',
    demo_url: '',
    github_url: '',
    gradient: 'from-primary/20 to-accent/20'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Fetch resume
      const { data: resumeData, error: resumeError } = await supabase
        .from('resume_files')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(1)
        .single();

      if (!resumeError && resumeData) {
        setResume(resumeData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate('/');
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Error",
        description: "Project title is required.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user!.id,
          title: newProject.title,
          description: newProject.description,
          type: newProject.type,
          technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
          features: newProject.features.split(',').map(f => f.trim()).filter(Boolean),
          demo_url: newProject.demo_url,
          github_url: newProject.github_url,
          gradient: newProject.gradient,
          display_order: projects.length
        })
        .select()
        .single();

      if (error) throw error;

      setProjects([...projects, data]);
      setNewProject({
        title: '',
        description: '',
        type: 'Personal Project',
        technologies: '',
        features: '',
        demo_url: '',
        github_url: '',
        gradient: 'from-primary/20 to-accent/20'
      });

      toast({
        title: "Project added!",
        description: "Your new project has been saved."
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProject = async (project: Project) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          type: project.type,
          technologies: project.technologies,
          features: project.features,
          image_url: project.image_url,
          demo_url: project.demo_url,
          github_url: project.github_url,
          gradient: project.gradient
        })
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Project updated!",
        description: "Your changes have been saved."
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Project deleted",
        description: "The project has been removed."
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleImageUpload = async (projectId: string, file: File) => {
    setUploadingImage(projectId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `project-${projectId}-${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      // Update project with image URL
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return { ...p, image_url: publicUrl };
        }
        return p;
      });
      setProjects(updatedProjects);

      // Save to database
      await supabase
        .from('projects')
        .update({ image_url: publicUrl })
        .eq('id', projectId);

      toast({
        title: "Image uploaded!",
        description: "Project image has been updated."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleResumeUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }

    setUploadingResume(true);
    try {
      const fileName = `resume-${Date.now()}.pdf`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      // Save resume record
      const { data, error } = await supabase
        .from('resume_files')
        .insert({
          user_id: user!.id,
          file_name: file.name,
          file_url: publicUrl
        })
        .select()
        .single();

      if (error) throw error;

      setResume(data);
      toast({
        title: "Resume uploaded!",
        description: "Your resume has been updated."
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Error",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              View Portfolio
            </Button>
            <h1 className="text-xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="resume" className="gap-2">
              <FileText className="w-4 h-4" />
              Resume
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {/* Add New Project Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Project
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="My Awesome Project"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Input
                    id="type"
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    placeholder="Personal Project"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    placeholder="React, TypeScript, Tailwind"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={newProject.features}
                    onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
                    placeholder="Auth, Dashboard, API"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={newProject.demo_url}
                    onChange={(e) => setNewProject({ ...newProject, demo_url: e.target.value })}
                    placeholder="https://myproject.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={newProject.github_url}
                    onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <Button
                onClick={handleAddProject}
                disabled={isSaving}
                className="mt-4 bg-gradient-to-r from-primary to-accent"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isSaving ? 'Adding...' : 'Add Project'}
              </Button>
            </motion.div>

            {/* Existing Projects */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Projects ({projects.length})</h2>
              
              {projects.length === 0 ? (
                <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">
                  <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No projects yet. Add your first project above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 rounded-xl"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image Upload */}
                        <div className="w-full lg:w-48 flex-shrink-0">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <Image className="w-8 h-8" />
                              </div>
                            )}
                            <label className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(project.id, file);
                                }}
                                disabled={uploadingImage === project.id}
                              />
                              {uploadingImage === project.id ? (
                                <span className="text-sm">Uploading...</span>
                              ) : (
                                <span className="text-sm flex items-center gap-2">
                                  <Upload className="w-4 h-4" />
                                  Upload Image
                                </span>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="flex-1 grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const updated = projects.map(p =>
                                  p.id === project.id ? { ...p, title: e.target.value } : p
                                );
                                setProjects(updated);
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Input
                              value={project.type}
                              onChange={(e) => {
                                const updated = projects.map(p =>
                                  p.id === project.id ? { ...p, type: e.target.value } : p
                                );
                                setProjects(updated);
                              }}
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description || ''}
                              onChange={(e) => {
                                const updated = projects.map(p =>
                                  p.id === project.id ? { ...p, description: e.target.value } : p
                                );
                                setProjects(updated);
                              }}
                              rows={2}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Demo URL</Label>
                            <Input
                              value={project.demo_url || ''}
                              onChange={(e) => {
                                const updated = projects.map(p =>
                                  p.id === project.id ? { ...p, demo_url: e.target.value } : p
                                );
                                setProjects(updated);
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>GitHub URL</Label>
                            <Input
                              value={project.github_url || ''}
                              onChange={(e) => {
                                const updated = projects.map(p =>
                                  p.id === project.id ? { ...p, github_url: e.target.value } : p
                                );
                                setProjects(updated);
                              }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex lg:flex-col gap-2 justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateProject(project)}
                            disabled={isSaving}
                            className="gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProject(project.id)}
                            className="gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume / CV
              </h2>

              {resume ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <FileText className="w-10 h-10 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{resume.file_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={resume.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2"
                    >
                      <Link className="w-4 h-4" />
                      View
                    </a>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Upload a new file to replace the current resume:
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">
                  No resume uploaded yet. Upload your resume PDF below.
                </p>
              )}

              <label className="mt-4 block">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleResumeUpload(file);
                    }}
                    disabled={uploadingResume}
                  />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  {uploadingResume ? (
                    <p className="text-muted-foreground">Uploading...</p>
                  ) : (
                    <>
                      <p className="font-medium">Click to upload PDF</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </>
                  )}
                </div>
              </label>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
