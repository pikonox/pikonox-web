"use client";

import { authenticate } from "@/app/lib/actions";
import { useActionState } from "react";

const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700"
        >
          User Name
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-black"
          placeholder="admin"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-black"
          placeholder="Enter your password"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
