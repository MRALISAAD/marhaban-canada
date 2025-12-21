import React from 'react';
import { BlogIndexContent } from '@/components/blog/BlogIndexContent';

export const metadata = {
  title: 'Blog | Marhaban Canada',
};

export default function BlogPage() {
  return (
    <React.Suspense fallback={<div />}> 
      <BlogIndexContent />
    </React.Suspense>
  );
}
