# Automação: Notificação de Agenda via Google Chat 
Este projeto utiliza Google Apps Script, integrando Google Calendar e Google Chat via Webhook, para monitorar o Google Calendar e enviar notificações automáticas para o Google Chat sempre que uma nova reunião com convidados é agendada. A solução foi desenhada para evitar ruídos, ignorando bloqueios de agenda pessoais e focando apenas em compromissos colaborativos.

## 📋 Funcionalidades
- **Filtro Inteligente:** Notifica apenas eventos que possuem convidados (ignora lembretes e bloqueios de horários pessoais).
- **Detecção de Novas Reuniões:** Baseia-se na data de criação do evento para evitar notificações repetidas.
- **Integração via Webhook:** Envia os dados diretamente para um espaço de trabalho no Google Chat.

## 🛠️ Metodologia e Tecnologias
- **Google Apps Script:** Engine baseada em JavaScript para automação do ecossistema Google.
- **Google Calendar Service:** Utilizado para buscar e filtrar eventos da agenda principal.
- **Incoming Webhooks:** Protocolo utilizado para enviar mensagens ao Google Chat.
- **Triggers (Gatilhos):** Configurado para rodar a cada 10 minutos, garantindo monitoramento quase em tempo real.

## 🚀 Como Replicar
1. Crie um Webhook em um espaço do seu **Google Chat**.
2. No **Google Apps Script**, crie um novo projeto e cole o código `notificacao_agenda.gs`.
3. Substitua a constante `WEBHOOK_URL` pela URL gerada no passo 1.
4. Salve e execute a função `monitorarCalendario` uma vez para autorizar as permissões.
5. Configure um **Acionador (Trigger)** do tipo "Baseado no tempo" para rodar a função `monitorarCalendario` a cada 10 minutos.

## 🛡️ Segurança
Este script foi desenhado para ocultar informações sensíveis em repositórios públicos. **Nunca** suba sua URL de Webhook real para o GitHub.
