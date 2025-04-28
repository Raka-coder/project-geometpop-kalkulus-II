import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DynamicBreadcrumbProps {
  pages: {
    name: string;
    href?: string;
    icon?: React.ComponentType; // Properti untuk ikon
  }[];
}

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({ pages }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages.map(({ name, href, icon: Icon }, index) => (
          <React.Fragment key={name}>
            {/* Tambahkan separator jika bukan elemen pertama */}
            {index > 0 && <BreadcrumbSeparator />}
            {/* Render link atau teks page terakhir */}
            {href ? (
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={href}
                  className="flex items-center gap-1 text-sm font-medium text-dark-blue/50 hover:text-dark-blue font-nunitosans"
                >
                  {Icon && (
                    <span>
                      <Icon />
                    </span>
                  )}{' '}
                  {/* Render ikon */}
                  {name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1 text-sm font-medium text-dark-blue font-nunitosans">
                  {Icon && (
                    <span>
                      <Icon />
                    </span>
                  )}{' '}
                  {/* Render ikon */}
                  {name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
