import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import Badge from '@/Components/ui/Badge';
import Modal from '@/Components/ui/Modal';
import Label from '@/Components/ui/Label';
import Select from '@/Components/ui/Select';
import Button from '@/Components/ui/Button';

export default function ManajemenPengguna() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Super Admin User', email: 'superadmin@example.com', role: 'super-admin', status: 'Aktif' },
        { id: 2, name: 'Tata Usaha Aset User', email: 'adminasset@example.com', role: 'admin-asset', status: 'Aktif' },
        { id: 3, name: 'Pegawai Pemegang Aset', email: 'pegawai@example.com', role: 'pegawai', status: 'Aktif' },
        { id: 4, name: 'Teknisi Pemeliharaan User', email: 'teknisi@example.com', role: 'teknisi', status: 'Aktif' },
        { id: 5, name: 'Pimpinan Auditor User', email: 'pimpinan@example.com', role: 'pimpinan', status: 'Aktif' },
    ]);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('pegawai');

    const handleRoleChange = (e) => {
        e.preventDefault();
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
        setFormOpen(false);
        setSelectedUser(null);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setFormOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menonaktifkan pengguna ini?')) {
            setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'Non-Aktif' } : u));
        }
    };

    const columns = [
        { key: 'name', label: 'Nama Lengkap', className: 'font-semibold text-foreground' },
        { key: 'email', label: 'Email Pengguna', className: 'text-muted font-normal' },
        {
            key: 'role',
            label: 'Otoritas Role (Spatie)',
            render: (row) => <Badge variant="secondary">{row.role}</Badge>
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <Badge variant={row.status === 'Aktif' ? 'success' : 'danger'}>
                    {row.status}
                </Badge>
            )
        },
        {
            key: 'actions',
            label: 'Aksi',
            className: 'text-right',
            cellClassName: 'text-right flex justify-end gap-3 items-center',
            render: (row) => (
                <>
                    <button
                        onClick={() => openEditModal(row)}
                        className="text-xs text-[#D4AF37] hover:text-[#F5D060] font-semibold hover:underline cursor-pointer"
                    >
                        Ubah Role
                    </button>
                    {row.status === 'Aktif' && (
                        <button
                            onClick={() => handleDelete(row.id)}
                            className="text-xs text-[#E8192C] hover:text-[#FF3347] font-semibold hover:underline cursor-pointer"
                        >
                            Non-Aktifkan
                        </button>
                    )}
                </>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                        Manajemen Pengguna & Otoritas Role
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Kelola data pengguna, perbarui otoritas role Spatie, dan monitor keaktifan akun.
                    </p>
                </div>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <DataTable
                        columns={columns}
                        data={users}
                    />
                </div>
            </div>

            {/* EDIT ROLE MODAL FORM */}
            <Modal show={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-foreground font-serif">Ubah Otoritas Role</h3>
                    <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-muted hover:bg-background cursor-pointer">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="space-y-2 text-sm text-muted">
                    <p>Mengubah peran akses keamanan untuk pengguna:</p>
                    <p className="font-bold text-foreground">{selectedUser?.name} ({selectedUser?.email})</p>
                </div>
                <form onSubmit={handleRoleChange} className="space-y-4 pt-2">
                    <div>
                        <Label htmlFor="new_role">Pilih Peran Baru (Spatie Role)</Label>
                        <Select
                            id="new_role"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option value="super-admin">Super Admin</option>
                            <option value="admin-asset">Admin / Tata Usaha Aset</option>
                            <option value="pegawai">Pegawai / Pemegang Aset</option>
                            <option value="teknisi">Teknisi / Tim Pemeliharaan</option>
                            <option value="pimpinan">Pimpinan / Auditor</option>
                        </Select>
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Perbarui Peran Otoritas
                    </Button>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
