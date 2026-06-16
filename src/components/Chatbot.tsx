import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Phone, Siren, CheckCircle } from "lucide-react";
import avatar from "@/assets/chatbot-avatar.jpg";

const PHONE_LINK = "tel:+5511999990000";
const PHONE_DISPLAY = "(11) 99999-0000";
const WHATSAPP_LINK = "https://wa.me/5511999990000";

type Msg = {
  id: number;
  from: "bot" | "user";
  content: React.ReactNode;
};

type Step = "menu" | "emergency" | "collect_tutor" | "collect_phone" | "done";

let mid = 0;
const nextId = () => ++mid;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("menu");
  const [intent, setIntent] = useState<"agendar" | "precos" | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const initRef = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Initial bot messages on first open — guarded against StrictMode double-invoke
  useEffect(() => {
    if (!open || initRef.current) return;
    initRef.current = true;

    setMessages([
      {
        id: nextId(),
        from: "bot",
        content:
          "Olá! Seja bem-vindo à nossa Clínica Veterinária. Sou o Assistente Virtual e estou aqui para agilizar o seu atendimento.",
      },
    ]);
    setTyping(true);
    const t = window.setTimeout(() => {
      setMessages(m => [
        ...m,
        {
          id: nextId(),
          from: "bot",
          content:
            "Como posso ajudar você e seu pet hoje? Por favor, selecione uma das opções abaixo:",
        },
      ]);
      setTyping(false);
    }, 900);
    return () => window.clearTimeout(t);
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, step, typing]);

  const pushBot = (content: React.ReactNode, delay = 600) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages(m => [...m, { id: nextId(), from: "bot", content }]);
      setTyping(false);
    }, delay);
  };
  const pushUser = (content: React.ReactNode) => {
    setMessages(m => [...m, { id: nextId(), from: "user", content }]);
  };

  const formatPhoneValue = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return /^\d{10,11}$/.test(digits);
  };

  const handleQuick = (kind: "emergencia" | "agendar" | "precos") => {
    if (kind === "emergencia") {
      pushUser("🚨 É uma Emergência");
      setStep("emergency");
      pushBot(
        <span className="font-bold text-emergency">
          Atenção: Por favor, traga seu pet direto para nossa clínica ou ligue
          imediatamente para nosso plantonista através do botão abaixo!
        </span>,
        500
      );
      return;
    }
    if (kind === "agendar") {
      pushUser("📅 Agendar Consulta ou Vacina");
      setIntent("agendar");
    }
    pushBot("Perfeito! Para encaminhar seu atendimento, vou precisar de algumas informações rápidas. 🐾", 500);
    window.setTimeout(() => {
      pushBot("Qual o nome do tutor?", 600);
      setStep("collect_tutor");
    }, 1200);
  };

  const returnToMenu = () => {
    setInput("");
    setIntent(null);
    setStep("menu");
    pushBot("Voltando ao menu inicial. Como posso ajudar você e seu pet hoje?", 200);
  };

  const handleSubmitInput = (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;

    if (step === "collect_phone" && !isValidPhone(val)) {
      pushBot(
        <span className="inline-flex items-start gap-2 text-warning">
          Por favor, informe apenas números e DDD no formato de telefone. Exemplo: (11) 99999-9999
        </span>,
        200
      );
      return;
    }

    pushUser(val);
    setInput("");

    if (step === "collect_tutor") {
      pushBot(`Prazer, ${val}! Qual o seu telefone com DDD?`, 500);
      setStep("collect_phone");
    } else if (step === "collect_phone") {
      pushBot(
        <span className="inline-flex items-start gap-2">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          Recebido! Em instantes um de nossos atendentes humanos dará continuidade ao seu atendimento diretamente pelo WhatsApp. Obrigado pela confiança! 💚
        </span>,
        500
      );
      window.setTimeout(() => {
        pushBot(
          <a
            href="https://wa.me/5573999990000?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20consulta%20para%20o%20meu%20pet!"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            <svg role="img" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
             Abrir WhatsApp
          </a>,
          900
        );
      }, 700);
      setStep("done");
    }
  };

  const showInput = step === "collect_tutor" || step === "collect_phone";
  const showQuickReplies = step === "menu" && messages.length >= 2 && !typing;

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat de atendimento"
          className="group fixed bottom-24 right-3 z-[60] sm:bottom-28 sm:right-4 lg:bottom-6 lg:right-6"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40" />
          <span className="flex items-center gap-2 rounded-full bg-card border border-border p-1.5 sm:pr-4 shadow-[0_12px_32px_-8px_oklch(0.5_0.05_180/0.35)] transition hover:-translate-y-0.5">
            <img
              src={avatar}
              alt="Assistente virtual"
              width={44}
              height={44}
              loading="lazy"
              className="h-11 w-11 rounded-full border-2 border-primary object-cover"
            />
            <span className="hidden sm:flex flex-col text-left leading-tight pr-1">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Atendimento</span>
              <span className="text-sm font-bold">Fale conosco</span>
            </span>
            <span className="absolute top-0 -right-0 h-3 w-3 rounded-full bg-emergency ring-2 ring-background" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 z-[70] flex justify-end sm:inset-auto sm:bottom-6 sm:right-6"
          role="dialog"
          aria-label="Chat de atendimento"
        >
          <div className="flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-[0_20px_60px_-12px_oklch(0.4_0.05_180/0.4)] sm:h-[600px] sm:max-h-[80vh] sm:w-[380px] sm:rounded-3xl animate-scale-in">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-br from-primary/10 to-secondary/30 px-4 py-3">
              <div className="relative shrink-0">
                <img
                  src={avatar}
                  alt="Assistente virtual"
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 rounded-full border-2 border-primary object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold truncate">Dr. Pet • Assistente</div>
                <div className="text-[11px] text-muted-foreground">Online agora</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar chat"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-4">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.from === "bot" && (
                    <img
                      src={avatar}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 shrink-0 rounded-full border border-border object-cover"
                    />
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm break-words ${
                      m.from === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-card text-foreground border border-border"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2 justify-start">
                  <img src={avatar} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full border border-border object-cover" />
                  <div className="rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5 shadow-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
                    </span>
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {showQuickReplies && (
                <div className="flex flex-col gap-2 pl-9 pt-1 animate-fade-in">
                  <QuickReply onClick={() => handleQuick("emergencia")} tone="emergency">
                    <Siren className="h-4 w-4" /> 🚨 É uma Emergência
                  </QuickReply>
                  <QuickReply onClick={() => handleQuick("agendar")}>
                    📅 Agendar Consulta ou Vacina
                  </QuickReply>
                </div>
              )}

              {/* Emergency call CTA */}
              {step === "emergency" && !typing && (
                <div className="flex flex-col gap-2 pl-9 pt-1 animate-fade-in">
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emergency px-4 py-3 text-sm font-bold text-emergency-foreground shadow-[0_8px_24px_-8px_var(--emergency)] transition hover:opacity-95"
                  >
                    <Phone className="h-4 w-4" /> Ligar agora — {PHONE_DISPLAY}
                  </a>
                  <a
                    href="https://wa.me/5573999990000?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20consulta%20para%20o%20meu%20pet!"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    <svg role="img" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Chamar no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={returnToMenu}
                    className="rounded-full border border-border bg-muted/10 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    Voltar ao menu inicial
                  </button>
                </div>
              )}
            </div>

            {/* Input or footer */}
            {showInput ? (
              <div className="space-y-2 border-t border-border bg-card px-3 py-3">
                <form
                  onSubmit={handleSubmitInput}
                  className="flex items-center gap-2"
                >
                  <input
                    autoFocus
                    value={input}
                    onChange={e => {
                      const value = e.target.value;
                      if (step === "collect_phone") {
                        setInput(formatPhoneValue(value));
                      } else {
                        setInput(value);
                      }
                    }}
                    maxLength={15}
                    placeholder={
                      step === "collect_tutor" ? "Digite seu nome..." : "(11) 99999-9999"
                    }
                    className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                  />
                  <button
                    type="submit"
                    aria-label="Enviar"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                <button
                  type="button"
                  onClick={returnToMenu}
                  className="w-full rounded-full border border-border bg-muted/10 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Voltar ao menu inicial
                </button>
              </div>
            ) : (
              <div className="border-t border-border bg-card px-4 py-2.5 text-center text-[11px] text-muted-foreground">
                {step === "done"
                  ? "Encaminhado para atendimento humano no WhatsApp."
                  : intent || step === "emergency"
                    ? "Atendimento simulado · encaminhamento humano disponível"
                    : "Selecione uma opção acima para começar"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function QuickReply({
  children,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "emergency";
}) {
  const base =
    "inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95";
  const cls =
    tone === "emergency"
      ? "border-emergency/30 bg-emergency/10 text-emergency hover:bg-emergency hover:text-emergency-foreground"
      : "border-primary/30 bg-primary/5 text-foreground hover:bg-primary hover:text-primary-foreground";
  return (
    <button onClick={onClick} className={`${base} ${cls}`}>
      {children}
    </button>
  );
}
