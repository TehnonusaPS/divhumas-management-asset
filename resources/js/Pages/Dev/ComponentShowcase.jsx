import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Squares2X2Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PlusIcon, Cog6ToothIcon, TrashIcon, CircleStackIcon, WrenchScrewdriverIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import ShowcaseSection, { ShowcaseItem } from './components/ShowcaseSection';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import Select from '@/Components/ui/Select';
import Textarea from '@/Components/ui/Textarea';
import Checkbox from '@/Components/ui/Checkbox';
import Badge from '@/Components/ui/Badge';
import Label from '@/Components/ui/Label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/Components/ui/Card';
import Modal from '@/Components/Modal';
import DataTable from '@/Components/DataTable';
import StatCard from '@/Components/StatCard';
import ThemeToggle from '@/Components/ThemeToggle';
import PageHeader from '@/Components/PageHeader';

export default function ComponentShowcase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [testCheckbox, setTestCheckbox] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter helper
    const match = (keywords) => {
        if (!searchQuery) return true;
        return keywords.toLowerCase().includes(searchQuery.toLowerCase());
    };

    // Sample data for DataTable
    const sampleAssets = [
        { id: 1, code: 'AST-2026-001', name: 'MacBook Pro 16" M3', category: 'IT Device', status: 'active', location: 'Ruang Server' },
        { id: 2, code: 'AST-2026-002', name: 'Sony Alpha 7 IV', category: 'Multimedia', status: 'maintenance', location: 'Studio Foto' },
        { id: 3, code: 'AST-2026-003', name: 'Router Cisco Catalyst', category: 'Networking', status: 'active', location: 'Gedung Adhi Pradana' },
        { id: 4, code: 'AST-2026-004', name: 'Drone DJI Inspire 3', category: 'Multimedia', status: 'disposed', location: 'Gudang Logistik' },
    ];

    const columns = [
        { key: 'code', label: 'Kode Aset', className: 'font-semibold text-primary' },
        { key: 'name', label: 'Nama Aset', className: 'font-bold' },
        { key: 'category', label: 'Kategori' },
        {
            key: 'status',
            label: 'Status',
            render: (row) => {
                const statusMap = {
                    active: <Badge variant="success">Aktif</Badge>,
                    maintenance: <Badge variant="warning">Pemeliharaan</Badge>,
                    disposed: <Badge variant="danger">Disposisi</Badge>,
                };
                return statusMap[row.status] || <Badge variant="default">{row.status}</Badge>;
            }
        },
        { key: 'location', label: 'Lokasi' },
    ];

    return (
        <>
            <Head title="UI Component Showcase" />

            {/* Background elements */}
            <div className="bg-scene" />
            <div className="grid-overlay" />

            <div className="min-h-screen bg-transparent text-foreground relative z-10 transition-colors duration-300">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-card/85 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                            <Squares2X2Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-lg tracking-wider text-foreground">UI SHOWCASE</h1>
                            <span className="text-[10px] font-bold text-primary tracking-widest block uppercase">Divhumas Management Asset</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button variant="primary" size="sm" href="/">
                            Kembali ke Beranda
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                    {/* Intro */}
                    <Card className="md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <h2 className="text-3xl font-extrabold tracking-tight">Component Gallery</h2>
                            <p className="text-muted text-sm leading-relaxed">
                                Dokumentasi dan katalog komponen UI reusable untuk sistem manajemen aset Divhumas Polri.
                                Seluruh komponen dirancang agar responsif terhadap mode terang/gelap secara otomatis.
                            </p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Cari komponen (contoh: button, input)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
                            />
                        </div>
                    </Card>

                    {/* Component Sections Container */}
                    <div className="space-y-12">
                        {/* SECTION 1: BUTTONS */}
                        <ShowcaseSection
                            title="Button Components"
                            description="Variasi tombol interaktif dengan berbagai jenis style, varian warna, dan ukuran."
                            match={match('button tombol action click size variant')}
                        >
                            <ShowcaseItem label="Varian Warna & Style (Variants)">
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button variant="primary">Primary (Polri Red)</Button>
                                    <Button variant="secondary">Secondary (Polri Gold)</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="danger">Danger</Button>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Varian Ukuran (Sizes)">
                                <div className="flex flex-wrap gap-4 items-end">
                                    <Button size="sm">Small (sm)</Button>
                                    <Button size="md">Medium (md)</Button>
                                    <Button size="lg">Large (lg)</Button>
                                    <Button size="icon" variant="outline">
                                        <Cog6ToothIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Tombol Dengan Ikon">
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button variant="primary">
                                        <PlusIcon className="h-5 w-5 mr-2" />
                                        Tambah Aset
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Cog6ToothIcon className="h-4 w-4 mr-1.5" />
                                        Pengaturan
                                    </Button>
                                    <Button variant="danger" size="sm">
                                        <TrashIcon className="h-4 w-4 mr-1.5" />
                                        Hapus Aset
                                    </Button>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Status Disabled">
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button variant="primary" disabled>Disabled Primary</Button>
                                    <Button variant="secondary" disabled>Disabled Secondary</Button>
                                    <Button variant="outline" disabled>Disabled Outline</Button>
                                    <Button variant="danger" disabled>Disabled Danger</Button>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 2: FORM CONTROLS */}
                        <ShowcaseSection
                            title="Form Controls"
                            description="Komponen input teks, dropdown select, checkbox, dan textarea."
                            match={match('input select textarea form control text check')}
                        >
                            <ShowcaseItem label="Text Input & Dropdown">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Nama Lengkap</Label>
                                        <Input placeholder="Contoh: Aipda Budi Santoso" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kategori Aset</Label>
                                        <Select>
                                            <option value="">Pilih Kategori...</option>
                                            <option value="it">Perangkat IT</option>
                                            <option value="multimedia">Alat Multimedia</option>
                                            <option value="network">Jaringan</option>
                                        </Select>
                                    </div>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Textarea & Checkbox">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Keterangan Kondisi</Label>
                                        <Textarea placeholder="Tuliskan deskripsi kondisi detail aset di sini..." />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Checkbox
                                            label="Saya menyetujui syarat & ketentuan peminjaman aset"
                                            checked={testCheckbox}
                                            onChange={(e) => setTestCheckbox(e.target.checked)}
                                        />
                                        <Checkbox
                                            label="Checkbox dinonaktifkan (Disabled)"
                                            disabled
                                            checked
                                        />
                                    </div>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 3: BADGES */}
                        <ShowcaseSection
                            title="Badges & Status"
                            description="Label status kecil untuk menandai kondisi aset atau data."
                            match={match('badge tag status label')}
                        >
                            <ShowcaseItem label="Solid Soft Badges (Dengan Dot Indikator)">
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Badge variant="default">Badge</Badge>
                                    <Badge variant="danger">Badge</Badge>
                                    <Badge variant="warning">Badge</Badge>
                                    <Badge variant="success">Badge</Badge>
                                    <Badge variant="info">Badge</Badge>
                                    <Badge variant="purple">Badge</Badge>
                                    <Badge variant="pink">Badge</Badge>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Outline Badges (Dengan Check Icon)">
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Badge variant="outline-success">Badge</Badge>
                                    <Badge variant="outline-info">Badge</Badge>
                                    <Badge variant="outline-danger">Badge</Badge>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        <ShowcaseSection
                            title="Composite Components"
                            description="Komponen terintegrasi seperti header halaman, kartu stats, dan data tabel."
                            match={match('table data stats header page card dialog modal')}
                        >
                            <ShowcaseItem label="Halaman Header (PageHeader)">
                                <Card className="bg-card/40">
                                    <PageHeader
                                        title="Manajemen Aset Fisik"
                                        description="Kelola dan audit seluruh aset humas polri secara terpusat."
                                        backUrl="/dev/components"
                                        actions={
                                            <>
                                                <Button variant="outline" size="sm">Ekspor Laporan</Button>
                                                <Button variant="primary" size="sm">
                                                    <PlusIcon className="h-4 w-4 mr-1.5" />
                                                    Tambah Baru
                                                </Button>
                                            </>
                                        }
                                    />
                                </Card>
                            </ShowcaseItem>

                            <ShowcaseItem label="Dialog & Modal (Modal)">
                                <div>
                                    <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                                        Buka Modal Demo
                                    </Button>
                                    
                                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md">
                                        <Card className="border-0 bg-transparent shadow-none p-6">
                                            <CardHeader className="p-0">
                                                <CardTitle className="text-xl">Konfirmasi Penghapusan Aset</CardTitle>
                                                <CardDescription>Tindakan ini tidak dapat dibatalkan.</CardDescription>
                                            </CardHeader>
                                            <CardContent className="px-0 py-4 text-sm text-muted">
                                                Apakah Anda yakin ingin menghapus aset <strong>AST-2026-001 (MacBook Pro M3)</strong> secara permanen dari basis data?
                                            </CardContent>
                                            <CardFooter className="px-0 pb-0 pt-4 flex justify-end gap-3 border-t border-border/40">
                                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                                                <Button variant="danger" onClick={() => setIsModalOpen(false)}>Hapus Aset</Button>
                                            </CardFooter>
                                        </Card>
                                    </Modal>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Kartu Statistik (StatCard)">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <StatCard
                                        title="Total Aset IT"
                                        value="1.240"
                                        icon={CircleStackIcon}
                                        trend="+12% bulan ini"
                                        trendType="positive"
                                    />
                                    <StatCard
                                        title="Sedang Dipelihara"
                                        value="24"
                                        icon={WrenchScrewdriverIcon}
                                        trend="Butuh tindakan segera"
                                        trendType="negative"
                                    />
                                    <StatCard
                                        title="Kondisi Layak Pakai"
                                        value="98.5%"
                                        icon={CheckCircleIcon}
                                        trend="Sangat baik"
                                        trendType="neutral"
                                    />
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Data Tabel (DataTable)">
                                <DataTable
                                    columns={columns}
                                    data={sampleAssets}
                                />
                            </ShowcaseItem>
                        </ShowcaseSection>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-border mt-16 py-6 text-center text-xs text-muted bg-card">
                    &copy; {new Date().getFullYear()} UI Showcase - Divisi Hubungan Masyarakat Polri.
                </footer>
            </div>
        </>
    );
}
