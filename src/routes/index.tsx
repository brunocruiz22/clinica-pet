import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone,
  Calendar,
  Siren,
  Stethoscope,
  Syringe,
  Scissors,
  ScanLine,
  HeartPulse,
  PawPrint,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Menu,
  X,
  User,
  Dog,
  Cat,
  Smartphone,
  ListChecks,
  Send,
  CheckCircle,
  PhoneCall,
} from "lucide-react";
import heroImg from "@/assets/hero-vet.jpg";
import { Chatbot } from "@/components/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pet — Clínica Veterinária 24h | Cuidado humanizado" },
      { name: "description", content: "Clínica veterinária com atendimento 24h, consultas, vacinas, cirurgias, exames de imagem e internamento. Agende sua consulta agora." },
      { property: "og:title", content: "Pet — Clínica Veterinária 24h" },
      { property: "og:description", content: "Cuidado humanizado para cães e gatos, com emergência 24 horas." },
    ],
  }),
  component: Home,
});

const PHONE_DISPLAY = "(11) 99999-0000";
const PHONE_LINK = "tel:+5511999990000";
const WHATSAPP_LINK = "https://wa.me/5511999990000";

const services = [
  { icon: Stethoscope, title: "Consultas", desc: "Avaliação clínica completa com veterinários especialistas." },
  { icon: Syringe, title: "Vacinas", desc: "Protocolos vacinais V8, V10, antirrábica e felinas." },
  { icon: Scissors, title: "Cirurgias", desc: "Centro cirúrgico equipado para procedimentos eletivos e de urgência." },
  { icon: ScanLine, title: "Exames de Imagem", desc: "Ultrassonografia, raio-X digital e ecocardiograma." },
  { icon: HeartPulse, title: "Internamento", desc: "UTI 24h com monitoramento contínuo e cuidado individualizado." },
  { icon: ShieldCheck, title: "Check-up Preventivo", desc: "Pacotes preventivos para todas as fases da vida do seu pet." },
];

const testimonials = [
  { name: "Mariana S.", pet: "tutora da Luna 🐱", text: "Atendimento incrível! A equipe acolheu minha gata com tanto carinho que ela nem percebeu que estava no veterinário. Estrutura impecável.", rating: 5 },
  { name: "Rafael T.", pet: "tutor do Thor 🐶", text: "Levei meu cachorro de madrugada em uma emergência. Fui atendido na hora, com profissionalismo e empatia. Salvaram a vida do Thor.", rating: 5 },
  { name: "Camila P.", pet: "tutora da Mel 🐶", text: "Faço acompanhamento da Mel há 2 anos. Confio totalmente no time. Comunicação clara e preços justos.", rating: 5 },
  { name: "João V.", pet: "tutor do Simba 🐱", text: "Clínica moderna, limpa e com profissionais super atenciosos. Recomendo de olhos fechados!", rating: 5 },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <BookingForm />
      </main>
      <Footer />
      <MobileStickyBar />
      <Chatbot />
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }} className="flex items-center gap-2 min-w-0 cursor-pointer">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <PawPrint className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="font-display text-lg font-extrabold tracking-tight truncate">Pet</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Clínica Veterinária</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground mr-4">
            <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToId("servicos"); }} className="hover:text-foreground transition cursor-pointer">Serviços</a>
            <a href="#depoimentos" onClick={(e) => { e.preventDefault(); scrollToId("depoimentos"); }} className="hover:text-foreground transition cursor-pointer">Depoimentos</a>
            {/* <a href="#agendamento" onClick={(e) => { e.preventDefault(); scrollToId("agendamento"); }} className="hover:text-foreground transition cursor-pointer">Agendar</a> */}
            <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToId("contato"); }} className="hover:text-foreground transition cursor-pointer">Contato</a>
          </nav>
          <a
            href={PHONE_LINK}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:bg-accent transition"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="hidden md:inline text-muted-foreground">Plantão:</span>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center gap-2 rounded-full bg-emergency px-3 py-2 text-sm font-semibold text-emergency-foreground shadow-[0_8px_24px_-8px_var(--emergency)] hover:opacity-95 transition"
          >
            <Siren className="h-4 w-4" />
            <span className="hidden sm:inline">Emergência</span>
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border bg-card"
            aria-label="Abrir menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            <a href="#servicos" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId("servicos"); }} className="py-2 text-sm font-medium cursor-pointer">Serviços</a>
            <a href="#depoimentos" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId("depoimentos"); }} className="py-2 text-sm font-medium cursor-pointer">Depoimentos</a>
            {/* <a href="#agendamento" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId("agendamento"); }} className="py-2 text-sm font-medium cursor-pointer">Agendar</a> */}
            <a href="#contato" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId("contato"); }} className="py-2 text-sm font-medium cursor-pointer">Contato</a>
            <a href={PHONE_LINK} className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
              <Phone className="h-4 w-4 text-primary" /> {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/40 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Atendimento 24 horas
          </span>
          <h1 className="mt-5 font-display text-[clamp(1.75rem,8vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight [hyphens:none] [word-break:normal] sm:text-5xl sm:leading-[1.05]">
            Cuidado humanizado e estrutura completa para o seu{" "}
            <span className="text-primary">melhor amigo</span> <br></br>24 horas por dia.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] text-muted-foreground [hyphens:none] sm:text-lg">
            Da consulta de rotina à emergência de madrugada, nossa equipe especializada acolhe você
            e o seu pet com carinho, tecnologia e total transparência.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5573999990000?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20consulta%20para%20o%20meu%20pet!"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:translate-y-[-1px] hover:opacity-95 cursor-pointer"
            >
              <Calendar className="h-5 w-5" />
              Agendar Consulta
            </a>
            {/* <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emergency/30 bg-emergency/10 px-6 py-3.5 text-base font-semibold text-emergency transition hover:bg-emergency hover:text-emergency-foreground"
            >
              <Siren className="h-5 w-5" />
              Emergência Veterinária
            </a> */}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Equipe especializada</div>
            <div className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary" /> UTI 24h</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> +2.500 tutores atendidos</div>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-card)]">
            <img
              src={heroImg}
              alt="Veterinária sorrindo segurando filhote de golden retriever na clínica"
              width={1536}
              height={1152}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-2 sm:-left-8 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emergency/10 text-emergency">
                <Siren className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Plantão agora</div>
                <a href={PHONE_LINK} className="text-sm font-bold text-foreground">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Nossos serviços</span>
        <h2 className="mt-3 font-display text-[clamp(1.5rem,6vw,2rem)] font-extrabold tracking-tight [hyphens:none] sm:text-4xl">
          Tudo que o seu pet precisa em um só lugar
        </h2>
        <p className="mt-4 text-muted-foreground">
          Estrutura moderna e equipe multidisciplinar para cuidar de cães e gatos com excelência.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  return (
    <section id="depoimentos" className="bg-muted/40 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Tutores felizes</span>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,6vw,2rem)] font-extrabold tracking-tight [hyphens:none] sm:text-4xl">
            O que dizem sobre nosso atendimento
          </h2>
        </div>

        <div className="relative mt-12">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-1 sm:px-3">
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-foreground sm:text-lg">
                      “{t.text}”
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/15 font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{t.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{t.pet}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-accent transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Próximo"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-accent transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Clínica veterinária com atendimento humanizado, estrutura completa e plantão 24h
              para cuidar do seu melhor amigo.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={WHATSAPP_LINK} aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent transition">
                <svg role="img" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-lg font-bold">Contato e horários</h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-muted-foreground">
                Centro, Jequié - BA<br />
                Jequié / BA — CEP 45200-191
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-muted-foreground">
                <div><span className="font-semibold text-foreground">Clínica:</span> Seg a Sáb · 8h às 20h</div>
                <div><span className="font-semibold text-foreground">Emergência:</span> 24 horas, todos os dias</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <a href={PHONE_LINK} className="text-muted-foreground hover:text-foreground transition">{PHONE_DISPLAY}</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Como chegar</h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
              title="Mapa da clínica Pet"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6542872652667!2d-40.08511912490768!3d-13.859778586543424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x740af42f54a14e9%3A0xb4e204a520607bae!2sPra%C3%A7a%20Rui%20Barbosa%20-%20Centro%2C%20Jequi%C3%A9%20-%20BA%2C%2045200-191!5e0!3m2!1spt-BR!2sbr!4v1781647861891!5m2!1spt-BR!2sbr"
              width="100%"
              height="220"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Pet — Clínica Veterinária. Todos os direitos reservados.</p>
          {/* <p>CRMV-SP 00000 · Responsável Técnico Dr. João Silva</p> */}
        </div>
      </div>
    </footer>
  );
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    tutor: "",
    pet: "",
    species: "cao",
    phone: "",
    service: "consulta",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="agendamento" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Recebemos seu pedido!
          </h2>
          <p className="mt-3 text-muted-foreground">
            Obrigado! Nossa equipe de plantão entrará em contato em menos de 10 minutos para confirmar o horário do seu pet.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ tutor: "", pet: "", species: "cao", phone: "", service: "consulta" });
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
          >
            Fazer novo agendamento
          </button>
        </div>
      </section>
    );
  }

  // return (
  //   <section id="agendamento" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
  //     <div className="mx-auto max-w-2xl text-center">
  //       <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Agendamento expresso</span>
  //       <h2 className="mt-3 font-display text-[clamp(1.5rem,6vw,2rem)] font-extrabold tracking-tight [hyphens:none] sm:text-4xl">
  //         Agende a consulta do seu pet em segundos
  //       </h2>
  //       <p className="mt-4 text-muted-foreground">
  //         Preencha os dados abaixo e nossa equipe entrará em contato rapidamente.
  //       </p>
  //     </div>

  //     <form
  //       onSubmit={handleSubmit}
  //       className="mx-auto mt-12 max-w-xl rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10"
  //     >
  //       <div className="space-y-5">
  //         <div>
  //           <label htmlFor="tutor" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
  //             <User className="h-4 w-4 text-primary" /> Nome do Tutor
  //           </label>
  //           <input
  //             id="tutor"
  //             required
  //             maxLength={100}
  //             value={form.tutor}
  //             onChange={e => setForm(f => ({ ...f, tutor: e.target.value }))}
  //             placeholder="Seu nome completo"
  //             className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
  //           />
  //         </div>

  //         <div className="grid gap-5 sm:grid-cols-2">
  //           <div>
  //             <label htmlFor="pet" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
  //               <Dog className="h-4 w-4 text-primary" /> Nome do Pet
  //             </label>
  //             <input
  //               id="pet"
  //               required
  //               maxLength={50}
  //               value={form.pet}
  //               onChange={e => setForm(f => ({ ...f, pet: e.target.value }))}
  //               placeholder="Nome do pet"
  //               className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="species" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
  //               <Cat className="h-4 w-4 text-primary" /> Espécie
  //             </label>
  //             <select
  //               id="species"
  //               required
  //               value={form.species}
  //               onChange={e => setForm(f => ({ ...f, species: e.target.value }))}
  //               className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
  //             >
  //               <option value="cao">Cão</option>
  //               <option value="gato">Gato</option>
  //               <option value="outros">Outros</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div>
  //           <label htmlFor="phone" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
  //             <Smartphone className="h-4 w-4 text-primary" /> Telefone / WhatsApp
  //           </label>
  //           <input
  //             id="phone"
  //             type="tel"
  //             required
  //             maxLength={20}
  //             value={form.phone}
  //             onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
  //             placeholder="(11) 99999-9999"
  //             className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
  //           />
  //         </div>

  //         <div>
  //           <label htmlFor="service" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
  //             <ListChecks className="h-4 w-4 text-primary" /> Tipo de Serviço Desejado
  //           </label>
  //           <select
  //             id="service"
  //             required
  //             value={form.service}
  //             onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
  //             className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
  //           >
  //             <option value="consulta">Consulta</option>
  //             <option value="vacina">Vacina</option>
  //             <option value="cirurgia">Cirurgia</option>
  //             <option value="exame">Exame de Imagem</option>
  //             <option value="internamento">Internamento</option>
  //             <option value="checkup">Check-up Preventivo</option>
  //             <option value="emergencia">Emergência</option>
  //           </select>
  //         </div>
  //       </div>

  //       <button
  //         type="submit"
  //         className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
  //       >
  //         <Send className="h-5 w-5" />
  //         Enviar Agendamento
  //       </button>

  //       <p className="mt-4 text-center text-xs text-muted-foreground">
  //         Ao enviar, você autoriza o contato da equipe Pet Vida pelo WhatsApp ou telefone informado.
  //       </p>
  //     </form>
  //   </section>
  // );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/95 px-3 py-2.5 shadow-[0_-8px_24px_-8px_oklch(0.5_0.05_180/0.12)] backdrop-blur-md lg:hidden">
      <a
        href={PHONE_LINK}
        className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-emergency/10 px-3 py-2.5 text-sm font-bold text-emergency border border-emergency/20 transition active:scale-95"
      >
        <PhoneCall className="h-4 w-4 shrink-0" />
        <span className="truncate">Ligar Agora</span>
      </a>
      <a
        href={WHATSAPP_LINK}
        className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition active:scale-95"
      >
        <svg role="img" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        <span className="truncate">WhatsApp</span>
      </a>
    </div>
  );
}
