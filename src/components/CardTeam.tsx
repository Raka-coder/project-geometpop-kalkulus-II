import TeamSection from "./ui/card-team"
import type { TeamMember } from "@/types/team"
import Robot from "../assets/robot.webp";
export default function CardTeam() {
  // Sample team members data
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Ginanjar Abdul Hakim",
      jobTitle: "CEO & Founder",
      photoUrl: Robot,
      socialLinks: {
        github: "https://github.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson",
      },
    },
    {
      id: "2",
      name: "Luthfi Apriliansyah",
      jobTitle: "CTO",
      photoUrl: "/placeholder.svg?height=200&width=200",
      socialLinks: {
        github: "https://github.com/michaelchen",
        linkedin: "https://linkedin.com/in/michaelchen",
      },
    },
    {
      id: "3",
      name: "Rossyada Adly",
      jobTitle: "Lead Designer",
      photoUrl: "/placeholder.svg?height=200&width=200",
      socialLinks: {
        github: "https://github.com/aishapatel",
        linkedin: "https://linkedin.com/in/aishapatel",
      },
    },
    {
      id: "4",
      name: "Raka Restu Saputra",
      jobTitle: "Developer",
      photoUrl: "/placeholder.svg?height=200&width=200",
      socialLinks: {
        github: "https://github.com/Raka-coder",
        linkedin: "https://linkedin.com/in/davidrodriguez",
      },
    },
    {
      id: "5",
      name: "Tazril Dwi Aprila",
      jobTitle: "Marketing Director",
      photoUrl: "/placeholder.svg?height=200&width=200",
      socialLinks: {
        github: "https://github.com/emmawilson",
        linkedin: "https://linkedin.com/in/emmawilson",
      },
    },
  ]

  return (
    <main className="min-h-screen py-6 bg-custom-gray">
      <TeamSection members={teamMembers} />
    </main>
  )
}

