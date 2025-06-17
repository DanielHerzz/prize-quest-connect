
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gift, Users, Star, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import OffersSection from "@/components/OffersSection";
import SocialMediaModal from "@/components/SocialMediaModal";
import WinnersList from "@/components/WinnersList";

const Index = () => {
  const [email, setEmail] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const prizes = [
    { id: 1, name: "iPhone 15 Pro", value: "$1,199", image: "🎯", participants: 2847 },
    { id: 2, name: "PlayStation 5", value: "$499", image: "🎮", participants: 3921 },
    { id: 3, name: "MacBook Air M3", value: "$1,299", image: "💻", participants: 1653 },
    { id: 4, name: "Cash Prize", value: "$5,000", image: "💰", participants: 5782 },
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate email registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم التسجيل بنجاح! 🎉",
        description: "لقد تم إدراجك في السحب. تحقق من بريدك الإلكتروني للتأكيد.",
      });
      setShowSocialModal(true);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">سحوبات مجانية على جوائز حقيقية</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              اربح جوائز مذهلة
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              شارك في السحوبات المجانية واحصل على فرصة للفوز بأحدث الأجهزة والجوائز النقدية
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">15,847</p>
                <p className="text-sm text-gray-300">مشارك</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-gray-300">فائز</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-sm text-gray-300">قيمة الجوائز</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-gray-300">سحوبات مستمرة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Prizes */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">الجوائز المتاحة الآن</h2>
          <p className="text-xl text-gray-300">اختر الجائزة التي تريد المشاركة في السحب عليها</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {prizes.map((prize) => (
            <Card key={prize.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{prize.image}</div>
                <CardTitle className="text-white">{prize.name}</CardTitle>
                <CardDescription className="text-green-400 text-2xl font-bold">{prize.value}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-gray-300 mb-4">
                  <span>المشاركون:</span>
                  <Badge variant="secondary">{prize.participants.toLocaleString()}</Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Target className="w-4 h-4 mr-2" />
                  شارك في السحب
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Registration */}
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-2">ابدأ المشاركة الآن</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              أدخل بريدك الإلكتروني وأكمل عرضًا واحدًا للمشاركة في جميع السحوبات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg py-3 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                required
              />
              <Button 
                type="submit" 
                className="w-full text-lg py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "جاري التسجيل..." : "اشترك مجانًا"}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-300 text-center">
                <Star className="w-5 h-5 inline mr-2" />
                مجاني 100% • لا توجد رسوم خفية • سحوبات عادلة وشفافة
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offers Section */}
      <OffersSection />

      {/* Winners List */}
      <WinnersList />

      {/* Social Media Modal */}
      <SocialMediaModal 
        isOpen={showSocialModal} 
        onClose={() => setShowSocialModal(false)} 
      />
    </div>
  );
};

export default Index;
