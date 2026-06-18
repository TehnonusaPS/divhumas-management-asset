import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Label from '@/Components/ui/Label';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import Button from '@/Components/ui/Button';

export default function Pengaduan() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [tickets, setTickets] = useState([
        { id: 'TKT-001', asset: 'AC Ruang Media', category: 'Fasilitas', reporter: 'Ilham', status: 'Baru', desc: 'AC tidak dingin dan mengeluarkan bunyi berisik.', date: '15 Jun 2026' },
        { id: 'TKT-002', asset: 'Printer Epson L3110', category: 'Komputer', reporter: 'Riri', status: 'Diproses', desc: 'Kertas sering macet saat mencetak dokumen.', date: '14 Jun 2026' },
        { id: 'TKT-004', asset: 'Kamera DSLR Canon', category: 'Kamera', reporter: user.name, status: 'Selesai', desc: 'Lensa kamera berjamur dan autofokus macet.', date: '10 Jun 2026' },
    ]);

    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({ asset: '', category: 'Komputer', desc: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            id: `TKT-00${tickets.length + 1}`,
            asset: formData.asset,
            category: formData.category,
            reporter: user.name,
            status: 'Baru',
            desc: formData.desc,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        setTickets([newTicket, ...tickets]);
        setFormOpen(false);
        setFormData({ asset: '', category: 'Komputer', desc: '' });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                            Riwayat & Pengaduan Kerusakan Aset
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Laporkan kerusakan aset dinas dan pantau proses pemeliharaan berkala.
                        </p>
                    </div>
                    <Button 
                        onClick={() => setFormOpen(true)}
                        variant="primary"
                    >
                        + Ajukan Pengaduan Baru
                    </Button>
                </div>
            }
        >
            <Head title="Riwayat & Pengaduan" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Tiket Pengaduan Masuk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y divide-border/60 space-y-4">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-mono text-xs font-bold text-[#D4AF37]">{ticket.id}</span>
                                                <Badge variant={ticket.status === 'Baru' ? 'danger' : ticket.status === 'Diproses' ? 'warning' : 'success'}>
                                                    {ticket.status}
                                                </Badge>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">| Pelapor: {ticket.reporter}</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mt-1.5">{ticket.asset}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">{ticket.desc}</p>
                                        </div>
                                        <div className="text-right text-xs text-slate-400 dark:text-slate-500">
                                            <span>Dilaporkan pada: {ticket.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* MOCK COMPLAINT MODAL FORM */}
            <Modal show={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-foreground font-serif">Laporkan Kerusakan Aset</h3>
                    <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-muted hover:bg-background cursor-pointer">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="asset">Pilih Aset Bermasalah</Label>
                        <Input 
                            type="text" 
                            id="asset"
                            required
                            value={formData.asset}
                            onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                            placeholder="Contoh: Laptop Lenovo L14 / AC Ruang Utama" 
                        />
                    </div>
                    <div>
                        <Label htmlFor="category">Kategori Barang</Label>
                        <Select 
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Komputer">Komputer / Laptop</option>
                            <option value="Kamera">Kamera / Audio</option>
                            <option value="Fasilitas">Fasilitas Ruangan</option>
                            <option value="Kendaraan">Kendaraan Dinas</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="desc">Detail Kronologi Kerusakan</Label>
                        <Textarea 
                            id="desc"
                            required
                            value={formData.desc}
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                            placeholder="Jelaskan detail kendala barang, indikasi kerusakan, atau kronologi kejadian..." 
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Kirim Pengaduan Tiket
                    </Button>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
