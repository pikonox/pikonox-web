import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in to Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the dashboard
          </p>
        </div>
        <Suspense fallback={<div>Loading form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
