
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trophy } from "lucide-react";

const DrawCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set next draw date to 3 days from now
    const nextDrawDate = new Date();
    nextDrawDate.setDate(nextDrawDate.getDate() + 3);
    nextDrawDate.setHours(15, 0, 0, 0); // 3 PM

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextDrawDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 mb-8">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">السحب القادم خلال</h2>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-400">{timeLeft.days}</div>
              <div className="text-sm text-gray-300">يوم</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-400">{timeLeft.hours}</div>
              <div className="text-sm text-gray-300">ساعة</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-300">دقيقة</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-300">ثانية</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>السحب يتم تلقائيًا عند انتهاء الوقت أو اكتمال العدد المطلوب</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrawCountdown;
