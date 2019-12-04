package securit.oshi;

import securit.slack.SlackEmoji;
import securit.slack.SlackMessage;
import java.awt.Color;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import oshi.SystemInfo;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.HWDiskStore;
import oshi.software.os.OSProcess;
import oshi.software.os.OperatingSystem;
import oshi.util.FormatUtil;

public class Components {
    
    private final SystemInfo si;
    private final HardwareAbstractionLayer hal;
    private final HWDiskStore[] diskStore;
    private final OperatingSystem os;
    private final String hooksUrl;
    private final String hooksMiddle;
    private final String hooksEnd;
    private final SlackMessage mensagem;
    private String sistema;
    
    private List processPids = new ArrayList();
    private List processNomes = new ArrayList();
    private List processPrioridades = new ArrayList();
    private List processCpu = new ArrayList();
    private List processMemory = new ArrayList();
    
    
    public Components(String sistema){
        this.sistema = sistema;
        this.si = new SystemInfo();
        this.hal = si.getHardware();
        this.os = si.getOperatingSystem();
        this.diskStore = this.hal.getDiskStores();
        
        this.hooksUrl = "https://hooks.slack.com/";
        this.hooksMiddle = "services/TPZPZU71T";
        this.hooksEnd = "/BQ7LZQJHH/uSwP6o1KPO1hVDLeELi2DxBw";
        
        this.mensagem = new SlackMessage(
            hooksUrl + hooksMiddle + hooksEnd
        );
    }
    
    public String getProcessorInfo() {
        return this.hal.getProcessor().getProcessorIdentifier().getName().split(" CPU")[0];
    }   
    
    public Integer getCPU(){
       return Sistema.getCPU(this.hal.getProcessor());
    }
    
      public String getProcessorMaxFreq() {
        return FormatUtil.formatHertz(this.hal.getProcessor().getMaxFreq());
    }   

    public String getProcessQtd() {
        return String.valueOf(this.os.getProcessCount());
    } 
    
    public Integer getMemory(){
       return Sistema.getMemory(this.hal.getMemory());
    }
    
    public String getTotalMemory() {
        return FormatUtil.formatBytes(this.hal.getMemory().getTotal()).replace("i", "");
    } 
    
    public String getUsedMemory(){
        Long utilizada = this.hal.getMemory().getTotal() - this.hal.getMemory().getAvailable();
        return FormatUtil.formatBytes(utilizada).replace("i", "");
    }
    
    public String getAvailableMemory(){
        return FormatUtil.formatBytes(this.hal.getMemory().getAvailable()).replace("i", "");
    }
     
    public Integer getDisk() throws Exception{
       try {
            Integer disk = 0;
            for (HWDiskStore atual : diskStore) {

                if(atual.getReads() > 0){
                    long vRead = atual.getReadBytes() / atual.getReads();

                    Integer readVelocity = Integer.valueOf(
                            FormatUtil.formatBytesDecimal(vRead)
                                    .replace(" KB", "").split(",")[0]
                    );

                    disk = readVelocity;
                }
            }   

            return disk;
        }
        catch(Exception ex) {
           throw new Exception("não foi possível obter dados do hd: " + ex.getMessage()); 
        }
    }
    
    public String getDiskWriteSpeed(){
        String disk = "";
        for (HWDiskStore atual : diskStore) {
            
            if(atual.getReads() > 0){
               
                long vWrite = atual.getWriteBytes() / atual.getWrites();

                disk = FormatUtil.formatBytesDecimal(vWrite);                              ;
            }
        }   
        
        return disk;
    }
    
     public String getDiskModel(){
        String model = "";
        for (HWDiskStore atual : diskStore) {
            
            if(atual.getSize() > 0){
                model = atual.getModel();
            }
        }   
        
        return model;
    }
    
    public String getHardDiskSize() {   
        String hd = "";
        for (HWDiskStore atual : diskStore) {
            
            if(atual.getSize() > 0){
                hd = FormatUtil.formatBytesDecimal((atual.getSize()));
            }
        }   
        
        return hd;
    }
    
      
    public Color validateComponente(Integer componente, Integer nome){
        String limiteNomes[] = {"Cpu", "Memoria Ram", "Disco Rígido"};
        Integer limitesAmarelo[] = {53, 55, 56};
        Integer limitesVermelho[] = {76, 78, 79};
        if(componente >= limitesVermelho[nome]){
            mensagem.sendMessage(
                    String.format("%s do sistema %s está em %d%% ", limiteNomes[nome], sistema, componente),
                    SlackEmoji.EMOJI_DOUBLE_ATTENTION);
            return Color.red;
        } 
        else  if(componente >= limitesAmarelo[nome]){
            mensagem.sendMessage(
                    String.format("%s do sistema %s está em %d%% ", limiteNomes[nome], sistema, componente),
                    SlackEmoji.EMOJI_WARNING);
            return Color.ORANGE;
        }
        else {
            return Color.BLACK;
        }
    }

    
    public void getProcess() throws Exception {
        
        Integer quantidadeDeProcessos = 20;
        
          try{
            List<OSProcess> procs = Arrays.asList(
                    os.getProcesses(quantidadeDeProcessos, OperatingSystem.ProcessSort.CPU)
            );

            processPids.clear();
            processNomes.clear();
            processPrioridades.clear();
            processCpu.clear();
            processMemory.clear();

            for (OSProcess processoAtual : procs) {

                int pid = processoAtual.getProcessID();
                String nmProcesso = processoAtual.getName();
                int prioridade = processoAtual.getPriority();

                //cpu
                Double cpuPercent = 100d * (processoAtual.getKernelTime() 
                        + processoAtual.getUserTime()) / processoAtual.getUpTime();
                
                String percentCpu = String.format("%.2f", cpuPercent);

                //memoria
                Double memoryPercent = 100d * processoAtual.getResidentSetSize() 
                        / hal.getMemory().getTotal();
                
                String percentMemory = String.format("%4.1f", memoryPercent);


                processPids.add(pid);
                processNomes.add(nmProcesso);
                processPrioridades.add(prioridade);
                processCpu.add(percentCpu);
                processMemory.add(percentMemory);
            }
        }
        catch(Exception ex){
             throw new Exception("Processos não foram obtidos: " + ex.getMessage());
        }
    }

    public List getProcessPids() {
        return processPids;
    }

    public List getProcessNomes() {
        return processNomes;
    }

    public List getProcessPrioridades() {
        return processPrioridades;
    }

    public List getProcessCpu() {
        return processCpu;
    }

    public List getProcessMemory() {
        return processMemory;
    }
    
}
