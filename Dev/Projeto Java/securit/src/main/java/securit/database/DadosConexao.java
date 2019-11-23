package securit.database;

import org.apache.commons.dbcp2.BasicDataSource;

public class DadosConexao {

    private BasicDataSource dataSource;

    public DadosConexao() {
        dataSource​ = new​ BasicDataSource();
        dataSource​.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource​.setUrl("jdbc:sqlserver://servidorgrupo8.database.windows.net;"
                + "databaseName=grupo8bd");
        
        dataSource​.setUsername("securit");
        dataSource​.setPassword("#Gfgrupo8");
    }
    
    public BasicDataSource getDataSource() {
        return dataSource;
    }

}
