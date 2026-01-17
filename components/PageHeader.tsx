'use client';

import { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ 
  title, 
  subtitle, 
  description, 
  breadcrumbs 
}: PageHeaderProps) {
  return (
    <div className="mb-12">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm  ">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-600">/</span>}
                {crumb.href ? (
                  <a 
                    href={crumb.href}
                    className="hover:text-brand-green transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className={index === breadcrumbs.length - 1 ? 'text-brand-green' : ''}>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      {subtitle && (
        <p className="text-sm md:text-base   uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      
      <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-6">
        {title}
      </h1>
      
      {description && (
        <p className="text-xl   max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}





