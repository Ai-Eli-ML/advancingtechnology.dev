import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => (
  <article 
    className={`prose prose-lg dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
      prose-p:text-gray-700 dark:prose-p:text-gray-300
      prose-a:text-[var(--primary)] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900 dark:prose-strong:text-gray-100
      prose-code:text-[var(--primary)] prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
      prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100
      prose-blockquote:border-[var(--primary)] prose-blockquote:bg-gray-50 
      dark:prose-blockquote:bg-gray-900 prose-blockquote:rounded-r-lg
      prose-img:rounded-lg prose-img:shadow-lg
      prose-hr:border-gray-300 dark:prose-hr:border-gray-700
      ${className}`} 
    dangerouslySetInnerHTML={{ __html: content }} 
  />
);

export default MarkdownRenderer; 