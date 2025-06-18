
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Upload, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Winner {
  id: number;
  email: string;
  prize: string;
  winDate: string;
  deliveryStatus: 'pending' | 'delivered' | 'confirmed';
  deliveryProof?: string;
  deliveryNotes?: string;
}

const WinnersManagement = () => {
  const { toast } = useToast();
  const [winners, setWinners] = useState<Winner[]>([
    {
      id: 1,
      email: "ahmed****@gmail.com",
      prize: "iPhone 15 Pro",
      winDate: "2024-06-15",
      deliveryStatus: 'delivered',
      deliveryProof: "https://example.com/proof1.jpg",
      deliveryNotes: "تم التسليم بنجاح عبر البريد السريع"
    },
    {
      id: 2,
      email: "sara****@yahoo.com",
      prize: "PlayStation 5",
      winDate: "2024-06-14",
      deliveryStatus: 'pending',
      deliveryNotes: "في انتظار تأكيد العنوان"
    },
    {
      id: 3,
      email: "mohamed****@hotmail.com",
      prize: "Cash Prize - $500",
      winDate: "2024-06-13",
      deliveryStatus: 'confirmed',
      deliveryProof: "https://example.com/transfer_proof.jpg",
      deliveryNotes: "تم التحويل البنكي"
    }
  ]);

  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);
  const [deliveryProofFile, setDeliveryProofFile] = useState<File | null>(null);

  const handleUpdateWinner = () => {
    if (!editingWinner) return;

    setWinners(winners.map(winner => 
      winner.id === editingWinner.id ? editingWinner : winner
    ));

    setEditingWinner(null);
    setDeliveryProofFile(null);

    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات الفائز بنجاح"
    });
  };

  const handleDeleteWinner = (id: number) => {
    setWinners(winners.filter(winner => winner.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف الفائز من القائمة"
    });
  };

  const getDeliveryStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500/20 text-green-400">تم التسليم ✅</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">في الانتظار ⏳</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500/20 text-blue-400">مؤكد 📋</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">إدارة الفائزين</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-gray-300">البريد الإلكتروني</TableHead>
                <TableHead className="text-gray-300">الجائزة</TableHead>
                <TableHead className="text-gray-300">تاريخ الفوز</TableHead>
                <TableHead className="text-gray-300">حالة التسليم</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winners.map((winner) => (
                <TableRow key={winner.id} className="border-white/20">
                  <TableCell className="text-white font-medium">{winner.email}</TableCell>
                  <TableCell className="text-gray-300">{winner.prize}</TableCell>
                  <TableCell className="text-gray-300">{winner.winDate}</TableCell>
                  <TableCell>{getDeliveryStatusBadge(winner.deliveryStatus)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {winner.deliveryProof && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(winner.deliveryProof, '_blank')}
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingWinner(winner)}
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">تعديل بيانات الفائز</DialogTitle>
                          </DialogHeader>
                          {editingWinner && (
                            <div className="space-y-4">
                              <div>
                                <Label className="text-gray-300">البريد الإلكتروني</Label>
                                <Input
                                  value={editingWinner.email}
                                  onChange={(e) => setEditingWinner({...editingWinner, email: e.target.value})}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">الجائزة</Label>
                                <Input
                                  value={editingWinner.prize}
                                  onChange={(e) => setEditingWinner({...editingWinner, prize: e.target.value})}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">حالة التسليم</Label>
                                <select
                                  value={editingWinner.deliveryStatus}
                                  onChange={(e) => setEditingWinner({...editingWinner, deliveryStatus: e.target.value as 'pending' | 'delivered' | 'confirmed'})}
                                  className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded"
                                >
                                  <option value="pending">في الانتظار</option>
                                  <option value="delivered">تم التسليم</option>
                                  <option value="confirmed">مؤكد</option>
                                </select>
                              </div>
                              <div>
                                <Label className="text-gray-300">ملاحظات التسليم</Label>
                                <Textarea
                                  value={editingWinner.deliveryNotes || ''}
                                  onChange={(e) => setEditingWinner({...editingWinner, deliveryNotes: e.target.value})}
                                  className="bg-gray-800 border-gray-600 text-white"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label className="text-gray-300">رفع إثبات التسليم</Label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setDeliveryProofFile(e.target.files?.[0] || null)}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setEditingWinner(null)}>
                                  إلغاء
                                </Button>
                                <Button onClick={handleUpdateWinner} className="bg-green-500 hover:bg-green-600">
                                  حفظ التغييرات
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteWinner(winner.id)}
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

export default WinnersManagement;
