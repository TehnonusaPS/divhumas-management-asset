import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function PencarianAset() {
    const mockAssets = [
        { id: 'AST-POL-2026-001', name: 'Server Dell PowerEdge', type: 'Server', serial: 'DELL-98X12', condition: 'Sangat Baik' },
        { id: 'AST-POL-2026-015', name: 'Kamera DSLR Canon EOS R6', type: 'Kamera', serial: 'CAN-R6-8821', condition: 'Baik' },
        { id: 'AST-POL-2026-089', name: 'Laptop Lenovo ThinkPad L14', type: 'Komputer', serial: 'LEN-L14-77312', condition: 'Baik' },
        { id: 'AST-POL-2026-104', name: 'Mobil Toyota Avanza (Dinas)', type: 'Kendaraan', serial: 'TOY-AV-6612A', condition: 'Kurang Baik' },
        { id: 'AST-POL-2026-218', name: 'Air Conditioner LG DualCool 1.5 PK', type: 'Fasilitas', serial: 'LG-AC-188A', condition: 'Baik' },
        { id: 'AST-POL-2026-319', name: 'Printer HP LaserJet Pro M404', type: 'Komputer', serial: 'HP-LJ-3392A', condition: 'Sangat Baik' },
    ];

    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('Semua');
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const filteredAssets = mockAssets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || 
                              asset.id.toLowerCase().includes(search.toLowerCase()) ||
                              asset.serial.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'Semua' || asset.type === filterType;
        return matchesSearch && matchesType;
    });

    const openQrModal = (asset) => {
        setSelectedAsset(asset);
        setQrModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                        Daftar & Pencarian Aset
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Cari aset berdasarkan ID, serial number, spesifikasi, dan kelola label kode QR.
                    </p>
                </div>
            }
        >
            <Head title="Pencarian Aset" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Filters Container */}
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-500">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                                placeholder="Cari nama barang, kode aset, atau S/N..."
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto items-center">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Filter Kategori:</span>
                            <select 
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 px-3 text-sm font-medium text-slate-700 dark:text-slate-300 focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Komputer">Komputer</option>
                                <option value="Server">Server</option>
                                <option value="Kamera">Kamera</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Fasilitas">Fasilitas</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 shadow-lg border border-slate-200 dark:border-slate-800 backdrop-blur-md">
                        <div className="p-6 overflow-x-auto">
                            {filteredAssets.length > 0 ? (
                                <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                                    <thead>
                                        <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                            <th className="pb-3 font-semibold">Kode Aset</th>
                                            <th className="pb-3 font-semibold">Nama Barang</th>
                                            <th className="pb-3 font-semibold">Kategori</th>
                                            <th className="pb-3 font-semibold">Serial Number</th>
                                            <th className="pb-3 font-semibold text-center">Label QR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                        {filteredAssets.map((asset) => (
                                            <tr key={asset.id} className="hover:bg-red-950/10 transition">
                                                <td className="py-4 font-mono text-xs font-bold text-[#D4AF37]">{asset.id}</td>
                                                <td className="py-4 font-semibold text-slate-900 dark:text-white">{asset.name}</td>
                                                <td className="py-4 text-slate-700 dark:text-slate-300">{asset.type}</td>
                                                <td className="py-4 font-mono text-xs text-slate-400 dark:text-slate-500">{asset.serial}</td>
                                                <td className="py-4 text-center">
                                                    <button 
                                                        onClick={() => openQrModal(asset)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-black/40 border border-slate-200 dark:border-slate-800 hover:border-red-500/30 text-gray-300 hover:text-slate-900 dark:text-white px-3 py-1.5 text-xs font-semibold hover:bg-red-950/20 transition-all"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01" /></svg>
                                                        Tampilkan QR
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-10 text-slate-400 dark:text-slate-500">
                                    Aset yang Anda cari tidak ditemukan.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* QR CODE LABEL VISUAL MODAL */}
            {qrModalOpen && selectedAsset && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 text-slate-900 dark:text-white">
                        <div className="flex justify-between items-center pb-2 border-b border-red-950/20">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Label QR Aset Resmi</h3>
                            <button onClick={() => setQrModalOpen(false)} className="rounded-full p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#1a1a1a]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        {/* QR Code Graphic Label */}
                        <div className="p-4 bg-white rounded-2xl border-2 border-gray-150 flex flex-col items-center gap-3 text-black">
                            <p className="text-[10px] tracking-widest font-extrabold uppercase text-gray-500">DIVISI HUMAS POLRI</p>
                            {/* Visual QR Code Generator Simulation */}
                            <div className="h-40 w-40 bg-gray-50 border border-gray-200 flex items-center justify-center p-2 rounded-xl">
                                <svg className="h-full w-full text-black" viewBox="0 0 100 100" fill="currentColor">
                                    <rect x="5" y="5" width="25" height="25" />
                                    <rect x="10" y="10" width="15" height="15" fill="white" />
                                    <rect x="13" y="13" width="9" height="9" />
                                    
                                    <rect x="70" y="5" width="25" height="25" />
                                    <rect x="75" y="10" width="15" height="15" fill="white" />
                                    <rect x="78" y="13" width="9" height="9" />
                                    
                                    <rect x="5" y="70" width="25" height="25" />
                                    <rect x="10" y="75" width="15" height="15" fill="white" />
                                    <rect x="13" y="78" width="9" height="9" />
 
                                    <rect x="40" y="15" width="10" height="5" />
                                    <rect x="55" y="25" width="5" height="15" />
                                    <rect x="35" y="45" width="20" height="10" />
                                    <rect x="65" y="50" width="10" height="20" />
                                    <rect x="45" y="70" width="15" height="5" />
                                    <rect x="80" y="80" width="15" height="15" />
                                </svg>
                            </div>
                            <div className="text-center space-y-0.5">
                                <p className="font-mono text-sm font-bold">{selectedAsset.id}</p>
                                <p className="text-[11px] font-semibold text-gray-600">{selectedAsset.name}</p>
                                <p className="text-[9px] text-gray-400">S/N: {selectedAsset.serial}</p>
                            </div>
                        </div>
 
                        <div className="flex gap-2">
                            <button 
                                onClick={() => alert('Mengirim perintah cetak ke Printer Label...')}
                                className="flex-1 inline-flex justify-center items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 py-3 text-xs font-bold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all duration-300"
                            >
                                Cetak Label
                            </button>
                            <button 
                                onClick={() => setQrModalOpen(false)}
                                className="flex-1 rounded-xl bg-black/40 border border-slate-200 dark:border-slate-800 hover:border-red-500/30 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-[#1a1a1a] transition-all"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
