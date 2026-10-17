import type { ReactElement } from 'react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface SetupInstructionsProps {
  children: string;
}

export function SetupInstructions({ children }: SetupInstructionsProps): ReactElement {
  return (
    <div className="space-y-3 break-words text-sm leading-relaxed text-foreground/70 [&_a]:text-foreground [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-foreground [&_a]:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground/90 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_li>p]:my-2 [&_ul_ul]:mt-1 [&_ol_ol]:mt-1 [&_code]:rounded [&_code]:bg-foreground/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-foreground/5 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/20 [&_blockquote]:pl-4 [&_blockquote]:text-foreground/60 [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold [&_hr]:border-foreground/10">
      <Markdown
        remarkPlugins={[remarkBreaks]}
        skipHtml
        disallowedElements={['img']}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
