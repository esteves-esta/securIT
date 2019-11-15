/**
 * Autor: Gabriel Gameleira dos Santos
 * Data 29/05/19
 * Hora 11:05
 * Finalidade do programa: Criar arquivos e gerar logs
 */
package log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public class Log {

    public static void main(String[] args) throws FileNotFoundException {

       
        File diretorio = new File("C:\\Registro");

        diretorio.mkdir();
       
        File arquivo = new File("C:\\Registro\\arquivo.txt");

        try {

            //Metodo que cria o arquivo txt    
            arquivo.createNewFile();

            FileWriter escrever = new FileWriter(arquivo, true);

            BufferedWriter marcar = new BufferedWriter(escrever);

            marcar.write("[]" + LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)) + "] " + "Sistema em uso");
           
            marcar.newLine();

            marcar.close();

            escrever.close();

            FileReader leitura = new FileReader(arquivo);

            BufferedReader ler = new BufferedReader(leitura);
            String linha = ler.readLine();

            while (linha != null) {
                System.out.println(linha);
                linha = ler.readLine();

            }

            File doc = new File("C:");

            File documento[] = doc.listFiles();

            for (int a = 1; a > 0; a++) {

                for (int i = 0; i < documento.length; i++) {

                    System.out.println(documento[i]);

                }
            }

        } catch (IOException ex) {
        }

    }

}
