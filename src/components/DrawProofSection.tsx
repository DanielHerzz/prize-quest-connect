
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, CheckCircle, Video, FileText } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const DrawProofSection = () => {
  const { t } = useTranslation();

  const drawProofs = [
    {
      id: 1,
      date: "2024-06-15",
      prize: "iPhone 15 Pro",
      winner: "ahmed****@gmail.com",
      proofType: "video",
      proofUrl: "#",
      verified: true
    },
    {
      id: 2,
      date: "2024-06-12", 
      prize: "PlayStation 5",
      winner: "sara****@yahoo.com",
      proofType: "image",
      proofUrl: "#",
      verified: true
    },
    {
      id: 3,
      date: "2024-06-10",
      prize: "Cash Prize $2,000",
      winner: "mohamed****@hotmail.com", 
      proofType: "document",
      proofUrl: "#",
      verified: true
    }
  ];

  const getProofIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-400" />;
      case 'image':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'document':
        return <FileText className="w-5 h-5 text-purple-400" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-4">{t('transparency.proof')}</h2>
        <p className="text-xl text-gray-300">إثباتات حقيقية لعملية السحب والفائزين</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {drawProofs.map((proof) => (
          <Card key={proof.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{proof.prize}</CardTitle>
                {proof.verified && (
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    موثق
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-300 text-sm">{t('winners.winner')}</p>
                <p className="text-white font-bold">{proof.winner}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{proof.date}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getProofIcon(proof.proofType)}
                  <span className="text-gray-400 text-sm">إثبات السحب</span>
                </div>
              </div>
              
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-green-400 text-sm font-medium">تم التحقق من صحة السحب</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🔍 شفافية كاملة في عملية السحب</h3>
          <p className="text-gray-300 mb-6">
            نحن نؤمن بالشفافية الكاملة. جميع السحوبات يتم توثيقها بالفيديو والصور لضمان العدالة والمصداقية.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium">فيديو السحب</p>
              <p className="text-gray-300 text-sm">مسجل مباشر</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium">التحقق</p>
              <p className="text-gray-300 text-sm">خوارزمية عشوائية</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium">توثيق</p>
              <p className="text-gray-300 text-sm">سجلات كاملة</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium">حماية</p>
              <p className="text-gray-300 text-sm">بيانات آمنة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawProofSection;
