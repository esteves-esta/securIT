
package slackLib;


public class SlackEmoji {
   static private final String EMOJI_ATENCAO = ":exclamation:";
   static private final String EMOJI_DUPLA_ATENCAO = ":bangbang:";
   static private final String EMOJI_ALERTA = ":warning:";
   
   static public String EmojiAttention(){
       return EMOJI_ATENCAO;
   }
   
    static public String EmojiWarning(){
       return EMOJI_ALERTA;
   }
    
    static public String EmojiDoubleAttention(){
       return EMOJI_DUPLA_ATENCAO;
   }
}
