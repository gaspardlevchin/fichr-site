"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "../content/locales";

const labels = {
  fr: { email: "E-mail professionnel", company: "Organisation", volume: "Nombre de produits", need: "Votre besoin principal", consent: "J’accepte que ces informations soient transmises au récepteur sécurisé de Fichr pour répondre à ma demande.", submit: "Envoyer ma demande", disabled: "Envoi désactivé jusqu’à la configuration du récepteur", sending: "Envoi…", sent: "Demande reçue. Fichr pourra vous répondre.", error: "L’envoi n’a pas abouti. Aucune confirmation n’a été créée.", required: "Champs obligatoires" },
  en: { email: "Work email", company: "Organisation", volume: "Number of products", need: "Your main need", consent: "I agree that this information may be sent to Fichr’s secure receiver to answer my request.", submit: "Send my request", disabled: "Submission disabled until the receiver is configured", sending: "Sending…", sent: "Request received. Fichr can now reply.", error: "Submission failed. No confirmation was created.", required: "Required fields" },
  de: { email: "Geschäftliche E-Mail", company: "Organisation", volume: "Anzahl Produkte", need: "Ihr wichtigstes Ziel", consent: "Ich stimme der Übermittlung an den sicheren Fichr-Empfänger zur Bearbeitung meiner Anfrage zu.", submit: "Anfrage senden", disabled: "Versand bis zur Konfiguration deaktiviert", sending: "Wird gesendet…", sent: "Anfrage empfangen. Fichr kann antworten.", error: "Versand fehlgeschlagen. Es wurde keine Bestätigung erstellt.", required: "Pflichtfelder" },
  es: { email: "Correo profesional", company: "Organización", volume: "Número de productos", need: "Necesidad principal", consent: "Acepto que esta información se envíe al receptor seguro de Fichr para responder a mi solicitud.", submit: "Enviar solicitud", disabled: "Envío desactivado hasta configurar el receptor", sending: "Enviando…", sent: "Solicitud recibida. Fichr podrá responder.", error: "El envío ha fallado. No se ha creado confirmación.", required: "Campos obligatorios" },
  pt: { email: "E-mail profissional", company: "Organização", volume: "Número de produtos", need: "Principal necessidade", consent: "Aceito que estes dados sejam enviados ao recetor seguro da Fichr para responder ao meu pedido.", submit: "Enviar pedido", disabled: "Envio desativado até configurar o recetor", sending: "A enviar…", sent: "Pedido recebido. A Fichr poderá responder.", error: "O envio falhou. Não foi criada confirmação.", required: "Campos obrigatórios" },
  it: { email: "E-mail di lavoro", company: "Organizzazione", volume: "Numero di prodotti", need: "Esigenza principale", consent: "Accetto che questi dati siano inviati al ricevitore sicuro di Fichr per rispondere alla richiesta.", submit: "Invia richiesta", disabled: "Invio disattivato fino alla configurazione", sending: "Invio…", sent: "Richiesta ricevuta. Fichr potrà rispondere.", error: "Invio non riuscito. Nessuna conferma è stata creata.", required: "Campi obbligatori" },
} satisfies Record<Locale, Record<string, string>>;

type FormState = "idle" | "sending" | "sent" | "error";

export function BetaRequestForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<FormState>("idle");
  const endpoint = process.env.NEXT_PUBLIC_BETA_RECEIVER_URL;
  const enabled = Boolean(endpoint);
  const copy = labels[locale];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint || state === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    if (formData.get("website")) return;
    setState("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          organisation: formData.get("organisation"),
          volume: formData.get("volume"),
          need: formData.get("need"),
          consent: formData.get("consent") === "on",
          locale,
          source: "fichr-site",
        }),
      });
      if (!response.ok) throw new Error(`Receiver returned ${response.status}`);
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="beta-form" onSubmit={submit} aria-describedby="beta-form-status">
      <p className="form-required">{copy.required}</p>
      <div className="beta-form-grid">
        <label>{copy.email}<input name="email" type="email" autoComplete="email" required disabled={!enabled || state === "sending"} /></label>
        <label>{copy.company}<input name="organisation" type="text" autoComplete="organization" required disabled={!enabled || state === "sending"} /></label>
        <label>{copy.volume}<select name="volume" required disabled={!enabled || state === "sending"}><option value="">—</option><option value="1-100">1–100</option><option value="101-1000">101–1 000</option><option value="1001-10000">1 001–10 000</option><option value="10000+">10 000+</option></select></label>
        <label>{copy.need}<textarea name="need" rows={4} required disabled={!enabled || state === "sending"} /></label>
      </div>
      <label className="consent"><input name="consent" type="checkbox" required disabled={!enabled || state === "sending"} /><span>{copy.consent}</span></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" disabled={!enabled} /></label>
      <div className="form-submit"><button className="button button--dark" type="submit" disabled={!enabled || state === "sending"}>{state === "sending" ? copy.sending : copy.submit}</button><p id="beta-form-status" role="status">{!enabled ? copy.disabled : state === "sent" ? copy.sent : state === "error" ? copy.error : ""}</p></div>
    </form>
  );
}
