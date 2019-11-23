package securit.logs;

import java.io.File;
import java.util.Date;

public class Diretorio {

    public static void criarDiretorio() {
        
        //Date data = new Date();
        
        //Inicializando a váriavel diretorio criando a instancia  da classe File 
        // e passando nome da pasta que queremos encontrar pasta 
        File diretorio = new File("C:\\Securit");
        
        //Se essa pasta não existe é criada
        if (!diretorio.exists()) {

            diretorio.mkdir();
//            
//            if (!data.equals(diretorio.lastModified())) {
//             diretorio.mkdir();
//            }
        }
    }
}