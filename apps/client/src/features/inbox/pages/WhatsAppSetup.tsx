import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  MessageSquare,
  QrCode,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import FeatureCard from "@/features/inbox/components/ui/FeatureCard";
import ROUTE_PATH from "@/shared/constant/route";
import { useNavigate } from "react-router-dom";

const QR_TIMEOUT = 60;

function WhatsAppSetup() {
  const [step, setStep] = useState(1);
  const [qrTimer, setQrTimer] = useState(QR_TIMEOUT);
  const [qrExpired, setQrExpired] = useState(false);

  const steps = useMemo(
    () => [
      { num: 1, title: "Connect", desc: "Link your WhatsApp" },
      { num: 2, title: "Verify", desc: "Scan QR code" },
      { num: 3, title: "Configure", desc: "Set preferences" },
    ],
    []
  );

  const navigate = useNavigate();
  const goNext = useCallback((nextStep: number) => {
    if (nextStep === 2) {
        setQrTimer(QR_TIMEOUT);
        setQrExpired(false);
      }
    setStep((s) => s + 1);
  }, []);
  const goBack = useCallback(() => setStep((s) => s - 1), []);
  const reset = useCallback(() => setStep(1), []);

  
  /* QR Timer */
  useEffect(() => {
    if (step !== 2) return;

    const interval = setInterval(() => {
      setQrTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setQrExpired(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  const handleBackToInbox = useCallback(() => {
    navigate(ROUTE_PATH.INBOX.INDEX)
  }, [navigate]);

  return (
    <div className="p-4 mt-0 flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-2xl w-full shadow-xl relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToInbox}
          className="absolute left-4 top-3 z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inbox
        </Button>

        <CardHeader className="text-center pb-2 pt-16">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Connect WhatsApp</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Sync your WhatsApp messages to manage conversations with AI
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium ${
                      step >= s.num ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 mb-12 rounded-full ${
                      step > s.num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FeatureCard
                  icon={<Shield />}
                  title="End-to-end Encrypted"
                  desc="Your messages stay private"
                />
                <FeatureCard
                  icon={<Sparkles />}
                  title="AI-Powered Replies"
                  desc="Smart response suggestions"
                />
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "View all WhatsApp messages in one place",
                  "AI-generated reply suggestions",
                  "Convert messages to tasks instantly",
                  "Auto-organize by priority and sender",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => goNext(3)}
                className="w-full py-6"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Connect WhatsApp
              </Button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <div className="w-52 h-52 mx-auto rounded-2xl border-2 border-border flex items-center justify-center">
                <QrCode className="w-20 h-20 text-muted-foreground" />
              </div>

              <p
                className={`text-xs font-medium ${
                  qrExpired ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {qrExpired
                  ? "QR expired. Refresh to continue."
                  : `Expires in ${qrTimer}s`}
              </p>

              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!qrExpired}
                  onClick={() => setStep(2)}
                >
                  Refresh QR
                </Button>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={goBack}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={qrExpired}
                  onClick={() => goNext(3)}
                >
                  I've Scanned It
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>

              <h3 className="text-xl font-bold">Connected Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Your WhatsApp is now linked
              </p>

              <Button className="w-full py-6">
                Start Using Inbox
              </Button>

              <Button variant="ghost" onClick={reset}>
                Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WhatsAppSetup;