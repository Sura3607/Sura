"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type ContactFormProps = {
  fallbackEmail?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (response?.ok) {
      event.currentTarget.reset();
      setState("success");
      setMessage("Message sent. Thank you for reaching out.");
      return;
    }

    const error = await response?.json().catch(() => null);
    setState("error");
    setMessage(
      error?.error ??
        "The contact API is not available yet. Please use the email link instead.",
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input autoComplete="off" id="company" name="company" tabIndex={-1} />
      </div>

      <div>
        <label className="text-sm font-medium text-midnight-ink/70" htmlFor="name">
          Name
        </label>
        <input
          className="mt-2 h-11 w-full rounded-[var(--radius-inputs)] border border-midnight-ink/10 bg-vapor-gray px-3 text-sm font-medium outline-none focus:border-vivid-azure"
          id="name"
          maxLength={120}
          minLength={2}
          name="name"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-midnight-ink/70" htmlFor="email">
          Email
        </label>
        <input
          className="mt-2 h-11 w-full rounded-[var(--radius-inputs)] border border-midnight-ink/10 bg-vapor-gray px-3 text-sm font-medium outline-none focus:border-vivid-azure"
          id="email"
          maxLength={180}
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-midnight-ink/70" htmlFor="message">
          Message
        </label>
        <textarea
          className="mt-2 min-h-36 w-full resize-y rounded-[var(--radius-inputs)] border border-midnight-ink/10 bg-vapor-gray px-3 py-3 text-sm font-medium leading-6 outline-none focus:border-vivid-azure"
          id="message"
          maxLength={5000}
          minLength={10}
          name="message"
          required
        />
      </div>

      <button
        className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-[var(--radius-buttons)] border border-vivid-azure bg-transparent px-5 text-base font-medium text-midnight-ink transition-colors hover:bg-vivid-azure hover:text-cloud-canvas disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "submitting"}
        type="submit"
      >
        {state === "submitting" ? "Sending" : "Send message"}
        <Send size={18} />
      </button>

      {message ? (
        <p
          className={`rounded-[var(--radius-buttons)] px-4 py-3 text-sm font-medium ${
            state === "success"
              ? "bg-green-50 text-green-800"
              : "bg-vapor-gray text-midnight-ink/70"
          }`}
        >
          {message}
          {state === "error" && fallbackEmail ? (
            <>
              {" "}
              <a className="underline decoration-vivid-azure" href={`mailto:${fallbackEmail}`}>
                Email directly
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
