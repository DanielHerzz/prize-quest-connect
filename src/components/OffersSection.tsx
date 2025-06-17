
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Timer, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OffersSection = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "تطبيق الألعاب المجاني",
      description: "حمل والعب لمدة 5 دقائق",
      reward: "نقطة واحدة",
      timeLimit: "15 دقيقة",
      maxCompletions: 500,
      currentCompletions: 347,
      difficulty: "سهل",
      estimatedTime: "5 دقائق",
      requirements: ["تحميل التطبيق", "إنشاء حساب", "اللعب لمدة 5 دقائق"],
      ogadsUrl: "https://ogads.com/offer/123456",
      postbackParam: "offer1_completion"
    },
    {
      id: 2,
      title: "اشتراك تجريبي مجاني",
      description: "جرب الخدمة لمدة 7 أيام مجانًا",
      reward: "3 نقاط",
      timeLimit: "30 دقيقة",
      maxCompletions: 200,
      currentCompletions: 156,
      difficulty: "متوسط",
      estimatedTime: "10 دقائق",
      requirements: ["التسجيل بالبريد الإلكتروني", "تأكيد البريد الإلكتروني", "استكشاف المنصة"],
      ogadsUrl: "https://ogads.com/offer/123457",
      postbackParam: "offer2_completion"
    },
    {
      id: 3,
      title: "استطلاع رأي سريع",
      description: "شارك رأيك في 10 أسئلة بسيطة",
      reward: "نقطتان",
      timeLimit: "20 دقيقة",
      maxCompletions: 300,
      currentCompletions: 89,
      difficulty: "سهل",
      estimatedTime: "7 دقائق",
      requirements: ["الإجابة على جميع الأسئلة", "تقديم بيانات صحيحة"],
      ogadsUrl: "https://ogads.com/offer/123458",
      postbackParam: "offer3_completion"
    }
  ]);

  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "سهل": return "bg-green-500";
      case "متوسط": return "bg-yellow-500";
      case "صعب": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getAvailabilityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 100) return { status: "مكتمل", color: "text-red-500", icon: AlertCircle };
    if (percentage >= 80) return { status: "ينتهي قريبًا", color: "text-yellow-500", icon: Timer };
    return { status: "متاح", color: "text-green-500", icon: CheckCircle };
  };

  const handleOfferClick = (offer: any) => {
    if (offer.currentCompletions >= offer.maxCompletions) {
      toast({
        title: "العرض مكتمل",
        description: "لقد وصل هذا العرض للحد الأقصى من المشاركات",
        variant: "destructive",
      });
      return;
    }

    // Track click and redirect to OGAds
    console.log(`User clicked offer: ${offer.id}, redirecting to: ${offer.ogadsUrl}`);
    
    // In a real implementation, you would:
    // 1. Save user's SubID/session
    // 2. Track the click
    // 3. Redirect to OGAds with proper tracking parameters
    
    toast({
      title: "جاري التوجيه...",
      description: "سيتم توجيهك إلى العرض. أكمل المهام المطلوبة للحصول على النقاط.",
    });

    // Simulate redirect (in real app, this would be: window.open(offer.ogadsUrl, '_blank'))
    setTimeout(() => {
      toast({
        title: "تم فتح العرض",
        description: "أكمل المهام المطلوبة وسيتم إضافة النقاط تلقائيًا",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">العروض المتاحة</h2>
        <p className="text-xl text-gray-300 mb-6">أكمل أي عرض من العروض التالية للحصول على نقاط والمشاركة في السحوبات</p>
        
        <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3">
          <Timer className="w-5 h-5 mr-2 text-blue-400" />
          <span className="text-blue-300">العروض محدودة الكمية - اشترك الآن!</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const availability = getAvailabilityStatus(offer.currentCompletions, offer.maxCompletions);
          const IconComponent = availability.icon;
          
          return (
            <Card key={offer.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getDifficultyColor(offer.difficulty)} text-white`}>
                    {offer.difficulty}
                  </Badge>
                  <div className={`flex items-center ${availability.color}`}>
                    <IconComponent className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{availability.status}</span>
                  </div>
                </div>
                
                <CardTitle className="text-white">{offer.title}</CardTitle>
                <CardDescription className="text-gray-300">{offer.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">المكافأة:</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    {offer.reward}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">الوقت المقدر:</span>
                  <span className="text-white font-medium">{offer.estimatedTime}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">المشاركات:</span>
                    <span className="text-white">{offer.currentCompletions} / {offer.maxCompletions}</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((offer.currentCompletions / offer.maxCompletions) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-300 font-medium">المتطلبات:</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {offer.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleOfferClick(offer)}
                  disabled={offer.currentCompletions >= offer.maxCompletions}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {offer.currentCompletions >= offer.maxCompletions ? "مكتمل" : "ابدأ العرض"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-3">كيف يعمل النظام؟</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-white font-medium">اختر عرضًا</p>
                <p className="text-gray-300 text-sm">اختر من العروض المتاحة</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-white font-medium">أكمل المهام</p>
                <p className="text-gray-300 text-sm">اتبع التعليمات وأكمل المطلوب</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-white font-medium">احصل على النقاط</p>
                <p className="text-gray-300 text-sm">احصل على نقاط وادخل السحب</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OffersSection;
