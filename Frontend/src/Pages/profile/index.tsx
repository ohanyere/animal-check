import React, { useMemo, useState, type ChangeEvent, type ChangeEventHandler, type ComponentProps } from "react";
import { motion } from "framer-motion";
import { LogOut, Pencil, Mail, Camera, ShieldCheck, CalendarClock, RefreshCw, Trash2,} from "lucide-react";

import type { RootState } from "../../store/store";

import {

  updateProfile,
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,

  AuthErrorCodes,
  type AuthError,
} from "firebase/auth";; // <-- Adjust this path to your project structure
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { resetFlags, signOut } from "../../features/auth/authSlice";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

// Small reusable components
 type props = {
    title : string,
    children: React.ReactNode
 }

 type fun = {
    label : string,
 }&ComponentProps<"input">

 type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};
function Section({ title, children }: props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-50">
      {children}
    </span>
  );
}

function FieldRow({ label, value, children } : fun) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="mt-1 sm:mt-0 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900 break-all">{value}</span>
        {children}
      </div>
    </div>
  );
}

function PrimaryButton(props : ComponentProps<"button">) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition ${className}`}
    />
  );
}

function GhostButton(props :  ComponentProps<"button">) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-700 border hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
    />
  );
}

function DangerButton(props: ComponentProps<"button">) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
    />
  );
}

function Input({ label, type = "text", value, onChange, placeholder, autoFocus, required } : fun) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400"
      />
    </label>
  );
}

function Modal({ open, title, children, onClose }: ModalProps ) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function StartupProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
//   const {user} = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  // Modals
  const [openEdit, setOpenEdit] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Edit profile state
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // Change email state (with optional reauth)
  const [newEmail, setNewEmail] = useState("");
  const [reauthPassword, setReauthPassword] = useState("");

  const createdAt = useMemo(() => {
    const t = user?.metadata?.creationTime;
    return t ? new Date(t).toLocaleDateString() : "—";
  }, [user]);

  const lastSignIn = useMemo(() => {
    const t = user?.metadata?.lastSignInTime;
    return t ? new Date(t).toLocaleString() : "—";
  }, [user]);

  const providerId = user?.providerData?.[0]?.providerId ?? "password";

  // Helpers
  const handleCopy = async (text : string) => {
    try {
      await navigator.clipboard.writeText(text);
      setOk("Copied to clipboard");
      setTimeout(() => setOk(""), 1500);
    } catch(e) {
        if(e instanceof Error){
            setOk("failed to copy");
      setTimeout(() => setOk(""), 1500);
        }
    }
  };

  const resetMessages = () => {
    setError("");
    setOk("");
  };

  const primeEditModal = () => {
    if (!user) return;
    setDisplayName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
    setOpenEdit(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    resetMessages();
    setSaving(true);
    try {
      await updateProfile(user, {
        displayName: displayName || null,
        photoURL: photoURL || null,
      });
      setOk("Profile updated");
      setOpenEdit(false);
    } catch (e) {
      if(e instanceof Error){
        setError(e.message || "Failed to update profile");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!user) return;
    resetMessages();
    setSaving(true);
    try {
      // Some providers require recent login for sensitive ops
      try {
  await updateEmail(user, newEmail);
} catch (e) {
  const error = e as AuthError; // Type assertion

  if (error.code === AuthErrorCodes.REQUIRES_RECENT_LOGIN) {
    if (!user.email) throw error;

    const cred = EmailAuthProvider.credential(user.email, reauthPassword);
    await reauthenticateWithCredential(user, cred);
    await updateEmail(user, newEmail);
  } else {
    throw error;
  }
}
      setOk("Email updated");
      setOpenEmail(false);
    } catch (e) {
      if(e instanceof Error){
        setError(e.message || "Failed to update email");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!user) return;
    resetMessages();
    setSaving(true);
    try {
      await sendEmailVerification(user);
      setOk("Verification email sent");
    } catch (e) {
      if(e instanceof Error){
        setError(e.message || "Failed to send verification");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    resetMessages();
    setSaving(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setOk("Password reset email sent");
    } catch (e) {
      if(e instanceof Error){
        setError(e.message || "Failed to send reset email");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    resetMessages();
    try {
      await signOut(auth);
      dispatch(reset())
    } catch (e) {
      if(e instanceof Error){
        setError(e.message || "Logout failed");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    resetMessages();
    setSaving(true);
    try {
      await deleteUser(user);
    } catch (e) {
       if(e instanceof Error){
         setError(e.message || "Failed to update profile");
     }
    } 
    finally {
      setSaving(false);
      setOpenDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-gray-600 text-2xl text-center">Loading profile details</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">No user signed in</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="mx-auto max-w-5xl px-4 pt-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden border shadow-sm bg-white">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.photoURL} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center bg-gray-100 text-gray-500">
                  <Camera className="h-6 w-6" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                {user.displayName || "Anonymous User"}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge><Mail className="h-3.5 w-3.5" /> {user.email || "—"}</Badge>
                {user.email && (
                  user.emailVerified ? (
                    <Badge><ShieldCheck className="h-3.5 w-3.5" /> Verified</Badge>
                  ) : (
                    <Badge>Not Verified</Badge>
                  )
                )}
                <Badge>{providerId}</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!user.emailVerified && (
              <PrimaryButton onClick={handleVerifyEmail} disabled={saving}>
                <RefreshCw className="h-4 w-4" /> Verify Email
              </PrimaryButton>
            )}
            <GhostButton onClick={primeEditModal}><Pencil className="h-4 w-4" /> Edit Profile</GhostButton>
            <GhostButton onClick={() => setOpenEmail(true)}><Mail className="h-4 w-4" /> Change Email</GhostButton>
            <PrimaryButton onClick={handlePasswordReset} disabled={!user.email || saving}>
              Reset Password
            </PrimaryButton>
            <DangerButton onClick={handleLogout}><LogOut className="h-4 w-4" /> Logout</DangerButton>
          </div>
        </motion.div>

        {/* Messages */}
        {(error || ok) && (
          <div className="mt-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            {ok && (
              <div className="mt-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{ok}</div>
            )}
          </div>
        )}

        {/* Content grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
         

          <Section title="Security">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Verification</p>
                  <p className="text-xs text-gray-500">Confirm your email to protect your account</p>
                </div>
                <div>
                  {user.emailVerified ? (
                    <Badge>Verified</Badge>
                  ) : (
                    <PrimaryButton onClick={handleVerifyEmail} disabled={saving}>Send Link</PrimaryButton>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Password</p>
                  <p className="text-xs text-gray-500">Send a reset link to your email</p>
                </div>
                <PrimaryButton onClick={handlePasswordReset} disabled={!user.email || saving}>Reset</PrimaryButton>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Delete Account</p>
                  <p className="text-xs text-gray-500">Permanently remove your account</p>
                </div>
                <DangerButton onClick={() => setOpenDelete(true)}><Trash2 className="h-4 w-4" /> Delete</DangerButton>
              </div>
            </div>
          </Section>

          <Section title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <GhostButton onClick={primeEditModal}><Pencil className="h-4 w-4" /> Edit Profile</GhostButton>
              <GhostButton onClick={() => setOpenEmail(true)}><Mail className="h-4 w-4" /> Change Email</GhostButton>
              <PrimaryButton onClick={handlePasswordReset} disabled={!user.email || saving}><RefreshCw className="h-4 w-4" /> Reset Password</PrimaryButton>
              <DangerButton onClick={handleLogout}><LogOut className="h-4 w-4" /> Logout</DangerButton>
            </div>
          </Section>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={openEdit} title="Edit Profile" onClose={() => setOpenEdit(false)}>
        <div className="space-y-4">
          <Input label="Display Name" value={displayName} onChange={(e :ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)} placeholder="Your name" autoFocus />
          <Input label="Photo URL" value={photoURL} onChange={(e : ChangeEvent<HTMLInputElement>)  => setPhotoURL(e.target.value)} placeholder="https://…" />
          <div className="flex items-center justify-end gap-2 pt-2">
            <GhostButton onClick={() => setOpenEdit(false)}>Cancel</GhostButton>
            <PrimaryButton onClick={handleSaveProfile} disabled={saving}><Pencil className="h-4 w-4" /> Save</PrimaryButton>
          </div>
        </div>
      </Modal>

      {/* Change Email Modal */}
      <Modal open={openEmail} title="Change Email" onClose={() => setOpenEmail(false)}>
        <div className="space-y-4">
          <Input label="New Email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="name@domain.com" autoFocus />
          {providerId === "password" && (
            <Input label="Current Password (for re‑auth if required)" type="password" value={reauthPassword} onChange={(e) => setReauthPassword(e.target.value)} placeholder="••••••••" />
          )}
          <div className="flex items-center justify-end gap-2 pt-2">
            <GhostButton onClick={() => setOpenEmail(false)}>Cancel</GhostButton>
            <PrimaryButton onClick={handleUpdateEmail} disabled={saving}><Mail className="h-4 w-4" /> Update Email</PrimaryButton>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal open={openDelete} title="Delete Account" onClose={() => setOpenDelete(false)}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">This action is permanent. Your account and associated data will be removed. You may need to re‑authenticate if your session is old.</p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <GhostButton onClick={() => setOpenDelete(false)}>Cancel</GhostButton>
            <DangerButton onClick={handleDeleteAccount} disabled={saving}><Trash2 className="h-4 w-4" /> Delete</DangerButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/*
— Quick Setup Notes —
1) TailwindCSS should be configured in your project.
2) Install deps: npm i firebase react-firebase-hooks framer-motion lucide-react
3) Provide a Firebase `auth` export at `@/lib/firebase` or update the import path above.
4) Protect this page with your auth guard/route protection as needed.
*/
