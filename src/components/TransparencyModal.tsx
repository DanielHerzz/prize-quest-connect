
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Clock, CheckCircle, Zap, AlertCircle } from "lucide-react";

interface TransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransparencyModal = ({ isOpen, onClose }: TransparencyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 border border-blue-500/30">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="space-y-4">
              <Shield className="w-16 h-16 text-blue-400 mx-auto" />
              <h2 className="text-3xl font-bold text-white">كيف يعمل نظام السحب؟</h2>
              <p className="text-lg text-gray-300">شفافية كاملة في آلية اختيار الفائزين</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Draw Mechanism */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                آلية اختيار الفائزين
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">السحب العشوائي التلقائي</p>
                    <p className="text-sm">يتم اختيار الفائزين باستخدام خوارزمية عشوائية من Firebase لضمان العدالة المطلقة</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">تشفير البيانات</p>
                    <p className="text-sm">جميع البيانات محمية ومشفرة، ولا يمكن التلاعب بها من أي طرف</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-medium text-white">السجل المفتوح</p>
                    <p className="text-sm">يمكن لأي مشارك مراجعة قائمة المشاركين وتأكيد عدالة السحب</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-400" />
                متى يتم السحب؟
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">السحب التلقائي</h4>
                  <p className="text-gray-300 text-sm">يحدث فور اكتمال العدد المطلوب من المشاركين لأي جائزة</p>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">السحب المجدول</h4>
                  <p className="text-gray-300 text-sm">سحب أسبوعي يوم الجمعة الساعة 3 مساءً (توقيت السعودية)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Qualification Requirements */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-400" />
                شروط التأهل للسحب
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-green-400">✅ الشروط المطلوبة</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• إدخال بريد إلكتروني صحيح</li>
                      <li>• إكمال العرض المطلوب بنجاح</li>
                      <li>• تأكيد الإكمال من OGAds</li>
                      <li>• عدم استخدام حسابات وهمية</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-red-400">❌ أسباب عدم التأهل</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• عدم إكمال العرض كاملاً</li>
                      <li>• استخدام بيانات مزيفة</li>
                      <li>• محاولة التلاعب في النظام</li>
                      <li>• التسجيل أكثر من مرة بنفس الإيميل</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Process */}
          <Card className="bg-yellow-500/20 border-yellow-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-yellow-400" />
                عملية التحقق والإعلان
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</span>
                  <p className="text-gray-300">يتم السحب تلقائيًا باستخدام النظام</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</span>
                  <p className="text-gray-300">إرسال إشعار فوري للفائز عبر البريد الإلكتروني</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</span>
                  <p className="text-gray-300">نشر اسم الفائز في صفحة الفائزين خلال 24 ساعة</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</span>
                  <p className="text-gray-300">تسليم الجائزة خلال 3-5 أيام عمل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3"
            >
              فهمت، أريد المشاركة الآن
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransparencyModal;
