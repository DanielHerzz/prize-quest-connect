import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("يرجى إدخال البريد الإلكتروني");
      setMessageType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("يرجى إدخال بريد إلكتروني صحيح");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    
    // محاكاة عملية التحقق
    setTimeout(() => {
      setMessage("تم إرسال رسالة التأكيد إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.");
      setMessageType("success");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-card-dark border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              تأكيد البريد الإلكتروني
            </CardTitle>
            <p className="text-gray-300 text-sm">
              يرجى إدخال بريدك الإلكتروني لتأكيد حسابك وإكمال عملية التسجيل
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
                  dir="ltr"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? "جاري الإرسال..." : "تأكيد البريد الإلكتروني"}
              </Button>
            </form>

            {message && (
              <Alert className={`${
                messageType === "success" 
                  ? "bg-green-500/20 border-green-500/30 text-green-300" 
                  : "bg-red-500/20 border-red-500/30 text-red-300"
              }`}>
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  {messageType === "success" ? (
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <AlertDescription className="text-sm leading-relaxed">
                    {message}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <div className="text-center space-y-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;