import React, { ReactNode } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Can from '@/components/Permissions/Can';

interface PageHeaderProps {
  title: string;
  headTitle?: string;
  actionButton?: {
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    permission?: string;
  };
  search?: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
    processing?: boolean;
  };
  showFilter?: boolean;
  onFilterClick?: () => void;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  actionButton,
  search,
  showFilter = false,
  onFilterClick,
  children
}: PageHeaderProps) {
  const renderActionButton = () => {
    if (!actionButton) return null;

    const button = actionButton.href ? (
      <Button asChild>
        <a href={actionButton.href}>
          {actionButton.icon}
          {actionButton.label}
        </a>
      </Button>
    ) : (
      <Button onClick={actionButton.onClick}>
        {actionButton.icon}
        {actionButton.label}
      </Button>
    );

    if (actionButton.permission) {
      return (
        <Can permission={actionButton.permission}>
          {button}
        </Can>
      );
    }

    return button;
  };

  return (
    <>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {renderActionButton()}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-end w-full">
          {search && (
            <div className="flex items-center space-x-2">
              <form onSubmit={search.onSubmit} className="flex items-center space-x-2">
                <Input
                  placeholder={search.placeholder || "Search..."}
                  value={search.value}
                  onChange={search.onChange}
                  className="w-64"
                />
                <Button type="submit" size="sm" disabled={search.processing}>
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          {showFilter && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={onFilterClick}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          )}
        </div>

        {children}
    </>
  );
}
