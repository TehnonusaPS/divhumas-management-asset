import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Statistik() {
    const [auditTrails] = useState([
        { id: 1, action: 'Pengubahan Spesifikasi Aset Server Dell', user: 'Admin Asset', role: 'admin-asset', date: '15 Jun 2026 10:20 WIB', level: 'Kritis' },
        { id: 2, action: 'Penambahan Aset Baru Kamera DSLR R6', user: 'Admin Asset', role: 'admin-asset', date: '15 Jun 2026 09:12 WIB', level: 'Info' },
        { id: 3, action: 'Penghapusan User Akun Kadaluarsa', user: 'Super Admin', role: 'super-admin', date: '14 Jun 2026 17:40 WIB', level: 'Kritis' },
        { id: 4, action: 'Pembaruan Status Tiket Kerusakan AC', user: 'Teknisi', role: 'teknisi', date: '14 Jun 2026 15:30 WIB', level: 'Info' },
    ]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
                            Dashboard & Statistik Aset
                        </h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Analisis nilai kapitalisasi aset, biaya pemeliharaan, dan lacak catatan audit trail perubahan data kritis.
                        </p>
                    </div>
                    <button 
                        onClick={handlePrint}
                        className="inline-flex justify-center items-center gap-1.5 rounded-xl bg-black/40 border border-red-950/30 hover:border-red-500/30 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:text-white hover:bg-[#1a1a1a] shadow-sm transition-all"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-12h.01" /></svg>
                        Cetak Laporan Resmi
                    </button>
                </div>
            }
        >
            <Head title="Dashboard & Statistik" />

            <div className="py-8 print:py-0 print:bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 print:space-y-0">
                    
                    {/* Charts & Graphs (Hidden in print) */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 print:hidden">
                        <div className="lg:col-span-2 rounded-2xl bg-black/60 p-6 shadow-lg border border-red-950/25 backdrop-blur-md space-y-4">
                            <h3 className="text-lg font-bold text-white font-serif">Grafik Penyusutan Aset IT (1 Tahun Terakhir)</h3>
                            
                            <div className="h-56 w-full flex items-end justify-between bg-black/40 rounded-xl p-6 border border-red-950/15">
                                {/* Visualizing Depreciations with Bars */}
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="bg-gradient-to-t from-[#8B0000] to-[#E8192C] w-8 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(232,25,44,0.3)]" style={{ height: '140px' }}></div>
                                    <span className="text-[10px] font-semibold text-zinc-500">Q1 2025</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="bg-gradient-to-t from-[#8B0000] to-[#E8192C] w-8 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(232,25,44,0.3)]" style={{ height: '125px' }}></div>
                                    <span className="text-[10px] font-semibold text-zinc-500">Q2 2025</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="bg-gradient-to-t from-[#8B0000] to-[#E8192C] w-8 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(232,25,44,0.3)]" style={{ height: '110px' }}></div>
                                    <span className="text-[10px] font-semibold text-zinc-500">Q3 2025</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="bg-gradient-to-t from-[#8B0000] to-[#E8192C] w-8 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(232,25,44,0.3)]" style={{ height: '95px' }}></div>
                                    <span className="text-[10px] font-semibold text-zinc-500">Q4 2025</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="bg-gradient-to-t from-[#8B0000] to-[#E8192C] w-8 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(232,25,44,0.3)]" style={{ height: '80px' }}></div>
                                    <span className="text-[10px] font-semibold text-zinc-500">Q1 2026</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-black/60 p-6 shadow-lg border border-red-950/25 backdrop-blur-md space-y-4">
                            <h3 className="text-lg font-bold text-white font-serif">Alokasi Anggaran Pemeliharaan</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1.5"><span className="text-zinc-400">Komputer & Laptop</span><span className="text-white">Rp 18.200.000 (40%)</span></div>
                                    <div className="w-full bg-[#0a0a0a] border border-red-950/20 rounded-full h-2"><div className="bg-[#E8192C] h-2 rounded-full shadow-[0_0_8px_rgba(232,25,44,0.3)]" style={{ width: '40%' }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1.5"><span className="text-zinc-400">Jaringan & Server</span><span className="text-white">Rp 15.100.000 (33%)</span></div>
                                    <div className="w-full bg-[#0a0a0a] border border-red-950/20 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1.5"><span className="text-zinc-400">Fasilitas Gedung</span><span className="text-white">Rp 12.000.000 (27%)</span></div>
                                    <div className="w-full bg-[#0a0a0a] border border-red-950/20 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '27%' }}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audit Trail Log (Hidden in print) */}
                    <div className="rounded-2xl bg-black/60 p-6 shadow-lg border border-red-950/25 backdrop-blur-md space-y-4 print:hidden">
                        <h3 className="text-lg font-bold text-white font-serif">Audit Trail Perubahan Data Kritis</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-zinc-300">
                                <thead>
                                    <tr className="text-zinc-400 border-b border-red-950/25">
                                        <th className="pb-3 font-semibold">Tindakan Aktivitas</th>
                                        <th className="pb-3 font-semibold">User Pelaksana</th>
                                        <th className="pb-3 font-semibold">Role</th>
                                        <th className="pb-3 font-semibold">Tingkat Risiko</th>
                                        <th className="pb-3 font-semibold text-right">Waktu Kejadian</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-red-950/15">
                                    {auditTrails.map((trail) => (
                                        <tr key={trail.id} className="hover:bg-red-950/10 transition">
                                            <td className="py-3.5 font-semibold text-white">{trail.action}</td>
                                            <td className="py-3.5 text-zinc-350">{trail.user}</td>
                                            <td className="py-3.5"><span className="text-xs uppercase bg-black/80 border border-red-950/25 px-2 py-0.5 rounded-md font-mono text-zinc-350">{trail.role}</span></td>
                                            <td className="py-3.5">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    trail.level === 'Kritis' 
                                                        ? 'bg-[#E8192C]/10 text-[#E8192C] border border-[#E8192C]/20' 
                                                        : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                                                }`}>
                                                    {trail.level}
                                                </span>
                                            </td>
                                            <td className="py-3.5 text-right text-zinc-500 text-xs">{trail.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Official Instansi Report Preview (Always visible, optimized for print) */}
                    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/35 text-black max-w-4xl mx-auto print:shadow-none print:border-none print:bg-white">
                        {/* Kop Surat Instansi Resmi */}
                        <div className="flex items-center justify-between border-b-4 border-double border-black pb-4 mb-6">
                            <div className="h-16 w-16 bg-gray-150 rounded-full flex items-center justify-center font-bold text-[10px] text-center border border-gray-300 print:border-black p-1 leading-tight">
                                LOGO POLRI
                            </div>
                            <div className="text-center flex-1 space-y-0.5">
                                <h1 className="text-base font-extrabold tracking-widest uppercase">KEPOLISIAN NEGARA REPUBLIK INDONESIA</h1>
                                <h2 className="text-sm font-bold tracking-wider uppercase">DIVISI HUKUM DAN HUBUNGAN MASYARAKAT (DIVHUMAS)</h2>
                                <p className="text-[10px] text-gray-500 font-medium">Jalan Trunojoyo No. 3, Kebayoran Baru, Jakarta Selatan, 12110</p>
                                <p className="text-[9px] text-gray-400">Telp: (021) 7218000 | Email: humas@polri.go.id</p>
                            </div>
                            <div className="h-16 w-16 bg-gray-150 rounded-full flex items-center justify-center font-bold text-[10px] text-center border border-gray-300 print:border-black p-1 leading-tight">
                                LOGO DIVHUMAS
                            </div>
                        </div>

                        {/* Title of Document */}
                        <div className="text-center my-6 space-y-1">
                            <h3 className="text-sm font-bold underline uppercase tracking-wider">LAPORAN MUTASI & PERKEMBANGAN NILAI ASET FISIK</h3>
                            <p className="text-[10px] text-gray-600 font-semibold font-mono">Nomor: LAP-ASET/K-08/VI/2026</p>
                        </div>

                        {/* Document Content */}
                        <div className="space-y-4 text-xs leading-relaxed text-gray-900">
                            <p>Berdasarkan hasil pencatatan data dan audit inventarisasi aset fisik pada semester pertama tahun anggaran 2026, dengan ini dilaporkan rincian mutasi modal dan penyusutan nilai kapitalisasi aset kedinasan sebagai berikut:</p>
                            
                            <table className="w-full text-left text-xs border border-gray-300 border-collapse my-4">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-300 font-bold">
                                        <th className="p-2 border-r border-gray-300">Kategori Barang</th>
                                        <th className="p-2 border-r border-gray-300">Jumlah Unit</th>
                                        <th className="p-2 border-r border-gray-300">Nilai Awal Perolehan</th>
                                        <th className="p-2">Biaya Pemeliharaan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300 font-medium">
                                    <tr className="border-b border-gray-300"><td className="p-2 border-r border-gray-300">Server & Router Jaringan</td><td className="p-2 border-r border-gray-300">12 Unit</td><td className="p-2 border-r border-gray-300">Rp 1.250.000.000</td><td className="p-2">Rp 15.100.000</td></tr>
                                    <tr className="border-b border-gray-300"><td className="p-2 border-r border-gray-300">Komputer & Laptop Kerja</td><td className="p-2 border-r border-gray-300">120 Unit</td><td className="p-2 border-r border-gray-300">Rp 2.400.000.000</td><td className="p-2">Rp 18.200.000</td></tr>
                                    <tr className="border-b border-gray-300"><td className="p-2 border-r border-gray-300">Kamera & Audio Broadcasting</td><td className="p-2 border-r border-gray-300">35 Unit</td><td className="p-2 border-r border-gray-300">Rp 870.000.000</td><td className="p-2">Rp 12.000.000</td></tr>
                                </tbody>
                            </table>

                            <p>Demikian laporan ini dibuat secara sah menggunakan database terpusat Divhumas Management Asset untuk dapat dipergunakan sebagai dokumen pertanggungjawaban operasional kedinasan.</p>
                        </div>

                        {/* Signatures */}
                        <div className="flex justify-between items-center mt-12 text-xs font-semibold">
                            <div className="space-y-12">
                                <p className="text-center">Diverifikasi Oleh,<br />Auditor Aset</p>
                                <p className="text-center underline font-bold">AKBP Budi Santoso, S.I.K.<br /><span className="text-[10px] text-gray-500 font-normal font-mono">NIP. 197808222002121004</span></p>
                            </div>
                            <div className="space-y-12">
                                <p className="text-center">Mengetahui,<br />Pimpinan Divhumas</p>
                                <p className="text-center underline font-bold">Irjen Pol. Drs. Hermawan, M.H.<br /><span className="text-[10px] text-gray-500 font-normal font-mono">NIP. 197103141995031002</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
