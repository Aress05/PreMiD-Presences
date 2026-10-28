import { Assets } from 'premid'

const presence = new Presence({
  clientId: '503557087041683458',
})

enum ActivityAssets {
  Logo = 'https://files.catbox.moe/pyj7kp.png',
}

const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const path = window.location.pathname.toLowerCase()

  const [privacy, showButtons] = await Promise.all([
    presence.getSetting<boolean>('privacy').catch(() => false),
    presence.getSetting<boolean>('showButtons').catch(() => true),
  ])

  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
  }

  if (showButtons && !privacy) {
    presenceData.buttons = [
      {
        label: 'Apri FantaLab',
        url: 'https://app.fantalab.it',
      },
    ]
  }

  if (privacy) {
    presenceData.details = 'Navigando su FantaLab'
    presenceData.smallImageKey = Assets.Question
    presenceData.smallImageText = 'Privacy Mode'
    presence.setActivity(presenceData)
    return
  }

  // 1. Tool Stagione / Homepage app
  if (path.includes('/tool-stagione') || path.includes('/stagione')) {
    presenceData.details = 'Tool Stagione'
    presenceData.smallImageKey = Assets.Viewing
    presenceData.smallImageText = 'Tool Stagione'
  }
  // 2. Guida all'Asta & Listone
  else if (
    path.includes('/guida')
    || path.includes('/tool-asta')
    || path.includes('/giocatore')
    || path.includes('/giocatori-osservati')
    || path.includes('/guide')
    || path.includes('/players')
    || path.includes('/listone')
  ) {
    presenceData.details = 'Guida all\'Asta'
    presenceData.smallImageKey = Assets.Search
    presenceData.smallImageText = 'Guida all\'Asta'
  }
  // 3. Asta Live
  else if (
    path.includes('/asta')
    || path.includes('/aste-live')
    || path.includes('/join-asta')
    || path.includes('/pre-asta')
    || path.includes('/live-auction')
    || path.includes('/auction')
  ) {
    presenceData.details = 'In Asta Live'
    presenceData.smallImageKey = Assets.Play
    presenceData.smallImageText = 'Asta Live'
  }
  // 4. Formazione
  else if (
    path.includes('/formazione')
    || path.includes('/flm-formazione')
    || path.includes('/lineup')
  ) {
    presenceData.details = 'Schieramento Formazione'
    presenceData.smallImageKey = Assets.Writing
    presenceData.smallImageText = 'Formazione'
  }
  // 5. Gestione Rosa & Squadra
  else if (
    path.includes('/rosa')
    || path.includes('/flm-rosa')
    || path.includes('/squadra')
    || path.includes('/team')
  ) {
    presenceData.details = 'Gestione Rosa'
    presenceData.smallImageKey = Assets.Viewing
    presenceData.smallImageText = 'Rosa'
  }
  // 6. Calciomercato & Scambi
  else if (
    path.includes('/mercato')
    || path.includes('/scambi')
    || path.includes('/trades')
  ) {
    presenceData.details = 'Calciomercato & Scambi'
    presenceData.smallImageKey = Assets.Writing
    presenceData.smallImageText = 'Mercato'
  }
  // 7. Live & Voti
  else if (
    path.includes('/live')
    || path.includes('/livematch')
    || path.includes('/voti')
    || path.includes('/match')
  ) {
    presenceData.details = 'Voti Live'
    presenceData.smallImageKey = Assets.Live
    presenceData.smallImageText = 'Voti Live'
  }
  // 8. Leghe
  else if (
    path.includes('/crea-lega')
    || path.includes('/fantaleague')
    || path.includes('/fantaleagues')
    || path.includes('/leghe')
    || path.includes('/leagues')
  ) {
    presenceData.details = 'Gestione Leghe'
    presenceData.smallImageKey = Assets.Reading
    presenceData.smallImageText = 'Leghe'
  }
  // 9. Fallback minimale per qualsiasi altra pagina
  else {
    presenceData.details = 'Dashboard'
  }

  presence.setActivity(presenceData)
})
