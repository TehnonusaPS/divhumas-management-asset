import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/Card';
import Modal from '@/Components/ui/Modal';
import Badge from '@/Components/ui/Badge';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const role = user.roles?.[0] || 'pegawai';

    // State for mock interactions
    const [scanModalOpen, setScanModalOpen] = useState(false);
    const [scannedAsset, setScannedAsset] = useState(null);
    const [tickets, setTickets] = useState([
        { id: 'TKT-001', asset: 'AC Ruang Media', status: 'Baru', date: '15 Jun 2026', desc: 'AC tidak dingin dan mengeluarkan bunyi berisik' },
        { id: 'TKT-002', asset: 'Printer Epson L3110', status: 'Diproses', date: '14 Jun 2026', desc: 'Kertas sering macet saat mencetak dokumen' },
        { id: 'TKT-003', asset: 'Proyektor BenQ', status: 'Baru', date: '15 Jun 2026', desc: 'Lampu proyektor mati total' },
    ]);

    const handleTicketStatus = (id, newStatus) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const runMockScan = () => {
        setScanModalOpen(true);
        setScannedAsset(null);
        setTimeout(() => {
            setScannedAsset({
                code: 'AST-POL-2026-089',
                name: 'Laptop Lenovo ThinkPad L14',
                holder: user.name,
                condition: 'Baik',
                lastChecked: '12 Mei 2026'
            });
        }, 2500); // 2.5s simulated scan
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                            Beranda Utama
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Selamat datang kembali, <span className="font-semibold text-[#D4AF37]">{user.name}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="danger" showDot={false}>
                            Role: {role.toUpperCase().replace('-', ' ')}
                        </Badge>
                    </div>
                </div>
            }
        >
            <Head title="Beranda" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Render Dashboard based on Spatie User Role */}

                    {/* ================================================================= */}
                    {/* 1. SUPER ADMIN DASHBOARD */}
                    {/* ================================================================= */}
                    {role === 'super-admin' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <Card className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-xl bg-red-50 dark:bg-red-500/10 p-3 text-[#E8192C] border border-[#E8192C]/20">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted">Total Pengguna Aktif</p>
                                            <h4 className="text-2xl font-bold text-foreground font-serif">15 Pengguna</h4>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-xl bg-green-500/10 p-3 text-green-400 border border-green-500/20">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted">Status Sistem & DB</p>
                                            <h4 className="text-2xl font-bold text-green-400">Online / Sehat</h4>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted">Audit Trail Log Terbaru</p>
                                            <h4 className="text-2xl font-bold text-foreground font-serif">0 Peringatan</h4>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <Card className="lg:col-span-2 p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Manajemen & Kontrol Sistem</h3>
                                    <div className="border-t border-border/60 pt-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
                                                <div>
                                                    <p className="font-semibold text-sm text-foreground">Daftar Pengguna</p>
                                                    <p className="text-xs text-muted mt-0.5">Kelola informasi, ganti password, dan sesuaikan peran user.</p>
                                                </div>
                                                <Button href={route('pengguna')} variant="primary" size="sm">
                                                    Kelola
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
                                                <div>
                                                    <p className="font-semibold text-sm text-foreground">Backup Database</p>
                                                    <p className="text-xs text-muted mt-0.5">Unduh data cadangan sistem manajemen aset terbaru.</p>
                                                </div>
                                                <Button 
                                                    onClick={() => alert('Backup data diproses...')} 
                                                    variant="outline" 
                                                    size="sm"
                                                >
                                                    Backup
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Kesehatan Server</h3>
                                    <div className="space-y-4 pt-2">
                                        <div>
                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                <span className="text-muted">CPU Usage</span>
                                                <span className="text-foreground">12%</span>
                                            </div>
                                            <div className="w-full bg-[#0a0a0a] border border-border rounded-full h-2">
                                                <div className="bg-gradient-to-r from-[#C0172A] to-[#E8192C] h-2 rounded-full shadow-[0_0_10px_rgba(232,25,44,0.4)]" style={{ width: '12%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                <span className="text-muted">RAM Usage</span>
                                                <span className="text-foreground">45%</span>
                                            </div>
                                            <div className="w-full bg-[#0a0a0a] border border-border rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                <span className="text-muted">Disk Storage</span>
                                                <span className="text-foreground">28 GB / 128 GB</span>
                                            </div>
                                            <div className="w-full bg-[#0a0a0a] border border-border rounded-full h-2">
                                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* ================================================================= */}
                    {/* 2. ADMIN ASSET DASHBOARD */}
                    {/* ================================================================= */}
                    {role === 'admin-asset' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Total Aset</p>
                                    <h4 className="text-3xl font-bold text-foreground font-serif mt-1">1.248 Unit</h4>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Aset Layak Pakai</p>
                                    <h4 className="text-3xl font-bold text-green-400 font-serif mt-1">1.220 Unit</h4>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Perlu Perbaikan</p>
                                    <h4 className="text-3xl font-bold text-[#E8192C] font-serif mt-1">28 Unit</h4>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Total Nilai Aset</p>
                                    <h4 className="text-3xl font-bold text-[#D4AF37] font-serif mt-1">4.52 Miliar</h4>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <Card className="lg:col-span-2 p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-foreground font-serif">Manajemen Data & Labeling QR</h3>
                                        <Link href={route('aset')} className="text-sm text-[#D4AF37] hover:text-[#F5D060] hover:underline font-semibold">Kelola Aset &rarr;</Link>
                                    </div>
                                    <div className="border-t border-border/60 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card className="p-4 bg-background/50 border border-border flex flex-col justify-between">
                                            <div>
                                                <p className="font-bold text-foreground">Inventarisasi Baru</p>
                                                <p className="text-xs text-muted mt-1 leading-relaxed">Daftarkan data aset baru beserta spesifikasi dan nomor serinya secara lengkap.</p>
                                            </div>
                                            <Button href={route('aset')} variant="primary" className="mt-4 w-full">
                                                Tambah Aset Baru
                                            </Button>
                                        </Card>
                                        <Card className="p-4 bg-background/50 border border-border flex flex-col justify-between">
                                            <div>
                                                <p className="font-bold text-foreground">Cetak Kode QR Aset</p>
                                                <p className="text-xs text-muted mt-1 leading-relaxed">Buat file cetak label barcode & QR untuk ditempelkan pada fisik aset baru.</p>
                                            </div>
                                            <Button href={route('aset.pencarian')} variant="outline" className="mt-4 w-full">
                                                Cari & Cetak QR
                                            </Button>
                                        </Card>
                                    </div>
                                </Card>

                                <Card className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Log Aktivitas Aset</h3>
                                    <div className="flow-root">
                                        <ul className="-mb-8">
                                            <li className="relative pb-6">
                                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"></span>
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-500/10 border border-[#E8192C]/20 flex items-center justify-center text-[#E8192C] text-xs font-bold shadow-[0_0_8px_rgba(232,25,44,0.2)]">1</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0 pt-1.5">
                                                        <p className="text-xs text-foreground">Aset Laptop L14 dialokasikan ke Pegawai</p>
                                                        <span className="text-[10px] text-muted">10:45 WIB - Hari Ini</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="relative pb-6">
                                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"></span>
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold">2</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0 pt-1.5">
                                                        <p className="text-xs text-foreground">Data Aset AC Ruang Media diubah</p>
                                                        <span className="text-[10px] text-muted">Kemarin</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* ================================================================= */}
                    {/* 3. PEGAWAI / PEMEGANG ASET DASHBOARD */}
                    {/* ================================================================= */}
                    {role === 'pegawai' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <Card className="lg:col-span-2 p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Aset yang Anda Pegang</h3>
                                    <div className="border-t border-border/60 pt-4 overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="text-muted border-b border-border">
                                                    <th className="pb-3 font-semibold">Kode Aset</th>
                                                    <th className="pb-3 font-semibold">Nama Barang</th>
                                                    <th className="pb-3 font-semibold">Kondisi</th>
                                                    <th className="pb-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/40">
                                                <tr>
                                                    <td className="py-3.5 font-mono text-xs font-bold text-[#D4AF37]">AST-POL-2026-089</td>
                                                    <td className="py-3.5 text-foreground font-semibold">Laptop Lenovo ThinkPad L14</td>
                                                    <td className="py-3.5">
                                                        <Badge variant="success">Baik</Badge>
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <Link href={route('pengaduan')} className="text-xs text-[#E8192C] font-semibold hover:underline">Adukan</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3.5 font-mono text-xs font-bold text-[#D4AF37]">AST-POL-2025-412</td>
                                                    <td className="py-3.5 text-foreground font-semibold">Mouse Wireless Logitech M220</td>
                                                    <td className="py-3.5">
                                                        <Badge variant="success">Baik</Badge>
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <Link href={route('pengaduan')} className="text-xs text-[#E8192C] font-semibold hover:underline">Adukan</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>

                                <Card className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Pemindai QR Code</h3>
                                    <p className="text-xs text-muted leading-relaxed">Gunakan kamera untuk memindai kode QR fisik pada aset untuk memeriksa keaslian dan detail data aset.</p>
                                    <Button 
                                        onClick={runMockScan}
                                        variant="primary"
                                        className="w-full py-3.5 gap-2"
                                    >
                                        <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01" /></svg>
                                        Pindai QR Code Fisik
                                    </Button>
                                    <div className="border-t border-border/60 pt-4 text-center">
                                        <Link href={route('pengaduan')} className="text-xs font-semibold text-[#D4AF37] hover:text-[#F5D060] hover:underline">Lihat Riwayat Laporan Pengaduan &rarr;</Link>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* ================================================================= */}
                    {/* 4. TEKNISI / TIM PEMELIHARAAN DASHBOARD */}
                    {/* ================================================================= */}
                    {role === 'teknisi' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Adukan Tiket Masuk</p>
                                    <h4 className="text-3xl font-bold text-foreground font-serif mt-1">{tickets.filter(t => t.status === 'Baru').length} Baru</h4>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Dalam Penanganan</p>
                                    <h4 className="text-3xl font-bold text-amber-400 font-serif mt-1">{tickets.filter(t => t.status === 'Diproses').length} Antrean</h4>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Pemeliharaan Rutin</p>
                                    <h4 className="text-3xl font-bold text-[#D4AF37] font-serif mt-1">2 Aset</h4>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <Card className="lg:col-span-2 p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Penanganan Pengaduan Kerusakan Aset</h3>
                                    <div className="border-t border-border/60 pt-4 space-y-4">
                                        {tickets.map(ticket => (
                                            <div key={ticket.id} className="p-4 rounded-xl border border-border bg-background/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-mono text-xs font-bold text-muted">{ticket.id}</span>
                                                        <Badge variant={ticket.status === 'Baru' ? 'danger' : ticket.status === 'Diproses' ? 'warning' : 'success'}>
                                                            {ticket.status}
                                                        </Badge>
                                                        <span className="text-xs text-muted">| Pelapor: {ticket.reporter || 'Pegawai'}</span>
                                                    </div>
                                                    <p className="font-semibold text-foreground">{ticket.asset}</p>
                                                    <p className="text-xs text-muted">{ticket.desc}</p>
                                                    <p className="text-[10px] text-muted">Dilaporkan: {ticket.date}</p>
                                                </div>
                                                <div className="flex gap-2 w-full md:w-auto">
                                                    {ticket.status === 'Baru' && (
                                                        <Button 
                                                            onClick={() => handleTicketStatus(ticket.id, 'Diproses')}
                                                            variant="primary"
                                                            size="sm"
                                                            className="w-full md:w-auto"
                                                        >
                                                            Terima Tiket
                                                        </Button>
                                                    )}
                                                    {ticket.status === 'Diproses' && (
                                                        <Button 
                                                            onClick={() => handleTicketStatus(ticket.id, 'Selesai')}
                                                            variant="success"
                                                            size="sm"
                                                            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white border-transparent"
                                                        >
                                                            Selesai Perbaikan
                                                        </Button>
                                                    )}
                                                    {ticket.status === 'Selesai' && (
                                                        <span className="text-xs text-green-500 font-semibold py-1">Selesai Ditangani</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Jadwal Perawatan Berkala</h3>
                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-start gap-3 p-3 rounded-xl border border-dashed border-border">
                                            <div className="text-center bg-red-50 dark:bg-red-500/10 p-2 rounded-lg text-[#E8192C] border border-[#E8192C]/20 min-w-[42px]">
                                                <span className="block text-sm font-bold leading-none">18</span>
                                                <span className="text-[9px] uppercase font-bold mt-1 block">Jun</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-foreground">Maintenance AC Sentral Lt 2</p>
                                                <p className="text-[10px] text-muted mt-0.5 leading-relaxed">Pengecekan freon rutin & pembersihan filter</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 rounded-xl border border-dashed border-border">
                                            <div className="text-center bg-background/50 p-2 rounded-lg text-muted border border-border min-w-[42px]">
                                                <span className="block text-sm font-bold leading-none">24</span>
                                                <span className="text-[9px] uppercase font-bold mt-1 block">Jun</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-foreground">Kalibrasi Jaringan Server</p>
                                                <p className="text-[10px] text-muted mt-0.5 leading-relaxed">Pengujian bandwidth & switch backup</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* ================================================================= */}
                    {/* 5. PIMPINAN / AUDITOR DASHBOARD */}
                    {/* ================================================================= */}
                    {role === 'pimpinan' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Total Nilai Kapitalisasi Aset</p>
                                    <h4 className="text-3xl font-bold text-[#D4AF37] font-serif mt-1">Rp 4.520.000.000</h4>
                                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1 font-semibold">
                                        <span>&uarr; 3.2%</span> dibanding kuartal lalu
                                    </p>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Biaya Perawatan Tahun Ini</p>
                                    <h4 className="text-3xl font-bold text-foreground font-serif mt-1">Rp 45.300.000</h4>
                                    <p className="text-xs text-amber-400 mt-2 flex items-center gap-1 font-semibold">
                                        <span>75%</span> dari total batas anggaran
                                    </p>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm font-medium text-muted">Indeks Penyusutan Aset</p>
                                    <h4 className="text-3xl font-bold text-[#E8192C] font-serif mt-1">- 8.5% / Thn</h4>
                                    <p className="text-xs text-muted mt-2">Sesuai standar amortisasi barang IT</p>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <Card className="lg:col-span-2 p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-foreground font-serif">Analisis Anggaran Perawatan & Depresiasi</h3>
                                    {/* Pure SVG Line Chart with Custom Theme */}
                                    <div className="h-64 w-full flex items-center justify-center bg-background/50 border border-border rounded-xl p-4">
                                        <svg className="w-full h-full" viewBox="0 0 500 200">
                                            {/* Grid Lines */}
                                            <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(232, 25, 44, 0.1)" strokeDasharray="4" />
                                            <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(232, 25, 44, 0.1)" strokeDasharray="4" />
                                            <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(232, 25, 44, 0.1)" strokeDasharray="4" />
                                            <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(232, 25, 44, 0.25)" />
                                            
                                            {/* Valuation Line (Gold) */}
                                            <path d="M 40 160 Q 150 140, 260 90 T 480 40" fill="none" stroke="#D4AF37" strokeWidth="3" />
                                            <path d="M 40 160 Q 150 140, 260 90 T 480 40 L 480 180 L 40 180 Z" fill="url(#goldGrad)" opacity="0.15" />

                                            {/* Maintenance Expense (Crimson) */}
                                            <path d="M 40 180 Q 150 170, 260 165 T 480 150" fill="none" stroke="#E8192C" strokeWidth="2.5" />
                                            
                                            {/* Chart Gradients */}
                                            <defs>
                                                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#D4AF37" />
                                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            
                                            {/* Dots & Labels */}
                                            <circle cx="480" cy="40" r="4.5" fill="#D4AF37" />
                                            <text x="420" y="32" fill="#D4AF37" fontSize="10" fontWeight="bold">Nilai: 4.5M</text>
                                            <text x="40" y="194" fill="#71717a" fontSize="9">Jan</text>
                                            <text x="150" y="194" fill="#71717a" fontSize="9">Apr</text>
                                            <text x="260" y="194" fill="#71717a" fontSize="9">Jul</text>
                                            <text x="470" y="194" fill="#71717a" fontSize="9">Des</text>
                                        </svg>
                                    </div>
                                    <div className="flex gap-4 text-xs font-semibold justify-center flex-wrap">
                                        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#D4AF37]"></span>Nilai Kapitalisasi Aset</span>
                                        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#E8192C]"></span>Biaya Pemeliharaan</span>
                                    </div>
                                </Card>

                                <Card className="p-6 space-y-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground font-serif">Ekspor Laporan Resmi</h3>
                                        <p className="text-xs text-muted mt-2 leading-relaxed">Unduh laporan resmi perkembangan aset instansi dengan kop surat kedinasan Divhumas Polri berstandar resmi.</p>
                                    </div>
                                    <div className="space-y-2.5 mt-4">
                                        <Button href={route('statistik')} variant="primary" className="w-full">
                                            Unduh Ringkasan PDF
                                        </Button>
                                        <Button href={route('statistik')} variant="outline" className="w-full">
                                            Analisis Audit Trail (.csv)
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* MOCK QR SCANNER DIALOG MODAL */}
            <Modal show={scanModalOpen} onClose={() => setScanModalOpen(false)} maxWidth="md" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-foreground font-serif">Pemindai QR Code</h3>
                    <button onClick={() => setScanModalOpen(false)} className="rounded-full p-1.5 text-muted hover:bg-background cursor-pointer">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {!scannedAsset ? (
                    <div className="space-y-4 text-center">
                        {/* Visual Scanning Target Area */}
                        <div className="relative h-60 w-60 mx-auto rounded-2xl border-4 border-dashed border-[#E8192C] bg-[#050505] flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/55"></div>
                            {/* Scanning Laser Line */}
                            <div className="absolute left-0 right-0 h-1 bg-[#E8192C] shadow-[0_0_12px_#E8192C] animate-bounce" style={{ animationDuration: '2.5s' }}></div>
                            <svg className="h-16 w-16 text-[#E8192C]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01" /></svg>
                        </div>
                        <p className="text-sm font-semibold text-foreground animate-pulse">Menghubungkan kamera & memindai QR...</p>
                    </div>
                ) : (
                    <div className="space-y-4 bg-background/50 p-5 rounded-2xl border border-border">
                        <div className="text-center pb-2 border-b border-border">
                            <Badge variant="success">Aset Valid & Terdaftar</Badge>
                        </div>
                        <div className="space-y-2.5 text-sm">
                            <div className="flex justify-between items-center"><span className="text-muted text-xs">Kode Aset</span><span className="font-mono font-bold text-[#D4AF37]">{scannedAsset.code}</span></div>
                            <div className="flex justify-between items-center"><span className="text-muted text-xs">Nama Barang</span><span className="font-semibold text-foreground">{scannedAsset.name}</span></div>
                            <div className="flex justify-between items-center"><span className="text-muted text-xs">Pemegang</span><span className="text-foreground">{scannedAsset.holder}</span></div>
                            <div className="flex justify-between items-center"><span className="text-muted text-xs">Kondisi Fisik</span><span className="text-green-500 font-semibold">{scannedAsset.condition}</span></div>
                            <div className="flex justify-between items-center"><span className="text-muted text-xs">Audit Terakhir</span><span className="text-foreground">{scannedAsset.lastChecked}</span></div>
                        </div>
                        <div className="pt-4 flex gap-2">
                            <Button onClick={() => setScannedAsset(null)} variant="outline" className="flex-1">Pindai Ulang</Button>
                            <Button onClick={() => setScanModalOpen(false)} variant="primary" className="flex-1">Selesai</Button>
                        </div>
                    </div>
                )}
            </Modal>

        </AuthenticatedLayout>
    );
}
