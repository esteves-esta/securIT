package com.mycompany.securit;

import java.awt.Color;
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.HWDiskStore;

public class Components {
    
    SystemInfo si = new SystemInfo();
    private final HardwareAbstractionLayer hal = si.getHardware();
    private final HWDiskStore diskStore = new HWDiskStore();
    
    public Components(){
        //Sistema.main(null);
    }
    
     public String getProcessorInfo() {
        return hal.getProcessor().getProcessorIdentifier().getName();
    }   
    
    public Integer getCPU(){
       return Sistema.getCPU(this.hal.getProcessor());
    }
    
    public Integer getMemory(){
       return Sistema.getMemory(this.hal.getMemory());
    }
    
    public Integer getDisk(){
       return Sistema.getDisk(this.diskStore);
    }
    
    public Color validateCPU(Integer cpu){
        if(cpu > 85){
            return Color.red;
        } else {
            return Color.BLACK;
        }
    }
    
    public Color validateMemory(Integer memory){
        if(memory > 85){
            return Color.red;
        } else {
            return Color.BLACK;
        }
    }
    
    public Color validateDisk(Integer disk){
        if(disk > 85){
            return Color.red;
        } else {
            return Color.BLACK;
        }
    }
}
