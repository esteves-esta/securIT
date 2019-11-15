package com.mycompany.securit;

import org.jfree.chart.ChartColor;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.XYDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;

public class Graph {
    XYSeries data;
    Long date[] = new Long[20];
    Integer values[] = new Integer[20];
    
    public Graph(String comp){
        this.data = new XYSeries(comp);
        for(Integer i = 0; i < 20; i++){
            Long date = System.currentTimeMillis();
            this.data.add(date, i);
            this.date[i] = date;
            this.values[i] = 0;
        }
        
    }
    
    public ChartPanel getGraph(Long X, Integer Y){
        updateData(X, Y);
        return graphMount();
    }
    
    private ChartPanel graphMount(){
       XYDataset xyDataset = new XYSeriesCollection(this.data);
        JFreeChart chart = ChartFactory.createXYLineChart(
            "", "", "%",
            xyDataset, PlotOrientation.VERTICAL, true, true, false);
        ChartPanel cp = new ChartPanel(chart);
        cp.setBounds(0, 0, 320, 240);
        return cp;
    }
    
    private void updateData(Long X, Integer Y){
        this.data.clear();
        for(int i = 0; i < 20; i++){
            if(i < 19){
                this.date[i] = this.date[i+1];
                this.values[i] = this.values[i+1];
                this.data.add(this.date[i], this.values[i]);
            }else{
                this.date[i] = X;
                this.values[i] = Y;
                this.data.add(this.date[i], this.values[i]);  
            }
        }
    }
}
