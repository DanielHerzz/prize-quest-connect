
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Gift, Shield, Video, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const WinnersList = () => {
  const { t } = useTranslation();
  
  const winners = [
    {
      id: 1,
      email: "ahmed****@gmail.com",
      prize: "iPhone 15 Pro",
      value: "$1,199",
      date: "2024-06-15",
      proofImage: "📱",
      proofType: "video",
      proofUrl: "#",
      verified: true
    },
    {
      id: 2,
      email: "sara****@yahoo.com", 
      prize: "PlayStation 5",
      value: "$499",
      date: "2024-06-12",
      proofImage: "🎮",
      proofType: "image",
      proofUrl: "#",
      verified: true
    },
    {
      id: 3,
      email: "mohamed****@hotmail.com",
      prize: "Cash Prize",
      value: "$2,000",
      date: "2024-06-10",
      proofImage: "💰",
      proofType: "document",
      proofUrl: "#",
      verified: true
    },
    {
      id: 4,
      email: "fatima****@gmail.com",
      prize: "MacBook Air M3",
      value: "$1,299", 
      date: "2024-06-08",
      proofImage: "💻",
      proofType: "video",
      proofUrl: "#",
      verified: true
    },
    {
      id: 5,
      email: "ali****@outlook.com",
      prize: "Google Play Card",
      value: "$100",
      date: "2024-06-05",
      proofImage: "🎁",
      proofType: "image",
      proofUrl: "#",
      verified: true
    },
    {
      id: 6,
      email: "maha****@gmail.com",
      prize: "PayPal Cash",
      value: "$500",
      date: "2024-06-03",
      proofImage: "💳",
      proofType: "document",
      proofUrl: "#",
      verified: true
    }
  ];

  const getProofIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-blue-400" />;
      case 'image':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'document':
        return <FileText className="w-4 h-4 text-purple-400" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getProofTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return t('proof.video');
      case 'image':
        return t('proof.image');
      case 'document':
        return t('proof.document');
      default:
        return t('proof.unknown');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-4">🏆 {t('winners.title')}</h2>
        <p className="text-xl text-gray-300">{t('winners.subtitle')}</p>
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
                <p className="text-gray-300 text-sm">{t('winners.winner')}</p>
                <p className="text-white font-bold">{winner.email}</p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{winner.date}</span>
              </div>

              {/* Draw Proof Section */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getProofIcon(winner.proofType)}
                    <span className="text-blue-400 text-sm font-medium">{t('proof.drawProof')}</span>
                  </div>
                  {winner.verified && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('proof.verified')}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300 text-xs mb-2">{getProofTypeText(winner.proofType)}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                  onClick={() => window.open(winner.proofUrl, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {t('proof.viewProof')}
                </Button>
              </div>
              
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                <Gift className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-green-400 text-sm font-medium">{t('winners.delivered')}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-3">🔍 {t('winners.transparency')}</h3>
            <p className="text-gray-300 mb-4">
              {t('winners.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{t('winners.fairDraw')}</p>
                <p className="text-gray-300 text-sm">{t('winners.randomAlgorithm')}</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{t('winners.guaranteedDelivery')}</p>
                <p className="text-gray-300 text-sm">{t('winners.deliveryTime')}</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{t('winners.regularProofs')}</p>
                <p className="text-gray-300 text-sm">{t('winners.weeklyUpdate')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinnersList;
