import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Aset() {
    const [assets, setAssets] = useState([
        { id: 'AST-POL-2026-001', name: 'Server Rack Dell PowerEdge', type: 'Server', serial: 'DELL-98X12', condition: 'Sangat Baik', status: 'Aktif', dateAdded: '10 Jan 2026' },
        { id: 'AST-POL-2026-015', name: 'Kamera DSLR Canon EOS R6', type: 'Kamera', serial: 'CAN-R6-8821', condition: 'Baik', status: 'Dipinjam', dateAdded: '22 Feb 2026' },
        { id: 'AST-POL-2026-089', name: 'Laptop Lenovo ThinkPad L14', type: 'Komputer', serial: 'LEN-L14-77312', condition: 'Baik', status: 'Aktif', dateAdded: '05 Mar 2026' },
        { id: 'AST-POL-2026-104', name: 'Mobil Toyota Avanza (Dinas)', type: 'Kendaraan', serial: 'TOY-AV-6612A', condition: 'Kurang Baik', status: 'Maintenance', dateAdded: '12 Apr 2026' },
    ]);

    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', type: 'Komputer', serial: '', condition: 'Baik' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAsset = {
            id: `AST-POL-2026-0${Math.floor(Math.random() * 900 + 100)}`,
            name: formData.name,
            type: formData.type,
            serial: formData.serial || 'N/A',
            condition: formData.condition,
            status: 'Aktif',
            dateAdded: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        setAssets([newAsset, ...assets]);
        setFormOpen(false);
        setFormData({ name: '', type: 'Komputer', serial: '', condition: 'Baik' });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                            Daftar Inventaris Aset
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Kelola data aset, spesifikasi, dan kondisi fisik operasional instansi.
                        </p>
                    </div>
                    <button 
                        onClick={() => setFormOpen(true)}
                        className="inline-flex justify-center items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all duration-300"
                    >
                        + Daftarkan Aset Baru
                    </button>
                </div>
            }
        >
            <Head title="Manajemen Aset" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 shadow-lg border border-slate-200 dark:border-slate-800 backdrop-blur-md">
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                                <thead>
                                    <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                        <th className="pb-3 font-semibold">Kode Aset</th>
                                        <th className="pb-3 font-semibold">Nama Barang</th>
                                        <th className="pb-3 font-semibold">Kategori</th>
                                        <th className="pb-3 font-semibold">Nomor Seri</th>
                                        <th className="pb-3 font-semibold">Kondisi</th>
                                        <th className="pb-3 font-semibold">Status</th>
                                        <th className="pb-3 font-semibold">Tgl Masuk</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                    {assets.map((asset) => (
                                        <tr key={asset.id} className="hover:bg-red-950/10 transition">
                                            <td className="py-4 font-mono text-xs font-bold text-[#D4AF37]">{asset.id}</td>
                                            <td className="py-4 font-semibold text-slate-900 dark:text-white">{asset.name}</td>
                                            <td className="py-4 text-slate-700 dark:text-slate-300">{asset.type}</td>
                                            <td className="py-4 font-mono text-xs text-slate-400 dark:text-slate-500">{asset.serial}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    asset.condition === 'Sangat Baik' || asset.condition === 'Baik' 
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                    {asset.condition}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    asset.status === 'Aktif' 
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                                        : asset.status === 'Dipinjam' 
                                                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' 
                                                            : 'bg-red-50 dark:bg-red-500/10 text-[#E8192C] border border-[#E8192C]/20'
                                                }`}>
                                                    {asset.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-slate-500 dark:text-slate-400">{asset.dateAdded}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* MOCK REGISTRATION FORM MODAL */}
            {formOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-900 dark:text-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Daftarkan Aset Baru</h3>
                            <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#1a1a1a]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Nama Barang</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all" 
                                    placeholder="Contoh: Laptop Lenovo L14" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Kategori</label>
                                    <select 
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2.5 text-sm text-slate-700 dark:text-slate-300 focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                                    >
                                        <option value="Komputer">Komputer</option>
                                        <option value="Server">Server</option>
                                        <option value="Kamera">Kamera</option>
                                        <option value="Kendaraan">Kendaraan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Kondisi Awal</label>
                                    <select 
                                        value={formData.condition}
                                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2.5 text-sm text-slate-700 dark:text-slate-300 focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                                    >
                                        <option value="Sangat Baik">Sangat Baik</option>
                                        <option value="Baik">Baik</option>
                                        <option value="Kurang Baik">Kurang Baik</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Nomor Seri (Serial Number)</label>
                                <input 
                                    type="text" 
                                    value={formData.serial}
                                    onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all" 
                                    placeholder="Contoh: SN-128XJ9" 
                                />
                            </div>
                            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 py-3 text-sm font-semibold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all">
                                Daftarkan Aset
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
