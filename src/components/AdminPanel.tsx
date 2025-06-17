
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Users, Trophy, DollarSign, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "تطبيق الألعاب المجاني",
      description: "حمل واלعب لمدة 5 دقائق",
      reward: "نقطة واحدة",
      maxCompletions: 500,
      currentCompletions: 347,
      ogadsUrl: "https://ogads.com/offer/123456",
      isActive: true
    }
  ]);

  const [prizes, setPrizes] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      value: "$1,199",
      description: "أحدث هاتف من Apple",
      stock: 5,
      isActive: true
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    reward: "",
    maxCompletions: "",
    ogadsUrl: "",
    requirements: ""
  });

  const [newPrize, setNewPrize] = useState({
    name: "",
    value: "",
    description: "",
    stock: ""
  });

  const { toast } = useToast();

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.description || !newOffer.maxCompletions) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const offer = {
      id: Date.now(),
      title: newOffer.title,
      description: newOffer.description,
      reward: newOffer.reward,
      maxCompletions: parseInt(newOffer.maxCompletions),
      currentCompletions: 0,
      ogadsUrl: newOffer.ogadsUrl,
      isActive: true
    };

    setOffers([...offers, offer]);
    setNewOffer({
      title: "",
      description: "",
      reward: "",
      maxCompletions: "",
      ogadsUrl: "",
      requirements: ""
    });

    toast({
      title: "تم إضافة العرض",
      description: "تم إضافة العرض الجديد بنجاح",
    });
  };

  const handleAddPrize = () => {
    if (!newPrize.name || !newPrize.value || !newPrize.stock) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const prize = {
      id: Date.now(),
      name: newPrize.name,
      value: newPrize.value,
      description: newPrize.description,
      stock: parseInt(newPrize.stock),
      isActive: true
    };

    setPrizes([...prizes, prize]);
    setNewPrize({
      name: "",
      value: "",
      description: "",
      stock: ""
    });

    toast({
      title: "تم إضافة الجائزة",
      description: "تم إضافة الجائزة الجديدة بنجاح",
    });
  };

  const handleToggleOffer = (id: number) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };

  const handleDeleteOffer = (id: number) => {
    setOffers(offers.filter(offer => offer.id !== id));
    toast({
      title: "تم حذف العرض",
      description: "تم حذف العرض بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">لوحة الإدارة</h1>
          <p className="text-gray-300">إدارة العروض والجوائز والسحوبات</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">15,847</p>
              <p className="text-sm text-gray-300">إجمالي المشتركين</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">342</p>
              <p className="text-sm text-gray-300">إجمالي الفائزين</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">$125K</p>
              <p className="text-sm text-gray-300">قيمة الجوائز</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{offers.length}</p>
              <p className="text-sm text-gray-300">العروض النشطة</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="offers" className="data-[state=active]:bg-white/20">العروض</TabsTrigger>
            <TabsTrigger value="prizes" className="data-[state=active]:bg-white/20">الجوائز</TabsTrigger>
            <TabsTrigger value="winners" className="data-[state=active]:bg-white/20">الفائزين</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Offers Management */}
          <TabsContent value="offers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Add New Offer */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    إضافة عرض جديد
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    إضافة عرض CPA جديد من OGAds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">عنوان العرض</Label>
                    <Input
                      id="title"
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="مثال: تطبيق الألعاب المجاني"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white">الوصف</Label>
                    <Textarea
                      id="description"
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="وصف العرض والمطلوب من المستخدم"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reward" className="text-white">المكافأة</Label>
                      <Input
                        id="reward"
                        value={newOffer.reward}
                        onChange={(e) => setNewOffer({...newOffer, reward: e.target.value})}
                        className="bg-white/20 border-white/30 text-white"
                        placeholder="نقطة واحدة"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="maxCompletions" className="text-white">الحد الأقصى</Label>
                      <Input
                        id="maxCompletions"
                        type="number"
                        value={newOffer.maxCompletions}
                        onChange={(e) => setNewOffer({...newOffer, maxCompletions: e.target.value})}
                        className="bg-white/20 border-white/30 text-white"
                        placeholder="500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="ogadsUrl" className="text-white">رابط OGAds</Label>
                    <Input
                      id="ogadsUrl"
                      value={newOffer.ogadsUrl}
                      onChange={(e) => setNewOffer({...newOffer, ogadsUrl: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="https://ogads.com/offer/..."
                    />
                  </div>
                  
                  <Button onClick={handleAddOffer} className="w-full bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة العرض
                  </Button>
                </CardContent>
              </Card>

              {/* Current Offers */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">العروض الحالية</CardTitle>
                  <CardDescription className="text-gray-300">
                    إدارة العروض الموجودة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{offer.title}</h3>
                        <Badge className={offer.isActive ? "bg-green-500" : "bg-red-500"}>
                          {offer.isActive ? "نشط" : "معطل"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{offer.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                        <span>المكافأة: {offer.reward}</span>
                        <span>{offer.currentCompletions} / {offer.maxCompletions}</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(offer.currentCompletions / offer.maxCompletions) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleToggleOffer(offer.id)}
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          {offer.isActive ? "تعطيل" : "تفعيل"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Prizes Management */}
          <TabsContent value="prizes" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Add New Prize */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    إضافة جائزة جديدة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="prizeName" className="text-white">اسم الجائزة</Label>
                    <Input
                      id="prizeName"
                      value={newPrize.name}
                      onChange={(e) => setNewPrize({...newPrize, name: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="iPhone 15 Pro"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prizeValue" className="text-white">القيمة</Label>
                    <Input
                      id="prizeValue"
                      value={newPrize.value}
                      onChange={(e) => setNewPrize({...newPrize, value: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="$1,199"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prizeDescription" className="text-white">الوصف</Label>
                    <Textarea
                      id="prizeDescription"
                      value={newPrize.description}
                      onChange={(e) => setNewPrize({...newPrize, description: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="وصف الجائزة"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="stock" className="text-white">الكمية المتاحة</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newPrize.stock}
                      onChange={(e) => setNewPrize({...newPrize, stock: e.target.value})}
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="5"
                    />
                  </div>
                  
                  <Button onClick={handleAddPrize} className="w-full bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة الجائزة
                  </Button>
                </CardContent>
              </Card>

              {/* Current Prizes */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">الجوائز الحالية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prizes.map((prize) => (
                    <div key={prize.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{prize.name}</h3>
                        <Badge className="bg-green-500">{prize.value}</Badge>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{prize.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">الكمية المتاحة: {prize.stock}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Winners Management */}
          <TabsContent value="winners">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">إدارة الفائزين</CardTitle>
                <CardDescription className="text-gray-300">
                  عرض وإدارة قائمة الفائزين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">قائمة الفائزين وإدارة السحوبات ستكون هنا</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">إعدادات النظام</CardTitle>
                <CardDescription className="text-gray-300">
                  إعدادات Firebase وOGAds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">إعدادات النظام والتكامل مع الخدمات الخارجية</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
