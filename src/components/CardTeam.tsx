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

const linkedinLinks = [
  'https://linkedin.com/in/ginanjarabdulhakim',
  'https://linkedin.com/in/luthfiapriliansyah',
  'https://linkedin.com/in/rossyadaadly',
  'https://linkedin.com/in/rakaresptra',
  'https://linkedin.com/in/tazrildwiaprla',
];

const photos = [
  // GinanjarImg,
  '/images/team/luthfi-removebg-preview.png',
  // RossyadaImg,
  // '/images/team/raka.png'
  // TazrilImg,
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
      linkedin: linkedinLinks[i],
    },
  }));

  return (
    <main className="py-12 bg-custom-gray/20">
      <TeamSection members={teamMembers} />
    </main>
  );
}

