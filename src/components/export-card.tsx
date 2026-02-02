import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
          <div className="flex gap-2">
            {exportData.downloadUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="glass hover:glass-strong transition-all"
                title="Download addon"
              >
                <a
                  href={exportData.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download addon"
                >
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            )}
            <CopyButton text={exportData.exportString} />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
