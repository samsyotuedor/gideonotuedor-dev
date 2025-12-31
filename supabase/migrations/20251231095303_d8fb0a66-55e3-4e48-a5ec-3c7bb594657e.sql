-- Drop existing storage policies that are too permissive
DROP POLICY IF EXISTS "Authenticated users can upload portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own portfolio assets" ON storage.objects;

-- Create more restrictive policies that only allow users to manage their OWN files
-- Files should be stored in paths like: {user_id}/resumes/... or {user_id}/projects/...

-- Users can only upload to their own folder (folder name must match their user_id)
CREATE POLICY "Users can upload to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portfolio-assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can only update files in their own folder
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portfolio-assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can only delete files in their own folder
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-assets' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);