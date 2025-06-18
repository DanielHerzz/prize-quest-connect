
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Gift, Target, TrendingUp, Clock } from "lucide-react";

const DashboardStats = () => {
  // Mock data - في التطبيق الحقيقي سيأتي من Firebase
  const stats = {
    totalParticipants: 2547,
    completedOffers: 1832,
    totalPrizes: 15,
    remainingOffers: 715,
    conversionRate: 72,
    activePrizes: 8
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">إجمالي المشتركين</p>
                <p className="text-2xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">العروض المكتملة</p>
                <p className="text-2xl font-bold text-white">{stats.completedOffers.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">إجمالي الجوائز</p>
                <p className="text-2xl font-bold text-white">{stats.totalPrizes}</p>
              </div>
              <Gift className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">العروض المتبقية</p>
                <p className="text-2xl font-bold text-white">{stats.remainingOffers}</p>
              </div>
              <Target className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">معدل التحويل</p>
                <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">الجوائز النشطة</p>
                <p className="text-2xl font-bold text-white">{stats.activePrizes}</p>
              </div>
              <Clock className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">أداء العروض - آخر 7 أيام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-gray-300">{day}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">{Math.floor(Math.random() * 100 + 50)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">الجوائز الأكثر شعبية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'iPhone 15 Pro', participants: 450 },
                { name: 'PlayStation 5', participants: 380 },
                { name: 'MacBook Air M3', participants: 290 },
                { name: 'Cash Prize', participants: 520 }
              ].map((prize) => (
                <div key={prize.name} className="flex items-center justify-between">
                  <span className="text-gray-300">{prize.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(prize.participants / 520) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm">{prize.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
