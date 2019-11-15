package securit.swing_oshi;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HWDiskStore;
import oshi.software.os.OSProcess;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OperatingSystem.ProcessSort;
import oshi.util.FormatUtil;
import oshi.hardware.CentralProcessor;
import oshi.hardware.CentralProcessor.TickType;
import oshi.util.Util;

/**
 * INSTALAR O OSHI COM A AJUDA DA APOSTILA SOBRE JAVA MAVEN DO PROFESSOR YOSHI
 * 
 * Inserir dados da biblioteca oshi no arquivo pom.xml 
 * site com dados da biblioteca: https://search.maven.org/search?q=g:com.github.oshi
 *
 * documentação /javadocs/ da biblioteca oshi https://oshi.github.io/oshi/apidocs/
 * 
 * @author securIT
 */

public class Monitoracao {
    
    private SystemInfo system;
    private OperatingSystem os;
    private HardwareAbstractionLayer hardware;
    private HWDiskStore[] hd;
    private String operatingSystem;
    private String uptime;
    private String cpu;
    private String memTotal;
    private String memUsed;
    private String memAvailable;
    private String processQtd;
    private String cpuMaxFreq;
    private List<String> processos;
    
    Monitoracao() {
        system = new SystemInfo();
        os = system.getOperatingSystem();
        hardware = system.getHardware();
        hd = hardware.getDiskStores();
        processos = new ArrayList<>();
    }
    
    public String getOs() {
        operatingSystem = os.toString();
        return operatingSystem;
    }
    
    public String getUptime() {
        uptime = FormatUtil.formatElapsedSecs(os.getSystemUptime());
        return uptime;
    }
   
    public String getProcessorInfo() {
        cpu = hardware.getProcessor().toString();
        return cpu;
    }   
    
    public String getProcessorMaxFreq() {
        cpuMaxFreq = FormatUtil.formatHertz(hardware.getProcessor().getMaxFreq());
        return cpuMaxFreq;
    }   
    
    public String getUsedCpu() {
        long[] prevTicks =  hardware.getProcessor().getSystemCpuLoadTicks();
        return String.valueOf(hardware.getProcessor().getSystemCpuLoadBetweenTicks(prevTicks) * 100);
    
    }
    
    public String getProcessQtd() {
        processQtd = String.valueOf(os.getProcessCount());
        return processQtd;
    }   
    
    private void getMemory() {
        memTotal = FormatUtil.formatBytes(hardware.getMemory().getTotal()).replace("i", "");
        memAvailable = FormatUtil.formatBytes(hardware.getMemory().getAvailable()).replace("i", "");
        
        Long utilizada = hardware.getMemory().getTotal() - hardware.getMemory().getAvailable();
        memUsed = FormatUtil.formatBytes(utilizada).replace("i", "");
    }  
    
    public String getTotalMemory(){
        getMemory();
        return memTotal;
    }
    
    public String getUsedMemory(){
        getMemory();
        return memUsed;
    }
    public String getAvailableMemory(){
        getMemory();
        return memAvailable;
    }
      
    public String getHardDisk() {
       return FormatUtil.formatBytesDecimal((hd[1].getSize()));
    }
    
     /*
        metodo da classe de teste da biblioteca oshi
        https://github.com/oshi/oshi/blob/master/oshi-core/src/test/java/oshi/SystemInfoTest.java
    */
    private void printProcesses(OperatingSystem os, GlobalMemory memory) {
        // Sort by highest CPU
        List<OSProcess> procs = Arrays.asList(os.getProcesses(10, ProcessSort.CPU));

        this.processos.add("   PID  %CPU %MEM       VSZ       RSS Name");
        
        for (int i = 0; i < procs.size() && i < 10; i++) {
            OSProcess p = procs.get(i);
            processos.add(String.format(" %5d %5.1f %4.1f %9s %9s %s", 
                    p.getProcessID(),
                    100d * (p.getKernelTime() + p.getUserTime()) / p.getUpTime(),
                    100d * p.getResidentSetSize() / memory.getTotal(), 
                    FormatUtil.formatBytes(p.getVirtualSize()),
                    FormatUtil.formatBytes(p.getResidentSetSize()), p.getName())
            );
        }
    }
     
    public String getProcesses() {
    
        printProcesses(os, hardware.getMemory());
        String get = "";
        for (int i = 0; i < processos.size(); i++) {
            get += "\n" + processos.get(i);
        }
        return get;
    }
}
