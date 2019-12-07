package securit.logs;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;


public class Arquivo {

    private File arquivo;
    private Date data;
    private FileWriter escrever;
    private BufferedWriter marcar;
    private FileReader leitura;

    public Arquivo(String nomePasta){
        String caminho = String.format("C:\\%s\\log-%s.txt", nomePasta, LocalDate.now());
        this.arquivo = new File(caminho);
    }
    
    public void criarArquivo() throws FileNotFoundException {
        data = new Date();

        if (!this.arquivo.exists()) {
            try {
                this.arquivo.createNewFile();
            } catch (IOException ex) {
                System.out.println("ERRO:" + ex.getMessage());
            }
            
//            if (!data.equals(arquivo.lastModified())) {
//                try {
//                    arquivo.createNewFile();
//                } catch (IOException ex) {
//                    System.out.println("ERRO:" + ex.getMessage());
//                }
//            }
        }  
    }

    public void escreverArquivo(String mensagem) {

        try {
            escrever = new FileWriter(this.arquivo, true);
            marcar = new BufferedWriter(escrever);
            
            String dataFormatada = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
            marcar.write(String.format("[%s] %s", dataFormatada, mensagem));
            marcar.newLine();
            
            marcar.close();
            escrever.close();
        } catch (IOException ex) {
            System.out.println("ERRO:" + ex.getMessage());
        }

    }

    public void lerArquivos(File arquivo) throws FileNotFoundException {

        FileReader leitura;

        String linha;

        BufferedReader ler;

        leitura = new FileReader(arquivo);

        ler = new BufferedReader(leitura);

        try {

            linha = ler.readLine();

            while (linha != null) {
                System.out.println(linha);
                linha = ler.readLine();
            }

        } catch (IOException ex) {

            System.out.println("ERRO:" + ex.getMessage());
        }
    }
}

