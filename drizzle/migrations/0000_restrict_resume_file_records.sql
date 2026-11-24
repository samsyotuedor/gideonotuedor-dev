DROP POLICY IF EXISTS "Anyone can view resume files" ON public.resume_files;
CREATE POLICY "Users can view their own resume" ON public.resume_files
  FOR SELECT USING (auth.uid() = user_id);
REVOKE ALL ON public.resume_files FROM anon;
REVOKE ALL ON public.resume_files FROM PUBLIC;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resume_files TO authenticated;
GRANT ALL ON public.resume_files TO service_role;