
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Gift } from "lucide-react";

const WinnersList = () => {
  const winners = [
    {
      id: 1,
      email: "ahmed****@gmail.com",
      prize: "iPhone 15 Pro",
      value: "$1,199",
      date: "2024-06-15",
      proofImage: "📱",
    },
    {
      id: 2,
      email: "sara****@yahoo.com", 
      prize: "PlayStation 5",
      value: "$499",
      date: "2024-06-12",
      proofImage: "🎮",
    },
    {
      id: 3,
      email: "mohamed****@hotmail.com",
      prize: "Cash Prize",
      value: "$2,000",
      date: "2024-06-10",
      proofImage: "💰",
    },
    {
      id: 4,
      email: "fatima****@gmail.com",
      prize: "MacBook Air M3",
      value: "$1,299", 
      date: "2024-06-08",
      proofImage: "💻",
    },
    {
      id: 5,
      email: "ali****@outlook.com",
      prize: "Google Play Card",
      value: "$100",
      date: "2024-06-05",
      proofImage: "🎁",
    },
    {
      id: 6,
      email: "maha****@gmail.com",
      prize: "PayPal Cash",
      value: "$500",
      date: "2024-06-03",
      proofImage: "💳",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-4">🏆 قائمة الفائزين</h2>
        <p className="text-xl text-gray-300">إثباتات حقيقية للفائزين بالجوائز</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((winner) => (
          <Card key={winner.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-4xl mb-3">{winner.proofImage}</div>
              <CardTitle className="text-white text-lg">{winner.prize}</CardTitle>
              <Badge className="bg-green-500/20 text-green-400 text-lg">
                {winner.value}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <p className="text-gray-300 text-sm">الفائز:</p>
                <p className="text-white font-bold">{winner.email}</p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{winner.date}</span>
              </div>
              
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                <Gift className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm font-medium">تم تسليم الجائزة بنجاح</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-3">🔍 شفافية كاملة</h3>
            <p className="text-gray-300 mb-4">
              جميع الفائزين حقيقيون ويتم الإعلان عنهم فور إجراء السحب. 
              نحن نؤمن بالشفافية الكاملة ونشارك إثباتات تسليم الجوائز.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">سحب عادل</p>
                <p className="text-gray-300 text-sm">خوارزمية عشوائية</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">تسليم مضمون</p>
                <p className="text-gray-300 text-sm">خلال 3-5 أيام</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">إثباتات دورية</p>
                <p className="text-gray-300 text-sm">تحديث أسبوعي</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinnersList;
