package slackLib;


public class Testando {
    
    public static void main(String[] args) {
        
        /*
            Para que a classe SlackMessage 
            funcione é necessário inserir o URL do WEBHOOK do SlackApp
            como o Slack identifica que o URL foi publicado 
            em um repositório git público e o desatualiza
            é necessário inseri-lo quando for utilizado 
            e retira-lo antes de dar o push/ ou gerar um novo depois
        */
        
        SlackMessage mensagem = new SlackMessage("COLOQUE-O-URL-DO-WEBHOOK-QUE-ESTA-NO-PLANNER");
        
        String title, content, btnText, btnUrl;
        
        /// um tipo de mensagem
        title = "Atenção seu HD está a caminho de sobrecarregar";;
        content = "Mensagem detalhada do erro que está acontecendo.";
        mensagem.sendMessage(title, content, SlackEmoji.EmojiDoubleAttention());
        
      
        
        // outro tipo de mensagem
        mensagem.sendMessage("Alerta seu sistema X está *OFFLINE*", SlackEmoji.EmojiWarning());
       
        
        /// outro tipo de mensagem
        title = "Atenção redobrada no sistema X";
        content = "Atenção segundo seu histórico de uso a CPU do sistema X vai sobrecarregar esta semana";
        btnText = "Veja mais no seu dashboard";
        btnUrl = "https://jestjs.io/docs/en/api.html";
        mensagem.sendMessage(title, content, btnText, SlackEmoji.EmojiDoubleAttention(), btnUrl);
  
    }
}
