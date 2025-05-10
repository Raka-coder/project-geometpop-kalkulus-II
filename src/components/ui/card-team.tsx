import { Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import type { TeamMember } from '@/types/team';

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="container py-16 mx-auto font-nunitosans">
      <h2 className="mb-8 text-3xl font-bold text-center text-dark-blue">
        Tim Kami
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        <AnimatePresence>
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0,  y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="h-full overflow-hidden duration-300 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col items-center p-6">
          <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
            <AvatarImage
              src={member.photoUrl || '/placeholder-svgrepo-com.svg'}
              alt={member.name}
              title={member.jobTitle}
            />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <h3 className="text-base text-dark-blue font-semibold">
            {member.name}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {member.jobTitle}
          </p>
          <div className="flex space-x-1">
            {member.socialLinks.instagram && (
              <a
                href={member.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors rounded-full hover:bg-muted"
                aria-label={`${member.name}'s GitHub`}
              >
                <Instagram strokeWidth={2.25} className="w-5 h-5 text-pink-700" />
              </a>
            )}

            {member.socialLinks.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors rounded-full hover:bg-muted"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

