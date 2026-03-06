import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contact {
    linkedin: string;
    instagram: string;
    phone: string;
}
export interface Resume {
    blobKey: string;
    filename: string;
}
export interface Project {
    id: string;
    title: string;
    description: string;
    fileBlobKey?: string;
}
export interface backendInterface {
    addProject(title: string, description: string, fileBlobKey: string | null): Promise<void>;
    deleteProject(id: string): Promise<void>;
    getAbout(): Promise<string>;
    getContact(): Promise<Contact>;
    getProfilePhoto(): Promise<string | null>;
    getProjects(): Promise<Array<Project>>;
    getResume(): Promise<Resume | null>;
    getVisitors(): Promise<Array<string>>;
    recordVisitor(username: string): Promise<void>;
    setProfilePhoto(blobKey: string): Promise<void>;
    setResume(blobKey: string, filename: string): Promise<void>;
    updateAbout(text: string): Promise<void>;
    updateContact(instagram: string, linkedin: string, phone: string): Promise<void>;
}
