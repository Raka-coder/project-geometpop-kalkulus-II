import TeamSection from './ui/card-team';
import type { TeamMember } from '@/types/team';

const name = [
  'Ginanjar Abdul Hakim',
  'Luthfi Apriliansyah',
  'Rossyada Adly',
  'Raka Restu Saputra',
  'Tazril Dwi Aprila',
];

const jobTitles = [
  'CEO & Founder',
  'CTO',
  'Lead Designer',
  'Developer',
  'Marketing Director',
];

export default function CardTeam() {
  // Sample team members data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: name[0],
      jobTitle: jobTitles[0],
      photoUrl: '/placeholder-svgrepo-com.svg',
      socialLinks: {
        github: 'https://github.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
    },
    {
      id: '2',
      name: name[1],
      jobTitle: jobTitles[1],
      photoUrl: '/placeholder-svgrepo-com.svg',
      socialLinks: {
        github: 'https://github.com/michaelchen',
        linkedin: 'https://linkedin.com/in/michaelchen',
      },
    },
    {
      id: '3',
      name: name[2],
      jobTitle: jobTitles[2],
      photoUrl: '/placeholder-svgrepo-com.svg',
      socialLinks: {
        github: 'https://github.com/aishapatel',
        linkedin: 'https://linkedin.com/in/aishapatel',
      },
    },
    {
      id: '4',
      name: name[3],
      jobTitle: jobTitles[3],
      photoUrl: '/placeholder-svgrepo-com.svg',
      socialLinks: {
        github: 'https://github.com/Raka-coder',
        linkedin: 'https://linkedin.com/in/davidrodriguez',
      },
    },
    {
      id: '5',
      name: name[4],
      jobTitle: jobTitles[4],
      photoUrl: '/placeholder-svgrepo-com.svg',
      socialLinks: {
        github: 'https://github.com/emmawilson',
        linkedin: 'https://linkedin.com/in/emmawilson',
      },
    },
  ];

  return (
    <main className="min-h-screen py-6 bg-custom-gray/10">
      <TeamSection members={teamMembers} />
    </main>
  );
}
