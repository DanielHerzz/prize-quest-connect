
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle, User, Upload, Gift, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prize {
  id: number;
  name: string;
  value: string;
  maxWinners: number;
  remainingWinners: number;
}

const DrawControl = () => {
  const { toast } = useToast();
  const [selectedWinner, setSelectedWinner] = useState("");
  const [selectedPrize, setSelectedPrize] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofDescription, setProofDescription] = useState("");
  const [newPrize, setNewPrize] = useState({ name: "", value: "", maxWinners: 1 });

  const [prizes, setPrizes] = useState<Prize[]>([
    { id: 1, name: "iPhone 15 Pro", value: "$1,199", maxWinners: 5, remainingWinners: 3 },
    { id: 2, name: "PlayStation 5", value: "$499", maxWinners: 10, remainingWinners: 7 },
    { id: 3, name: "MacBook Air M3", value: "$1,299", maxWinners: 3, remainingWinners: 2 },
    { id: 4, name: "Cash Prize", value: "$500", maxWinners: 20, remainingWinners: 15 }
  ]);

  // Mock data للمشتركين المؤهلين
  const qualifiedParticipants = [
    "ahmed****@gmail.com",
    "sara****@yahoo.com",
    "mohamed****@hotmail.com",
    "fatima****@gmail.com",
    "ali****@outlook.com"
  ];

  const handleRandomDraw = () => {
    if (!selectedPrize) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الجائزة أولاً",
        variant: "destructive"
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * qualifiedParticipants.length);
    const winner = qualifiedParticipants[randomIndex];
    setSelectedWinner(winner);

    toast({
      title: "تم اختيار الفائز!",
      description: `الفائز هو: ${winner}`,
    });
  };

  const handleConfirmWinner = () => {
    if (!selectedWinner || !selectedPrize || !proofFile) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع البيانات المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // هنا سيتم حفظ البيانات في Firebase
    console.log("Winner confirmed:", {
      winner: selectedWinner,
      prize: selectedPrize,
      proof: proofFile,
      description: proofDescription
    });

    // تحديث عدد الفائزين المتبقيين
    setPrizes(prizes.map(prize => 
      prize.id.toString() === selectedPrize 
        ? { ...prize, remainingWinners: prize.remainingWinners - 1 }
        : prize
    ));

    toast({
      title: "تم بنجاح!",
      description: "تم تأكيد الفائز وحفظ البيانات",
    });

    // إعادة تعيين النموذج
    setSelectedWinner("");
    setSelectedPrize("");
    setProofFile(null);
    setProofDescription("");
  };

  const handleAddPrize = () => {
    if (!newPrize.name || !newPrize.value) {
      toast({
        title: "خطأ",
        description: "يرجى ملء بيانات الجائزة",
        variant: "destructive"
      });
      return;
    }

    const prize: Prize = {
      id: Date.now(),
      name: newPrize.name,
      value: newPrize.value,
      maxWinners: newPrize.maxWinners,
      remainingWinners: newPrize.maxWinners
    };

    setPrizes([...prizes, prize]);
    setNewPrize({ name: "", value: "", maxWinners: 1 });

    toast({
      title: "تم إضافة الجائزة",
      description: "تمت إضافة الجائزة الجديدة بنجاح"
    });
  };

  return (
    <div className="space-y-6">
      {/* إدارة الجوائز */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            إدارة الجوائز
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="prizeName" className="text-gray-300">اسم الجائزة</Label>
              <Input
                id="prizeName"
                value={newPrize.name}
                onChange={(e) => setNewPrize({...newPrize, name: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="مثال: iPhone 15 Pro"
              />
            </div>
            <div>
              <Label htmlFor="prizeValue" className="text-gray-300">قيمة الجائزة</Label>
              <Input
                id="prizeValue"
                value={newPrize.value}
                onChange={(e) => setNewPrize({...newPrize, value: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="$1,199"
              />
            </div>
            <div>
              <Label htmlFor="maxWinners" className="text-gray-300">عدد الفائزين المسموح</Label>
              <Input
                id="maxWinners"
                type="number"
                value={newPrize.maxWinners}
                onChange={(e) => setNewPrize({...newPrize, maxWinners: parseInt(e.target.value)})}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="1"
              />
            </div>
          </div>
          <Button onClick={handleAddPrize} className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            إضافة جائزة جديدة
          </Button>

          {/* عرض الجوائز الحالية */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prizes.map((prize) => (
              <div key={prize.id} className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium">{prize.name}</h4>
                <p className="text-green-400 text-lg font-bold">{prize.value}</p>
                <p className="text-gray-300 text-sm">
                  متبقي: {prize.remainingWinners} من {prize.maxWinners}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* سحب الفائزين */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">إجراء السحب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* اختيار الجائزة */}
            <div className="space-y-4">
              <Label className="text-gray-300">اختر الجائزة للسحب عليها</Label>
              <Select value={selectedPrize} onValueChange={setSelectedPrize}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="اختر الجائزة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {prizes.filter(prize => prize.remainingWinners > 0).map((prize) => (
                    <SelectItem key={prize.id} value={prize.id.toString()} className="text-white">
                      {prize.name} - {prize.value} (متبقي: {prize.remainingWinners})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Button 
                  onClick={handleRandomDraw}
                  className="bg-blue-500 hover:bg-blue-600 flex-1"
                  disabled={!selectedPrize}
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  سحب عشوائي
                </Button>
              </div>
            </div>

            {/* اختيار الفائز يدوياً */}
            <div className="space-y-4">
              <Label className="text-gray-300">أو اختر الفائز يدوياً</Label>
              <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="اختر الفائز" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {qualifiedParticipants.map((participant) => (
                    <SelectItem key={participant} value={participant} className="text-white">
                      {participant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* إثبات الفوز */}
          {selectedWinner && (
            <div className="space-y-4 p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium">إثبات الفوز للفائز: {selectedWinner}</h4>
              
              <div>
                <Label htmlFor="proofFile" className="text-gray-300">رفع إثبات السحب (صورة أو فيديو)</Label>
                <Input
                  id="proofFile"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="proofDescription" className="text-gray-300">وصف إثبات السحب</Label>
                <Textarea
                  id="proofDescription"
                  value={proofDescription}
                  onChange={(e) => setProofDescription(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="اكتب وصفاً لإثبات السحب..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleConfirmWinner}
                className="bg-green-500 hover:bg-green-600 w-full"
                disabled={!proofFile}
              >
                <User className="w-4 h-4 mr-2" />
                تأكيد الفائز وحفظ الإثبات
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawControl;
