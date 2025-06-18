import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gift, Users, Star, Clock, Target, Shield, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import Header from "@/components/Header";
import OffersSection from "@/components/OffersSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import SocialMediaModal from "@/components/SocialMediaModal";
import WinnersList from "@/components/WinnersList";
import ParticipationModal from "@/components/ParticipationModal";
import ParticipationSuccessModal from "@/components/ParticipationSuccessModal";
import DrawCountdown from "@/components/DrawCountdown";
import TransparencyModal from "@/components/TransparencyModal";
import UserParticipationStatus from "@/components/UserParticipationStatus";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showParticipationModal, setShowParticipationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTransparencyModal, setShowTransparencyModal] = useState(false);
  const [participantEmail, setParticipantEmail] = useState("");
  const { t, changeLanguage } = useTranslation();
  const { toast } = useToast();

  const [prizes, setPrizes] = useState([
    { 
      id: 1, 
      name: "iPhone 15 Pro", 
      value: "$1,199", 
      image: "🎯", 
      maxParticipants: 100,
      remainingParticipants: 73,
      drawDate: "2024-06-20"
    },
    { 
      id: 2, 
      name: "PlayStation 5", 
      value: "$499", 
      image: "🎮", 
      maxParticipants: 150,
      remainingParticipants: 89,
      drawDate: "2024-06-25"
    },
    { 
      id: 3, 
      name: "MacBook Air M3", 
      value: "$1,299", 
      image: "💻", 
      maxParticipants: 80,
      remainingParticipants: 45,
      drawDate: "2024-06-22"
    },
    { 
      id: 4, 
      name: "Cash Prize", 
      value: "$5,000", 
      image: "💰", 
      maxParticipants: 200,
      remainingParticipants: 156,
      drawDate: "2024-06-30"
    },
  ]);

  const handlePrizeClick = (prize: any) => {
    if (prize.remainingParticipants <= 0) {
      toast({
        title: "السحب مكتمل",
        description: "لقد اكتمل العدد المطلوب لهذا السحب",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedPrize(prize);
    setShowParticipationModal(true);
  };

  const handleParticipation = (email: string) => {
    if (selectedPrize) {
      // Update remaining participants
      setPrizes(prevPrizes => 
        prevPrizes.map(prize => 
          prize.id === selectedPrize.id 
            ? { ...prize, remainingParticipants: prize.remainingParticipants - 1 }
            : prize
        )
      );

      // Save user participation status
      const userParticipation = {
        email: email,
        prize: selectedPrize.name,
        status: 'completed',
        timestamp: new Date().toISOString()
      };
      
      const existingParticipations = JSON.parse(localStorage.getItem('userParticipations') || '[]');
      existingParticipations.push(userParticipation);
      localStorage.setItem('userParticipations', JSON.stringify(existingParticipations));

      // Generate SubID for tracking
      const subId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log(`User ${email} registered for ${selectedPrize.name} with SubID: ${subId}`);
      
      setParticipantEmail(email);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalContinue = () => {
    setShowSuccessModal(false);
    setTimeout(() => {
      setShowSocialModal(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header onLanguageChange={changeLanguage} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">{t('site.subtitle')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t('site.title')}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">15,847</p>
                <p className="text-sm text-gray-300">{t('stats.participants')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-gray-300">{t('stats.winners')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-sm text-gray-300">{t('stats.prizeValue')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-gray-300">{t('stats.continuous')}</p>
              </div>
            </div>

            {/* Transparency Button */}
            <Button 
              onClick={() => setShowTransparencyModal(true)}
              variant="outline"
              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 mb-8"
            >
              <Shield className="w-4 h-4 mr-2" />
              {t('transparency.title')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Draw Countdown */}
        <DrawCountdown />

        {/* User Participation Status */}
        <UserParticipationStatus />

        {/* Current Prizes */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t('prizes.availableNow')}</h2>
            <p className="text-xl text-gray-300">{t('prizes.chooseToParticipate')}</p>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>{t('prizes.participantsRemaining')}:</span>
                      <Badge variant="secondary" className={
                        prize.remainingParticipants <= 10 ? "bg-red-500/20 text-red-400" :
                        prize.remainingParticipants <= 30 ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }>
                        {prize.remainingParticipants}
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${((prize.maxParticipants - prize.remainingParticipants) / prize.maxParticipants) * 100}%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="text-center text-sm text-gray-400">
                      {prize.remainingParticipants > 0 ? (
                        <p>{t('prizes.drawWhenComplete')} {prize.maxParticipants} {t('prizes.participant')}</p>
                      ) : (
                        <p className="text-red-400">{t('prizes.completed')}</p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handlePrizeClick(prize)}
                    disabled={prize.remainingParticipants <= 0}
                    className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {prize.remainingParticipants <= 0 ? t('button.completed') : t('button.participateInDraw')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Draw Proof Section */}
      <DrawProofSection />

      {/* Offers Section */}
      <OffersSection />

      {/* Winners List */}
      <WinnersList />

      {/* Participation Modal */}
      <ParticipationModal 
        isOpen={showParticipationModal}
        onClose={() => setShowParticipationModal(false)}
        prize={selectedPrize}
        onParticipate={handleParticipation}
      />

      {/* Success Modal */}
      <ParticipationSuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinueToSocial={handleSuccessModalContinue}
        email={participantEmail}
        prizeName={selectedPrize?.name || ""}
      />

      {/* Social Media Modal */}
      <SocialMediaModal 
        isOpen={showSocialModal} 
        onClose={() => setShowSocialModal(false)} 
      />

      {/* Transparency Modal */}
      <TransparencyModal 
        isOpen={showTransparencyModal}
        onClose={() => setShowTransparencyModal(false)}
      />

      <Footer />
    </div>
  );
};

export default Index;
