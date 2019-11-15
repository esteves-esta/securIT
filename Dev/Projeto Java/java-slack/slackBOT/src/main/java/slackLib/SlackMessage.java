package slackLib;

import com.github.seratch.jslack.*;
import com.github.seratch.jslack.api.model.block.*;
import com.github.seratch.jslack.api.model.block.composition.*;
import com.github.seratch.jslack.api.model.block.element.*;
import com.github.seratch.jslack.api.webhook.*;
import java.util.Arrays;
import java.io.IOException;
import java.util.List;

public class SlackMessage {

    /*
     CLASSE UTILIZANDO BIBLIOTECA JSLACK - LINK PARA DOCUMENTAÇÃO ABAIXO
     https://github.com/seratch/jslack
    
     PARA QUE ESTA CLASSE FUNCIONA É NECESSÁRIO A URL DO WEBHOOK DESTE SLACKAPP
     COMO O SLACK IDENTIFICA QUE O LINK ESTÁ PUBLICO NO GIT E O DESATIVA 
     SEMPRE QUANDO FOR USAR/TESTAR ADICIONE O URL DO WEBHOOK
   */
    
    final private String URL;
    private Slack slack;
    private Payload payload;
    private String message;
    private String title;
    private String buttonText;
    private WebhookResponse response;
    private String emoji;
   
    public SlackMessage(String webhookUrl) {
       this.URL = webhookUrl;
    }    
    
    private void simplePayloadMessage( ) {       
        payload = Payload.builder().text(this.message).build();
    }
   
    private SectionBlock getSection(String content) {
        SectionBlock section = SectionBlock.builder()
            .text(
                MarkdownTextObject.builder().verbatim(Boolean.FALSE
            ).text(content).build())
            .build();

        return section;
    }
   
    private DividerBlock getDividerLine() {
        DividerBlock divider = DividerBlock.builder().build();
        
        return divider;
    }

    private LayoutBlock getButton(String content, String btnUrl) {
        ButtonElement button = ButtonElement.builder()
            .text(
                    PlainTextObject.builder().emoji(true).text(content).build()
            ).url(btnUrl)
            .build();

        LayoutBlock block = ActionsBlock.builder()
                .elements(Arrays.asList(button))
                .build();

       return block;
   }
   
         
   private void sendPayload(List<LayoutBlock> blocks) {
        this.payload = Payload.builder().blocks(blocks).build();
        this.slack = Slack.getInstance();

        try{
               response = slack.send(this.URL, this.payload);
              // response.code, response.message, response.body
        }
        catch (IOException e){
            e.printStackTrace();
        }
   }
   
    public void sendMessage(String message, String emoji) {
        this.message = emoji + "  " + message;
        
        sendPayload(Arrays.asList(getSection(this.message)));
    }
    
    public void sendMessage(String title, String message, String emoji) {
        this.message = message;
        this.title = emoji + "  " + title + "  " + emoji;
        
        DividerBlock divider = getDividerLine();
        
        sendPayload(
            Arrays.asList(
                divider,
                getSection(this.title),
                divider,
                getSection(this.message)
            )
        );
    }
    
     public void sendMessage(String title, String message, String buttonText, String emoji, String btnUrl) {
        this.message = message;
        this.title = emoji + "  " + title + "  " + emoji;
        this.buttonText = buttonText;
        
        DividerBlock divider = getDividerLine();
        
        sendPayload(
            Arrays.asList(
                divider,
                getSection(this.title),
                divider,
                getSection(this.message),
                getButton(this.buttonText, btnUrl)
            )
        );
    }
}
