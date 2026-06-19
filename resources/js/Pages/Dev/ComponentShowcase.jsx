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
import DataTable from '@/Components/data-table/DataTable';
import StatCard from '@/Components/stat-card/StatCard';
import ThemeToggle from '@/Components/theme-toggle/ThemeToggle';
import PageHeader from '@/Components/page-header/PageHeader';
import Navbar from '@/Components/navbar/Navbar';
import FooterComponent from '@/Components/footer/Footer';


// New primitive UI components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/Components/ui/Card';
import Separator from '@/Components/ui/Separator';
import Skeleton from '@/Components/ui/Skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/Alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/Avatar';
import Switch from '@/Components/ui/Switch';
import Tooltip from '@/Components/ui/Tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/Tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/Components/ui/Accordion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/Components/ui/Breadcrumb';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/Components/ui/Dialog';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from '@/Components/ui/Sheet';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/Components/ui/DropdownMenu';

// Other interactive primitives
import Kbd from '@/Components/ui/Kbd';
import Progress from '@/Components/ui/Progress';
import { Popover, PopoverTrigger, PopoverContent } from '@/Components/ui/Popover';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/RadioGroup';
import Slider from '@/Components/ui/Slider';
import DatePicker from '@/Components/ui/DatePicker';
import DateRangePicker from '@/Components/ui/DateRangePicker';
import FileUpload from '@/Components/ui/FileUpload';
import FilterSearchBar from '@/Components/ui/FilterSearchBar';
import FormModal from '@/Components/ui/FormModal';
import FormDrawer from '@/Components/ui/FormDrawer';



export default function ComponentShowcase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [testCheckbox, setTestCheckbox] = useState(false);
    
    // States for new interactive components
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [switchOne, setSwitchOne] = useState(false);
    const [switchTwo, setSwitchTwo] = useState(true);
    
    // States for Popover, Slider, and RadioGroup
    const [sliderVal, setSliderVal] = useState(65);
    const [radioVal, setRadioVal] = useState('it');

    // States for new components
    const [datePickerValue, setDatePickerValue] = useState('');
    const [dateRangeValue, setDateRangeValue] = useState({ startDate: '', endDate: '' });
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [filterKategori, setFilterKategori] = useState('');
    const [filterPolda, setFilterPolda] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formData, setFormData] = useState({ nama: '', kategori: '', kode: '', lokasi: '', tanggal: '', keterangan: '', gambar: null });

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
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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
                    </div>

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
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Nama Lengkap</label>
                                        <Input placeholder="Contoh: Aipda Budi Santoso" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Kategori Aset</label>
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
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Keterangan Kondisi</label>
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

                        {/* SECTION 4: TABLES & COMPOSITE STATS */}
                        <ShowcaseSection
                            title="Composite Components"
                            description="Komponen terintegrasi seperti header halaman, kartu stats, dan data tabel."
                            match={match('table data stats header page card')}
                        >
                            <ShowcaseItem label="Halaman Header (PageHeader)">
                                <div className="p-6 border border-border bg-card/40 rounded-2xl">
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

                            <ShowcaseItem label="Navigasi Atas (Navbar)">
                                <div className="relative border border-border bg-[#0A0A0A] rounded-2xl h-24 overflow-hidden w-full">
                                    <Navbar auth={{ user: { name: 'Aipda Budi Santoso', roles: ['super-admin'] } }} />
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Tombol Toggle Tema (ThemeToggle)">
                                <div className="flex items-center gap-4 p-4 border border-border bg-card/40 rounded-2xl w-fit">
                                    <ThemeToggle />
                                    <span className="text-xs text-muted">Klik ikon matahari/bulan untuk mengubah tema aplikasi secara global</span>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Footer Aplikasi (Footer)">
                                <div className="border border-border rounded-2xl overflow-hidden w-full bg-slate-900">
                                    <FooterComponent />
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 5: NEW CARDS, SEPARATORS, SKELETONS */}
                        <ShowcaseSection
                            title="Cards & Visual Indicators"
                            description="Komponen struktural Card, Separator garis pemisah, dan Skeleton loading placeholder."
                            match={match('card separator skeleton divider loading')}
                        >
                            <ShowcaseItem label="Struktur Card (Card Components)">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Profil Kepolisian Aset</CardTitle>
                                            <CardDescription>Detail data inventarisasi divisi humas polri pusat.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <p className="text-xs text-foreground">
                                                Aset di ruangan ini mencakup kamera video profesional, mikrofon wireless, drone, serta stasiun kerja editing video.
                                            </p>
                                            <div className="flex gap-2 items-center">
                                                <span className="text-xs font-bold text-muted uppercase">Lokasi:</span>
                                                <Badge variant="info">Studio 1 Utama</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-between">
                                            <span className="text-[10px] text-muted font-bold">Terakhir diupdate: 15 menit lalu</span>
                                            <Button variant="outline" size="sm">Detail</Button>
                                        </CardFooter>
                                    </Card>

                                    <Card className="border-primary/20 bg-primary/5">
                                        <CardHeader>
                                            <CardTitle className="text-primary">Aset Kategori Khusus</CardTitle>
                                            <CardDescription className="dark:text-red-300">Aset dengan hak akses terbatas dan pengawasan ekstra.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-xs text-foreground">
                                                Seluruh peminjaman drone DJI Inspire 3 dan server encoder portable wajib mendapatkan approval Kabag.
                                            </p>
                                        </CardContent>
                                        <CardFooter className="bg-primary/10 border-primary/20">
                                            <Button variant="primary" size="sm" className="w-full">Ajukan Izin Peminjaman</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Separator & Skeleton Loader">
                                <div className="space-y-6">
                                    <div className="p-4 border border-border rounded-xl bg-card/50 space-y-3">
                                        <h4 className="text-xs font-bold text-foreground">Daftar Audit Internal</h4>
                                        <Separator />
                                        <div className="flex justify-between items-center text-xs text-muted">
                                            <span>Kamera DSLR Canon</span>
                                            <Badge variant="success">Normal</Badge>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center text-xs text-muted">
                                            <span>Tripod Manfrotto</span>
                                            <Badge variant="warning">Perbaikan</Badge>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-border rounded-xl bg-card/50 space-y-4">
                                        <h4 className="text-xs font-bold text-foreground">Loading Placeholder (Skeleton)</h4>
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-10 w-10" variant="circle" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-3 w-1/3" />
                                                <Skeleton className="h-2 w-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 6: ALERTS & OVERLAYS */}
                        <ShowcaseSection
                            title="Alerts, Dialogs & Sheets"
                            description="Banner notifikasi Alert, serta overlay modal seperti Dialog dan slide-over Sheet."
                            match={match('alert dialog sheet modal drawer overlay popup banner')}
                        >
                            <ShowcaseItem label="Banner Notifikasi (Alerts)">
                                <div className="space-y-4">
                                    <Alert variant="default">
                                        <AlertTitle>Informasi Sistem</AlertTitle>
                                        <AlertDescription>Sistem audit aset dijadwalkan maintenance pada pukul 23:00 WIB malam ini.</AlertDescription>
                                    </Alert>
                                    <Alert variant="success">
                                        <AlertTitle>Data Berhasil Tersimpan</AlertTitle>
                                        <AlertDescription>Registrasi aset baru AST-2026-009 telah berhasil diverifikasi oleh sistem.</AlertDescription>
                                    </Alert>
                                    <Alert variant="warning">
                                        <AlertTitle>Peringatan Pengembalian</AlertTitle>
                                        <AlertDescription>Sebanyak 3 aset multimedia telah melewati batas waktu pengembalian yang ditentukan.</AlertDescription>
                                    </Alert>
                                    <Alert variant="danger">
                                        <AlertTitle>Error Sinkronisasi</AlertTitle>
                                        <AlertDescription>Gagal menghubungkan ke server Polda Metro Jaya. Periksa koneksi jaringan Anda.</AlertDescription>
                                    </Alert>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Modal Overlays (Dialog & Sheet)">
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                                        Buka Dialog Modal
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
                                        Buka Slide-Over Sheet (Drawer)
                                    </Button>

                                    {/* Dialog Component Showcase */}
                                    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                                        <DialogContent>
                                            <DialogClose onClick={() => setIsDialogOpen(false)} />
                                            <DialogHeader>
                                                <DialogTitle>Konfirmasi Hapus Aset</DialogTitle>
                                                <DialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Data aset drone DJI Inspire akan dihapus permanen dari basis data humas polri.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="mt-4 p-4 border border-red-500/20 bg-red-500/5 rounded-xl text-xs text-red-600 dark:text-red-400">
                                                <strong>Penting:</strong> Menghapus aset ini juga akan menghapus log riwayat peminjaman yang terkait dengannya.
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                                                    Batalkan
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => setIsDialogOpen(false)}>
                                                    Ya, Hapus Permanen
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Sheet Component Showcase */}
                                    <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
                                        <SheetContent side="right">
                                            <SheetClose onClick={() => setIsSheetOpen(false)} />
                                            <SheetHeader>
                                                <SheetTitle>Filter Pencarian Aset</SheetTitle>
                                                <SheetDescription>
                                                    Saring daftar aset berdasarkan spesifikasi, tanggal pengadaan, dan unit penanggung jawab.
                                                </SheetDescription>
                                            </SheetHeader>
                                            
                                            <div className="flex-1 py-6 space-y-4 overflow-y-auto">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Kondisi Fisik</label>
                                                    <Select>
                                                        <option value="">Semua Kondisi</option>
                                                        <option value="good">Layak Pakai (Sangat Baik)</option>
                                                        <option value="fair">Butuh Servis Ringan</option>
                                                        <option value="broken">Rusak Berat</option>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Unit Polda</label>
                                                    <Select>
                                                        <option value="">Semua Polda</option>
                                                        <option value="metro">Polda Metro Jaya</option>
                                                        <option value="jabar">Polda Jawa Barat</option>
                                                        <option value="jatim">Polda Jawa Timur</option>
                                                    </Select>
                                                </div>
                                            </div>

                                            <SheetFooter>
                                                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setIsSheetOpen(false)}>
                                                    Reset Filter
                                                </Button>
                                                <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={() => setIsSheetOpen(false)}>
                                                    Terapkan Filter
                                                </Button>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 7: INTERACTIVE ELEMENTS */}
                        <ShowcaseSection
                            title="Interactive Elements"
                            description="Komponen Switch toggle, Hover Tooltip, Dropdown Menu pilihan, dan navigasi Breadcrumb."
                            match={match('switch toggle tooltip hover dropdown menu list select option breadcrumb')}
                        >
                            <ShowcaseItem label="Switch & Hover Tooltip">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Switch Controls</h4>
                                        <Switch
                                            checked={switchOne}
                                            onChange={setSwitchOne}
                                            label="Aktifkan Notifikasi Email"
                                        />
                                        <Switch
                                            checked={switchTwo}
                                            onChange={setSwitchTwo}
                                            variant="secondary"
                                            label="Auto-Sikronisasi Server Pusat (Gold Theme)"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Hover Tooltips</h4>
                                        <div className="flex gap-4">
                                            <Tooltip content="Membuka pengaturan profil polda" position="top">
                                                <Button variant="outline" size="sm">Hover Me (Top)</Button>
                                            </Tooltip>
                                            <Tooltip content="Hapus data aset secara permanen" position="bottom" className="bg-red-600 dark:bg-red-900 border-red-500/20">
                                                <Button variant="danger" size="sm">Hover Me (Bottom)</Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Navigasi Breadcrumbs">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/dev/components">Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/dev/components">Polda Metro Jaya</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Inventaris Kamera</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </ShowcaseItem>

                            <ShowcaseItem label="Dropdown Actions Menu">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition text-xs font-bold uppercase tracking-wider">
                                        Pilihan Aksi Aset
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="left">
                                        <DropdownMenuLabel>Aksi Cepat</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => alert('Pinjam Aset')}>
                                            Ajukan Peminjaman
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => alert('Edit Aset')}>
                                            Ubah Data Aset
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Bahaya</DropdownMenuLabel>
                                        <DropdownMenuItem className="text-red-500 dark:text-red-400 focus:bg-red-500/10 focus:text-red-600" onClick={() => alert('Hapus Aset')}>
                                            Hapus Aset
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 8: COLLAPSIBLES & TABS */}
                        <ShowcaseSection
                            title="Tabs & Collapsibles"
                            description="Tampilan terorganisir menggunakan Tabs panel dan Accordion/Collapsible panel."
                            match={match('tab panel accordion collapse info')}
                        >
                            <ShowcaseItem label="Accordion (Collapse Panels)">
                                <Accordion>
                                    <AccordionItem defaultOpen>
                                        <AccordionTrigger>Bagaimana cara mengajukan peminjaman aset humas?</AccordionTrigger>
                                        <AccordionContent>
                                            Anda harus masuk ke menu Peminjaman Aset, pilih aset yang berstatus 'Tersedia', klik tombol 'Ajukan Peminjaman', isi formulir durasi dan tujuan peminjaman, lalu klik ajukan. Kabag Humas akan meninjau pengajuan Anda.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionTrigger>Siapa yang berwenang melakukan audit aset?</AccordionTrigger>
                                        <AccordionContent>
                                            Hanya pengguna dengan peran 'Super Admin' atau 'Audit Officer' yang memiliki otorisasi penuh untuk melakukan penyesuaian jumlah fisik aset dan merubah status kelayakan pada sistem.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </ShowcaseItem>

                            <ShowcaseItem label="Tabs Panel Switcher (Default Pill Variant)">
                                <Tabs variant="default">
                                    <TabsList>
                                        <TabsTrigger>Daftar Aset</TabsTrigger>
                                        <TabsTrigger>Pengajuan Aktif</TabsTrigger>
                                        <TabsTrigger>Riwayat Audit</TabsTrigger>
                                    </TabsList>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs space-y-2 text-muted">
                                            <p className="font-bold text-foreground">Berikut ini adalah daftar aset terbaru:</p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li>Canon DSLR Eos 5D - Studio Foto</li>
                                                <li>Tripod Sirui Professional - Studio Video</li>
                                                <li>Drone DJI Mavic 3 Pro - Gudang</li>
                                            </ul>
                                        </div>
                                    </TabsContent>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs text-muted">
                                            Tidak ada pengajuan peminjaman aktif saat ini. Silakan buat pengajuan baru jika dibutuhkan.
                                        </div>
                                    </TabsContent>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs text-muted">
                                            Audit terakhir diselesaikan oleh Aipda Budi pada tanggal 12 Juni 2026 pukul 10:30 WIB.
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </ShowcaseItem>

                            <ShowcaseItem label="Tabs Panel Switcher (Line Underline Variant)">
                                <Tabs variant="line">
                                    <TabsList>
                                        <TabsTrigger>Data Inventaris</TabsTrigger>
                                        <TabsTrigger>Peminjaman Aset</TabsTrigger>
                                        <TabsTrigger>Riwayat Log</TabsTrigger>
                                    </TabsList>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs text-muted space-y-2">
                                            <p className="font-bold text-foreground">Status Inventarisasi Polda Metro:</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-muted/10 rounded-xl">Total: 480 Aset</div>
                                                <div className="p-3 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 rounded-xl">Normal: 450 Aset</div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs text-muted">
                                            Semua unit polda sedang tertib dalam pengembalian barang peminjaman.
                                        </div>
                                    </TabsContent>
                                    <TabsContent>
                                        <div className="p-4 bg-card/40 border border-border rounded-2xl mt-4 text-xs text-muted">
                                            Log log transaksi sistem berjalan sinkron dengan polda setempat.
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </ShowcaseItem>


                            <ShowcaseItem label="Avatar & Profil Indikator">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Polri Officer" />
                                        <AvatarFallback>BS</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="border-secondary/40">
                                        <AvatarImage src="broken-url-test" alt="Fallback Test" />
                                        <AvatarFallback className="bg-primary/10 text-primary">HP</AvatarFallback>
                                    </Avatar>
                                    <div className="text-xs">
                                        <p className="font-bold text-foreground">Brigadir Eka Saputra</p>
                                        <p className="text-[10px] text-muted uppercase tracking-wider">Operator Aset Humas</p>
                                    </div>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 9: OTHER UI PRIMITIVES */}
                        <ShowcaseSection
                            title="Other UI Primitives"
                            description="Komponen tambahan: Popover kontainer info, Progress bar keterisian data, Radio Group pilihan unik, Slider range, dan Kbd shortcut."
                            match={match('popover progress radio slider kbd range shortcut option')}
                        >
                            <ShowcaseItem label="Progress Bar & Keyboard Indicator (Kbd)">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs font-semibold">
                                            <span>Kapasitas Penyimpanan Server Aset</span>
                                            <span>{sliderVal}% Terisi</span>
                                        </div>
                                        <Progress value={sliderVal} variant="primary" />
                                    </div>

                                    <div className="flex flex-wrap gap-2 items-center text-xs">
                                        <span>Gunakan shortcut</span>
                                        <Kbd>⌘</Kbd>
                                        <span>+</span>
                                        <Kbd>K</Kbd>
                                        <span>untuk membuka pencarian aset cepat. Tekan</span>
                                        <Kbd>ESC</Kbd>
                                        <span>untuk membatalkan.</span>
                                    </div>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Slider (Range Input)">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Sesuaikan Volume Alert Sound / Progres ({sliderVal}%)</label>
                                    <Slider 
                                        value={sliderVal} 
                                        onChange={(e) => setSliderVal(Number(e.target.value))} 
                                        min={0}
                                        max={100}
                                    />
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Radio Group (Selection)">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Filter Kategori (Pilih Salah Satu)</label>
                                    <RadioGroup value={radioVal} onChange={setRadioVal}>
                                        <RadioGroupItem value="it" label="Perangkat IT & Server" />
                                        <RadioGroupItem value="multimedia" label="Multimedia & Studio" />
                                        <RadioGroupItem value="network" label="Jaringan & Fiber Optik" />
                                    </RadioGroup>
                                    <div className="text-xs text-muted">
                                        Kategori terpilih: <span className="font-bold text-foreground uppercase">{radioVal}</span>
                                    </div>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Popover Container">
                                <div className="flex gap-4">
                                    <Popover>
                                        <PopoverTrigger className="px-4 py-2 border border-border bg-card text-foreground rounded-xl hover:bg-muted/10 transition text-xs font-bold uppercase tracking-wider">
                                            Petunjuk Peminjaman
                                        </PopoverTrigger>
                                        <PopoverContent align="center" className="w-80">
                                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Alur Pengajuan</h4>
                                            <Separator className="my-2" />
                                            <p className="text-[11px] text-muted leading-relaxed">
                                                1. Pilih aset yang ingin dipinjam.<br />
                                                2. Masukkan tanggal mulai & pengembalian.<br />
                                                3. Klik Ajukan Peminjaman.<br />
                                                4. Tunggu persetujuan Kabag dalam 1x24 jam.
                                            </p>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 10: DATE PICKERS */}
                        <ShowcaseSection
                            title="Date Pickers"
                            description="Komponen pemilih tanggal tunggal dan pemilih rentang tanggal dengan kalender interaktif dan format Indonesia."
                            match={match('date picker tanggal calendar kalender range rentang')}
                        >
                            <ShowcaseItem label="DatePicker (Pemilih Tanggal Tunggal)">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Tanggal Pengadaan</label>
                                        <DatePicker
                                            value={datePickerValue}
                                            onChange={setDatePickerValue}
                                            placeholder="Pilih Tanggal Pengadaan"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Hasil State (YYYY-MM-DD)</label>
                                        <div className="px-4 py-2.5 rounded-xl border border-border bg-card/50 text-sm font-mono">
                                            {datePickerValue || <span className="text-muted/60">Belum dipilih</span>}
                                        </div>
                                        <p className="text-[10px] text-muted">
                                            Tampilan UI: <span className="font-bold text-foreground">{datePickerValue ? datePickerValue.split('-').reverse().join('-') : '—'}</span> | Value: <span className="font-bold text-foreground">{datePickerValue || '—'}</span>
                                        </p>
                                    </div>
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="DateRangePicker (Pemilih Rentang Tanggal)">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Periode Laporan</label>
                                        <DateRangePicker
                                            value={dateRangeValue}
                                            onChange={setDateRangeValue}
                                            placeholder="Pilih Rentang Tanggal"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Hasil State (Object)</label>
                                        <div className="px-4 py-2.5 rounded-xl border border-border bg-card/50 text-sm font-mono">
                                            {dateRangeValue.startDate && dateRangeValue.endDate
                                                ? <span>{'{ startDate: "' + dateRangeValue.startDate + '", endDate: "' + dateRangeValue.endDate + '" }'}</span>
                                                : <span className="text-muted/60">Belum dipilih</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 11: FILE UPLOAD */}
                        <ShowcaseSection
                            title="File & Image Upload"
                            description="Komponen unggah file dengan dua varian: image (drag-drop + preview) dan file (progress bar + info dokumen)."
                            match={match('file upload image unggah gambar dokumen drag drop')}
                        >
                            <ShowcaseItem label="Varian Image (Upload Gambar)">
                                <div className="max-w-md">
                                    <FileUpload
                                        variant="image"
                                        value={uploadedImage}
                                        onChange={setUploadedImage}
                                        label="Foto Aset"
                                        maxSize={5 * 1024 * 1024}
                                        accept=".jpg,.jpeg,.png,.webp"
                                    />
                                </div>
                            </ShowcaseItem>

                            <ShowcaseItem label="Varian File (Upload Dokumen)">
                                <div className="max-w-md">
                                    <FileUpload
                                        variant="file"
                                        value={uploadedFile}
                                        onChange={setUploadedFile}
                                        label="Dokumen Pendukung"
                                        maxSize={10 * 1024 * 1024}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    />
                                </div>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 12: FILTER SEARCH BAR */}
                        <ShowcaseSection
                            title="Filter Search Bar"
                            description="Komponen kontainer pencarian dan penyaringan data dalam bentuk Card dengan grid layout yang fleksibel."
                            match={match('filter search bar cari pencarian saring grid')}
                        >
                            <ShowcaseItem label="FilterSearchBar (4 Kolom Layout)">
                                <FilterSearchBar
                                    title="Pencarian Aset"
                                    cols={4}
                                    onSearch={() => alert('Pencarian: ' + JSON.stringify({ filterKeyword, filterKategori, filterPolda, filterDate }))}
                                    onReset={() => { setFilterKeyword(''); setFilterKategori(''); setFilterPolda(''); setFilterDate(''); }}
                                >
                                    <FilterSearchBar.Item label="Kata Kunci">
                                        <Input
                                            placeholder="Cari nama aset..."
                                            value={filterKeyword}
                                            onChange={(e) => setFilterKeyword(e.target.value)}
                                        />
                                    </FilterSearchBar.Item>
                                    <FilterSearchBar.Item label="Kategori">
                                        <Select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}>
                                            <option value="">Semua Kategori</option>
                                            <option value="it">Perangkat IT</option>
                                            <option value="multimedia">Alat Multimedia</option>
                                            <option value="network">Jaringan</option>
                                        </Select>
                                    </FilterSearchBar.Item>
                                    <FilterSearchBar.Item label="Unit Polda">
                                        <Select value={filterPolda} onChange={(e) => setFilterPolda(e.target.value)}>
                                            <option value="">Semua Polda</option>
                                            <option value="metro">Polda Metro Jaya</option>
                                            <option value="jabar">Polda Jawa Barat</option>
                                            <option value="jatim">Polda Jawa Timur</option>
                                        </Select>
                                    </FilterSearchBar.Item>
                                    <FilterSearchBar.Item label="Tanggal Pengadaan">
                                        <DatePicker
                                            value={filterDate}
                                            onChange={setFilterDate}
                                            placeholder="Pilih Tanggal"
                                        />
                                    </FilterSearchBar.Item>
                                </FilterSearchBar>
                            </ShowcaseItem>
                        </ShowcaseSection>

                        {/* SECTION 13: FORM MODAL & FORM DRAWER */}
                        <ShowcaseSection
                            title="Form Modal & Form Drawer"
                            description="Komponen form overlay interchangeable. Developer dapat menukar antara Modal dan Drawer hanya dengan mengganti tag komponen tanpa mengubah logika state."
                            match={match('form modal drawer tambah edit slide overlay interchangeable')}
                        >
                            <ShowcaseItem label="Perbandingan FormModal vs FormDrawer">
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="primary" onClick={() => setIsFormModalOpen(true)}>
                                        <PlusIcon className="h-4 w-4 mr-1.5" />
                                        Tambah via Modal
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsFormDrawerOpen(true)}>
                                        <PlusIcon className="h-4 w-4 mr-1.5" />
                                        Tambah via Drawer
                                    </Button>
                                </div>

                                <div className="mt-4 p-4 bg-card/40 border border-border rounded-xl">
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Keterangan Developer</p>
                                    <p className="text-xs text-muted leading-relaxed">
                                        Kedua tombol di atas membuka formulir yang <span className="font-bold text-foreground">identik</span>, tetapi ditampilkan dalam overlay yang berbeda (modal sentral vs slide-over drawer). 
                                        Anda hanya perlu mengganti <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-mono">&lt;FormModal&gt;</code> menjadi <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-mono">&lt;FormDrawer&gt;</code> tanpa mengubah logika apapun.
                                    </p>
                                </div>

                                {/* FormModal Demo */}
                                <FormModal
                                    open={isFormModalOpen}
                                    onClose={() => setIsFormModalOpen(false)}
                                    title="Tambah Aset Baru"
                                    description="Masukkan data aset baru ke dalam sistem inventarisasi divhumas polri."
                                    loading={formLoading}
                                    submitText="Simpan Aset"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setFormLoading(true);
                                        setTimeout(() => {
                                            setFormLoading(false);
                                            setIsFormModalOpen(false);
                                            setFormData({ nama: '', kategori: '', gambar: null });
                                            alert('Data berhasil disimpan (demo)');
                                        }, 2000);
                                    }}
                                >
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Nama Aset</label>
                                                <Input
                                                    placeholder="Contoh: MacBook Pro 16 M3"
                                                    value={formData.nama}
                                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Kode Aset</label>
                                                <Input
                                                    placeholder="Contoh: AST-2026-010"
                                                    value={formData.kode}
                                                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Kategori</label>
                                                <Select value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}>
                                                    <option value="">Pilih Kategori...</option>
                                                    <option value="it">Perangkat IT</option>
                                                    <option value="multimedia">Alat Multimedia</option>
                                                    <option value="network">Jaringan</option>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Lokasi</label>
                                                <Input
                                                    placeholder="Contoh: Ruang Server Lt.2"
                                                    value={formData.lokasi}
                                                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Tanggal Pengadaan</label>
                                                <DatePicker
                                                    value={formData.tanggal}
                                                    onChange={(val) => setFormData({ ...formData, tanggal: val })}
                                                    placeholder="Pilih Tanggal"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Keterangan</label>
                                                <Textarea
                                                    placeholder="Tuliskan keterangan aset..."
                                                    value={formData.keterangan}
                                                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <FileUpload
                                            variant="image"
                                            value={formData.gambar}
                                            onChange={(file) => setFormData({ ...formData, gambar: file })}
                                            label="Foto Aset"
                                        />
                                    </div>
                                </FormModal>

                                {/* FormDrawer Demo */}
                                <FormDrawer
                                    open={isFormDrawerOpen}
                                    onClose={() => setIsFormDrawerOpen(false)}
                                    title="Tambah Aset Baru"
                                    description="Masukkan data aset baru ke dalam sistem inventarisasi divhumas polri."
                                    loading={formLoading}
                                    submitText="Simpan Aset"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setFormLoading(true);
                                        setTimeout(() => {
                                            setFormLoading(false);
                                            setIsFormDrawerOpen(false);
                                            setFormData({ nama: '', kategori: '', gambar: null });
                                            alert('Data berhasil disimpan (demo)');
                                        }, 2000);
                                    }}
                                >
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Nama Aset</label>
                                                <Input
                                                    placeholder="Contoh: MacBook Pro 16 M3"
                                                    value={formData.nama}
                                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Kode Aset</label>
                                                <Input
                                                    placeholder="Contoh: AST-2026-010"
                                                    value={formData.kode}
                                                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Kategori</label>
                                                <Select value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}>
                                                    <option value="">Pilih Kategori...</option>
                                                    <option value="it">Perangkat IT</option>
                                                    <option value="multimedia">Alat Multimedia</option>
                                                    <option value="network">Jaringan</option>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Lokasi</label>
                                                <Input
                                                    placeholder="Contoh: Ruang Server Lt.2"
                                                    value={formData.lokasi}
                                                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Tanggal Pengadaan</label>
                                                <DatePicker
                                                    value={formData.tanggal}
                                                    onChange={(val) => setFormData({ ...formData, tanggal: val })}
                                                    placeholder="Pilih Tanggal"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted uppercase tracking-wider">Keterangan</label>
                                                <Textarea
                                                    placeholder="Tuliskan keterangan aset..."
                                                    value={formData.keterangan}
                                                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <FileUpload
                                            variant="image"
                                            value={formData.gambar}
                                            onChange={(file) => setFormData({ ...formData, gambar: file })}
                                            label="Foto Aset"
                                        />
                                    </div>
                                </FormDrawer>
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
