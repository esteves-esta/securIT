
package securit.slack;


public enum SlackEmoji {
    EMOJI_ATTENTION(":exclamation:"),
    EMOJI_DOUBLE_ATTENTION(":bangbang:"),
    EMOJI_WARNING(":warning:");

    private String description;

    private SlackEmoji(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
   
   
}
