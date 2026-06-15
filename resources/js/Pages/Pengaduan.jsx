import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

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
                        <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
                            Riwayat & Pengaduan Kerusakan Aset
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Laporkan kerusakan aset dinas dan pantau proses pemeliharaan berkala.
                        </p>
                    </div>
                    <button 
                        onClick={() => setFormOpen(true)}
                        className="inline-flex justify-center items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all duration-300"
                    >
                        + Ajukan Pengaduan Baru
                    </button>
                </div>
            }
        >
            <Head title="Riwayat & Pengaduan" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="overflow-hidden rounded-2xl bg-black/60 shadow-lg border border-red-950/25 backdrop-blur-md">
                        <div className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white font-serif">Daftar Tiket Pengaduan Masuk</h3>
                            
                            <div className="divide-y divide-red-950/15 space-y-4">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-mono text-xs font-bold text-[#D4AF37]">{ticket.id}</span>
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    ticket.status === 'Baru' 
                                                        ? 'bg-[#E8192C]/10 text-[#E8192C] border border-[#E8192C]/20' 
                                                        : ticket.status === 'Diproses' 
                                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                }`}>
                                                    {ticket.status}
                                                </span>
                                                <span className="text-xs text-zinc-400">| Pelapor: {ticket.reporter}</span>
                                            </div>
                                            <h4 className="font-bold text-white mt-1.5">{ticket.asset}</h4>
                                            <p className="text-sm text-zinc-350">{ticket.desc}</p>
                                        </div>
                                        <div className="text-right text-xs text-zinc-500">
                                            <span>Dilaporkan pada: {ticket.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* MOCK COMPLAINT MODAL FORM */}
            {formOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#0c0c0c] border border-red-950/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white font-serif">Laporkan Kerusakan Aset</h3>
                            <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-zinc-400 hover:bg-[#1a1a1a]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Pilih Aset Bermasalah</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.asset}
                                    onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                                    className="w-full rounded-xl border border-red-950/30 bg-black/45 p-2.5 text-sm text-white focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all" 
                                    placeholder="Contoh: Laptop Lenovo L14 / AC Ruang Utama" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Kategori Barang</label>
                                <select 
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-xl border border-red-950/30 bg-[#0c0c0c] p-2.5 text-sm text-zinc-300 focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                                >
                                    <option value="Komputer">Komputer / Laptop</option>
                                    <option value="Kamera">Kamera / Audio</option>
                                    <option value="Fasilitas">Fasilitas Ruangan</option>
                                    <option value="Kendaraan">Kendaraan Dinas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Detail Kronologi Kerusakan</label>
                                <textarea 
                                    required
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full rounded-xl border border-red-950/30 bg-black/45 p-2.5 text-sm text-white focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all h-28" 
                                    placeholder="Jelaskan detail kendala barang, indikasi kerusakan, atau kronologi kejadian..." 
                                />
                            </div>
                            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 py-3 text-sm font-semibold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all">
                                Kirim Pengaduan Tiket
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
