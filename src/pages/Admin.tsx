
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, BarChart3, Users, Gift, Cog, Trophy } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import OffersManagement from "@/components/admin/OffersManagement";
import ParticipantsManagement from "@/components/admin/ParticipantsManagement";
import DrawControl from "@/components/admin/DrawControl";
import WinnersManagement from "@/components/admin/WinnersManagement";
import DashboardStats from "@/components/admin/DashboardStats";
import GeneralSettings from "@/components/admin/GeneralSettings";

const Admin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('admin.title')}</h1>
          <p className="text-gray-300">{t('admin.subtitle')}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-sm border-white/20 grid grid-cols-6 w-full">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              الإحصائيات
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-white/20">
              <Gift className="w-4 h-4 mr-2" />
              إدارة العروض
            </TabsTrigger>
            <TabsTrigger value="participants" className="data-[state=active]:bg-white/20">
              <Users className="w-4 h-4 mr-2" />
              المشتركون
            </TabsTrigger>
            <TabsTrigger value="draws" className="data-[state=active]:bg-white/20">
              <Trophy className="w-4 h-4 mr-2" />
              إدارة السحب
            </TabsTrigger>
            <TabsTrigger value="winners" className="data-[state=active]:bg-white/20">
              <Users className="w-4 h-4 mr-2" />
              الفائزون
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
              <Cog className="w-4 h-4 mr-2" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="offers">
            <OffersManagement />
          </TabsContent>

          <TabsContent value="participants">
            <ParticipantsManagement />
          </TabsContent>

          <TabsContent value="draws">
            <DrawControl />
          </TabsContent>

          <TabsContent value="winners">
            <WinnersManagement />
          </TabsContent>

          <TabsContent value="settings">
            <GeneralSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
