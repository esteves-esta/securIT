/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package securit.logs;

import java.io.FileNotFoundException;
import java.util.logging.Level;
import securit.telas.Dashboard;

/**
 *
 * @author Fernanda Esteves
 */
public class Log {
    
    public static void firstLog(String nomeSistema) {
        Arquivo logFile = new Arquivo("Securit"); 
        String arquivoLogCaminho;
    
        Diretorio.criarDiretorio();
        try {
            logFile.criarArquivo();
            logFile.escreverArquivo(
                    String.format("Servidor do sistema %s iniciado.", nomeSistema)
            );
        } catch (FileNotFoundException ex) {
            java.util.logging.Logger.getLogger(Dashboard.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void fileLogs(String tipoErro, String erro) {
        Arquivo logFile = new Arquivo("Securit"); 
        String arquivoLogCaminho;
    
        Diretorio.criarDiretorio();
        try {
            logFile.criarArquivo();
            logFile.escreverArquivo(
                    String.format("Erro ao %s: %s", tipoErro, erro));
        } catch (FileNotFoundException ex) {
            java.util.logging.Logger.getLogger(Dashboard.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
