export interface TeamMember {
  id: string;
  name: string;
  jobTitle: string;
  photoUrl: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
  };
}
