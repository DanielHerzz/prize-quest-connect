
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Gift, ExternalLink, Calendar, MapPin, DollarSign } from "lucide-react";

const WinnersList = () => {
  const [winners] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      prize: "iPhone 15 Pro",
      value: "$1,199",
      date: "2024-06-15",
      location: "الرياض، السعودية",
      image: "👨‍💼",
      proof: "https://example.com/proof1",
      verified: true
    },
    {
      id: 2,
      name: "فاطمة علي",
      prize: "PlayStation 5",
      value: "$499",
      date: "2024-06-14",
      location: "دبي، الإمارات",
      image: "👩‍💻",
      proof: "https://example.com/proof2",
      verified: true
    },
    {
      id: 3,
      name: "محمد سالم",
      prize: "MacBook Air M3",
      value: "$1,299",
      date: "2024-06-13",
      location: "القاهرة، مصر",
      image: "👨‍🎓",
      proof: "https://example.com/proof3",
      verified: true
    },
    {
      id: 4,
      name: "نورا أحمد",
      prize: "Cash Prize",
      value: "$5,000",
      date: "2024-06-12",
      location: "بيروت، لبنان",
      image: "👩‍🏫",
      proof: "https://example.com/proof4",
      verified: true
    },
    {
      id: 5,
      name: "خالد حسن",
      prize: "Apple Watch Ultra",
      value: "$799",
      date: "2024-06-11",
      location: "الدوحة، قطر",
      image: "👨‍⚕️",
      proof: "https://example.com/proof5",
      verified: true
    },
    {
      id: 6,
      name: "سارة محمود",
      prize: "iPad Pro",
      value: "$1,099",
      date: "2024-06-10",
      location: "الكويت، الكويت",
      image: "👩‍🎨",
      proof: "https://example.com/proof6",
      verified: true
    }
  ]);

  const getPrizeIcon = (prize: string) => {
    if (prize.includes("iPhone")) return "📱";
    if (prize.includes("PlayStation")) return "🎮";
    if (prize.includes("MacBook")) return "💻";
    if (prize.includes("Cash")) return "💰";
    if (prize.includes("Watch")) return "⌚";
    if (prize.includes("iPad")) return "📱";
    return "🎁";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
          <Trophy className="w-5 h-5 mr-2 text-green-400" />
          <span className="text-green-300 font-semibold">فائزون حقيقيون • جوائز مؤكدة</span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">قائمة الفائزين</h2>
        <p className="text-xl text-gray-300 mb-6">
          جميع الفائزين حقيقيون ومؤكدون مع إثباتات الاستلام
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">342</p>
            <p className="text-sm text-gray-300">إجمالي الفائزين</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">$125K</p>
            <p className="text-sm text-gray-300">قيمة الجوائز الموزعة</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-sm text-gray-300">جائزة هذا الشهر</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Medal className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-sm text-gray-300">معدل التسليم</p>
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((winner, index) => (
          <Card key={winner.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{winner.image}</div>
                  <div>
                    <CardTitle className="text-white text-lg">{winner.name}</CardTitle>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {winner.location}
                    </div>
                  </div>
                </div>
                
                {index < 3 && (
                  <Badge className={`${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                  } text-white`}>
                    #{index + 1}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getPrizeIcon(winner.prize)}</span>
                  <div>
                    <p className="text-white font-medium">{winner.prize}</p>
                    <p className="text-green-400 font-bold">{winner.value}</p>
                  </div>
                </div>
                
                {winner.verified && (
                  <Badge className="bg-green-500/20 text-green-400">
                    ✓ مؤكد
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>تاريخ الفوز: {formatDate(winner.date)}</span>
              </div>
              
              <Button 
                onClick={() => window.open(winner.proof, '_blank')}
                variant="outline" 
                size="sm"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                عرض إثبات الاستلام
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transparency Note */}
      <Card className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">شفافية كاملة في عملية السحب</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <h4 className="text-white font-medium mb-2">سحب عادل</h4>
              <p className="text-gray-300 text-sm">جميع السحوبات تتم بطريقة عشوائية ومراقبة</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📄</span>
              </div>
              <h4 className="text-white font-medium mb-2">إثباتات موثقة</h4>
              <p className="text-gray-300 text-sm">كل فائز يحصل على إثبات موثق لاستلام الجائزة</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">⏱️</span>
              </div>
              <h4 className="text-white font-medium mb-2">تسليم سريع</h4>
              <p className="text-gray-300 text-sm">جميع الجوائز يتم تسليمها خلال 48 ساعة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinnersList;
