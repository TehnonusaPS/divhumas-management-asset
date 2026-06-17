import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
                    
                    <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 shadow-lg border border-slate-200 dark:border-slate-800 backdrop-blur-md">
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                                <thead>
                                    <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                        <th className="pb-3 font-semibold">Nama Lengkap</th>
                                        <th className="pb-3 font-semibold">Email Pengguna</th>
                                        <th className="pb-3 font-semibold">Otoritas Role (Spatie)</th>
                                        <th className="pb-3 font-semibold">Status</th>
                                        <th className="pb-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-red-950/10 transition">
                                            <td className="py-4 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                                            <td className="py-4 text-slate-700 dark:text-slate-300">{u.email}</td>
                                            <td className="py-4">
                                                <span className="inline-flex items-center rounded-md bg-[#D4AF37]/10 px-2.5 py-1 text-xs font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/20">
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    u.status === 'Aktif' 
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                                        : 'bg-red-50 dark:bg-red-500/10 text-[#E8192C] border border-[#E8192C]/20'
                                                }`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right flex justify-end gap-3 items-center">
                                                <button 
                                                    onClick={() => openEditModal(u)}
                                                    className="text-xs text-[#D4AF37] hover:text-[#F5D060] font-semibold hover:underline"
                                                >
                                                    Ubah Role
                                                </button>
                                                {u.status === 'Aktif' && (
                                                    <button 
                                                        onClick={() => handleDelete(u.id)}
                                                        className="text-xs text-[#E8192C] hover:text-[#FF3347] font-semibold hover:underline"
                                                    >
                                                        Non-Aktifkan
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* EDIT ROLE MODAL FORM */}
            {formOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-900 dark:text-white">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">Ubah Otoritas Role</h3>
                            <button onClick={() => setFormOpen(false)} className="rounded-full p-1.5 text-slate-500 dark:text-slate-400 hover:bg-[#1a1a1a]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <p>Mengubah peran akses keamanan untuk pengguna:</p>
                            <p className="font-bold text-slate-900 dark:text-white">{selectedUser.name} ({selectedUser.email})</p>
                        </div>
                        <form onSubmit={handleRoleChange} className="space-y-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Pilih Peran Baru (Spatie Role)</label>
                                <select 
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2.5 text-sm text-slate-700 dark:text-slate-300 focus:border-[#E8192C] focus:ring-0 focus:outline-none transition-all"
                                >
                                    <option value="super-admin">Super Admin</option>
                                    <option value="admin-asset">Admin / Tata Usaha Aset</option>
                                    <option value="pegawai">Pegawai / Pemegang Aset</option>
                                    <option value="teknisi">Teknisi / Tim Pemeliharaan</option>
                                    <option value="pimpinan">Pimpinan / Auditor</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 py-3 text-sm font-semibold text-white hover:from-[#E8192C] hover:to-[#C0172A] shadow-md transition-all">
                                Perbarui Peran Otoritas
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
