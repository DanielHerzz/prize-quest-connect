
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Gift, Star, Users, MessageCircle, Heart, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaModal = ({ isOpen, onClose }: SocialMediaModalProps) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const { toast } = useToast();

  const socialPlatforms = [
    {
      id: "telegram",
      name: "قناة Telegram الرسمية",
      description: "احصل على إشعارات فورية عند إعلان الفائزين وعروض حصرية",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      url: "https://t.me/your_channel",
      benefit: "سحب إضافي مجاني",
      followers: "12.5K"
    },
    {
      id: "facebook",
      name: "صفحة Facebook",
      description: "تابع أحدث الأخبار وشاهد صور الفائزين مع جوائزهم",
      icon: Heart,
      color: "from-blue-600 to-blue-700",
      url: "https://facebook.com/your_page",
      benefit: "فرصة مضاعفة للفوز",
      followers: "8.3K"
    },
    {
      id: "tiktok",
      name: "TikTok / Instagram",
      description: "شاهد فيديوهات قصص الفائزين الحقيقيين وكيف غيرت حياتهم",
      icon: Play,
      color: "from-pink-500 to-purple-600",
      url: "https://tiktok.com/@your_account",
      benefit: "دخول في سحب خاص",
      followers: "25.1K"
    }
  ];

  const handleSocialClick = (platform: any) => {
    // Track the click
    console.log(`User clicked ${platform.name}`);
    
    // In a real implementation, you would:
    // 1. Open the social media link
    // 2. Track if user actually joined (using bot for Telegram, etc.)
    // 3. Give bonus entries
    
    // Simulate opening the link
    window.open(platform.url, '_blank');
    
    // Mark as completed (in real app, this would be verified)
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="space-y-4">
              <div className="text-4xl">🎉</div>
              <h2 className="text-3xl font-bold text-white">تهانينا! تم تسجيلك بنجاح</h2>
              <p className="text-lg text-gray-300">احصل على فرص إضافية للفوز بالانضمام إلى قنواتنا الاجتماعية</p>
              
              <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-2">
                <Gift className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">مكافآت حصرية للمتابعين الجدد!</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits Overview */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">لماذا تنضم إلى قنواتنا؟</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto" />
                  <p className="text-white font-medium">إشعارات فورية</p>
                  <p className="text-gray-300 text-sm">كن أول من يعلم بالسحوبات الجديدة</p>
                </div>
                <div className="text-center space-y-2">
                  <Gift className="w-8 h-8 text-green-400 mx-auto" />
                  <p className="text-white font-medium">عروض حصرية</p>
                  <p className="text-gray-300 text-sm">احصل على عروض خاصة للمتابعين فقط</p>
                </div>
                <div className="text-center space-y-2">
                  <Users className="w-8 h-8 text-blue-400 mx-auto" />
                  <p className="text-white font-medium">قصص الفائزين</p>
                  <p className="text-gray-300 text-sm">شاهد كيف غيرت الجوائز حياة الفائزين</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Platforms */}
          <div className="grid md:grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isCompleted = completedActions.includes(platform.id);
              
              return (
                <Card key={platform.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="w-8 h-8 text-white" />
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
                          <Star className="w-4 h-4 mr-2" />
                          تم الانضمام
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          انضم الآن
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bonus Tracking */}
          {completedActions.length > 0 && (
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">مكافآتك المتراكمة</h3>
                <p className="text-green-400 text-2xl font-bold mb-2">
                  {completedActions.length} سحب إضافي مجاني!
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  انضممت إلى {completedActions.length} من أصل {socialPlatforms.length} قناة
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
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
              استلم المكافآت ({completedActions.length})
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              إنهاء لاحقًا
            </Button>
          </div>

          {/* Telegram Bot Integration Note */}
          <Card className="bg-blue-500/20 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-1">تأكيد الانضمام التلقائي</h4>
                  <p className="text-gray-300 text-sm">
                    عند انضمامك لقناة Telegram، ستتلقى رسالة تأكيد تلقائية من البوت الخاص بنا. 
                    هذا يضمن حصولك على المكافآت والإشعارات المهمة.
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
