
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: number;
  email: string;
  offer: string;
  status: 'completed' | 'pending' | 'failed';
  joinDate: string;
  subId: string;
}

const ParticipantsManagement = () => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      email: "ahmed****@gmail.com",
      offer: "تحميل التطبيق الجديد",
      status: 'completed',
      joinDate: "2024-06-15 14:30",
      subId: "user_1718456400_abc123def"
    },
    {
      id: 2,
      email: "sara****@yahoo.com",
      offer: "التسجيل في الموقع",
      status: 'pending',
      joinDate: "2024-06-15 13:20",
      subId: "user_1718452800_xyz789ghi"
    },
    {
      id: 3,
      email: "mohamed****@hotmail.com",
      offer: "مشاهدة الإعلان",
      status: 'failed',
      joinDate: "2024-06-15 12:10",
      subId: "user_1718449200_mno456pqr"
    },
    {
      id: 4,
      email: "fatima****@gmail.com",
      offer: "تحميل التطبيق الجديد",
      status: 'completed',
      joinDate: "2024-06-15 11:45",
      subId: "user_1718447700_stu789vwx"
    },
    {
      id: 5,
      email: "ali****@outlook.com",
      offer: "التسجيل في الموقع",
      status: 'pending',
      joinDate: "2024-06-15 10:30",
      subId: "user_1718443800_def123abc"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.offer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || participant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteParticipant = (id: number) => {
    setParticipants(participants.filter(p => p.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المشترك بنجاح"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400">مكتمل ✅</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">قيد الإكمال ⏳</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400">فشل ❌</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">إدارة المشتركين</CardTitle>
          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث بالبريد الإلكتروني أو العرض..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="فلترة حسب الحالة" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white">جميع الحالات</SelectItem>
                <SelectItem value="completed" className="text-white">مكتمل</SelectItem>
                <SelectItem value="pending" className="text-white">قيد الإكمال</SelectItem>
                <SelectItem value="failed" className="text-white">فشل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-gray-300">
              إجمالي المشتركين: <span className="text-white font-bold">{filteredParticipants.length}</span>
            </p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-gray-300">البريد الإلكتروني</TableHead>
                <TableHead className="text-gray-300">العرض</TableHead>
                <TableHead className="text-gray-300">الحالة</TableHead>
                <TableHead className="text-gray-300">تاريخ الانضمام</TableHead>
                <TableHead className="text-gray-300">SubID</TableHead>
                <TableHead className="text-gray-300">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id} className="border-white/20">
                  <TableCell className="text-white font-medium">{participant.email}</TableCell>
                  <TableCell className="text-gray-300">{participant.offer}</TableCell>
                  <TableCell>{getStatusBadge(participant.status)}</TableCell>
                  <TableCell className="text-gray-300">{participant.joinDate}</TableCell>
                  <TableCell className="text-gray-300 font-mono text-xs">{participant.subId}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteParticipant(participant.id)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default ParticipantsManagement;
