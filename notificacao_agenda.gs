/**
 * Monitoramento de Agenda e Notificação via Google Chat.
 */

// URL do Webhook do Google Chat (Mantenha em sigilo - Não suba sua URL real)
const WEBHOOK_URL = 'SUA_URL_DO_WEBHOOK_AQUI';

function monitorarCalendario() {
  const agora = new Date();
  // Define a janela de verificação (10 minutos)
  const dezMinutosAtras = new Date(agora.getTime() - (10 * 60 * 1000));
  
  // Busca eventos nos próximos 30 dias
  const eventos = CalendarApp.getDefaultCalendar().getEvents(
    dezMinutosAtras, 
    new Date(agora.getTime() + 30 * 24 * 60 * 60 * 1000)
  );

  eventos.forEach(evento => {
    const criador = evento.getCreators()[0]; 
    const convidados = evento.getGuestList(); 
    
    // Regra de Negócio:
    // 1. O evento deve ter sido criado nos últimos 10 minutos (evita duplicidade no gatilho)
    // 2. Deve haver convidados (ignora bloqueios de agenda pessoais)
    const foiCriadoAgora = evento.getDateCreated() > dezMinutosAtras;
    const temMaisPessoas = convidados.length > 0;

    if (foiCriadoAgora && temMaisPessoas) {
      enviarMensagemChat(evento, criador);
    }
  });
}

function enviarMensagemChat(evento, criador) {
  // Formata a data para o padrão PT-BR
  const dataFormatada = Utilities.formatDate(evento.getStartTime(), "GMT-03:00", "dd/MM 'às' HH:mm");
  
  const payload = {
    "text": `📅 *Nova Reunião Marcada!*\n\n` +
            `*Assunto:* ${evento.getTitle()}\n` +
            `*Organizador:* ${criador}\n` +
            `*Início:* ${dataFormatada}\n` +
            `*Link/Local:* ${evento.getLocation() || 'Não informado'}`
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(WEBHOOK_URL, options);
}
