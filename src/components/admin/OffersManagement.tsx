
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Offer {
  id: number;
  name: string;
  url: string;
  maxParticipants: number;
  remainingParticipants: number;
  completedCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const OffersManagement = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      name: "تحميل التطبيق الجديد",
      url: "https://ogads.com/offer/123456",
      maxParticipants: 500,
      remainingParticipants: 350,
      completedCount: 150,
      status: 'active',
      createdDate: "2024-06-15"
    },
    {
      id: 2,
      name: "التسجيل في الموقع",
      url: "https://ogads.com/offer/789012",
      maxParticipants: 300,
      remainingParticipants: 180,
      completedCount: 120,
      status: 'active',
      createdDate: "2024-06-14"
    },
    {
      id: 3,
      name: "مشاهدة الإعلان",
      url: "https://ogads.com/offer/345678",
      maxParticipants: 200,
      remainingParticipants: 50,
      completedCount: 150,
      status: 'inactive',
      createdDate: "2024-06-13"
    }
  ]);

  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: '',
    url: '',
    maxParticipants: 0
  });

  const handleAddOffer = () => {
    if (!newOffer.name || !newOffer.url || !newOffer.maxParticipants) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const offer: Offer = {
      id: Date.now(),
      name: newOffer.name,
      url: newOffer.url,
      maxParticipants: newOffer.maxParticipants,
      remainingParticipants: newOffer.maxParticipants,
      completedCount: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setOffers([...offers, offer]);
    setNewOffer({ name: '', url: '', maxParticipants: 0 });
    setShowAddDialog(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة العرض الجديد"
    });
  };

  const handleDeleteOffer = (id: number) => {
    setOffers(offers.filter(offer => offer.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف العرض بنجاح"
    });
  };

  const toggleOfferStatus = (id: number) => {
    setOffers(offers.map(offer => 
      offer.id === id 
        ? { ...offer, status: offer.status === 'active' ? 'inactive' : 'active' }
        : offer
    ));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-500/20 text-green-400">نشط</Badge>
    ) : (
      <Badge className="bg-red-500/20 text-red-400">متوقف</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">إدارة العروض</CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                إضافة عرض جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">إضافة عرض جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">اسم العرض</Label>
                  <Input
                    value={newOffer.name}
                    onChange={(e) => setNewOffer({...newOffer, name: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="مثال: تحميل التطبيق"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">رابط العرض (OGAds)</Label>
                  <Input
                    value={newOffer.url}
                    onChange={(e) => setNewOffer({...newOffer, url: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://ogads.com/offer/123456"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">عدد المشاركات المطلوبة</Label>
                  <Input
                    type="number"
                    value={newOffer.maxParticipants}
                    onChange={(e) => setNewOffer({...newOffer, maxParticipants: parseInt(e.target.value)})}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddOffer} className="bg-green-500 hover:bg-green-600">
                    إضافة العرض
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-gray-300">اسم العرض</TableHead>
                <TableHead className="text-gray-300">الرابط</TableHead>
                <TableHead className="text-gray-300">المطلوب/المكتمل</TableHead>
                <TableHead className="text-gray-300">المتبقي</TableHead>
                <TableHead className="text-gray-300">الحالة</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id} className="border-white/20">
                  <TableCell className="text-white font-medium">{offer.name}</TableCell>
                  <TableCell className="text-gray-300">
                    <a href={offer.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {offer.url.substring(0, 30)}...
                    </a>
                  </TableCell>
                  <TableCell className="text-white">
                    {offer.completedCount}/{offer.maxParticipants}
                  </TableCell>
                  <TableCell className="text-white">{offer.remainingParticipants}</TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleOfferStatus(offer.id)}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {offer.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffersManagement;
