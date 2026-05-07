"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS — All user-facing UI strings
   ═══════════════════════════════════════════════════════════════ */

const T: Record<string, Record<Lang, string>> = {
  // ── Navigation ──
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.menu": { es: "Menu", en: "Menu" },
  "nav.gallery": { es: "Galeria", en: "Gallery" },
  "nav.reserve": { es: "Reservar", en: "Reserve" },
  "nav.order": { es: "PEDIR AHORA", en: "ORDER NOW" },
  "nav.order_short": { es: "PEDIR", en: "ORDER" },

  // ── Hero ──
  "hero.location": {
    es: "Isla Tierra Bomba · Cartagena",
    en: "Isla Tierra Bomba · Cartagena",
  },
  "hero.reserve": { es: "Reservar Mesa", en: "Reserve a Table" },
  "hero.order": { es: "Pedir desde tu Zona", en: "Order from Your Zone" },
  "hero.scroll": { es: "SCROLL", en: "SCROLL" },

  // ── Story ──
  "story.label": { es: "NUESTRA HISTORIA", en: "OUR STORY" },
  "story.title1": { es: "El Reino del", en: "The Kingdom of" },
  "story.title2": { es: "Realismo Magico", en: "Magical Realism" },
  "story.p1": {
    es: "Para quienes ya lo han visto todo y aun buscan lo que el mundo no ofrece. A tan solo 5 minutos de Cartagena, en la isla ancestral de Tierra Bomba.",
    en: "For those who have seen it all and still seek what the world doesn't offer. Just 5 minutes from Cartagena, on the ancestral island of Tierra Bomba.",
  },
  "story.p2": {
    es: "Arquitectura hecha a mano. Mar abierto al horizonte. Un sonido que guia lo que esta por venir.",
    en: "Handcrafted architecture. Open sea to the horizon. A sound that guides what is to come.",
  },
  "story.tagline": {
    es: "Bethel Bellini — Unico, exclusivo y mundial.",
    en: "Bethel Bellini — Unique, exclusive, and world-class.",
  },
  "story.stat_min": { es: "Minutos de Cartagena", en: "Minutes from Cartagena" },
  "story.stat_ocean": { es: "Vista al Mar", en: "Ocean View" },
  "story.stat_sun": { es: "Dias de Sol", en: "Days of Sun" },

  // ── ISLA OS Section ──
  "isla.label": { es: "EXPERIENCIA SIN ESFUERZO", en: "EFFORTLESS EXPERIENCE" },
  "isla.title": { es: "Pide desde tu Paraiso", en: "Order from Your Paradise" },
  "isla.subtitle": {
    es: "Sin hacer fila. Sin esperar meseros. Tu bebida llega a donde estes. Escanea, pide, disfruta.",
    en: "No lines. No waiting for waiters. Your drink comes to you. Scan, order, enjoy.",
  },
  "isla.qr_title": { es: "Escanea el QR en tu zona", en: "Scan the QR in your zone" },
  "isla.qr_desc": {
    es: "Cada zona tiene un codigo. Escanea, elige del menu, paga. Tu pedido llega a tu camastro.",
    en: "Each zone has a code. Scan, pick from the menu, pay. Your order arrives at your lounger.",
  },
  "isla.wa_title": { es: "Escribe por WhatsApp", en: "Message via WhatsApp" },
  "isla.wa_desc": {
    es: "Envia tu pedido al chat. Nuestra IA entiende espanol e ingles. Natural como hablar con un amigo.",
    en: "Send your order via chat. Our AI understands Spanish and English. As natural as talking to a friend.",
  },
  "isla.bar_title": { es: "Pide en el Bar", en: "Order at the Bar" },
  "isla.bar_desc": {
    es: "Di tu numero de banda. Sin efectivo, sin tarjeta. Todo se descuenta de tu saldo.",
    en: "Give your wristband number. No cash, no card. Everything is deducted from your balance.",
  },
  "isla.choose_zone": { es: "ELIGE TU ZONA Y PIDE", en: "CHOOSE YOUR ZONE & ORDER" },
  "isla.order_arrow": { es: "Pedir", en: "Order" },
  "isla.order_wa": { es: "Pedir por WhatsApp", en: "Order via WhatsApp" },
  "isla.write_order": {
    es: "Escribe tu pedido como un mensaje",
    en: "Write your order as a message",
  },
  "isla.wa_text": {
    es: "Hola%20quiero%20pedir",
    en: "Hello%20I%20want%20to%20order",
  },
  "isla.how": { es: "COMO FUNCIONA", en: "HOW IT WORKS" },
  "isla.step1_t": { es: "Llegas al Muelle", en: "Arrive at the Dock" },
  "isla.step1_d": {
    es: "Carga tu saldo con Nequi, tarjeta, Daviplata o efectivo. Recibe tu banda.",
    en: "Load your balance with Nequi, card, Daviplata, or cash. Get your wristband.",
  },
  "isla.step2_t": { es: "Elige tu Zona", en: "Choose Your Zone" },
  "isla.step2_d": {
    es: "Playa, piscina, cabana, bar o terraza. Tu paraiso personal.",
    en: "Beach, pool, cabana, bar, or terrace. Your personal paradise.",
  },
  "isla.step3_t": { es: "Pide sin Esfuerzo", en: "Order Effortlessly" },
  "isla.step3_d": {
    es: "QR, WhatsApp, o en el bar con tu banda. Tu pedido llega a ti.",
    en: "QR, WhatsApp, or at the bar with your wristband. Your order comes to you.",
  },
  "isla.step4_t": { es: "Disfruta", en: "Enjoy" },
  "isla.step4_d": {
    es: "Sin cuentas abiertas, sin preocupaciones. Al salir, todo se liquida en el muelle.",
    en: "No open tabs, no worries. When you leave, everything is settled at the dock.",
  },
  "isla.payment_note": {
    es: "Procesado de forma segura por Wompi · Bancolombia",
    en: "Securely processed by Wompi · Bancolombia",
  },
  "isla.cash": { es: "Efectivo", en: "Cash" },

  // ── Menu Section ──
  "menu.label": { es: "GASTRONOMIA DEL CARIBE", en: "CARIBBEAN GASTRONOMY" },
  "menu.title": { es: "Nuestra Carta", en: "Our Menu" },
  "menu.subtitle": {
    es: "Cocina de autor con raices caribenas y toques mediterraneos.",
    en: "Author cuisine with Caribbean roots and Mediterranean touches.",
  },
  "menu.chef": { es: "CHEF'S SELECTION", en: "CHEF'S SELECTION" },
  "menu.premium": { es: "PREMIUM", en: "PREMIUM" },
  "menu.note": {
    es: "Precios en COP · Propina sugerida 10% · Menu sujeto a disponibilidad",
    en: "Prices in COP · 10% gratuity suggested · Menu subject to availability",
  },
  "menu.order_btn": { es: "Pedir desde tu Zona", en: "Order from Your Zone" },

  // ── Gallery ──
  "gallery.label": { es: "GALERIA", en: "GALLERY" },
  "gallery.title": {
    es: "El Reino del Realismo Magico",
    en: "The Kingdom of Magical Realism",
  },
  "gallery.subtitle": {
    es: "Arquitectura hecha a mano. Mar abierto al horizonte.",
    en: "Handcrafted architecture. Open sea to the horizon.",
  },

  // ── Reservation ──
  "res.label": { es: "EXPERIENCIA", en: "EXPERIENCE" },
  "res.title": { es: "Reservar Mesa", en: "Reserve a Table" },
  "res.subtitle": {
    es: "Asegura tu lugar en el Reino del Realismo Magico",
    en: "Secure your place in the Kingdom of Magical Realism",
  },
  "res.name": { es: "Nombre Completo", en: "Full Name" },
  "res.email": { es: "Email", en: "Email" },
  "res.phone": { es: "Telefono / WhatsApp", en: "Phone / WhatsApp" },
  "res.date": { es: "Fecha", en: "Date" },
  "res.time": { es: "Hora", en: "Time" },
  "res.guests": { es: "Personas", en: "Guests" },
  "res.person": { es: "persona", en: "person" },
  "res.people": { es: "personas", en: "people" },
  "res.more10": { es: "Mas de 10", en: "More than 10" },
  "res.confirm": { es: "Confirmar Reservacion", en: "Confirm Reservation" },
  "res.prefer": {
    es: "Prefieres contactarnos directamente?",
    en: "Prefer to contact us directly?",
  },
  "res.wa_link": { es: "Escribenos por WhatsApp", en: "Message us on WhatsApp" },
  "res.wa_text": {
    es: "Hola%20quiero%20reservar",
    en: "Hello%20I%20want%20to%20make%20a%20reservation",
  },

  // ── Footer ──
  "foot.desc": {
    es: "El Reino del Realismo Magico. Arquitectura hecha a mano, mar abierto al horizonte. Isla Tierra Bomba, a solo 5 minutos de Cartagena.",
    en: "The Kingdom of Magical Realism. Handcrafted architecture, open sea to the horizon. Isla Tierra Bomba, just 5 minutes from Cartagena.",
  },
  "foot.contact": { es: "CONTACTO", en: "CONTACT" },
  "foot.address": {
    es: "5 min en lancha desde Bocagrande",
    en: "5 min boat ride from Bocagrande",
  },
  "foot.hours": { es: "HORARIO", en: "HOURS" },
  "foot.mon": { es: "Lunes – Jueves: 10:00 – 18:00", en: "Monday – Thursday: 10:00 AM – 6:00 PM" },
  "foot.fri": { es: "Viernes – Sabado: 10:00 – 22:00", en: "Friday – Saturday: 10:00 AM – 10:00 PM" },
  "foot.sun": { es: "Domingo: 10:00 – 20:00", en: "Sunday: 10:00 AM – 8:00 PM" },

  // ── Order Page — Welcome ──
  "o.back": { es: "Volver", en: "Back" },
  "o.change": { es: "Cambiar", en: "Change" },
  "o.welcome": { es: "Bienvenido al Paraiso", en: "Welcome to Paradise" },
  "o.welcome_sub": {
    es: "Ingresa tu numero para acceder a tu cuenta y pedir desde tu zona.",
    en: "Enter your number to access your account and order from your zone.",
  },
  "o.phone_label": { es: "NUMERO DE CELULAR", en: "PHONE NUMBER" },
  "o.phone_error": { es: "Ingresa un numero valido", en: "Enter a valid number" },
  "o.verifying": { es: "Verificando...", en: "Verifying..." },
  "o.continue": { es: "Continuar", en: "Continue" },
  "o.have_band": { es: "Ya tienes tu banda?", en: "Already have your wristband?" },
  "o.scan_band": { es: "Escanear Banda", en: "Scan Wristband" },
  "o.first_time": {
    es: "Primera vez? Tu cuenta se crea automaticamente.",
    en: "First time? Your account is created automatically.",
  },
  "o.first_time2": {
    es: "Carga tu saldo en el muelle al llegar.",
    en: "Load your balance at the dock on arrival.",
  },

  // ── Order Page — Balance ──
  "o.band": { es: "Banda", en: "Wristband" },
  "o.your_balance": { es: "Tu Balance", en: "Your Balance" },
  "o.available": { es: "Disponible para consumo", en: "Available for spending" },
  "o.topup": { es: "+ Recargar Saldo", en: "+ Top Up Balance" },
  "o.topup_label": { es: "RECARGAR", en: "TOP UP" },
  "o.cancel": { es: "Cancelar", en: "Cancel" },
  "o.topup_btn": { es: "Recargar", en: "Top Up" },
  "o.pay_methods": {
    es: "Pago con Nequi, Daviplata o Tarjeta",
    en: "Pay with Nequi, Daviplata, or Card",
  },
  "o.linked": { es: "Cuenta vinculada", en: "Linked account" },
  "o.ready": { es: "Listo para pedir", en: "Ready to order" },
  "o.balance_deduct": {
    es: "Tu pedido se descuenta de tu saldo",
    en: "Your order is deducted from your balance",
  },
  "o.see_menu": { es: "Ver Menu", en: "See Menu" },
  "o.choose_zone": { es: "Elegir mi Zona", en: "Choose My Zone" },

  // ── Order Page — Zones ──
  "o.where": { es: "Donde te encuentras?", en: "Where are you?" },
  "o.zone_sub": {
    es: "Selecciona tu zona para que tu pedido llegue directo a ti.",
    en: "Select your zone so your order comes directly to you.",
  },
  "o.zone_help": {
    es: "Nuestro runner llevara tu pedido directamente a tu ubicacion.",
    en: "Our runner will deliver your order directly to your location.",
  },
  "o.z_beach": { es: "Camastros Playa", en: "Beach Loungers" },
  "o.z_beach_sub": { es: "Frente al mar", en: "Oceanfront" },
  "o.z_pool": { es: "Piscina Infinity", en: "Infinity Pool" },
  "o.z_pool_sub": { es: "Area de pool", en: "Pool area" },
  "o.z_vip": { es: "Palapa VIP", en: "VIP Palapa" },
  "o.z_vip_sub": { es: "Zona privada", en: "Private zone" },
  "o.z_bar": { es: "Bar del Mar", en: "Sea Bar" },
  "o.z_bar_sub": { es: "Barra principal", en: "Main bar" },
  "o.z_terrace": { es: "Terraza Sunset", en: "Sunset Terrace" },
  "o.z_terrace_sub": { es: "Vista panoramica", en: "Panoramic view" },
  "o.z_restaurant": { es: "Restaurante", en: "Restaurant" },
  "o.z_restaurant_sub": { es: "Area gastronomica", en: "Dining area" },

  // ── Order Page — Menu ──
  "o.offline": {
    es: "Modo Offline — Tu pedido se enviara al reconectar",
    en: "Offline Mode — Your order will be sent when reconnected",
  },
  "o.balance": { es: "Saldo", en: "Balance" },
  "o.popular": { es: "POPULAR", en: "POPULAR" },
  "o.view_order": { es: "Ver Pedido", en: "View Order" },
  "o.item": { es: "item", en: "item" },
  "o.items": { es: "items", en: "items" },

  // ── Order Page — Cart ──
  "o.your_order": { es: "Tu Pedido", en: "Your Order" },
  "o.cart_empty": { es: "Tu pedido esta vacio", en: "Your cart is empty" },
  "o.see_carta": { es: "Ver la Carta", en: "See the Menu" },
  "o.each": { es: "c/u", en: "each" },
  "o.total": { es: "Total", en: "Total" },
  "o.your_bal": { es: "Tu saldo", en: "Your balance" },
  "o.to_pay": { es: "Continuar al Pago", en: "Continue to Payment" },

  // ── Order Page — Payment ──
  "o.confirm": { es: "Confirmar Pedido", en: "Confirm Order" },
  "o.insufficient": { es: "Saldo insuficiente", en: "Insufficient balance" },
  "o.need_more": {
    es: "Necesitas {amount} mas. Recarga tu saldo para continuar.",
    en: "You need {amount} more. Top up your balance to continue.",
  },
  "o.topup_bal": { es: "Recargar Saldo", en: "Top Up Balance" },
  "o.pay_method": { es: "METODO DE PAGO", en: "PAYMENT METHOD" },
  "o.my_balance": { es: "Mi Balance Bellini", en: "My Bellini Balance" },
  "o.bal_label": { es: "Saldo:", en: "Balance:" },
  "o.summary": { es: "RESUMEN", en: "SUMMARY" },
  "o.bal_after": { es: "Saldo despues", en: "Balance after" },
  "o.processing": { es: "Procesando...", en: "Processing..." },
  "o.delivery": { es: "Se entrega en:", en: "Delivered to:" },

  // ── Order Page — Done ──
  "o.confirmed": { es: "Pedido Confirmado", en: "Order Confirmed" },
  "o.preparing": { es: "Tu orden esta en preparacion", en: "Your order is being prepared" },
  "o.order_id": { es: "Orden", en: "Order" },
  "o.zone": { es: "Zona", en: "Zone" },
  "o.new_bal": { es: "Nuevo saldo", en: "New balance" },
  "o.est_time": { es: "Tiempo est.", en: "Est. time" },
  "o.est_min": { es: "~8 minutos", en: "~8 minutes" },
  "o.your_order_label": { es: "TU PEDIDO", en: "YOUR ORDER" },
  "o.runner": {
    es: "Nuestro runner de zona te llevara tu pedido directamente. Relajate y disfruta del paraiso.",
    en: "Our zone runner will bring your order directly to you. Relax and enjoy paradise.",
  },
  "o.new_order": { es: "Nuevo Pedido", en: "New Order" },
  "o.go_back": { es: "Volver", en: "Back" },

  // ── Suspense ──
  "o.loading": { es: "Cargando ISLA OS...", en: "Loading ISLA OS..." },
};

/* ═══════════════════════════════════════════════════════════════
   MENU CATEGORY TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */

export const CATEGORY_NAMES: Record<string, Record<Lang, string>> = {
  // Home page
  Destacados: { es: "Destacados", en: "Featured" },
  Entradas: { es: "Entradas", en: "Appetizers" },
  Pasta: { es: "Pasta", en: "Pasta" },
  Pescado: { es: "Pescado", en: "Seafood" },
  "Cortes Angus": { es: "Cortes Angus", en: "Black Angus Cuts" },
  "Cocteles": { es: "Cocteles", en: "Cocktails" },
  Champagne: { es: "Champagne", en: "Champagne" },
  "Tragos Premium": { es: "Tragos Premium", en: "Premium Spirits" },
  // Order page
  Cervezas: { es: "Cervezas", en: "Beers" },
  "Del Mar": { es: "Del Mar", en: "From the Sea" },
  "Sin Alcohol": { es: "Sin Alcohol", en: "Non-Alcoholic" },
};

export function catName(key: string, lang: Lang): string {
  return CATEGORY_NAMES[key]?.[lang] ?? key;
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE ZONE TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */

export const HOME_ZONES: Record<Lang, { name: string; icon: string; color: string }[]> = {
  es: [
    { name: "Playa Bellini", icon: "◎", color: "#C4654A" },
    { name: "La Piscina", icon: "◉", color: "#2A6B7C" },
    { name: "Cabanas Privadas", icon: "◈", color: "#D4923A" },
    { name: "Bar del Mar", icon: "◆", color: "#3A5E3A" },
    { name: "Terraza Atardecer", icon: "◇", color: "#7A5A6A" },
  ],
  en: [
    { name: "Bellini Beach", icon: "◎", color: "#C4654A" },
    { name: "The Pool", icon: "◉", color: "#2A6B7C" },
    { name: "Private Cabanas", icon: "◈", color: "#D4923A" },
    { name: "Sea Bar", icon: "◆", color: "#3A5E3A" },
    { name: "Sunset Terrace", icon: "◇", color: "#7A5A6A" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   CONTEXT + PROVIDER
   ═══════════════════════════════════════════════════════════════ */

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const Ctx = createContext<LanguageCtx>({
  lang: "es",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("bb-lang") as Lang | null;
    if (saved === "es" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("bb-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string, replacements?: Record<string, string>) => {
      const entry = T[key];
      if (!entry) return key;
      let text = entry[lang];
      if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
          text = text.replace(`{${k}}`, v);
        }
      }
      return text;
    },
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE TOGGLE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className={`flex items-center gap-0.5 text-[10px] tracking-[1px] font-sans font-bold transition-all ${className}`}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Espanol"}
    >
      <span
        className={`px-1.5 py-0.5 rounded-l transition-colors ${
          lang === "es"
            ? "bg-[rgba(196,168,130,0.2)] text-[var(--bb-sand)]"
            : "text-[var(--bb-muted)]"
        }`}
      >
        ES
      </span>
      <span
        className={`px-1.5 py-0.5 rounded-r transition-colors ${
          lang === "en"
            ? "bg-[rgba(196,168,130,0.2)] text-[var(--bb-sand)]"
            : "text-[var(--bb-muted)]"
        }`}
      >
        EN
      </span>
    </button>
  );
}
