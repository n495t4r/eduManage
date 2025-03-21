import React from 'react';
import { Link } from '@inertiajs/react';
import { FileQuestion } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    // <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FileQuestion className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" asChild>
              <Link href={route('dashboard')}>
                Go to Dashboard
              </Link>
            </Button>
            <Button
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    // </AppLayout>
  );
}
