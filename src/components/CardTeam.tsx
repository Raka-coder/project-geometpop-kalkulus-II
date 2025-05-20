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
  'UI Designer',
  'UX Designer',
  'Web Analyst',
  'Developer',
  'Documentation',
];

const instagramLinks = [
  'https://instagram.com/ginanjar_d98',
  'https://instagram.com/lthfiiaa',
  'https://instagram.com/rosyadaadly',
  'https://instagram.com/rakresptra',
  'https://instagram.com/thislifeisnt_omoshiroi',
];

const githubLinks = [
  'https://github.com/Maruzensky98',
  'https://github.com/Luthfi778',
  'https://github.com/kaizen191010',
  'https://github.com/in/Raka-coder',
  'https://github.com/Discbrake023',
];

const photos = [
  '/images/team/Ginanjar.webp',
  '/images/team/Luthfi.webp',
  '/images/team/Rossyada.webp',
  '/images/team/Raka.webp',
  '/images/team/Tazril.webp',
];

export default function CardTeam() {
  // Sample team members data
  const teamMembers: TeamMember[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `${i + 1}`,
    name: name[i],
    jobTitle: jobTitles[i],
    photoUrl: photos[i],
    socialLinks: {
      instagram: instagramLinks[i],
      github: githubLinks[i],
    },
  }));

  return (
    <main className="py-12 bg-custom-gray/20">
      <TeamSection members={teamMembers} />
    </main>
  );
}

