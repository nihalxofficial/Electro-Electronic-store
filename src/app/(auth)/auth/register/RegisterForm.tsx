"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Label,
  Button,
  Separator,
  Alert,
  AlertDescription,
} from "@heroui/react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Image as ImageIcon,
  Upload,
  Loader2,
  X,
} from "lucide-react";
import { signUp, signIn, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY ?? "";
async function uploadToImgBB(file: File): Promise<string> {
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message ?? "Upload failed");
  return data.data.url as string;
}

export function RegisterForm() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setImgError("Please select a valid image."); return; }
    setImgUploading(true);
    setImgError(null);
    try {
      const url = await uploadToImgBB(file);
      setImageUrl(url);
    } catch (err) {
      setImgError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setImgUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setDemoMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const image = (imageUrl || String(data.image || "")).trim();
    const password = String(data.password || "");
    const confirmPassword = String(data.confirmPassword || "");
    const agreeTerms = formData.get("agreeTerms") === "on";

    if (!agreeTerms) {
      setError("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { data:registerData, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image
      });
      if(registerData){
        router.push("/");
        toast.success("Registration Successful!");
      }
      if(error){
        toast.error(error.message);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setDemoMessage(null);
    setLoading(true);

    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (res?.error) {
        const errorMsg =
          res.error.message || "Google sign-up failed. Please try again.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during Google sign-up.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-gray-950">
      <div className="w-full max-w-lg space-y-4">
        {/* Brand logo & tagline */}
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex items-center text-3xl font-extrabold tracking-tight text-[#333e48] dark:text-white">
            electro<span className="text-primary text-4xl leading-none">.</span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join thousands of users and start shopping today
          </p>
        </div>

        <Card className="w-full border border-slate-200/80 dark:border-gray-800 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl">
          <CardHeader className="flex flex-col gap-1 text-center pb-2 pt-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create an Account
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Enter your details below to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6 pt-2">
            {error && (
              <Alert
                status="danger"
                className="p-3 text-xs rounded-xl border border-red-200 dark:border-red-900/50"
              >
                <AlertDescription className="text-red-700 dark:text-red-300 font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {demoMessage && (
              <Alert
                status="accent"
                className="p-3 text-xs rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40"
              >
                <AlertDescription className="text-blue-700 dark:text-blue-300 font-medium">
                  {demoMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              fullWidth
              isDisabled={loading}
              className="flex items-center justify-center gap-2 h-11 text-xs font-semibold border-slate-300 dark:border-gray-700 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer transition-colors w-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign up with Google
            </Button>

            <div className="flex items-center gap-4 my-3">
              <Separator className="flex-1 bg-slate-200 dark:bg-gray-800" />
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Or with Email
              </span>
              <Separator className="flex-1 bg-slate-200 dark:bg-gray-800" />
            </div>

            {/* Registration Form */}
            <Form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="space-y-1 w-full">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <Input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      variant="primary"
                      fullWidth
                      className="w-full pl-9 h-10 text-xs rounded-xl border border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      variant="primary"
                      fullWidth
                      className="w-full pl-9 h-10 text-xs rounded-xl border border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Profile Image — compact inline */}
              <div className="space-y-1 w-full">
                <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Profile Picture{" "}
                  <span className="text-slate-400 text-[10px]">(Optional)</span>
                </Label>

                {/* hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
                {/* hidden field so FormData picks up the URL */}
                <input type="hidden" name="image" value={imageUrl} />

                {/* Inline row: icon + url input + upload button */}
                <div className="flex items-center gap-2 w-full">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={imageUrl}
                      onChange={(e) => { setImageUrl(e.target.value); setImgError(null); }}
                      className="w-full pl-9 pr-3 h-10 text-xs rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Upload button */}
                  <button
                    type="button"
                    disabled={imgUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {imgUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    {imgUploading ? "Uploading…" : "Upload"}
                  </button>

                  {/* Clear button — only when URL is set */}
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => { setImageUrl(""); setImgError(null); }}
                      className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-500 transition-all cursor-pointer shrink-0"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Error */}
                {imgError && (
                  <p className="text-[10px] font-semibold text-rose-500 mt-0.5">{imgError}</p>
                )}

                {/* Tiny thumbnail preview */}
                {imageUrl && !imgUploading && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-gray-700 shrink-0 bg-white dark:bg-gray-800">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{imageUrl}</p>
                  </div>
                )}
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="space-y-1 w-full">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      variant="primary"
                      fullWidth
                      className="w-full pl-9 pr-9 h-10 text-xs rounded-xl border border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer z-10"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      variant="primary"
                      fullWidth
                      className="w-full pl-9 pr-9 h-10 text-xs rounded-xl border border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer z-10"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions option */}
              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isDisabled={loading}
                className="h-11 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 w-full"
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </Form>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
