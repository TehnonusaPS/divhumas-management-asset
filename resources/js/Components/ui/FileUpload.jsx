import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    CloudArrowUpIcon,
    DocumentIcon,
    PhotoIcon,
    TrashIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileIcon(fileName) {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap = {
        pdf: '📄',
        doc: '📝', docx: '📝',
        xls: '📊', xlsx: '📊',
        ppt: '📽️', pptx: '📽️',
        zip: '📦', rar: '📦',
        txt: '📃',
        csv: '📊',
    };
    return iconMap[ext] || '📎';
}

export default function FileUpload({
    variant = 'file',
    value = null,
    onChange,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept,
    label = '',
    error = '',
    disabled = false,
    className = '',
    ...props
}) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [validationError, setValidationError] = useState('');
    const inputRef = useRef(null);
    const progressTimerRef = useRef(null);

    const defaultAccept = variant === 'image'
        ? '.jpg,.jpeg,.png,.webp'
        : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt,.csv';

    const finalAccept = accept || defaultAccept;

    // Generate preview for image variant
    useEffect(() => {
        if (variant === 'image' && value instanceof File) {
            const url = URL.createObjectURL(value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (!value) {
            setPreview(null);
        }
    }, [value, variant]);

    // Simulate upload progress when a new file is selected
    useEffect(() => {
        if (value && !uploadComplete) {
            setUploadProgress(0);
            let progress = 0;
            progressTimerRef.current = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressTimerRef.current);
                    setUploadComplete(true);
                }
                setUploadProgress(Math.min(Math.round(progress), 100));
            }, 120);
        }
        return () => {
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        };
    }, [value]);

    const validate = useCallback((file) => {
        setValidationError('');
        if (file.size > maxSize) {
            setValidationError(`Ukuran file melebihi batas maksimum (${formatFileSize(maxSize)})`);
            return false;
        }
        if (finalAccept) {
            const exts = finalAccept.split(',').map(e => e.trim().toLowerCase());
            const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!exts.some(e => e === fileExt || file.type.includes(e.replace('.', '')))) {
                setValidationError(`Tipe file tidak diizinkan. Format yang diterima: ${finalAccept}`);
                return false;
            }
        }
        return true;
    }, [maxSize, finalAccept]);

    const handleFileChange = (file) => {
        if (!file) return;
        if (!validate(file)) return;
        setUploadComplete(false);
        onChange?.(file);
    };

    const handleInputChange = (e) => {
        handleFileChange(e.target.files?.[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (disabled) return;
        const file = e.dataTransfer.files?.[0];
        handleFileChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleRemove = () => {
        onChange?.(null);
        setUploadProgress(0);
        setUploadComplete(false);
        setValidationError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const openFilePicker = () => {
        if (!disabled) inputRef.current?.click();
    };

    const displayError = validationError || error;

    // ============== IMAGE VARIANT ==============
    if (variant === 'image') {
        return (
            <div className={cn('space-y-2', className)} {...props}>
                {label && (
                    <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 select-none">{label}</span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={finalAccept}
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={disabled}
                />

                {!value ? (
                    /* Dropzone */
                    <div
                        onClick={openFilePicker}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={cn(
                            'relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer group',
                            dragActive
                                ? 'border-primary bg-primary/5 scale-[1.01]'
                                : 'border-border hover:border-primary/40 hover:bg-primary/5',
                            disabled && 'opacity-50 cursor-not-allowed'
                        )}
                    >
                        <div className="p-3 rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                            <PhotoIcon className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-foreground">
                                Klik atau seret gambar ke sini
                            </p>
                            <p className="text-[10px] text-muted mt-1">
                                Format: {finalAccept} • Maks: {formatFileSize(maxSize)}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Image Preview */
                    <div className="relative group rounded-2xl overflow-hidden border border-border">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover transition-all"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={openFilePicker}
                                className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition cursor-pointer flex items-center gap-1.5"
                            >
                                <ArrowPathIcon className="h-4 w-4" />
                                Ganti
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-3 py-1.5 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition cursor-pointer flex items-center gap-1.5"
                            >
                                <TrashIcon className="h-4 w-4" />
                                Hapus
                            </button>
                        </div>
                        {/* File info bar */}
                        <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm px-3 py-2 flex items-center justify-between">
                            <span className="text-[10px] text-white/80 font-semibold truncate max-w-[70%]">
                                {value.name}
                            </span>
                            <span className="text-[10px] text-white/60 font-bold">
                                {formatFileSize(value.size)}
                            </span>
                        </div>
                    </div>
                )}

                {displayError && (
                    <p className="text-xs font-semibold text-primary dark:text-red-400 mt-1.5">{displayError}</p>
                )}
            </div>
        );
    }

    // ============== FILE VARIANT ==============
    return (
        <div className={cn('space-y-2', className)} {...props}>
            {label && (
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 select-none">{label}</span>
            )}
            <input
                ref={inputRef}
                type="file"
                accept={finalAccept}
                onChange={handleInputChange}
                className="hidden"
                disabled={disabled}
            />

            {!value ? (
                /* Dropzone */
                <div
                    onClick={openFilePicker}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                        'relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer group',
                        dragActive
                            ? 'border-primary bg-primary/5 scale-[1.01]'
                            : 'border-border hover:border-primary/40 hover:bg-primary/5',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <CloudArrowUpIcon className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">
                            Klik atau seret file ke sini
                        </p>
                        <p className="text-[10px] text-muted mt-1">
                            Format: {finalAccept} • Maks: {formatFileSize(maxSize)}
                        </p>
                    </div>
                </div>
            ) : (
                /* File Preview Card */
                <div className="rounded-2xl border border-border bg-card/50 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        {/* File Icon */}
                        <div className="text-2xl shrink-0 mt-0.5">
                            {getFileIcon(value.name)}
                        </div>
                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{value.name}</p>
                            <p className="text-[10px] text-muted font-semibold mt-0.5">
                                {formatFileSize(value.size)}
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                            {uploadComplete && (
                                <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                            )}
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {!uploadComplete && (
                        <div className="space-y-1.5">
                            <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-muted font-bold text-right">
                                {uploadProgress}%
                            </p>
                        </div>
                    )}

                    {uploadComplete && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircleIcon className="h-3.5 w-3.5" />
                            Upload selesai
                        </div>
                    )}
                </div>
            )}

            {displayError && (
                <p className="text-xs font-semibold text-primary dark:text-red-400 mt-1.5">{displayError}</p>
            )}
        </div>
    );
}
