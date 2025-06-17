
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Gift, Star, Users, Clock, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaModal = ({ isOpen, onClose }: SocialMediaModalProps) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [referralCode] = useState(() => `REF${Date.now().toString(36).toUpperCase()}`);
  const { toast } = useToast();

  const socialPlatforms = [
    {
      id: "telegram",
      name: "قناة Telegram الرسمية",
      description: "احصل على إشعارات فورية عند إعلان الفائزين وعروض حصرية",
      icon: "📱",
      color: "from-blue-500 to-blue-600",
      url: "https://t.me/your_channel",
      benefit: "سحب إضافي مجاني",
      followers: "12.5K",
      priority: 1
    },
    {
      id: "facebook",
      name: "صفحة Facebook",
      description: "تابع أحدث الأخبار وشاهد صور الفائزين مع جوائزهم",
      icon: "👥",
      color: "from-blue-600 to-blue-700",
      url: "https://facebook.com/your_page",
      benefit: "فرصة مضاعفة للفوز",
      followers: "8.3K",
      priority: 2
    },
    {
      id: "tiktok",
      name: "TikTok / Instagram",
      description: "شاهد فيديوهات قصص الفائزين الحقيقيين وكيف غيرت حياتهم",
      icon: "🎬",
      color: "from-pink-500 to-purple-600",
      url: "https://tiktok.com/@your_account",
      benefit: "دخول في سحب خاص",
      followers: "25.1K",
      priority: 3
    }
  ];

  const handleSocialClick = (platform: any) => {
    console.log(`User clicked ${platform.name}`);
    
    // Simulate opening the link
    window.open(platform.url, '_blank');
    
    // Mark as completed
    if (!completedActions.includes(platform.id)) {
      setCompletedActions([...completedActions, platform.id]);
      
      toast({
        title: `تم فتح ${platform.name}! 🎉`,
        description: `بعد الانضمام، ستحصل على: ${platform.benefit}`,
      });
    }
  };

  const handleClaimBonus = () => {
    if (completedActions.length === 0) {
      toast({
        title: "لم تنضم لأي قناة بعد",
        description: "انضم لقناة واحدة على الأقل للحصول على المكافأة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم استلام المكافآت! 🎁",
      description: `حصلت على ${completedActions.length} سحب إضافي للانضمام إلى ${completedActions.length} قناة`,
    });

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://yourdomain.com/?ref=${referralCode}`);
    toast({
      title: "تم نسخ رابط الإحالة! 📋",
      description: "شارك هذا الرابط مع أصدقائك واحصل على سحوبات إضافية",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="space-y-4">
              <div className="text-4xl">🎉</div>
              <h2 className="text-3xl font-bold text-white">تهانينا! تم تسجيل مشاركتك بنجاح</h2>
              <p className="text-lg text-gray-300">احصل على فرص إضافية للفوز بالانضمام إلى قنواتنا الاجتماعية</p>
              
              <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-2">
                <Gift className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">مكافآت حصرية للمتابعين الجدد!</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Next Draw Countdown */}
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">السحب القادم خلال</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-2">3 أيام و 14 ساعة</div>
              <p className="text-gray-300">لا تفوت فرصتك! انضم لقنواتنا للحصول على إشعار فوري عند إعلان النتائج</p>
            </CardContent>
          </Card>

          {/* Social Media Platforms */}
          <div className="grid md:grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => {
              const isCompleted = completedActions.includes(platform.id);
              
              return (
                <Card key={platform.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 relative">
                  {platform.priority === 1 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      الأهم
                    </div>
                  )}
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center mx-auto mb-3 text-2xl`}>
                        {platform.icon}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                      <p className="text-gray-300 text-sm mb-3">{platform.description}</p>
                      
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{platform.followers} متابع</span>
                      </div>
                      
                      <Badge className="bg-green-500/20 text-green-400 mb-4">
                        🎁 {platform.benefit}
                      </Badge>
                    </div>
                    
                    <Button 
                      onClick={() => handleSocialClick(platform)}
                      className={`w-full ${isCompleted 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : `bg-gradient-to-r ${platform.color} hover:opacity-90`
                      }`}
                      disabled={isCompleted}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          تم الانضمام ✓
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          انضم الآن ({platform.priority === 1 ? '+2' : '+1'} سحب)
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Referral System */}
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                <Gift className="w-6 h-6 inline mr-2" />
                نظام الإحالة - اربح سحوبات إضافية!
              </h3>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm mb-3">رابط الإحالة الخاص بك:</p>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={`https://yourdomain.com/?ref=${referralCode}`}
                    readOnly 
                    className="flex-1 bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm"
                  />
                  <Button onClick={copyReferralCode} size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400">+3</div>
                  <div className="text-sm text-gray-300">سحوبات لكل صديق يشترك</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">+1</div>
                  <div className="text-sm text-gray-300">سحب إضافي لك أيضاً</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus Tracking */}
          {completedActions.length > 0 && (
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">مكافآتك المتراكمة</h3>
                <p className="text-green-400 text-3xl font-bold mb-2">
                  +{completedActions.length + (completedActions.includes('telegram') ? 1 : 0)} سحب إضافي!
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  انضممت إلى {completedActions.length} من أصل {socialPlatforms.length} قناة
                </p>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(completedActions.length / socialPlatforms.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleClaimBonus}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-lg py-3"
              disabled={completedActions.length === 0}
            >
              <Gift className="w-5 h-5 mr-2" />
              استلم المكافآت (+{completedActions.length + (completedActions.includes('telegram') ? 1 : 0)})
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              متابعة إلى الموقع
            </Button>
          </div>

          {/* Verification Note */}
          <Card className="bg-blue-500/20 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">التحقق التلقائي من الانضمام</h4>
                  <p className="text-gray-300 text-sm">
                    يتم التحقق من انضمامك تلقائياً خلال 24 ساعة. ستتلقى إشعاراً بإضافة السحوبات الإضافية لحسابك.
                    للحصول على تأكيد فوري، تأكد من تفعيل الإشعارات في قناة Telegram.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMediaModal;
