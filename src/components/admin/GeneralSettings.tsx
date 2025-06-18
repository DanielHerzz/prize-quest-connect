
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, MessageCircle, Globe, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    nextDrawDate: "2024-06-25",
    nextDrawTime: "20:00",
    telegramChannel: "https://t.me/yourgiveaways",
    facebookPage: "https://facebook.com/yourgiveaways",
    instagramPage: "https://instagram.com/yourgiveaways",
    welcomeMessage: "مرحباً بك! شكراً لمشاركتك في السحب. ستصلك النتائج عبر البريد الإلكتروني.",
    winnerMessage: "تهانينا! لقد فزت بالجائزة. سنتواصل معك قريباً لترتيب التسليم.",
    siteTitle: "اربح جوائز مذهلة",
    siteDescription: "شارك في السحوبات المجانية واحصل على فرصة للفوز بأحدث الأجهزة والجوائز النقدية",
    enableNotifications: true,
    autoDrawEnabled: true
  });

  const handleSaveSettings = () => {
    // هنا سيتم حفظ الإعدادات في Firebase
    console.log("Saving settings:", settings);
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعدادات بنجاح"
    });
  };

  return (
    <div className="space-y-6">
      {/* إعدادات السحب */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            إعدادات السحب
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nextDrawDate" className="text-gray-300">تاريخ السحب القادم</Label>
              <Input
                id="nextDrawDate"
                type="date"
                value={settings.nextDrawDate}
                onChange={(e) => setSettings({...settings, nextDrawDate: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="nextDrawTime" className="text-gray-300">وقت السحب</Label>
              <Input
                id="nextDrawTime"
                type="time"
                value={settings.nextDrawTime}
                onChange={(e) => setSettings({...settings, nextDrawTime: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.autoDrawEnabled}
              onCheckedChange={(checked) => setSettings({...settings, autoDrawEnabled: checked})}
            />
            <Label className="text-gray-300">تفعيل السحب التلقائي</Label>
          </div>
        </CardContent>
      </Card>

      {/* روابط وسائل التواصل */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            روابط وسائل التواصل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="telegram" className="text-gray-300">رابط قناة تليجرام</Label>
            <Input
              id="telegram"
              value={settings.telegramChannel}
              onChange={(e) => setSettings({...settings, telegramChannel: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="https://t.me/yourchannel"
            />
          </div>
          <div>
            <Label htmlFor="facebook" className="text-gray-300">رابط صفحة فيسبوك</Label>
            <Input
              id="facebook"
              value={settings.facebookPage}
              onChange={(e) => setSettings({...settings, facebookPage: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <Label htmlFor="instagram" className="text-gray-300">رابط صفحة إنستاجرام</Label>
            <Input
              id="instagram"
              value={settings.instagramPage}
              onChange={(e) => setSettings({...settings, instagramPage: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="https://instagram.com/yourpage"
            />
          </div>
        </CardContent>
      </Card>

      {/* رسائل التنبيه */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            رسائل التنبيه
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="welcomeMessage" className="text-gray-300">رسالة الترحيب (عند الاشتراك)</Label>
            <Textarea
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="winnerMessage" className="text-gray-300">رسالة الفوز</Label>
            <Textarea
              id="winnerMessage"
              value={settings.winnerMessage}
              onChange={(e) => setSettings({...settings, winnerMessage: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
            />
            <Label className="text-gray-300">تفعيل الإشعارات</Label>
          </div>
        </CardContent>
      </Card>

      {/* محتوى الموقع */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            محتوى الموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteTitle" className="text-gray-300">عنوان الموقع</Label>
            <Input
              id="siteTitle"
              value={settings.siteTitle}
              onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="siteDescription" className="text-gray-300">وصف الموقع</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* حفظ الإعدادات */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="pt-6">
          <Button onClick={handleSaveSettings} className="w-full bg-green-500 hover:bg-green-600">
            <Save className="w-4 h-4 mr-2" />
            حفظ جميع الإعدادات
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
