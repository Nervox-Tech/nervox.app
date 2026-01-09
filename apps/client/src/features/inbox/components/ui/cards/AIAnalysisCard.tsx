import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Bot } from "lucide-react";
import type { Thread } from "@/features/inbox/types";

interface AIAnalysisCardProps {
  activeThread: Thread;
}

const AIAnalysisCard = ({ activeThread }: AIAnalysisCardProps) => {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm mb-1">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Classified as <span className="font-medium text-foreground">{activeThread.classification}</span>.
              {activeThread.urgency === 'high' && " Response recommended today."}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">Sentiment: Positive</Badge>
              <Badge variant="outline" className="text-xs">Topic: Update</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisCard;