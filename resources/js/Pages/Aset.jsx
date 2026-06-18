import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Label from '@/Components/ui/Label';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Button from '@/Components/ui/Button';

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

    const columns = [
        { key: 'id', label: 'Kode Aset', className: 'font-mono text-xs font-bold text-[#D4AF37]' },
        { key: 'name', label: 'Nama Barang', className: 'font-semibold text-foreground' },
        { key: 'type', label: 'Kategori' },
        { key: 'serial', label: 'Nomor Seri', className: 'font-mono text-xs text-muted' },
        {
            key: 'condition',
            label: 'Kondisi',
            render: (row) => (
                <Badge variant={row.condition === 'Sangat Baik' || row.condition === 'Baik' ? 'success' : 'warning'}>
                    {row.condition}
                </Badge>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => {
                const statusMap = {
                    Aktif: <Badge variant="success">Aktif</Badge>,
                    Dipinjam: <Badge variant="secondary">Dipinjam</Badge>,
                    Maintenance: <Badge variant="danger">Maintenance</Badge>
                };
                return statusMap[row.status] || <Badge variant="default">{row.status}</Badge>;
            }
        },
        { key: 'dateAdded', label: 'Tgl Masuk', className: 'text-muted' },
    ];

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
                    <Button 
                        onClick={() => setFormOpen(true)}
                        variant="primary"
                    >
                        + Daftarkan Aset Baru
                    </Button>
                </div>
            }
        >
            <Head title="Manajemen Aset" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <DataTable
                        columns={columns}
                        data={assets}
                    />
                </div>
            </div>

            {/* MOCK REGISTRATION FORM MODAL */}
            <Modal show={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-foreground font-serif">Daftarkan Aset Baru</h3>
                    <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-muted hover:bg-background cursor-pointer">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nama Barang</Label>
                        <Input 
                            type="text" 
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Contoh: Laptop Lenovo L14" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="type">Kategori</Label>
                            <Select 
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Komputer">Komputer</option>
                                <option value="Server">Server</option>
                                <option value="Kamera">Kamera</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Lainnya">Lainnya</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="condition">Kondisi Awal</Label>
                            <Select 
                                id="condition"
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            >
                                <option value="Sangat Baik">Sangat Baik</option>
                                <option value="Baik">Baik</option>
                                <option value="Kurang Baik">Kurang Baik</option>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="serial">Nomor Seri (Serial Number)</Label>
                        <Input 
                            type="text" 
                            id="serial"
                            value={formData.serial}
                            onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                            placeholder="Contoh: SN-128XJ9" 
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Daftarkan Aset
                    </Button>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
