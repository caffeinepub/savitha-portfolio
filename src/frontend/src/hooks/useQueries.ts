import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Contact, Project, Resume } from "../backend.d";
import { useActor } from "./useActor";

export type { Contact, Project, Resume };

// ── About ──────────────────────────────────────────────────────────────────

export function useGetAbout() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["about"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getAbout();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAbout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateAbout(text);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about"] }),
  });
}

// ── Contact ────────────────────────────────────────────────────────────────

export function useGetContact() {
  const { actor, isFetching } = useActor();
  return useQuery<Contact>({
    queryKey: ["contact"],
    queryFn: async () => {
      if (!actor) return { linkedin: "", instagram: "", phone: "" };
      return actor.getContact();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      instagram: string;
      linkedin: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateContact(
        params.instagram,
        params.linkedin,
        params.phone,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact"] }),
  });
}

// ── Profile Photo ──────────────────────────────────────────────────────────

export function useGetProfilePhoto() {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["profilePhoto"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfilePhoto();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetProfilePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blobKey: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setProfilePhoto(blobKey);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["profilePhoto"] }),
  });
}

// ── Resume ─────────────────────────────────────────────────────────────────

export function useGetResume() {
  const { actor, isFetching } = useActor();
  return useQuery<Resume | null>({
    queryKey: ["resume"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResume();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetResume() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { blobKey: string; filename: string }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setResume(params.blobKey, params.filename);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });
}

// ── Projects ───────────────────────────────────────────────────────────────

export function useGetProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      fileBlobKey: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.addProject(
        params.title,
        params.description,
        params.fileBlobKey,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.deleteProject(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

// ── Visitors ───────────────────────────────────────────────────────────────

export function useGetVisitors() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["visitors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisitors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordVisitor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.recordVisitor(username);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["visitors"] }),
  });
}
