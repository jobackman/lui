import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import type { AddonExport } from "@/types/exports";

interface ExportCardProps {
  export: AddonExport;
}

export function ExportCard({ export: exportData }: ExportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exportData.name}</CardTitle>
        <CardAction>
          <CopyButton text={exportData.exportString} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
