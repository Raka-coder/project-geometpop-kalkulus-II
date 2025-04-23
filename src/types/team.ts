export interface TeamMember {
  id: string
  name: string
  jobTitle: string
  photoUrl: string
  socialLinks: {
    github?: string
    linkedin?: string
  }
}
