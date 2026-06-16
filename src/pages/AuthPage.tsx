import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, LogIn, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

type Tab = 'login' | 'registro';

const SECTORS = ['Empresarial', 'Salud', 'Académico', 'Industrial', 'Gastronomía', 'Otro'];

export const AuthPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<Tab>(
        searchParams.get('tab') === 'registro' ? 'registro' : 'login'
    );
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Login form
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    // Register form
    const [regData, setRegData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        company: '', sector: '', acceptTerms: false,
    });

    const { login, register, user } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/cuenta');
    }, [user, navigate]);

    useEffect(() => {
        setError('');
        setSuccess('');
    }, [activeTab]);

    // ── Login ──────────────────────────────────────────────────────────────────

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!loginData.email || !loginData.password) {
            setError('Completa todos los campos.');
            return;
        }
        setIsLoading(true);
        const ok = await login(loginData.email, loginData.password);
        setIsLoading(false);
        if (ok) {
            navigate('/cuenta');
        } else {
            setError('Correo o contraseña incorrectos. Intenta de nuevo.');
        }
    };

    // ── Register ───────────────────────────────────────────────────────────────

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!regData.name || !regData.email || !regData.password || !regData.company || !regData.sector) {
            setError('Completa todos los campos obligatorios.');
            return;
        }
        if (regData.password !== regData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (regData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (!regData.acceptTerms) {
            setError('Debes aceptar los términos y condiciones.');
            return;
        }
        setIsLoading(true);
        const ok = await register({
            name: regData.name,
            email: regData.email,
            password: regData.password,
            company: regData.company,
            sector: regData.sector,
        });
        setIsLoading(false);
        if (ok) {
            navigate('/cuenta');
        } else {
            setError('No fue posible crear la cuenta. Intenta de nuevo.');
        }
    };

    // ── Shared input class ─────────────────────────────────────────────────────

    const inputClass =
        'w-full h-12 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm bg-surface-container-lowest text-on-surface';

    const labelClass =
        'block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider';

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Main content */}
            <main className="flex-1 flex items-center justify-center py-16 px-gutter">
                <div className="w-full max-w-lg">

                    {/* Brand link */}
                    <div className="text-center mb-8">
                        <Link to="/" className="font-display text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
                            Cotexcal Manufacturing
                        </Link>
                        <p className="font-body text-sm text-on-surface-variant mt-2">
                            Plataforma de gestión de dotaciones corporativas
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/30 overflow-hidden">

                        {/* Tabs */}
                        <div className="flex border-b border-outline-variant/30">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-4 font-body text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${activeTab === 'login'
                                        ? 'text-primary border-b-2 border-primary bg-surface-container-low'
                                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50'
                                    }`}
                            >
                                <LogIn className="w-4 h-4" />
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => setActiveTab('registro')}
                                className={`flex-1 py-4 font-body text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${activeTab === 'registro'
                                        ? 'text-primary border-b-2 border-primary bg-surface-container-low'
                                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50'
                                    }`}
                            >
                                <UserPlus className="w-4 h-4" />
                                Crear cuenta
                            </button>
                        </div>

                        <div className="p-8">

                            {/* Alert messages */}
                            {error && (
                                <div className="mb-6 flex items-start gap-3 bg-error-container border border-error/20 rounded-lg p-4">
                                    <AlertCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                                    <p className="font-body text-sm text-on-error-container">{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                    <p className="font-body text-sm text-green-800">{success}</p>
                                </div>
                            )}

                            {/* ── LOGIN FORM ── */}
                            {activeTab === 'login' && (
                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div>
                                        <label className={labelClass}>Correo electrónico</label>
                                        <input
                                            type="email"
                                            placeholder="ejemplo@empresa.com"
                                            value={loginData.email}
                                            onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                                            className={inputClass}
                                            autoComplete="email"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className={labelClass.replace('mb-1.5', '')}>Contraseña</label>
                                            <button type="button" className="font-body text-xs text-secondary hover:text-primary transition-colors">
                                                ¿Olvidaste tu contraseña?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Mínimo 6 caracteres"
                                                value={loginData.password}
                                                onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                                                className={`${inputClass} pr-12`}
                                                autoComplete="current-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-primary text-on-primary font-body text-sm font-bold rounded-default hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <span className="inline-block w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                                        ) : (
                                            <>Ingresar <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>

                                    <p className="text-center font-body text-xs text-on-surface-variant pt-2">
                                        ¿No tienes cuenta?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('registro')}
                                            className="text-secondary font-bold hover:text-primary transition-colors"
                                        >
                                            Regístrate aquí
                                        </button>
                                    </p>
                                </form>
                            )}

                            {/* ── REGISTER FORM ── */}
                            {activeTab === 'registro' && (
                                <form onSubmit={handleRegister} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Nombre completo <span className="text-error">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Ej. María García"
                                                value={regData.name}
                                                onChange={e => setRegData(p => ({ ...p, name: e.target.value }))}
                                                className={inputClass}
                                                autoComplete="name"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Correo electrónico corporativo <span className="text-error">*</span></label>
                                            <input
                                                type="email"
                                                placeholder="correo@empresa.com"
                                                value={regData.email}
                                                onChange={e => setRegData(p => ({ ...p, email: e.target.value }))}
                                                className={inputClass}
                                                autoComplete="email"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Contraseña <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={regData.password}
                                                    onChange={e => setRegData(p => ({ ...p, password: e.target.value }))}
                                                    className={`${inputClass} pr-12`}
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Confirmar contraseña <span className="text-error">*</span></label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Repite tu contraseña"
                                                value={regData.confirmPassword}
                                                onChange={e => setRegData(p => ({ ...p, confirmPassword: e.target.value }))}
                                                className={inputClass}
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Empresa / Organización <span className="text-error">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Nombre de la empresa"
                                                value={regData.company}
                                                onChange={e => setRegData(p => ({ ...p, company: e.target.value }))}
                                                className={inputClass}
                                                autoComplete="organization"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className={labelClass}>Sector de interés <span className="text-error">*</span></label>
                                            <select
                                                value={regData.sector}
                                                onChange={e => setRegData(p => ({ ...p, sector: e.target.value }))}
                                                className={`${inputClass} bg-surface-container-lowest`}
                                            >
                                                <option value="">Selecciona un sector…</option>
                                                {SECTORS.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative mt-0.5 shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={regData.acceptTerms}
                                                onChange={e => setRegData(p => ({ ...p, acceptTerms: e.target.checked }))}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${regData.acceptTerms ? 'bg-secondary border-secondary' : 'border-outline-variant group-hover:border-secondary'}`}>
                                                {regData.acceptTerms && <div className="w-2 h-2 bg-on-secondary rounded-sm" />}
                                            </div>
                                        </div>
                                        <span className="font-body text-xs text-on-surface-variant leading-relaxed">
                                            Acepto los{' '}
                                            <span className="text-secondary font-semibold cursor-pointer hover:text-primary">términos y condiciones</span>
                                            {' '}y la{' '}
                                            <span className="text-secondary font-semibold cursor-pointer hover:text-primary">política de privacidad</span>
                                            {' '}de Cotexcal Manufacturing.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-accent text-primary font-body text-sm font-bold rounded-default hover:bg-yellow-500 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                        ) : (
                                            <>Crear cuenta <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>

                                    <p className="text-center font-body text-xs text-on-surface-variant pt-2">
                                        ¿Ya tienes cuenta?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('login')}
                                            className="text-secondary font-bold hover:text-primary transition-colors"
                                        >
                                            Inicia sesión aquí
                                        </button>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-center font-body text-xs text-on-surface-variant mt-6 opacity-70">
                        Acceso exclusivo para clientes corporativos y compradores institucionales.
                    </p>
                </div>
            </main>
        </div>
    );
};