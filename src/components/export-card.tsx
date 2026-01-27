import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { AddonExport } from "@/types/exports";

interface ExportCardProps {
  export: AddonExport;
}

export function ExportCard({ export: exportData }: ExportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exportData.name}</CardTitle>
        <CardDescription>
          {exportData.description}
          <span className="block mt-1 text-xs text-muted-foreground/70">
            Updated {formatRelativeTime(exportData.lastUpdated)}
          </span>
        </CardDescription>
        <CardAction>
          <CopyButton text={exportData.exportString} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
