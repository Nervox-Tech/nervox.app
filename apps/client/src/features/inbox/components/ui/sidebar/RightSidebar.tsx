import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CheckCircle2, Mail } from "lucide-react";

export const RightSidebar = () => {
  return (
    <div className="w-72 border-l border-border bg-background hidden xl:flex flex-col p-4">
      <h3 className="font-semibold text-sm mb-4">Context</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Previous</h4>
          <div className="space-y-2">
            {[
              { text: 'Invoice #4021 Paid', time: '2 weeks ago', icon: CheckCircle2 },
              { text: 'Project Kickoff', time: '1 month ago', icon: Mail },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <item.icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">AI Settings</h4>
          <Card className="border-border">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-reply</span>
                <Badge variant="outline" className="text-xs">On</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Working hours only</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
