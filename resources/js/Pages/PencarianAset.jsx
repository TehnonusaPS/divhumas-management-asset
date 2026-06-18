import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Modal from '@/Components/ui/Modal';

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

    const columns = [
        { key: 'id', label: 'Kode Aset', className: 'font-mono text-xs font-bold text-[#D4AF37]' },
        { key: 'name', label: 'Nama Barang', className: 'font-semibold text-foreground' },
        { key: 'type', label: 'Kategori' },
        { key: 'serial', label: 'Nomor Seri', className: 'font-mono text-xs text-muted' },
        {
            key: 'actions',
            label: 'Label QR',
            className: 'text-center',
            cellClassName: 'text-center flex justify-center',
            render: (row) => (
                <Button 
                    onClick={() => openQrModal(row)}
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-1.5"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01" />
                    </svg>
                    Tampilkan QR
                </Button>
            )
        }
    ];

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
                    <div className="rounded-2xl bg-card border border-border p-6 shadow-lg backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted/60">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <Input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                                placeholder="Cari nama barang, kode aset, atau S/N..."
                            />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto items-center">
                            <span className="text-sm font-semibold text-muted whitespace-nowrap">Filter Kategori:</span>
                            <Select 
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full md:w-[200px]"
                            >
                                <option value="Semua">Semua Kategori</option>
                                <option value="Komputer">Komputer</option>
                                <option value="Server">Server</option>
                                <option value="Kamera">Kamera</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Fasilitas">Fasilitas</option>
                            </Select>
                        </div>
                    </div>

                    {/* Results Table */}
                    <DataTable
                        columns={columns}
                        data={filteredAssets}
                        emptyText="Aset yang Anda cari tidak ditemukan."
                    />

                </div>
            </div>

            {/* QR CODE LABEL VISUAL MODAL */}
            <Modal show={qrModalOpen} onClose={() => setQrModalOpen(false)} maxWidth="sm" className="p-6 space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground font-serif">Label QR Aset Resmi</h3>
                    <button onClick={() => setQrModalOpen(false)} className="rounded-full p-1.5 text-muted hover:bg-background cursor-pointer">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                {/* QR Code Graphic Label */}
                {selectedAsset && (
                    <>
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
                            <Button 
                                onClick={() => alert('Mengirim perintah cetak ke Printer Label...')}
                                variant="primary"
                                className="flex-1"
                            >
                                Cetak Label
                            </Button>
                            <Button 
                                onClick={() => setQrModalOpen(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Tutup
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
