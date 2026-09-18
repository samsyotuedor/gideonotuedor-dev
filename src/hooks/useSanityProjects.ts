import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";

export type PortfolioProject = {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  type: string;
  gradient: string;
  image: string;
  demo_url?: string;
  github_url?: string;
};

type SanityProject = {
  _id: string;
  title: string;
  description?: string;
  projectType?: string;
  technologies?: string[];
  features?: string[];
  image?: Parameters<typeof urlFor>[0];
  demoUrl?: string;
  githubUrl?: string;
  gradient?: string;
};

const QUERY = `*[_type == "project"] | order(coalesce(displayOrder, 99) asc) {
  _id, title, description, projectType, technologies, features, image, demoUrl, githubUrl, gradient
}`;

/**
 * Loads projects from Sanity. Returns an empty list when Sanity has no
 * content yet, so the site can keep using its built-in projects.
 */
export function useSanityProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["sanity-projects"],
    queryFn: async (): Promise<PortfolioProject[]> => {
      const docs = await sanityClient.fetch<SanityProject[]>(QUERY);
      return docs
        .filter((doc) => !!doc.image)
        .map((doc) => ({
          title: doc.title,
          description: doc.description ?? "",
          tech: doc.technologies ?? [],
          features: doc.features ?? [],
          type: doc.projectType ?? "Project",
          gradient: doc.gradient ?? "from-primary/20 to-accent/20",
          image: urlFor(doc.image!).width(900).height(600).fit("crop").auto("format").url(),
          demo_url: doc.demoUrl,
          github_url: doc.githubUrl,
        }));
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { sanityProjects: data ?? [], isLoading };
}
